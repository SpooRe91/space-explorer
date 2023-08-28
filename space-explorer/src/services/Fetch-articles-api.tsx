import axios, { AxiosError } from "axios";


export const fetchArticles = async (signal: AbortSignal, controller: AbortController, searchValue: string) => {

    try {
        const res = axios.create({
            baseURL: 'https://mb-cook-server.vercel.app/nasa',
            params: { query: searchValue }
        })
            .get('/articles', { signal: signal });
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