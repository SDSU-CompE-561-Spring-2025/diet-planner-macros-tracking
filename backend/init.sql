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