import { Link } from "react-router-dom";
import styles from "./SideBar.module.scss";
import { useAppDispatch } from "../../../App/hooks";
import { setShowSideNav } from "../../../redux-slices/globalSlice";

const SideBar = () => {

    const dispatch = useAppDispatch();

    return (
        <div
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