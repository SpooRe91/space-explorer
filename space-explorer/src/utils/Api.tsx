import axios from "axios";

export const imagesApi = axios.create({ baseURL: 'https://images-api.nasa.gov/' });

export const fetchImages = async () => {
    try {
        const res = await imagesApi.get(`search?q=solar%20system%20planets&media_type=image`);
        if (res.status === 200) {
            return await res.data.collection.items;
        }
    } catch (error: unknown) {
        if (typeof error === "string") {
            return error.toUpperCase()
        } else if (error instanceof Error) {
            return error.message
        }
    }
};