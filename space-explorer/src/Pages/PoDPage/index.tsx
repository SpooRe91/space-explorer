import styles from "./index.module.scss";

import PoDModal from "../../Components/PoDModal/PoDModal";
import useGetPod from "../../customHooks/useGetPod";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import { podState, setPodData } from "../../redux-slices/PODslice";
import { useEffect } from "react";

const PoDPage = () => {

    const podData = useAppSelector(podState);
    const podResult = useGetPod();
    const dispatch = useAppDispatch();

    const currDate = new Date(Date.now());
    const offset = currDate.getTimezoneOffset();
    const currTime = new Date(currDate.getTime() - (offset * 60 * 1000))
        .toISOString()
        .split('T')[0]

    useEffect(() => {
        //if the time of the initial request is different than the current time today => make a new request, else don't 
        if ((podData?.date || '0') !== currTime) {
            (async function () {
                await podResult();
            })()
        } else {
            dispatch(setPodData({
                date: '',
                explanation: '',
                hdurl: '',
                media_type: '',
                prevUrl: '',
                title: '',
                url: ''
            }));
        }
    }, [])

    return (
        <div className={styles["pod-main-container"]}>
            <PoDModal />
        </div>
    )
}
export default PoDPage