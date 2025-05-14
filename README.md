# Diet Planner with Macro Tracking

A comprehensive meal planning application that helps users plan their meals, track macros, and find healthy dining options.

## Features

- Personalized meal preferences
- Home cooking and restaurant recommendations
- Dietary restrictions support
- Cuisine type preferences
- Budget-friendly options
- Cooking time preferences
- Macro tracking
- Restaurant finder with map integration

## Setup

### Frontend

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following variables:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

4. Start the development server:
```bash
npm run dev
```

### Backend

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Start the development server:
```bash
uvicorn src.app.main:app --reload --port 8000
```

## Database Setup

1. Make sure you have PostgreSQL installed and running

2. Create a new database:
```sql
CREATE DATABASE diet_planner;
```

3. The application will automatically create the necessary tables on startup

## API Documentation

The API documentation is available at `http://localhost:8000/docs` when the backend server is running.

## Contributing

1. Fork the repository
2. Create a new branch for your feature
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 