-- filepath: /Users/sarak/Documents/GitHub/diet-planner-macros-tracking/backend/init.sql
DO $$ BEGIN
    CREATE DATABASE diet_planner;
EXCEPTION
    WHEN duplicate_database THEN
        RAISE NOTICE 'Database already exists, skipping creation.';
END $$;

DO $$ BEGIN
    CREATE USER diet_user WITH PASSWORD 'diet_password';
EXCEPTION
    WHEN duplicate_object THEN
        RAISE NOTICE 'User already exists, skipping creation.';
END $$;

GRANT ALL PRIVILEGES ON DATABASE diet_planner TO diet_user;