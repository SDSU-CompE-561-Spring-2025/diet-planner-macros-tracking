# Backend Plan Layout

## Part 1: Project Overview

### Project Title: AI-Driven Meal Planner

### Project Description

The AI-Driven Meal Planner is designed to assist users in planning their meals according to their budget, dietary preferences, and location. It offers recipe suggestions, generates shopping lists, and recommends local stores or delivery options. The platform is intuitive and flexible, catering to a wide range of needs and preferences.

## Part 2: Define the API Endpoints

| Endpoint Name          | URL                       | HTTP Method | Description                                                              | Request Parameters                                   | Success Response Structure                                                | Error Response Structure                                                                                                   |
| ---------------------- | ------------------------- | ----------- | ------------------------------------------------------------------------ | ---------------------------------------------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| User Authentication    | `/api/user/`              | POST        | Authenticate a user and return a token.                                  | `{ name, email, password }`                          | `{ success: true, token: "..." }`                                         | `{ success: false, error: "Invalid request parameters" }`                                                                  |
| Add Meal               | `/api/meals/`             | POST        | Add a meal to the user's meal list.                                      | `{ name, ingredients, calories }`                    | `{ success: true, meal: { ... } }`                                        | `{ success: false, error: "Invalid request parameters" }`                                                                  |
| Create Meal Plan       | `/api/meal-plans/`        | POST        | Create a new meal plan for the user.                                     | `{ userId, mealPlan: [{ meal, day, time }] }`        | `{ success: true, message: "Meal plan created" }`                         | `{ success: false, error: "Invalid request parameters" }`                                                                  |
| Create Shopping List   | `/api/shopping-list/`     | POST        | Create a shopping list based on the user's meals.                        | `{ userId, items: [{ name, quantity }] }`            | `{ success: true, message: "Shopping list created" }`                     | `{ success: false, error: "Invalid request parameters" }`                                                                  |
| Get Nutrition Details  | `/api/nutrition/`         | POST        | Get nutrition details for a given food item.                             | `{ food, quantity }`                                 | `{ success: true, nutrition: { calories, protein, fat, sugars, carbs } }` | `{ success: false, error: "Invalid request parameters" }`                                                                  |
| Get Nearby Restaurants | `/api/restaurants/nearby` | GET         | Get a list of nearby restaurants based on location and optional filters. | `{ location, cuisine, price, rating, review_count }` | `{ restaurants: [...] }`                                                  | `{ success: false, error: "Invalid request parameters" }`, `{ error: "Failed to fetch data from Yelp", status_code: 500 }` |

## Part 3: Data Models

Define the data models that your application will use. For each model, include:

### User Model

| Attribute  | Data Type | Constraints                 |
| ---------- | --------- | --------------------------- |
| id         | int       | primary key, auto-increment |
| name       | varchar   | required                    |
| email      | varchar   | required, unique            |
| password   | varchar   | required                    |
| created_at | datetime  | default to current time     |

**Relationships:**

- A user can have many meal plans.
- A user can have many shopping list items.

### Meal Model

| Attribute   | Data Type | Constraints                 |
| ----------- | --------- | --------------------------- |
| id          | int       | primary key, auto-increment |
| name        | varchar   | required                    |
| ingredients | JSON      | required                    |
| calories    | int       | required                    |

**Relationships:**

- A meal can be part of many meal plans.

### Meal Plan Model

| Attribute | Data Type | Constraints                      |
| --------- | --------- | -------------------------------- |
| id        | int       | primary key, auto-increment      |
| user_id   | int       | foreign key references Users(id) |
| meal_plan | JSON      | required                         |

**Relationships:**

- A meal plan belongs to one user.
- A meal plan can include many meals.

### Shopping List Model

| Attribute | Data Type | Constraints                      |
| --------- | --------- | -------------------------------- |
| id        | int       | primary key, auto-increment      |
| user_id   | int       | foreign key references Users(id) |
| item_name | varchar   | required                         |
| quantity  | int       | required                         |

**Relationships:**

- A shopping list item belongs to one user.

### Nutrition Model

| Attribute | Data Type | Constraints                 |
| --------- | --------- | --------------------------- |
| id        | int       | primary key, auto-increment |
| food      | varchar   | required                    |
| quantity  | int       | required                    |
| calories  | int       | required                    |
| protein   | int       | required                    |
| fat       | int       | required                    |
| sugars    | int       | required                    |
| carbs     | int       | required                    |

**Relationships:**

- No direct relationships with other models.

### Nearby Restaurant Model

| Attribute    | Data Type | Constraints                 |
| ------------ | --------- | --------------------------- |
| id           | int       | primary key, auto-increment |
| name         | varchar   | required                    |
| location     | varchar   | required                    |
| cuisine      | varchar   | optional                    |
| price        | int       | optional                    |
| rating       | float     | optional                    |
| review_count | int       | optional                    |

**Relationships:**

- No direct relationships with other models.

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
