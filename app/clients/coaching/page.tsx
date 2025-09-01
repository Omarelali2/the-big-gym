import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllCoaches } from "@/lib/data";

type Coach = {
  id: string;
  name: string;
  email: string;
  imageUrl?: string | null;
  speciality: string;
  degree: string;
  experience: string;
  about: string;
  fees: string;
  workout?: { id: string; name: string } | null;
};

export default async function CoachesPage() {
  const coaches: Coach[] = await getAllCoaches();

  if (coaches.length === 0)
    return <p className="text-gray-400 p-6">No coaches found.</p>;

  return (
    <div className="p-6 grid mt-20 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {coaches.map((coach) => (
        <Link
          key={coach.id}
          href={`/clients/coaching/${coach.id}`}
          className="bg-gray-800 p-4 rounded-2xl border-2 border-red-700 shadow-lg flex flex-col items-center text-white hover:shadow-2xl transition transform hover:-translate-y-1"
        >
          {coach.imageUrl ? (
            <Image
              src={coach.imageUrl}
              alt={coach.name}
              width={100}
              height={100}
              className="rounded-full mb-3 object-cover"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-600 rounded-full mb-3 flex items-center justify-center">
              No Image
            </div>
          )}
          <h3 className="text-xl font-bold">{coach.name}</h3>
         
          
          <p className="text-yellow-400 font-semibold mb-2">
            Fees: ${coach.fees}
          </p>
          {coach.workout && (
            <p className="text-gray-400 text-sm">
              Workout: {coach.workout.name}
            </p>
          )}
        </Link>
      ))}
    </div>
  );
}
