import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import { GlobalLoader } from "../../all-imported-components";
import { globalState, setToExpandImage } from "../../redux-slices/globalSlice";

import styles from "./ImageModal.module.scss";

const ImageModal = () => {

    const dispatch = useAppDispatch();
    const globalData = useAppSelector(globalState);

    const handleModalClick = (e: React.MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation();
        dispatch(setToExpandImage({ bool: false, href: '', title: '' }));
    }

    return (
        <div
            className={styles["modal-image-container"]}
            onClick={(e: React.MouseEvent<HTMLSpanElement>) => handleModalClick(e)}
        >
            <section className={styles["modal-image-and-title-container"]}>
                {
                    !globalData.modalImageHref
                        ? < GlobalLoader />
                        :
                        <Link
                            to={globalData.modalImageHref}
                            target="_blank"
                            rel="noopener">
                            <img
                                src={globalData.modalImageHref}
                                alt="#"
                                loading={"lazy"} />
                        </Link>
                }
                <p className={styles["modal-image-title"]}>
                    {globalData.modalImageTitle}
                </p>
                <Link
                    to="#"
                    className={styles["span-link"]}>
                    <span
                        onClick={() =>
                            dispatch(setToExpandImage(
                                {
                                    bool: false,
                                    href: '',
                                    title: ''
                                }
                            ))}>
                        X
                    </span>
                </Link>
            </section>
        </div >

    )
}

export default ImageModal