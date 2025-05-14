import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import api from '../src/services/api';

export default function ShoppingList() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', quantity: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchShoppingList();
  }, []);

  const fetchShoppingList = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/shopping-list');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching shopping list:', error);
      setError('Failed to load shopping list');
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.quantity) return;

    setLoading(true);
    try {
      await api.post('/api/shopping-list', {
        item_name: newItem.name,
        quantity: parseInt(newItem.quantity)
      });
      await fetchShoppingList();
      setNewItem({ name: '', quantity: '' });
    } catch (error) {
      console.error('Error adding item:', error);
      setError('Failed to add item');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (itemId) => {
    setLoading(true);
    try {
      await api.delete(`/api/shopping-list/${itemId}`);
      await fetchShoppingList();
    } catch (error) {
      console.error('Error removing item:', error);
      setError('Failed to remove item');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleItem = async (itemId, completed) => {
    setLoading(true);
    try {
      await api.patch(`/api/shopping-list/${itemId}`, {
        completed: !completed
      });
      await fetchShoppingList();
    } catch (error) {
      console.error('Error updating item:', error);
      setError('Failed to update item');
    } finally {
      setLoading(false);
    }
  };

  const categories = {
    'Produce': ['apple', 'banana', 'carrot', 'lettuce', 'tomato', 'onion', 'potato'],
    'Meat & Seafood': ['chicken', 'beef', 'pork', 'fish', 'shrimp'],
    'Dairy & Eggs': ['milk', 'cheese', 'yogurt', 'eggs', 'butter'],
    'Pantry': ['rice', 'pasta', 'bread', 'cereal', 'flour', 'sugar', 'oil'],
    'Other': []
  };

  const categorizeItems = (items) => {
    const categorized = Object.keys(categories).reduce((acc, category) => {
      acc[category] = [];
      return acc;
    }, {});

    items.forEach(item => {
      let itemCategory = 'Other';
      for (const [category, keywords] of Object.entries(categories)) {
        if (keywords.some(keyword => item.item_name.toLowerCase().includes(keyword))) {
          itemCategory = category;
          break;
        }
      }
      categorized[itemCategory].push(item);
    });

    return categorized;
  };

  const categorizedItems = categorizeItems(items);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-forest mb-8">Shopping List</h1>

        {/* Add Item Form */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <form onSubmit={handleAddItem} className="flex flex-wrap gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Item Name
              </label>
              <input
                type="text"
                value={newItem.name}
                onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-2 border rounded focus:ring-forest focus:border-forest"
                placeholder="Enter item name"
                required
              />
            </div>
            <div className="w-32">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                value={newItem.quantity}
                onChange={(e) => setNewItem(prev => ({ ...prev, quantity: e.target.value }))}
                className="w-full p-2 border rounded focus:ring-forest focus:border-forest"
                placeholder="Amount"
                required
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-forest text-white px-6 py-2 rounded-lg hover:bg-forest/90 transition disabled:opacity-50"
              >
                {loading ? 'Adding...' : 'Add Item'}
              </button>
            </div>
          </form>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-8">
            {error}
          </div>
        )}

        {/* Shopping List */}
        <div className="space-y-6">
          {Object.entries(categorizedItems).map(([category, categoryItems]) => (
            categoryItems.length > 0 && (
              <div key={category} className="bg-white rounded-lg shadow overflow-hidden">
                <h2 className="text-xl font-semibold text-forest p-6 bg-gray-50">
                  {category}
                </h2>
                <ul className="divide-y divide-gray-200">
                  {categoryItems.map((item) => (
                    <li key={item.id} className="p-4 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <input
                          type="checkbox"
                          checked={item.completed}
                          onChange={() => handleToggleItem(item.id, item.completed)}
                          className="h-5 w-5 text-forest rounded border-gray-300 focus:ring-forest"
                        />
                        <span className={`${item.completed ? 'line-through text-gray-400' : ''}`}>
                          {item.item_name} ({item.quantity})
                        </span>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )
          ))}
        </div>

        {Object.values(categorizedItems).every(items => items.length === 0) && (
          <div className="text-center py-12">
            <p className="text-gray-500">Your shopping list is empty</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
