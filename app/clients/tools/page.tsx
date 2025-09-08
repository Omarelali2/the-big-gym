import Link from "next/link"
import { db } from "@/lib/db"
import { currentUser } from "@clerk/nextjs/server"
import Image from "next/image"

const tools = [
  {
    title: "Calories Calculator",
    description:
      "Calculate your daily calorie needs based on weight, height, age, and activity level.",
    link: "/clients/tools/calories",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.2jrjbYAFSnEXstJa3AwlPAHaE8?r=0&cb=thfc1&rs=1&pid=ImgDetMain&o=7&rm=3",
    allowedPackages: ["Standard", "Premium"],
  },
  {
    title: "BMI Calculator",
    description:
      "Check your Body Mass Index (BMI) to know if you’re underweight, normal, or overweight.",
    link: "/clients/tools/bmi",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.g_8EEYeQNSSnguP_BoVEQQAAAA?r=0&cb=thfc1&rs=1&pid=ImgDetMain&o=7&rm=3",
    allowedPackages: ["Standard", "Premium"],
  },
  {
    title: "Body Fat Calculator",
    description:
      "Estimate your body fat percentage based on weight and measurements.",
    link: "/clients/tools/bodyfat",
    image:
      "https://images.unsplash.com/photo-1634463278803-f9f71890e67d?w=600&auto=format&fit=crop&q=60",
    allowedPackages: ["Premium"],
  },
  {
    title: "Protein Intake Calculator",
    description:
      "Find out how much protein you need daily based on your fitness goals.",
    link: "/clients/tools/protein",
    image:
      "https://images.unsplash.com/photo-1693996045899-7cf0ac0229c7?w=600&auto=format&fit=crop&q=60",
    allowedPackages: ["Premium"],
  },
  {
    title: "Water Intake Calculator",
    description: "Calculate how much water you should drink every day.",
    link: "/clients/tools/water",
    image:
      "https://plus.unsplash.com/premium_photo-1689298468802-5c2cfb626971?w=600&auto=format&fit=crop&q=60",
    allowedPackages: ["Standard", "Premium"],
  },
  {
    title: "Macro Calculator",
    description:
      "Split your calories into carbs, protein, and fats depending on your diet.",
    link: "/clients/tools/macro",
    image:
      "https://totalshape.com/wp-content/uploads/2023/07/PROTEIN-CALCULATOR-Featured-Image.webp",
    allowedPackages: ["Premium"],
  },
]

export default async function ToolsPage() {
  const user = await currentUser()

  if (!user) {
    return (
      <div className='flex flex-col items-center justify-center h-[60vh] text-center'>
        <h2 className='text-3xl md:text-4xl font-extrabold text-red-500 mb-4'>
          ⚠️ Access Denied
        </h2>
        <p className='text-gray-300 text-lg mb-6'>
          You need to log in to view our tools.
        </p>
      </div>
    )
  }

  const dbUser = await db.user.findUnique({
    where: { clerkUserId: user.id },
    include: { selectedPackage: true },
  })

  if (!dbUser) {
    return (
      <div className='flex flex-col items-center justify-center h-[60vh] text-center'>
        <h2 className='text-3xl md:text-4xl font-extrabold text-red-500 mb-4'>
          ⚠️ Access Denied
        </h2>
        <p className='text-gray-300 text-lg mb-6'>
          User not found in database.
        </p>
      </div>
    )
  }

  const isAdmin = dbUser.isAdmin ?? false
  console.log("dbUser:", dbUser)
  console.log("isAdmin:", isAdmin)

  const userPackageName = dbUser.selectedPackage?.name ?? null

  if (!userPackageName && !isAdmin) {
    return (
      <div className='flex flex-col items-center justify-center h-[60vh] text-center'>
        <h2 className='text-3xl md:text-4xl font-extrabold text-red-500 mb-4'>
          ⚠️ Access Denied
        </h2>
        <p className='text-gray-300 text-lg mb-6'>
          You need a package to access these tools.
        </p>
      </div>
    )
  }

  const availableTools = isAdmin
    ? tools
    : tools.filter(tool => tool.allowedPackages.includes(userPackageName!))

  return (
    <div className='max-w-7xl mx-auto px-6 py-12'>
      <h1
        className='text-5xl sm:text-6xl font-extrabold text-center bg-clip-text text-transparent 
                     bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 
                     tracking-wide drop-shadow-lg mt-5 mb-10'
      >
        Our Fitness Tools
      </h1>

      {availableTools.length === 0 ? (
        <p className='text-gray-400 text-center'>
          No tools available for your package.
        </p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {availableTools.map((tool, idx) => (
            <div
              key={idx}
              className='group relative bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-500 overflow-hidden flex flex-col'
            >
              <div className='w-full h-48 relative overflow-hidden'>
                <Image
                  unoptimized
                  width={48}
                  height={48}
                  src={tool.image}
                  alt={tool.title}
                  className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                />
              </div>

              <div className='p-6 flex-1 flex flex-col justify-between'>
                <div>
                  <h2 className='text-2xl font-semibold mb-2 text-white'>
                    {tool.title}
                  </h2>
                  <p className='text-gray-400 mb-4'>{tool.description}</p>
                </div>

                <Link
                  href={tool.link}
                  className='mt-4 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl text-center font-medium shadow-md hover:scale-105 transform transition duration-300'
                >
                  Try Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
