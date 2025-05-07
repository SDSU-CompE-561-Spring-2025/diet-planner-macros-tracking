import { useEffect, useState } from "react";
import api from "../src/services/api";

export default function Meals() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await api.get("/meals/");
      setMeals(response.data);
    };
    fetchMeals();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Meals</h1>
      <ul>
        {meals.map((meal) => (
          <li key={meal.id} className="mb-2">
            {meal.name} - {meal.calories} calories
          </li>
        ))}
      </ul>
    </div>
  );
}
