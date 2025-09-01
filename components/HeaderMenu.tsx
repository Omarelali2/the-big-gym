"use client"
import { headerData } from "@/constants/data"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

const HeaderMenu = () => {
  const pathname = usePathname()
  return (
    <div className='hidden md:inline-flex w-1/2  items-center justify-between gap-2 text-sm capitalize font-semibold text-lightColor'>
      
      {headerData.map(item => (
        <Link
          key={item?.title}
          href={item?.href}
          className={`hover:text-red-500 text-white duration-500 relative group ${
            pathname === item?.href && "text-red-500"
          }`}
        >
          {item.title}
          <span
            className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5 duration-300 bg-red-500 group-hover:w-1/2  group-hover:left-0 ${
              pathname === item?.href && "w-1/2"
            }`}
          />
          <span
            className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5 duration-300 bg-red-500 group-hover:w-1/2  group-hover:right-0 ${
              pathname === item?.href && "w-1/2"
            }`}
          />
        </Link>
      ))}
    </div>
  )
}

export default HeaderMenu
