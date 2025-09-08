"use client"
import {
  Facebook,
  Instagram,
  X,
  Youtube,
  Phone,
  Mail,
  MapPin,
} from "lucide-react"
import Logo from "./Logo"

export default function Footer() {
  return (
    <footer className=' text-gray-300 py-15 '>
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row gap-8 px-6'>
        <div className='group w-full md:w-2/5'>
          <Logo />
          <p className='text-sm mt-3 w-80 leading-relaxed group-hover:text-white transition-colors duration-300'>
            Transform Your Body with FitMaker, Your Trusted Partner in Fitness.
            With Over{" "}
            <span className='text-red-500 font-semibold'>5 Years</span>
            of Experience, We Offer Expert Coaching, Tailored Workout Plans, and
            Comprehensive Nutritional Guidance.
            <span className='text-orange-500 cursor-pointer hover:underline'>
              {" "}
              Join Our Community
            </span>
          </p>
          <div className='flex space-x-4 mt-4'>
            {[Facebook, Instagram, X, Youtube].map((Icon, i) => (
              <Icon
                key={i}
                className='w-5 h-5 cursor-pointer text-gray-300 hover:text-white hover:scale-125 transition-transform duration-300'
              />
            ))}
          </div>
        </div>

        <div className='flex flex-wrap w-full gap-6'>
          <div className='flex gap-3.5 w-50'>
            <div className='flex-1 min-w-[150px]'>
              <h3 className='text-red-500 font-semibold mb-3 hover:text-orange-500 transition-colors duration-300 cursor-pointer'>
                Company
              </h3>
              <ul className='space-y-2 text-sm'>
                {[
                  "About Us",
                  "Our Services",
                  "Careers",
                  "Blog",
                  "Testimonial",
                  "Contact Us",
                ].map((item, i) => (
                  <li
                    key={i}
                    className='hover:text-white hover:translate-x-1 transition-all duration-300 cursor-pointer'
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div className='flex-1 min-w-[150px]'>
              <h3 className='text-red-500 font-semibold mb-3 hover:text-orange-500 transition-colors duration-300 cursor-pointer'>
                Resources
              </h3>
              <ul className='space-y-2 text-sm'>
                {[
                  "Fitness Tools",
                  "Workout Videos",
                  "Nutrition Guides",
                  "FAQ",
                  "Success Stories",
                  "Membership",
                ].map((item, i) => (
                  <li
                    key={i}
                    className='hover:text-white hover:translate-x-1 transition-all duration-300 cursor-pointer'
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex gap-3.5">
            <div className='flex-1 min-w-[150px]'>
              <h3 className='text-red-500 font-semibold mb-3 hover:text-orange-500 transition-colors duration-300 cursor-pointer'>
                Programs
              </h3>
              <ul className='space-y-2 text-sm'>
                {[
                  "Weight Loss",
                  "Building Muscles",
                  "Home Workout",
                  "Gym Plan",
                  "Our Plans",
                  "Fitness Group",
                ].map((item, i) => (
                  <li
                    key={i}
                    className='hover:text-white hover:translate-x-1 transition-all duration-300 cursor-pointer'
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className='w-full mt-4'>
              <h3 className='text-orange-500 font-semibold mb-3 hover:text-red-500 transition-colors duration-300 cursor-pointer'>
                Contact Us
              </h3>
              <ul className='space-y-3 text-sm'>
                <li className='flex items-center space-x-2 hover:text-white transition-colors duration-300'>
                  <MapPin className='w-4 h-4 text-orange-500 transition-colors duration-300' />
                  <span>LEB - Akkar-AlDawsa</span>
                </li>
                <li className='flex items-center space-x-2 hover:text-white transition-colors duration-300'>
                  <Phone className='w-4 h-4 text-orange-500 transition-colors duration-300' />
                  <span>+961 70259020</span>
                </li>
                <li className='flex items-center space-x-2 hover:text-white transition-colors duration-300'>
                  <Mail className='w-4 h-4 text-orange-500 transition-colors duration-300' />
                  <span>elaliomar30@Gmail.Com</span>
                </li>
              </ul>
            </div>
          </div>{" "}
        </div>
      </div>
    </footer>
  )
}
