import PackagesPage from "@/components/PackagesPage";
import { getAllPackages } from "@/lib/data";

export const dynamic = "force-dynamic"; // <- لازم

export default async function PackagesPageWrapper() {
  const packages = (await getAllPackages()).map(p => ({
    ...p,
    description: p.description ?? undefined,
    discount: p.discount ?? undefined,
  }));

  return <PackagesPage initialPackages={packages} />;
}
