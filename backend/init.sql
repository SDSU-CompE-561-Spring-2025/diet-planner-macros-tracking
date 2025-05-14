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

-- Grant privileges on all tables to diet_user
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO diet_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO diet_user;