import { useCallback } from "react";
import { podState, setPodData, setPrevPodUrl } from "../redux-slices/PODslice";
import { setIsLoading, setError } from "../redux-slices/globalSlice";
import { fetchImageOfTheDay } from "../utils/Picture-of-the-day-api";
import { useAppDispatch, useAppSelector } from "../App/hooks";

const useGetPod = () => {
    // PARTIAL FIX APPLIED, WAIT UNTIL TOMORROW AND CHECK FOR REQUEST
    const controller = new AbortController();
    const { signal } = controller;

    const dispatch = useAppDispatch();
    const podData = useAppSelector(podState);

    const podFetcher = useCallback(async (prevUrl: string) => {
        if (podData.url !== prevUrl) { return }

        if (!prevUrl) {
            const data = await fetchImageOfTheDay(signal, controller);

            if (data.url !== prevUrl) {
                (dispatch(setIsLoading(false)),
                    dispatch(setPrevPodUrl(podData))),
                    dispatch(setPodData(data));
                return;
            }

            if (typeof data === 'string') {

                (dispatch(setIsLoading(false)),
                    dispatch(setError(data)))
                controller.abort();
                return data;
            }

            return;
        }
        dispatch(setIsLoading(false));
    }, []);


    return podFetcher;
}
export default useGetPod
