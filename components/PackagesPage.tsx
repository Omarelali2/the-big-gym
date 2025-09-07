"use client"

import { deletePackageAction } from "@/lib/data"
import { useState } from "react"

interface Package {
  id: number
  name: string
  description?: string
  features: string[]
  monthlyPrice: number
  annualPrice: number
  currency: string
  discount?: number
  offerActive: boolean
}

interface Props {
  initialPackages: Package[]
}

export default function PackagesPage({ initialPackages }: Props) {
  const [packages, setPackages] = useState<Package[]>(initialPackages)

  const handleDelete = async (id: number) => {
    try {
      const res = await deletePackageAction(id)
      if (res.success) {
        setPackages((prev) => prev.filter((pkg) => pkg.id !== id))
      } else {
        alert(`Error: ${res.error}`)
      }
    } catch (error) {
      alert(`Unexpected error: ${(error as Error).message}`)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl text-white font-bold mb-4">All Packages</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Features</th>
              <th className="px-4 py-2">Monthly Price</th>
              <th className="px-4 py-2">Annual Price</th>
              <th className="px-4 py-2">Currency</th>
              <th className="px-4 py-2">Discount</th>
              <th className="px-4 py-2">Offer Active</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {packages.map((pkg) => (
              <tr key={pkg.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-2 font-medium">{pkg.name}</td>
                <td className="px-4 py-2">{pkg.description || "-"}</td>
                <td className="px-4 py-2">{pkg.features.length ? pkg.features.join(", ") : "-"}</td>
                <td className="px-4 py-2">${pkg.monthlyPrice.toFixed(2)}</td>
                <td className="px-4 py-2">${pkg.annualPrice.toFixed(2)}</td>
                <td className="px-4 py-2">{pkg.currency}</td>
                <td className="px-4 py-2">{pkg.discount ? pkg.discount + "%" : "-"}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      pkg.offerActive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                    }`}
                  >
                    {pkg.offerActive ? "Yes" : "No"}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(pkg.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
