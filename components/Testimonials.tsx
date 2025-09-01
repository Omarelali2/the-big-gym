"use client"
import { useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const Testimonials = () => {
  const slider = useRef<HTMLUListElement | null>(null)
  const [tx, setTx] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)

  const slideForward = () => {
    let newTx = tx > -75 ? tx - 25 : 0
    setTx(newTx)
    if (slider.current) {
      slider.current.style.transform = `translateX(${newTx}%)`
    }
  }

  const slideBackward = () => {
    let newTx = tx < 0 ? tx + 25 : -75
    setTx(newTx)
    if (slider.current) {
      slider.current.style.transform = `translateX(${newTx}%)`
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.clientX)
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return
    setIsDragging(false)

    const endX = e.clientX
    if (startX - endX > 50) {
      slideForward()
    } else if (endX - startX > 50) {
      slideBackward()
    }
  }

  return (
    <div className='relative w-full py-16 text-white '>
      <div className='text-4xl font-extrabold text-center mb-12'>
        <div className='absolute top-1/3 right-0 w-[300px] h-[300px] rounded-full bg-red-600 blur-[180px] opacity-60'></div>
        <div className='absolute top-1/3 left-[-150px] w-[300px] h-[300px] rounded-full bg-orange-500 blur-[180px] opacity-60'></div>
        <h2>
          What Our <span className='text-red-500'>Customers Say</span>
        </h2>
        <p className='text-gray-400 text-lg font-semibold mt-4'>
          At This Part you can See Few Of The Many Positive reviews Of Our
          Customers.
        </p>
      </div>

      <button
        onClick={slideBackward}
        className='absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-red-500 transition p-3 rounded-full shadow-lg z-10'
      >
        <ChevronLeft size={28} />
      </button>
      <button
        onClick={slideForward}
        className='absolute right-4 border-2 border-orange-500 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-red-500 transition p-3 rounded-full shadow-lg z-10'
      >
        <ChevronRight size={28} />
      </button>

      <div
        className='overflow-hidden px-8 cursor-grab active:cursor-grabbing'
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <ul
          ref={slider}
          className='flex transition-transform duration-500 ease-in-out gap-8'
        >
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <li
                key={i}
                className='min-w-[100%] sm:min-w-[50%] lg:min-w-[25%]'
              >
                <div className='bg-zinc-800/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-zinc-700 hover:scale-105 hover:shadow-red-500/20 transition-transform duration-500'>
                  <div className='flex items-center mb-6'>
                    <img
                      src={`https://i.pravatar.cc/100?img=${i + 5}`}
                      alt='user'
                      className='w-16 h-16 rounded-full border-2 border-red-500 object-cover mr-4'
                    />
                    <div>
                      <h3 className='font-bold text-xl'>William Jackson</h3>
                      <span className='text-sm text-gray-400'>
                        Edusity, USA
                      </span>
                    </div>
                  </div>
                  <p className='text-gray-300 leading-relaxed'>
                    Choosing to pursue my degree at{" "}
                    <span className='text-red-500 font-semibold'>Edusity</span>{" "}
                    was one of the best decisions I've ever made. The supportive
                    community, state-of-the-art facilities, and commitment to
                    academic excellence have truly exceeded my expectations.
                  </p>
                </div>
              </li>
            ))}
        </ul>
      </div>

      <div className='flex justify-center mt-8 gap-3'>
        {[0, -25, -50, -75].map((pos, i) => (
          <div
            key={i}
            className={`h-3 w-3 rounded-full ${
              tx === pos ? "bg-red-500 scale-125" : "bg-gray-600"
            } transition-all duration-300`}
          />
        ))}
      </div>
    </div>
  )
}

export default Testimonials
