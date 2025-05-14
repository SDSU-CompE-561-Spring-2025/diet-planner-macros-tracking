-- Insert sample users
INSERT INTO users (name, email, hashed_password) VALUES
('John Doe', 'john@example.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewFX1FgFI/vzyKiO'),
('Jane Smith', 'jane@example.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewFX1FgFI/vzyKiO');

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
('Vegetarian Quinoa Bowl', '{"quinoa": "100g", "chickpeas": "100g", "mixed vegetables": "150g", "tahini": "30g"}', 450, 2);

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
(2, 'Mixed Greens', 200);

-- Insert sample meal preferences
INSERT INTO meal_preferences (user_id, dining_preference, dietary_restrictions, cuisine_preferences, meal_types, budget, cooking_time) VALUES
(1, 'Home Cooking', ARRAY['gluten-free'], ARRAY['Mediterranean', 'Asian', 'American'], ARRAY['breakfast', 'lunch', 'dinner'], 'medium', '30-60 minutes'),
(2, 'Mixed', ARRAY['vegetarian'], ARRAY['Indian', 'Mediterranean', 'Mexican'], ARRAY['breakfast', 'lunch', 'dinner'], 'medium', '15-30 minutes'); 