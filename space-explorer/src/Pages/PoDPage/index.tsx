import { useEffect } from "react";
import { useAppDispatch } from "../../App/hooks";

import styles from "./index.module.scss";

import { fetchImageOfTheDay } from "../../utils/Picture-of-the-day-api";
import { setError, setIsLoading } from "../../redux-slices/globalSlice";
import { setPodData } from "../../redux-slices/PODslice";

import PoDModal from "../../Components/PoDModal/PoDModal";

const PoDPage = () => {

    const controller = new AbortController();
    const { signal } = controller;

    const dispatch = useAppDispatch();

    useEffect(() => {
        (async function () {
            const data = await fetchImageOfTheDay(signal, controller);
            dispatch(setIsLoading(true));

            typeof data === typeof { data }
                ? (dispatch(setIsLoading(false)), dispatch(setPodData(data)))
                : (dispatch(setIsLoading(false)), dispatch(setError(data)))
        })();
    }, [])

    return (
        <div className={styles["pod-main-container"]}>
            <PoDModal />
        </div>
    )
}

export default PoDPage