import { notFound } from "next/navigation"
import Image from "next/image";
import { getHouseByID } from "@/lib/api";
import { toHouseDetailVM } from "@/lib/mappers";



const HouseDetailPage = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;
    const house = await getHouseByID(id);

    if (!house) {
        notFound();
    }

    const detail = toHouseDetailVM(house);


    return (
        <article>
            <div className="flex items-baseline justify-between">
                <h1 className="text-2xl font-medium">{detail.title}</h1>
                <p className="font-mono text-sm text-zinc-700">{detail.price}</p>
            </div>

            <div className="mt-6 aspect-[16/9] overflow-hidden bg-zinc-200">
                <Image
                    src={detail.imageUrl}
                    alt={detail.title}
                    width={1200}
                    height={675}
                    className="h-full w-full object-cover"
                    priority
                />
            </div>
        </article>
    );
};

export default HouseDetailPage;

