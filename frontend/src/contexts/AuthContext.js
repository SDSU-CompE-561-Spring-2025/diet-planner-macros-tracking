import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import api from '../services/api';
import Cookies from 'js-cookie';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Function to set token and update headers
  const setToken = (token) => {
    if (token) {
      // Set token in both cookie and localStorage
      Cookies.set('token', token, { path: '/' });
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      // Remove token from both cookie and localStorage
      Cookies.remove('token', { path: '/' });
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
    }
  };

  useEffect(() => {
    // Check if user is logged in on mount
    const token = Cookies.get('token') || localStorage.getItem('token');
    if (token) {
      setToken(token); // Set the token in axios headers
      api.get('/auth/me')
        .then(response => {
          setUser(response.data);
        })
        .catch(() => {
          setToken(null); // Clear token if invalid
          setUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      // FastAPI OAuth2 expects form data
      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);

      const response = await api.post('/auth/login', formData);
      const { access_token } = response.data;
      
      setToken(access_token); // Set token and update headers
      
      // Fetch user data after successful login
      const userResponse = await api.get('/auth/me');
      setUser(userResponse.data);
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error.response?.data);
      return {
        success: false,
        error: error.response?.data?.detail || 'Failed to login. Please check your credentials.'
      };
    }
  };

  const register = async (userData) => {
    try {
      // Register the user
      const response = await api.post('/auth/register', {
        email: userData.email,
        password: userData.password,
        name: userData.name
      });

      if (response.data) {
        // After successful registration, log them in
        const loginResult = await login(userData.email, userData.password);
        
        if (loginResult.success) {
          router.push('/meal-preferences'); // Redirect to preferences after registration
          return { success: true };
        } else {
          throw new Error(loginResult.error);
        }
      }
      
      return { success: false, error: 'Registration failed: No response from server' };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || error.message || 'Failed to register. Please try again.'
      };
    }
  };

  const logout = () => {
    setToken(null); // Clear token and headers
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      logout,
      register,
      isAuthenticated: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext); 