import { getDashboardStats } from "@/lib/data"
import HomeBannerClient from "./HomeBannerClient"

export default async function HomeBanner() {
  const stats = await getDashboardStats()

  return <HomeBannerClient stats={stats} />
}
