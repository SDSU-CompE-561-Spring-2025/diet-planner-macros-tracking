import { useState } from "react";
import api from "../src/services/api";

export default function Nutrition() {
  const [food, setFood] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [nutrition, setNutrition] = useState(null);

  const fetchNutrition = async () => {
    const response = await api.post("/nutrition/", { food, quantity });
    setNutrition(response.data);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Nutrition Tracker</h1>
      <input
        type="text"
        placeholder="Food"
        value={food}
        onChange={(e) => setFood(e.target.value)}
        className="p-2 border rounded mb-4"
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className="p-2 border rounded mb-4"
      />
      <button
        onClick={fetchNutrition}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Get Nutrition
      </button>
      {nutrition && (
        <div className="mt-4">
          <p>Calories: {nutrition.calories}</p>
          <p>Protein: {nutrition.protein}g</p>
          <p>Fat: {nutrition.fat}g</p>
          <p>Sugars: {nutrition.sugars}g</p>
          <p>Carbs: {nutrition.carbs}g</p>
        </div>
      )}
    </div>
  );
}
