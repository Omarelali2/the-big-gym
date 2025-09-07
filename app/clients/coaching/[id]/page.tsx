// app/clients/coaching/[id]/page.tsx
import React from "react";
import Link from "next/link";
import { getCoachById } from "@/lib/data";
import Image from "next/image";

interface Workout {
  id: string;
  name: string;
}

interface Coach {
  id: string;
  name: string;
  speciality: string;
  degree: string;
  experience: string;
  fees: string;
  about: string;
  imageUrl?: string | null;
  workout?: Workout | null;
}

interface CoachResult {
  success: boolean;
  coach: Coach | null;
}

// PageProps لازم تكون بالشكل التالي


export default async function CoachDetail({ params }: { params: { id: string } }) {
  
  const { id } = params;
  const result: CoachResult = await getCoachById(id);

  const coach: Coach | null = result.coach
    ? { ...result.coach, fees: result.coach.fees.toString() }
    : null;

  if (!result.success || !coach) {
    return (
      <p className="p-10 text-gray-400 text-center text-xl">
        Coach not found.
      </p>
    );
  }

  return (
    <div className="p-10 max-w-7xl mx-auto bg-gray-800 text-white rounded-3xl shadow-2xl flex flex-col md:flex-row gap-12 mt-20 transition-all duration-500 hover:shadow-3xl">
      {/* صورة الكوتش */}
      <div className="flex-shrink-0 relative group">
        {coach.imageUrl ? (
          <Image
            src={coach.imageUrl}
            width={320}
            height={320}
            alt={coach.name}
            unoptimized
            className="w-72 h-72 md:w-80 md:h-80 rounded-full object-cover border-4 border-orange-400 shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1"
          />
        ) : (
          <div className="w-72 h-72 md:w-80 md:h-80 bg-red-700 rounded-full flex items-center justify-center text-gray-200 text-lg font-semibold border-4 border-orange-400 shadow-2xl">
            No Image
          </div>
        )}
      </div>

      {/* معلومات الكوتش */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h1 className="text-6xl font-extrabold mb-4 drop-shadow-lg">{coach.name}</h1>
          <p className="text-3xl text-orange-200 mb-1">{coach.speciality}</p>
          <p className="text-3xl text-orange-200 mb-1">{coach.degree}</p>
          <p className="text-orange-100 text-xl mb-2">Experience: {coach.experience}</p>
          {coach.workout && (
            <p className="text-orange-300 text-xl mb-2">Workout: {coach.workout.name}</p>
          )}
          <p className="text-yellow-400 text-4xl font-bold mb-4 drop-shadow-md">Fees: ${coach.fees}</p>
          <p className="text-orange-100 text-lg leading-relaxed mb-6">{coach.about}</p>
        </div>

        {/* أزرار العودة والدردشة */}
        <div className="flex flex-col md:flex-row gap-6 mt-6">
          <Link
            href="/clients/coaching"
            className="inline-block px-8 py-4 text-xl font-bold text-red-800 bg-orange-400 rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-lg transform hover:-translate-y-1 hover:scale-105"
          >
            ← Back to Coaches
          </Link>

          <Link
            href={`/clients/chat/${coach.id}`}
            className="relative inline-block px-4 py-4 text-2xl font-bold bg-red-600 text-white rounded-full"
          >
            💬 Chat a message
          </Link>
        </div>
      </div>
    </div>
  );
}
