import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../App/hooks";
import { globalState, setIsLoading, setToExpandImage } from "../../redux-slices/globalSlice";

import styles from "./ImageModal.module.scss";
import { useState } from "react";
import { imageState } from "../../redux-slices/imagesSlice";
import { IGlobal } from "../../Interfaces and types/Interfaces/interfaces";
import { TImageData } from "../../Interfaces and types/Types/types";

const ImageModal = () => {


    const [imageLoaded, setImageLoaded] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const globalData = useAppSelector(globalState);
    const imageData = useAppSelector(imageState);
    const current: TImageData | undefined =
        imageData.allData.find(el => el.links[0]?.href === globalData.modalImageHref);
    if (current === null || current === undefined) return;
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


    const handleNextImage = (): void => {
        dispatch(setIsLoading(true));
        imageChanger('next');
    }

    const handlePreviousImage = (): void => {
        dispatch(setIsLoading(true));
        imageChanger('previous');
    }

    function imageChanger(movement: string): void {
        if (movement === null) { return }

        if (!imageData.allData.find(el => el.links[0]?.href === globalData.modalImageHref)) {
            dispatch(setIsLoading(false));
            return;
        }

        if (imageData.allData === undefined || imageData.allData === null) return;

        const current: TImageData | undefined =
            imageData.allData.find(el => el.links[0]?.href === globalData.modalImageHref);

        if (current === null || current === undefined) return;

        if (movement === "next") {

            const nextImgIndex: number | undefined = imageData.allData.indexOf(current) + 1;

            if (nextImgIndex < imageData.allData.length) {
                dispatch(setToExpandImage({
                    bool: true,
                    href: imageData.allData[nextImgIndex].links[0]?.href as keyof IGlobal,
                    title: current.data[0].title
                }));
            } else {
                dispatch(setToExpandImage({ bool: false, href: "", title: "" }));
                dispatch(setIsLoading(false));
            }

            return;
        }

        if (movement === "previous") {

            const previousIndex: number | undefined = imageData.allData.indexOf(current) - 1;

            if (imageData.allData[previousIndex] !== null &&
                imageData.allData[previousIndex] !== undefined) {
                dispatch(setToExpandImage({
                    bool: true,
                    href: imageData.allData[previousIndex].links[0]?.href as keyof IGlobal,
                    title: current.data[0].title
                }));
            } else {
                dispatch(setToExpandImage({ bool: false, href: "", title: "" }));
                dispatch(setIsLoading(false));
            }

            return;
        }
    }

    return (
        <dialog
            className={styles[globalData.toExpandImage
                ? "modal-image-container-expanded"
                : "modal-image-container"]}
            onBlur={() => dispatch(setIsLoading(false))}
        >
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
                            <div className={styles["modal-navigation-container"]}>
                                <p>{imageData.allData.indexOf(current) + 1} of {imageData.allData.length}</p>
                                <div className={styles["modal-buttons-container"]}>
                                    <button
                                        disabled={(imageData.allData.indexOf(current) + 1) === 1 ||
                                            globalData.loading}
                                        onClick={() => handlePreviousImage()}>Previous
                                    </button>
                                    <button
                                        disabled={globalData.loading ||
                                            (imageData.allData.indexOf(current) + 1) === imageData.allData.length}
                                        onClick={() => handleNextImage()}>
                                        {(imageData.allData.indexOf(current) + 1) === imageData.allData.length}
                                        Next
                                    </button>
                                </div>
                            </div>
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
        </dialog >
    )
}
export default ImageModal