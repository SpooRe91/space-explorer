import axios from "axios";


export const fetchImageOfTheDay = async (signal: AbortSignal, controller: AbortController) => {

    try {
        const res = axios.create({ baseURL: 'https://api.nasa.gov/' })
            .get(`planetary/apod?api_key=${import.meta.env.PROD
                ? import.meta.env.NASA_API_KEY
                : import.meta.env.VITE_NASA_API_KEY
                }`, { signal: signal });
        const data = await res;
        if (data.status === 200) {
            return data.data
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