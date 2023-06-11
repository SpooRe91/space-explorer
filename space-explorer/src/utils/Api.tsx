import axios from "axios";

export const imagesApi = axios.create({ baseURL: 'https://images-api.nasa.gov/' });

export const fetchImages = async (signal: AbortSignal, controller: AbortController) => {
    try {
        const res = await imagesApi.get(`search?q=solar%20system%20planets&media_type=image`, { signal: signal });
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

// export const fetchImageOfTheDay = async (signal: AbortSignal, controller: AbortController) => {
//     try {
//         const res = await imagesApi.get(`search?q=solar%20system%20planets&media_type=image`, { signal: signal });
//         if (res.status === 200) {
//             return await res.data.collection.items;
//         }
//     } catch (error: unknown) {
//         if (typeof error === "string") {
//             return error.toUpperCase()
//         } else if (error instanceof Error) {
//             if (controller.signal.aborted) { return }
//             return error.message
//         }
//     }
// };