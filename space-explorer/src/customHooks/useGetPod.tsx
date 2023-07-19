import { useCallback } from "react";
import { podState, setPodData, setPrevPodUrl } from "../redux-slices/PODslice";
import { setIsLoading, setError, setToShowPoD } from "../redux-slices/globalSlice";
import { fetchImageOfTheDay } from "../utils/Picture-of-the-day-api";
import { useAppDispatch, useAppSelector } from "../App/hooks";

const useGetPod = () => {

    const controller = new AbortController();
    const { signal } = controller;

    const dispatch = useAppDispatch();
    const podData = useAppSelector(podState);

    const podFetcher = useCallback(async () => {

        const data = await fetchImageOfTheDay(signal, controller);

        setTimeout(() => {
            if (typeof data === 'string') {
                (dispatch(setIsLoading(false)),
                    dispatch(setError({
                        error: 'Unable to reach the server at the moment, please try again later!',
                        page: 'pod'
                    })));
                controller.abort();
                return data;
            }
        }, 10000);

        dispatch(setIsLoading(false));
        dispatch(setPrevPodUrl(podData));
        dispatch(setPodData(data));

        // if (typeof data === 'string') {
        //     (dispatch(setIsLoading(false)),
        //         dispatch(setError('Unable to reach the server at the moment, please try again later!')))
        //     controller.abort();
        //     return data;
        // }
        return;
    }, []);

    return podFetcher;
}
export default useGetPod
