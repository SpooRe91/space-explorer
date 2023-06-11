import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../App/hooks";
import { globalState, setToExpandImage } from "../../redux-slices/globalSlice";

import styles from "./ImageModal.module.scss";
import { useRef, useState } from "react";
import { RingLoader } from "react-spinners";
import useIntersectionHook from "../../customHooks/useIntersectionHook";

const ImageModal = () => {

    const [imageLoaded, setImageLoaded] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const globalData = useAppSelector(globalState);
    const divRef = useRef<HTMLAnchorElement>(null);

    const isActive = useIntersectionHook(divRef, 'imageModal');

    const handleModalClick = (e: React.MouseEvent<HTMLSpanElement>) => {
        if (e.target === e.currentTarget) {
            e.stopPropagation();
            dispatch(setToExpandImage({ bool: false, href: '', title: '' }));
        }
    }

    const handleCloseModal = (e: React.MouseEvent<HTMLSpanElement>) => {
        e.preventDefault();
    }

    const handleImageLoaded = (): void => {
        setImageLoaded(() => true);
    }

    return (
        <div
            className={styles["modal-image-container"]}>
            <section
                className={styles["modal-image-and-title-container"]}
                onClick={(e: React.MouseEvent<HTMLSpanElement>) => handleModalClick(e)}
            >
                {
                    !globalData.modalImageHref
                        ?
                        <RingLoader
                            size={100}
                            color='#36d7b7' />
                        :
                        <>
                            <Link
                                ref={divRef}
                                to={globalData.modalImageHref}
                                target="_blank"
                                rel="noopener"
                                style={{
                                    boxShadow: isActive
                                        ? "0px 0px 15px 6.6px var(--card-box-shadow-color)"
                                        : ""
                                }}>
                                <img
                                    onLoad={() => handleImageLoaded()}
                                    className={styles["image-loaded"]}
                                    src={globalData.modalImageHref}
                                    alt={"Sorry, there was supposed to be an image here, but something went wrong!"}
                                    title={globalData.modalImageTitle}
                                    loading={"lazy"}
                                />
                            </Link>
                            {
                                !imageLoaded
                                    ? <RingLoader
                                        size={100}
                                        color='#36d7b7' />
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
                                    onClick={(e) =>
                                        [handleModalClick(e),
                                        handleCloseModal(e)]
                                    }>
                                    X
                                </span>
                            </Link>
                        </>
                }
            </section>
        </div >

    )
}

export default ImageModal