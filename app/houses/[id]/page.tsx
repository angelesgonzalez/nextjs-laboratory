import { notFound } from "next/navigation"
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
            <div>
                <h1>{detail.title}</h1>
                <p>{detail.price}</p>
            </div>
        </article>



    )
};

export default HouseDetailPage;

