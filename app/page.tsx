
import { getHouses } from "@/lib/api";
import { toHouseCardVM } from "@/lib/mappers";
import { HouseCard } from "@/components/HouseCard";

export default async function Home() {
  const houses = await getHouses();
  const houseCards = houses.map(toHouseCardVM);

  return (
    <div>
      <h1 className="font-mono text-xs uppercase tracking-widest text-zinc-500">
        {houses.length} casas rurales
      </h1>
      <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {houseCards.map((house) => (
          <HouseCard key={house.id} house={house} />
        ))}
      </div>
    </div>
  );
}