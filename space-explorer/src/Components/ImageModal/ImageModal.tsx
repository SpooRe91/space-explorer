import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../App/hooks";
import { globalState, setIsLoading, setToExpandImage } from "../../redux-slices/globalSlice";

import styles from "./ImageModal.module.scss";
import { useState } from "react";

const ImageModal = () => {

    const [imageLoaded, setImageLoaded] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const globalData = useAppSelector(globalState);

    const handleModalClick = (e: React.MouseEvent<HTMLSpanElement>) => {
        if (e.target === e.currentTarget) {
            e.stopPropagation();
            e.preventDefault();
            dispatch(setToExpandImage({ bool: false, href: '', title: '' }));
            dispatch(setIsLoading(false));
        }
    }

    const handleImageLoaded = (): void => {
        setImageLoaded(true);
        dispatch(setIsLoading(false));
    }


    return (
        <dialog
            className={styles[globalData.toExpandImage
                ? "modal-image-container-expanded"
                : "modal-image-container"]}
            onFocus={() => dispatch(setIsLoading(false))}>
            <section
                className={styles["modal-image-and-title-container"]}
                onClick={(e: React.MouseEvent<HTMLSpanElement>) =>
                    handleModalClick(e)}
            >
                {
                    !globalData.modalImageHref
                        ?
                        null
                        :
                        <>
                            <img
                                onLoad={() => handleImageLoaded()}
                                className={styles[imageLoaded
                                    ? "image-loaded"
                                    : '']}
                                src={globalData.modalImageHref}
                                alt={"Sorry, there was supposed to be an image here, but something went wrong!"}
                                title={globalData.modalImageTitle}
                            />
                            {
                                !imageLoaded
                                    ?
                                    <p className={styles["image-loading-text"]}>
                                        Loading...
                                    </p>
                                    : null
                            }
                            {
                                imageLoaded
                                    ?
                                    <p className={styles["modal-image-title"]}>
                                        {globalData.modalImageTitle}
                                    </p>
                                    : null
                            }
                            <Link
                                to="#"
                                className={styles["span-link"]}>
                                <span className={"span-close-x"}
                                    onClick={(e) => handleModalClick(e)}>
                                    X
                                </span>
                            </Link>
                        </>
                }
            </section>
        </dialog>

    )
}

export default ImageModal