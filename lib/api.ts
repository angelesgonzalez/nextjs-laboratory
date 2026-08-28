import { House } from './types';

export async function getHouses(): Promise<House[]> {

    const res = await fetch(`${process.env.API_URL}/api/houses`, {
        next: { revalidate: 3600 },
    });

    if (!res.ok) {
        throw new Error(`There's been an error while fetching the houses, check the api.`)
    }

    return res.json();

}

export async function getHouseByID(id: string): Promise<House | undefined> {
    const res = await fetch(`${process.env.API_URL}/api/houses/${id}`, {
        next: { revalidate: 3600 },
    });

    if (!res.ok) {
        throw new Error(`There's been an error while fetching the house, check the api.`)
    }

    const text = await res.text();
    if (!text) {
        return undefined;
    }

    return JSON.parse(text);
}