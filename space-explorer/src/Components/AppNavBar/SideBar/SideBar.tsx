import { Link } from "react-router-dom";
import styles from "./SideBar.module.scss";
import { useAppDispatch, useAppSelector } from "../../../App/hooks";
import { globalState, setShowSideNav } from "../../../redux-slices/globalSlice";

const SideBar = () => {

    const globalData = useAppSelector(globalState);
    const dispatch = useAppDispatch();

    return (
        <div
            onMouseOver={() => dispatch(setShowSideNav(true))}
            onMouseLeave={() => dispatch(setShowSideNav(false))}
            className={styles["drop-down-container"]}>
            <ul role="list" className={styles["drop-down-list"]}>
                <li className={styles["drop-down-item"]}>
                    <Link className={styles["drop-down-link-item"]} to={""}>Item 1</Link>
                </li>
                <li className={styles["drop-down-item"]}>
                    <Link className={styles["drop-down-link-item"]} to={""}>Item 2</Link>
                </li>
                <li className={styles["drop-down-item"]}>
                    <Link className={styles["drop-down-link-item"]} to={""}>Item 3</Link>
                </li>
                <li className={styles["drop-down-item"]}>
                    <Link className={styles["drop-down-link-item"]} to={""}>Item 4</Link>
                </li>
            </ul>
        </div>
    )
}

export default SideBar