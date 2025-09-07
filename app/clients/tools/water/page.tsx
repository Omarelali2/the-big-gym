"use client";

import { useState, useEffect } from "react";
import { Droplet, Activity } from "lucide-react";

export default function WaterCalculator() {
  const [weight, setWeight] = useState<number>(70);
  const [activity, setActivity] = useState<number>(30);
  const [waterIntake, setWaterIntake] = useState<number | null>(null);
  const [progress, setProgress] = useState<number>(0);

  const calculateWater = () => {
    const baseWater = weight * 0.035;
    const activityWater = (activity / 30) * 0.35;
    const total = baseWater + activityWater;
    setWaterIntake(parseFloat(total.toFixed(2)));
  };

  useEffect(() => {
    if (waterIntake !== null) {
      setProgress(Math.min((waterIntake / 4) * 100, 100)); // افتراض 4 لتر كحد أعلى
    }
  }, [waterIntake]);

  return (
    <div className="mt-15 flex items-center justify-center  p-6">
      <div className="w-full bg-gray-800 rounded-3xl shadow-xl p-8 relative overflow-hidden">
        <h1 className="text-3xl font-bold text-center text-red-700 mb-6">
          💧 Daily Water Intake
        </h1>

        <div className="space-y-5">
          <div className="flex flex-col">
            <label className="text-gray-200 mb-1 font-medium">Weight (kg)</label>
            <div className="flex items-center border border-gray-200 rounded-xl p-3 focus-within:ring-2 focus-within:ring-blue-400 transition">
              <Droplet className="w-5 h-5 mr-3 text-red-400" />
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                min={1}
                className="w-full bg-transparent outline-none text-gray-200"
                placeholder="70"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-gray-200 mb-1 font-medium">Physical Activity (minutes/day)</label>
            <div className="flex items-center border border-gray-200 rounded-xl p-3 focus-within:ring-2 focus-within:ring-blue-400 transition">
              <Activity className="w-5 h-5 mr-3 text-red-400" />
              <input
                type="number"
                value={activity}
                onChange={(e) => setActivity(Number(e.target.value))}
                min={0}
                className="w-full bg-transparent outline-none text-gray-200"
                placeholder="30"
              />
            </div>
          </div>

          <button
            onClick={calculateWater}
            className="w-full bg-red-500 text-white py-3 rounded-2xl font-semibold shadow-lg hover:scale-105 hover:brightness-110 transition transform duration-300"
          >
            Calculate
          </button>

          {waterIntake !== null && (
            <div className="mt-6 p-6 bg-blue-100 rounded-xl text-center shadow-inner">
              <p className="text-lg font-medium text-red-700 mb-2">Your Daily Water Intake:</p>
              <p className="text-3xl font-bold text-red-500">{waterIntake} L</p>

              <div className="w-full bg-blue-200 rounded-full h-4 mt-4 overflow-hidden">
                <div
                  className="bg-red-500 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              <p className="text-sm text-gray-600 mt-2">
                Aim to drink at least 2-4 liters daily depending on activity.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
