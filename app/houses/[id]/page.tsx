import { getHouseByID } from "@/lib/api";
import { notFound } from "next/navigation"

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

    return <div>Detalle de casa: {house?.name}</div>;
};

export default HouseDetailPage;

