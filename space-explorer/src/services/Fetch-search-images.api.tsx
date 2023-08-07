import axios, { AxiosError } from "axios";

export const imagesApi = axios.create({ baseURL: 'https://images-api.nasa.gov/' });

export const fetchImages = async (signal: AbortSignal, controller: AbortController, page: number, queryString: string) => {
    try {
        const res = await imagesApi.get(`search?q=${queryString}&media_type=image&page_size=20&page=${page}`, { signal: signal });
        if (res.status === 200) {
            return await res.data.collection.items;
        }
    } catch (error: unknown) {
        if (controller.signal.aborted) { return }
        if (typeof error === "string") {
            return error.toUpperCase()
        }
        if (error instanceof AxiosError) {
            return `We ran into a ${error.message}, please try again later!`
        }
        if (error instanceof Error) {
            return error.message;
        }
    }
};

