-- Create the "postgres" role if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT FROM pg_roles WHERE rolname = 'postgres'
    ) THEN
        CREATE ROLE postgres WITH SUPERUSER LOGIN PASSWORD 'postgres';
    END IF;
END $$;

-- Check if the database exists before creating it
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT FROM pg_database WHERE datname = 'diet_planner'
    ) THEN
        CREATE DATABASE diet_planner;
    END IF;
END $$;

-- Create the user if it doesn't already exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT FROM pg_roles WHERE rolname = 'diet_user'
    ) THEN
        CREATE USER diet_user WITH PASSWORD 'diet_password';
    END IF;
END $$;

-- Grant privileges to the user
GRANT ALL PRIVILEGES ON DATABASE diet_planner TO diet_user;

-- Connect to the diet_planner database
\c diet_planner;

-- Drop existing tables if they exist
DROP TABLE IF EXISTS nutrition CASCADE;
DROP TABLE IF EXISTS shopping_list CASCADE;
DROP TABLE IF EXISTS meal_plans CASCADE;
DROP TABLE IF EXISTS meals CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS meal_preferences CASCADE;

-- Create tables
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE meals (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    ingredients JSONB NOT NULL,
    calories INTEGER NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE meal_plans (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    meal_plan JSONB NOT NULL
);

CREATE TABLE shopping_list (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    item_name VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL
);

CREATE TABLE nutrition (
    id SERIAL PRIMARY KEY,
    food VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL,
    calories INTEGER NOT NULL,
    protein INTEGER NOT NULL,
    fat INTEGER NOT NULL,
    sugars INTEGER NOT NULL,
    carbs INTEGER NOT NULL
);

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create meal_preferences table
CREATE TABLE meal_preferences (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    dining_preference VARCHAR(255) NOT NULL,
    dietary_restrictions VARCHAR(255)[] NOT NULL,
    cuisine_preferences VARCHAR(255)[] NOT NULL,
    meal_types VARCHAR(255)[] NOT NULL,
    budget VARCHAR(50) NOT NULL,
    cooking_time VARCHAR(50),
    UNIQUE(user_id)
);

-- Grant privileges on all tables to diet_user
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO diet_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO diet_user;

-- Insert sample data
-- Insert sample users
INSERT INTO users (name, email, hashed_password) VALUES
('John Doe', 'john@example.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewFX1FgFI/vzyKiO'),
('Jane Smith', 'jane@example.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewFX1FgFI/vzyKiO'),
('Burak Ozhan', 'burak.ozhan04@gmail.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewFX1FgFI/vzyKiO');

-- Insert sample nutrition data
INSERT INTO nutrition (food, quantity, calories, protein, fat, sugars, carbs) VALUES
('Chicken Breast', 100, 165, 31, 3, 0, 0),
('Brown Rice', 100, 111, 2, 1, 0, 23),
('Broccoli', 100, 55, 3, 0, 2, 11),
('Salmon', 100, 208, 22, 13, 0, 0),
('Sweet Potato', 100, 86, 1, 0, 4, 20),
('Greek Yogurt', 100, 59, 10, 0, 4, 3),
('Banana', 100, 89, 1, 0, 12, 23),
('Almonds', 100, 579, 21, 50, 4, 22),
('Quinoa', 100, 120, 4, 2, 0, 21),
('Avocado', 100, 160, 2, 15, 0, 9);

-- Insert sample meals
INSERT INTO meals (name, ingredients, calories, user_id) VALUES
('Grilled Chicken Salad', '{"chicken breast": "150g", "lettuce": "100g", "tomatoes": "50g", "olive oil": "15ml"}', 350, 1),
('Salmon Rice Bowl', '{"salmon": "150g", "brown rice": "100g", "avocado": "50g", "soy sauce": "15ml"}', 550, 1),
('Vegetarian Quinoa Bowl', '{"quinoa": "100g", "chickpeas": "100g", "mixed vegetables": "150g", "tahini": "30g"}', 450, 2),
('Turkish Breakfast', '{"eggs": "2 pieces", "feta cheese": "50g", "tomatoes": "100g", "cucumbers": "100g", "olives": "50g", "honey": "20g"}', 450, 3),
('Protein Bowl', '{"chicken breast": "200g", "quinoa": "100g", "avocado": "50g", "mixed greens": "100g", "olive oil": "15ml"}', 650, 3),
('Grilled Salmon Plate', '{"salmon": "200g", "sweet potato": "150g", "broccoli": "100g", "lemon": "1 piece"}', 550, 3);

-- Insert sample meal plans
INSERT INTO meal_plans (user_id, meal_plan) VALUES
(1, '{
  "monday": {
    "breakfast": "Greek Yogurt with Banana",
    "lunch": "Grilled Chicken Salad",
    "dinner": "Salmon Rice Bowl"
  },
  "tuesday": {
    "breakfast": "Quinoa Porridge",
    "lunch": "Vegetarian Quinoa Bowl",
    "dinner": "Sweet Potato and Black Bean Bowl"
  }
}'),
(2, '{
  "monday": {
    "breakfast": "Avocado Toast",
    "lunch": "Vegetarian Quinoa Bowl",
    "dinner": "Buddha Bowl"
  },
  "tuesday": {
    "breakfast": "Smoothie Bowl",
    "lunch": "Mediterranean Salad",
    "dinner": "Stir-Fry Vegetables with Tofu"
  }
}'),
(3, '{
  "monday": {
    "breakfast": "Turkish Breakfast",
    "lunch": "Protein Bowl",
    "dinner": "Grilled Salmon Plate",
    "snacks": ["Greek Yogurt with Honey", "Mixed Nuts"]
  },
  "tuesday": {
    "breakfast": "Oatmeal with Protein",
    "lunch": "Chicken Rice Bowl",
    "dinner": "Grilled Fish with Vegetables",
    "snacks": ["Protein Shake", "Banana"]
  },
  "wednesday": {
    "breakfast": "Protein Pancakes",
    "lunch": "Turkey Wrap",
    "dinner": "Steak with Sweet Potato",
    "snacks": ["Cottage Cheese", "Apple"]
  }
}');

-- Insert sample shopping list items
INSERT INTO shopping_list (user_id, item_name, quantity) VALUES
(1, 'Chicken Breast', 500),
(1, 'Brown Rice', 1000),
(1, 'Broccoli', 300),
(1, 'Sweet Potato', 400),
(1, 'Greek Yogurt', 500),
(2, 'Quinoa', 500),
(2, 'Chickpeas', 400),
(2, 'Avocado', 3),
(2, 'Tofu', 400),
(2, 'Mixed Greens', 200),
(3, 'Chicken Breast', 1000),
(3, 'Eggs', 30),
(3, 'Greek Yogurt', 1000),
(3, 'Quinoa', 500),
(3, 'Sweet Potato', 1000),
(3, 'Salmon', 500),
(3, 'Protein Powder', 1),
(3, 'Mixed Nuts', 300),
(3, 'Avocado', 4),
(3, 'Feta Cheese', 200);

-- Insert sample meal preferences
INSERT INTO meal_preferences (user_id, dining_preference, dietary_restrictions, cuisine_preferences, meal_types, budget, cooking_time) VALUES
(1, 'Home Cooking', ARRAY['gluten-free'], ARRAY['Mediterranean', 'Asian', 'American'], ARRAY['breakfast', 'lunch', 'dinner'], 'medium', '30-60 minutes'),
(2, 'Mixed', ARRAY['vegetarian'], ARRAY['Indian', 'Mediterranean', 'Mexican'], ARRAY['breakfast', 'lunch', 'dinner'], 'medium', '15-30 minutes'),
(3, 'Home Cooking', ARRAY['high-protein'], ARRAY['Turkish', 'Mediterranean', 'International'], ARRAY['breakfast', 'lunch', 'dinner', 'snacks'], 'medium', '30-60 minutes');