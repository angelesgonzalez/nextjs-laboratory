import Image from "next/image";
import Link from "next/link";
import { HouseCardVM } from "@/lib/mappers";

export function HouseCard({ house }: { house: HouseCardVM }) {
    return (
        <Link href={`/houses/${house.id}`} className="group block">
            <div className="aspect-[4/3] overflow-hidden bg-zinc-200">
                <Image
                    src={house.imageUrl}
                    alt={house.title}
                    width={600}
                    height={450}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            <div className="mt-3 flex items-start justify-between">
                <div>
                    <h3 className="text-lg font-medium">
                        {house.title}{" "}
                        <span className="inline-block transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                            ↗
                        </span>
                    </h3>
                    <p className="mt-1 font-mono text-xs uppercase tracking-widest text-zinc-500">
                        {house.location}
                    </p>
                </div>
                <p className="font-mono text-sm text-zinc-700">{house.price}</p>
            </div>
        </Link>
    );
}