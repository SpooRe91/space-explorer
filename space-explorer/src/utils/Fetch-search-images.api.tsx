import axios from "axios";

export const imagesApi = axios.create({ baseURL: 'https://images-api.nasa.gov/' });

export const fetchImages = async (signal: AbortSignal, controller: AbortController, page: number, queryString: string) => {
    try {
        const res = await imagesApi.get(`search?q=${queryString}&media_type=image&page_size=40&page=${page}`, { signal: signal });
        if (res.status === 200) {
            return await res.data.collection.items;
        }
    } catch (error: unknown) {
        if (typeof error === "string") {
            return error.toUpperCase()
        } else if (error instanceof Error) {
            if (controller.signal.aborted) { return }
            return error.message
        }
    }
};

