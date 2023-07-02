import styles from "./index.module.scss";

import PoDModal from "../../Components/PoDModal/PoDModal";
import useGetPod from "../../customHooks/useGetPod";
import { useAppSelector } from "../../App/hooks";
import { podState } from "../../redux-slices/PODslice";
import { useEffect } from "react";

const PoDPage = () => {

    const podData = useAppSelector(podState);
    const podResult = useGetPod();

    useEffect(() => {
        (async function () {
            await podResult(podData.prevUrl);
        })()
    }, [])

    return (
        <div className={styles["pod-main-container"]}>
            <PoDModal />
        </div>
    )
}
export default PoDPage