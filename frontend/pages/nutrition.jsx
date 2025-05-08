import { useState } from "react";
import Image from "next/image";
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
    <div className="flex flex-col items-center justify-start min-h-screen bg-ivory text-forest px-4 pt-8 text-center">
      {/* Top Image */}
      <Image
        src="/images/leaf.png"
        alt="Leaf Logo"
        width={120}
        height={120}
        className="mb-6"
      />

      {/* Title */}
      <h1 className="text-4xl font-extrabold mb-4">Nutrition Tracker</h1>

      {/* Input Area */}
      <div className="w-full max-w-md text-left">
        <input
          type="text"
          placeholder="Food"
          value={food}
          onChange={(e) => setFood(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <button
          onClick={fetchNutrition}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Get Nutrition
        </button>

        {/* Nutrition Results */}
        {nutrition && (
          <div className="mt-6 p-4 bg-white rounded shadow">
            <p><strong>Calories:</strong> {nutrition.calories}</p>
            <p><strong>Protein:</strong> {nutrition.protein}g</p>
            <p><strong>Fat:</strong> {nutrition.fat}g</p>
            <p><strong>Sugars:</strong> {nutrition.sugars}g</p>
            <p><strong>Carbs:</strong> {nutrition.carbs}g</p>
          </div>
        )}
      </div>
    </div>
  );
}
