import PackagesPage from "@/components/PackagesPage"
import { getAllPackages } from "@/lib/data"

export default async function PackagesPageWrapper() {
  const packages = (await getAllPackages()).map(p => ({
    ...p,
    description: p.description ?? undefined, // تحويل null لـ undefined
    discount: p.discount ?? undefined,       // تحويل null لـ undefined
  }))

  return <PackagesPage initialPackages={packages} />
}
