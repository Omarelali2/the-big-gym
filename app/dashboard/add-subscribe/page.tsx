"use client"

import { useState } from "react"
import { addPackageAction } from "@/lib/action"
import toast from "react-hot-toast"

export default function AddPackage() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [features, setFeatures] = useState<string[]>([])
  const [featureInput, setFeatureInput] = useState("")
  const [monthlyPrice, setMonthlyPrice] = useState<number>(0)
  const [annualPrice, setAnnualPrice] = useState<number>(0)
  const [currency, setCurrency] = useState("USD")
  const [isPayment, setIsPayment] = useState(false)
  const [discount, setDiscount] = useState<number>(0)
  const [offerActive, setOfferActive] = useState(false)

  const handleAddFeature = () => {
    if (featureInput.trim() !== "") {
      setFeatures([...features, featureInput.trim()])
      setFeatureInput("")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await addPackageAction({
      name,
      description,
      features,
      monthlyPrice,
      annualPrice,
      currency,
      isPayment,
      discount,
      offerActive,
    })

    if (res.success) {
      toast.success("Package added successfully ")
      setName("")
      setDescription("")
      setFeatures([])
      setMonthlyPrice(0)
      setAnnualPrice(0)
      setDiscount(0)
      setOfferActive(false)
      setIsPayment(false)
    } else {
      toast.error(`Error: ${res.error}`)
    }
  }

  return (
    <div className=' flex items-center justify-center p-5'>
      <div className='bg-gray-800 text-white rounded-2xl shadow-2xl p-8 w-full max-w-3xl overflow-y-auto max-h-[86vh]'>
        <h1 className='text-3xl font-bold mb-6 text-center text-red-500'>
          Add New Package
        </h1>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input
            type='text'
            placeholder='Package Name'
            value={name}
            onChange={e => setName(e.target.value)}
            className='border border-gray-600 rounded-lg p-3 bg-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500'
            required
          />

          <textarea
            placeholder='Description'
            value={description}
            onChange={e => setDescription(e.target.value)}
            className='border border-gray-600 rounded-lg p-3 bg-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500'
          />

          <div className='flex gap-2'>
            <input
              type='text'
              placeholder='Add Feature'
              value={featureInput}
              onChange={e => setFeatureInput(e.target.value)}
              className='border border-gray-600 rounded-lg p-3 flex-1 bg-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500'
            />
            <button
              type='button'
              onClick={handleAddFeature}
              className='bg-red-500 hover:bg-red-600 transition-colors px-4 rounded-lg'
            >
              Add
            </button>
          </div>
          <ul className='text-gray-300 mb-2'>
            {features.map((f, i) => (
              <li key={i}>• {f}</li>
            ))}
          </ul>

          <input
            type='number'
            placeholder='Monthly Price'
            value={monthlyPrice}
            onChange={e =>
              setMonthlyPrice(
                e.target.value === "" ? 0 : parseFloat(e.target.value)
              )
            }
            className='border border-gray-600 rounded-lg p-3 bg-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500'
            required
          />

          <input
            type='number'
            placeholder='Annual Price'
            value={annualPrice}
            onChange={e => setAnnualPrice(parseFloat(e.target.value))}
            className='border border-gray-600 rounded-lg p-3 bg-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500'
            required
          />

          <input
            type='text'
            placeholder='Currency'
            value={currency}
            onChange={e => setCurrency(e.target.value)}
            className='border border-gray-600 rounded-lg p-3 bg-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500'
          />

          <div className='flex items-center gap-2'>
            <input
              type='checkbox'
              checked={isPayment}
              onChange={e => setIsPayment(e.target.checked)}
              className='accent-red-500'
            />
            <label>Disable Payment (isPayment)</label>
          </div>

          <input
            type='number'
            placeholder='Discount %'
            value={discount}
            onChange={e => setDiscount(parseFloat(e.target.value))}
            className='border border-gray-600 rounded-lg p-3 bg-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500'
          />

          <div className='flex items-center gap-2'>
            <input
              type='checkbox'
              checked={offerActive}
              onChange={e => setOfferActive(e.target.checked)}
              className='accent-red-500'
            />
            <label>Offer Active</label>
          </div>

          <button
            type='submit'
            className='bg-red-500 hover:bg-red-600 transition-colors px-6 py-3 rounded-xl font-bold mt-2'
          >
            Add Package
          </button>
        </form>
      </div>
    </div>
  )
}
