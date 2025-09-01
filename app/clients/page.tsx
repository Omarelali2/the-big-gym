import { currentUser } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import Container from "@/components/Container"
import Content from "@/components/Content"
import HomeBanner from "@/components/HomeBanner"
import OurFitness from "@/components/OurFitness"
import PlansSection from "@/components/PlansSection"
import Service from "@/components/Service"
import Testimonials from "@/components/Testimonials"
import Coaching from "../../components/Coaching"
import BlogSection from "@/components/BlogSection"
import { AccordionDemo } from "@/components/AccordionDemo"
import { createCheckoutSession } from "@/lib/stripe"

const Home = async () => {
  const user = await currentUser()
  if (!user) {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-red-500 mb-4">
          ⚠️ Access Denied
        </h2>
        <p className="text-gray-300 text-lg mb-6">
          You need to log in to view our exclusive plans.
        </p>
        
      </div>
    </Container>
  )
}


  const dbUser = await db.user.findUnique({
    where: { clerkUserId: user.id },
  })

  if (!dbUser) throw new Error("User not found")

  const allPackages = await db.package.findMany()

  const packagesToShow = dbUser.subscriptionActive ? [] : allPackages

  return (
    <Container className="mt-10">
      <HomeBanner />
      <Content />
      <Service />
      <PlansSection
        packages={packagesToShow}
        createCheckoutSession={createCheckoutSession}
      />
      <OurFitness />
      <Testimonials />
      <Coaching />
      <BlogSection />
      <AccordionDemo />
    </Container>
  )
}

export default Home
