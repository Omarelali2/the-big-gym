import PackagesPage from "@/components/PackagesPage"
import { getAllPackages } from "@/lib/data"

export default async function PackagesPageWrapper() {
  const packages = await getAllPackages()
  return <PackagesPage initialPackages={packages} />
}
