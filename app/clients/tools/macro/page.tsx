"use client";

import { useState } from "react";

export default function MacroCalculator() {
  const [calories, setCalories] = useState<number>(2000);
  const [proteinPerc, setProteinPerc] = useState<number>(30); // نسبة البروتين
  const [carbsPerc, setCarbsPerc] = useState<number>(50); // نسبة الكربوهيدرات
  const [fatsPerc, setFatsPerc] = useState<number>(20); // نسبة الدهون
  const [macros, setMacros] = useState<{ protein: number; carbs: number; fats: number } | null>(null);

  const calculateMacros = () => {
    const protein = ((calories * proteinPerc) / 100 / 4).toFixed(1); // 4 سعرات لكل غ بروتين
    const carbs = ((calories * carbsPerc) / 100 / 4).toFixed(1); // 4 سعرات لكل غ كربوهيدرات
    const fats = ((calories * fatsPerc) / 100 / 9).toFixed(1); // 9 سعرات لكل غ دهون
    setMacros({ protein: Number(protein), carbs: Number(carbs), fats: Number(fats) });
  };

  return (
    <div className="mt-15 flex items-center justify-center p-6">
      <div className="w-full bg-gray-800 rounded-3xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-orange-600 mb-6">
          🥗 Macro Calculator
        </h1>

        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="text-gray-200 mb-1 font-medium">Daily Calories</label>
            <input
              type="number"
              value={calories}
              onChange={(e) => setCalories(Number(e.target.value))}
              className="p-3 border border-orange-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="2000"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-200 mb-1 font-medium">Protein %</label>
            <input
              type="number"
              value={proteinPerc}
              onChange={(e) => setProteinPerc(Number(e.target.value))}
              className="p-3 border border-orange-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="30"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-200 mb-1 font-medium">Carbs %</label>
            <input
              type="number"
              value={carbsPerc}
              onChange={(e) => setCarbsPerc(Number(e.target.value))}
              className="p-3 border border-orange-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="50"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-200 mb-1 font-medium">Fats %</label>
            <input
              type="number"
              value={fatsPerc}
              onChange={(e) => setFatsPerc(Number(e.target.value))}
              className="p-3 border border-orange-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="20"
            />
          </div>

          <button
            onClick={calculateMacros}
            className="w-full mt-4 bg-orange-500 text-white py-3 rounded-2xl font-semibold shadow-lg hover:scale-105 hover:brightness-110 transition transform duration-300"
          >
            Calculate
          </button>

          {macros && (
            <div className="mt-6 p-6 bg-orange-50 rounded-xl text-center shadow-inner">
              <p className="text-lg font-medium text-orange-600 mb-2">Your Macros:</p>
              <p className="text-md font-semibold text-gray-700">Protein: {macros.protein} g</p>
              <p className="text-md font-semibold text-gray-700">Carbs: {macros.carbs} g</p>
              <p className="text-md font-semibold text-gray-700">Fats: {macros.fats} g</p>
              <p className="text-sm text-gray-500 mt-2">
                Adjust percentages based on your diet plan.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
