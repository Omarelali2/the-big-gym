"use client"

import React, { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"

export interface PackageType {
  id: number
  name: string
  description?: string | null
  features: string[]
  monthlyPrice: number
  annualPrice: number
  currency: string
  isPayment: boolean
  discount?: number | null
  offerActive: boolean
}

interface PlansSectionProps {
  packages: PackageType[]
  createCheckoutSession: (
    packageId: number,
    plan: "monthly" | "annually",
    userId: string
  ) => Promise<string | null>
}

const PlansSection: React.FC<PlansSectionProps> = ({
  packages,
  createCheckoutSession,
}) => {
  const { user } = useUser()
  const [planType, setPlanType] = useState<"monthly" | "annually">("monthly")

  const handleCheckout = async (pkgId: number) => {
    if (!user) return alert("⚠️ Please log in first")
    const url = await createCheckoutSession(pkgId, planType, user.id)
    if (!url) return alert("❌ Failed to start checkout")
    window.location.href = url
  }
  const [subscriptionActive, setSubscriptionActive] = useState<boolean>(false);

useEffect(() => {
  async function fetchUserSubscription() {
    if (!user) return;
    const res = await fetch(`/api/users/${user.id}`);
    const data = await res.json();
    setSubscriptionActive(data.subscriptionActive);
  }
  fetchUserSubscription();
}, [user]);


  return (
    <section className='px-5 md:px-24 py-14 text-white relative'>
      {!subscriptionActive && (
    <>
      <div className='text-center mb-12'>
        <h2 className='text-3xl md:text-4xl font-extrabold mb-3'>
          Choose Your Plan
        </h2>
        <p className='text-gray-400 max-w-2xl mx-auto'>
          Whether you prefer monthly or yearly billing, we’ve got the right
          plan for you.
        </p>
      </div>

      <div className='flex items-center justify-center gap-2 bg-gray-800 rounded-full p-1 w-max mx-auto shadow-md'>
        <button
          className={`px-5 py-2 rounded-full transition-colors font-semibold ${
            planType === "monthly"
              ? "bg-red-500 text-white"
              : "text-red-500"
          }`}
          onClick={() => setPlanType("monthly")}
        >
          Monthly
        </button>
        <button
          className={`px-5 py-2 rounded-full transition-colors font-semibold ${
            planType === "annually"
              ? "bg-red-500 text-white"
              : "text-red-500"
          }`}
          onClick={() => setPlanType("annually")}
        >
          Annually
        </button>
      </div>
    </>
  )}

      <div className='mt-14 grid grid-cols-1 md:grid-cols-3 gap-8'>
        {packages.map(pkg => (
          <div
            key={pkg.id}
            className={`flex flex-col p-8 rounded-2xl border ${
              pkg.offerActive ? "border-red-500" : "border-orange-500"
            } bg-gray-900 shadow-lg hover:shadow-xl transition-transform transform hover:scale-105`}
          >
            <h4 className='text-lg font-semibold text-red-400 mb-1 text-center'>
              Package
            </h4>
            <h3 className='text-2xl font-bold mb-4 text-center'>{pkg.name}</h3>

            {pkg.description && (
              <>
                <h4 className='text-lg font-semibold text-red-400 mb-2 text-center'>
                  Description
                </h4>
                <p className='text-gray-400 text-center mb-6'>
                  {pkg.description}
                </p>
              </>
            )}

            <h4 className='text-lg font-semibold text-red-400 mb-2 text-center'>
              Features
            </h4>
            <ul className='text-gray-300 mb-6 list-disc list-inside space-y-2 text-left'>
              {pkg.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>

            <div className='text-center mb-6'>
              <span className='text-3xl font-extrabold'>
                {planType === "monthly" ? pkg.monthlyPrice : pkg.annualPrice}{" "}
                {pkg.currency}
              </span>
              <span className='block text-sm font-medium text-gray-400'>
                / {planType === "monthly" ? "month" : "year"}
              </span>
              {pkg.discount && (
                <span className='block text-green-400 text-sm font-semibold mt-1'>
                  {pkg.discount}% off
                </span>
              )}
            </div>

            <button
              onClick={() => handleCheckout(pkg.id)}
              className={`mt-auto py-3 rounded-full text-lg font-semibold ${
                pkg.offerActive
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-orange-500 hover:bg-orange-600"
              } transition-colors shadow-md`}
            >
              Subscribe Now
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default PlansSection
