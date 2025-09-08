import { cn } from "@/lib/utils"
import Link from "next/link"
import React from "react"

interface LogoProps {
  className?: string
  spanDesign?: string
}
const Logo1: React.FC<LogoProps> = ({ className, spanDesign }) => {
  return (
    <div className='flex gap-8 '>
      <Link href={"/clients"} className='block  md:hidden '>
        <h1
          className={cn(
            "text-3xl text-white duration-300 hover:text-red-400 font-black tracking-wider uppercase group font-sans",
            className
          )}
        >
          Power{" "}
          <span
            className={cn(
              "text-red-500 duration-200 group-hover:text-red-900",
              spanDesign
            )}
          >
            Fit
          </span>
        </h1>
      </Link>
    </div>
  )
}

export default Logo1
