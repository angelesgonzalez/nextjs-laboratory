import { House, Review } from "./types";

export interface HouseCardVM {
    id: string;
    title: string;
    location: string;
    price: string;
    imageUrl: string;
}

export interface HouseDetailVM {
    id: string;
    title: string;
    price: string;
    description: string;
    address: string;
    bedrooms: number;
    beds: number;
    bathrooms: number;
    imageUrl: string;
    amenities: string[];
    reviews: Review[];
}

export const toHouseCardVM = (house: House): HouseCardVM => {
    return {
        id: house.id,
        title: house.name,
        location: `${house.city}, ${house.country}`,
        price: `${house.price}€/noche`,
        imageUrl: `${process.env.NEXT_PUBLIC_API_URL}${house.image}`,
    };
};

export const toHouseDetailVM = (house: House): HouseDetailVM => {
    return {
        id: house.id,
        title: house.name,
        price: `${house.price}€/noche`,
        description: house.description,
        address: `${house.address}, ${house.city}, ${house.country}`,
        bedrooms: house.bedrooms,
        beds: house.beds,
        bathrooms: house.bathrooms,
        imageUrl: `${process.env.NEXT_PUBLIC_API_URL}${house.image}`,
        amenities: house.amenities,
        reviews: house.reviews,
    };
};