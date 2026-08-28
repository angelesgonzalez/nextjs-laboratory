import { notFound } from "next/navigation"
import Image from "next/image";
import { getHouseByID } from "@/lib/api";
import { toHouseDetailVM } from "@/lib/mappers";
import { ReviewItem } from "@/components/ReviewItem";



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
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-[2fr_1fr]">
                <div>
                    <h2 className="font-mono text-xs uppercase tracking-widest text-zinc-500">
                        Descripción
                    </h2>
                    <p className="mt-2 text-zinc-700">{detail.description}</p>
                </div>

                <div className="space-y-4">
                    <div>
                        <h2 className="font-mono text-xs uppercase tracking-widest text-zinc-500">
                            Dirección
                        </h2>
                        <p className="mt-2 text-zinc-700">{detail.address}</p>
                    </div>
                    <div className="flex gap-6 font-mono text-sm text-zinc-700">
                        <span>{detail.bedrooms} hab.</span>
                        <span>{detail.beds} camas</span>
                        <span>{detail.bathrooms} baños</span>
                    </div>
                </div>
            </div>
            <div className="mt-10">
                <h2 className="font-mono text-xs uppercase tracking-widest text-zinc-500">
                    Reviews
                </h2>
                <div className="mt-4 space-y-4">
                    {detail.reviews.map((review) => (
                        <ReviewItem key={review.id} review={review} />
                    ))}
                </div>
            </div>
        </article>
    );
};

export default HouseDetailPage;

