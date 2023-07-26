import axios from "axios";


export const fetchImageOfTheDay = async (signal: AbortSignal, controller: AbortController) => {

    try {
        const res = axios.create({ baseURL: 'https://mb-cook-server.vercel.app/nasa' })
            .get('/pod', { signal: signal });
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