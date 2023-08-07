import axios, { AxiosError } from "axios";


export const fetchImageOfTheDay = async (signal: AbortSignal, controller: AbortController) => {

    try {
        const res = axios.create({ baseURL: 'https://mb-cook-server.vercel.app/nasa' })
            .get('/pod', { signal: signal });
        const data = await res;
        if (data.status === 200) {
            return data.data
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