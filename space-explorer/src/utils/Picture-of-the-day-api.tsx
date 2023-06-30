import axios from "axios";


export const fetchImageOfTheDay = async (signal: AbortSignal, controller: AbortController) => {

    try {
        const res = await axios.create({ baseURL: 'https://api.nasa.gov/' })
            .get(`planetary/apod?api_key=${import.meta.env.VITE_NASA_API_KEY}`, { signal: signal });
        if (res.status === 200) {
            return res.data
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