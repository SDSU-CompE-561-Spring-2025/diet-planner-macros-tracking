# Backend Plan Layout

## Part 1: Project Overview

### Project Title: AI-Driven Meal Planner

### Project Description

The AI-Driven Meal Planner is designed to assist users in planning their meals according to their budget, dietary preferences, and location. It offers recipe suggestions, generates shopping lists, and recommends local stores or delivery options. The platform is intuitive and flexible, catering to a wide range of needs and preferences.

## Part 2: Define the API Endpoints

### User Authentication

- **Endpoint URL:** `/api/user/`
- **HTTP Method:** `POST`
- **Description:** Authenticate a user and return a token.
- **Request Parameters:** `{ name, email, password }`
- **Response Structure:**
  - **Success:** `{ success: true, token: "..." }`
  - **Error:** `{ success: false, error: "Invalid request parameters" }`

### Add Meal

- **Endpoint URL:** `/api/meals/`
- **HTTP Method:** `POST`
- **Description:** Add a meal to the user's meal list.
- **Request Parameters:** `{ name, ingredients, calories }`
- **Response Structure:**
  - **Success:** `{ success: true, meal: { ... } }`
  - **Error:** `{ success: false, error: "Invalid request parameters" }`

### Create Meal Plan

- **Endpoint URL:** `/api/meal-plans/`
- **HTTP Method:** `POST`
- **Description:** Create a new meal plan for the user.
- **Request Parameters:** `{ userId, mealPlan: [{ meal, day, time }] }`
- **Response Structure:**
  - **Success:** `{ success: true, message: "Meal plan created" }`
  - **Error:** `{ success: false, error: "Invalid request parameters" }`

### Create Shopping List

- **Endpoint URL:** `/api/shopping-list/`
- **HTTP Method:** `POST`
- **Description:** Create a shopping list based on the user's meals.
- **Request Parameters:** `{ userId, items: [{ name, quantity }] }`
- **Response Structure:**
  - **Success:** `{ success: true, message: "Shopping list created" }`
  - **Error:** `{ success: false, error: "Invalid request parameters" }`

### Get Nutrition Details

- **Endpoint URL:** `/api/nutrition/`
- **HTTP Method:** `POST`
- **Description:** Get nutrition details for a given food item.
- **Request Parameters:** `{ food, quantity }`
- **Response Structure:**
  - **Success:** `{ success: true, nutrition: { calories, protein, fat, sugars, carbs } }`
  - **Error:** `{ success: false, error: "Invalid request parameters" }`

### Get Nearby Restaurants

- **Endpoint URL:** `/api/restaurants/nearby`
- **HTTP Method:** `GET`
- **Description:** Get a list of nearby restaurants based on location and optional filters.
- **Request Parameters:** `{ location, cuisine, price, rating, review_count }`
- **Response Structure:**
  - **Success:** `{ restaurants: [...] }`
  - **Error:** `{ success: false, error: "Invalid request parameters" }`
  - **Error:** `{ error: "Failed to fetch data from Yelp", status_code: 500 }`

## Part 3: Data Models

### Users Table

| Column     | Type     | Constraints                 |
| ---------- | -------- | --------------------------- |
| id         | int      | Primary Key, Auto Increment |
| name       | varchar  | Required                    |
| email      | varchar  | Required, Unique            |
| password   | varchar  | Required                    |
| created_at | datetime | Default to current time     |

### Meals Table

| Column      | Type    | Constraints                 |
| ----------- | ------- | --------------------------- |
| id          | int     | Primary Key, Auto Increment |
| name        | varchar | Required                    |
| ingredients | JSON    | Required                    |
| calories    | int     | Required                    |

### Meal Plans Table

| Column    | Type | Constraints                      |
| --------- | ---- | -------------------------------- |
| id        | int  | Primary Key, Auto Increment      |
| user_id   | int  | Foreign Key References Users(id) |
| meal_plan | JSON | Required                         |

### Shopping List Table

| Column    | Type    | Constraints                      |
| --------- | ------- | -------------------------------- |
| id        | int     | Primary Key, Auto Increment      |
| user_id   | int     | Foreign Key References Users(id) |
| item_name | varchar | Required                         |
| quantity  | int     | Required                         |

### Nutrition Table

| Column   | Type    | Constraints                 |
| -------- | ------- | --------------------------- |
| id       | int     | Primary Key, Auto Increment |
| food     | varchar | Required                    |
| quantity | int     | Required                    |
| calories | int     | Required                    |
| protein  | int     | Required                    |
| fat      | int     | Required                    |
| sugars   | int     | Required                    |
| carbs    | int     | Required                    |

### Nearby Restaurants

| Column       | Type    | Constraints                 |
| ------------ | ------- | --------------------------- |
| id           | int     | Primary Key, Auto Increment |
| name         | varchar | Required                    |
| location     | varchar | Required                    |
| cuisine      | varchar | Optional                    |
| price        | int     | Optional                    |
| rating       | float   | Optional                    |
| review_count | int     | Optional                    |

## Part 4: Database Schema

### Users Table

columns: `id`, `name`, `email`, `password`, `created_at`

### Meals Table

columns: `id`, `name`, `ingredients`, `calories`

### Meal Plans Table

columns: `id`, `user_id`, `meal_plan`

### Shopping List Table

columns: `id`, `user_id`, `item_name`, `quantity`

### Nutrition Table

columns: `id`, `food`, `quantity`, `calories`, `protein`, `fat`, `sugars`, `carbs`

### Nearby Restaurants

columns: `id`, `name`, `location`, `cuisine`, `price`, `rating`, `review_count`

## Part 5: Additional Considerations

### Authentication

Users will authenticate using JWT (JSON Web Token). Upon successful login, a JWT token will be issued and must be included in requests to access protected endpoints.

### Middleware

CORS (Cross-Origin Resource Sharing) will be implemented to allow frontend applications to interact with the API. Logging Middleware to track API requests and responses for debugging.

### Error Handling

Standardized error responses with appropriate HTTP status codes.

### Testing

The way to test the API is we're going to be using Postman.
