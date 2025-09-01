"use client";

import React, { useEffect, useState } from "react";

const CountUp = ({ end }: { end: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500; 
    const increment = end / (duration / 30); 
    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(counter);
      }
      setCount(Math.floor(start));
    }, 30);
    return () => clearInterval(counter);
  }, [end]);

  return <span className="text-red-500 mr-2">{count}</span>;
};

const Content = () => {
  return (
    <div className='flex flex-col mt-20 md:flex-row items-center justify-between gap-8 text-white px-5 md:px-24 py-10 rounded-lg'>
      <div className='flex flex-col items-center md:items-start text-center md:text-left gap-2'>
        <h1 className='text-1xl font-bold'>
          <CountUp end={96} />% Client Satisfaction
        </h1>
        <p className='text-gray-400 text-sm'>
          Our members love their results and experience
        </p>
      </div>

      <span className='block w-1.5 md:h-15 bg-gradient-to-b from-red-500 to-orange-500 rounded-md mr-2'></span>

      <div className='flex flex-col rounded-3xl items-center md:items-start text-center md:text-left gap-2'>
        <h1 className='text-1xl font-bold'>
          <CountUp end={5} /> Years Experience
        </h1>
        <p className='text-gray-400 text-sm'>
          Trust in our proven track record of transforming
        </p>
      </div>

      <span className='block w-1.5 md:h-15 bg-gradient-to-b from-red-500 to-orange-500 rounded-md mr-2'></span>

      <div className='flex flex-col items-center md:items-start text-center md:text-left gap-2'>
        <h1 className='text-1xl font-bold'>
          <CountUp end={800} /> Active Members
        </h1>
        <p className='text-gray-400 text-sm'>Join our thriving fitness community</p>
      </div>

      <span className='block w-1.5 md:h-15 bg-gradient-to-b from-red-500 to-orange-500 rounded-md mr-2'></span>

      <div className='flex flex-col items-center md:items-start text-center md:text-left gap-2'>
        <h1 className='text-1xl font-bold'>
          <span className="text-red-600"><CountUp end={24} />/ 7</span>  Support Available
        </h1>
        <p className='text-gray-400 text-sm'>Expert assistance whenever you need it</p>
      </div>
    </div>
  );
};

export default Content;
