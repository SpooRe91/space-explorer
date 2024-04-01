import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../App/hooks";
import { globalState, setIsLoading, setToExpandImage } from "../../redux-slices/globalSlice";

import imageChanger from "../../utils/imageChanger";
import styles from "./ImageModal.module.scss";

import React, { useState } from "react";
import { imageState } from "../../redux-slices/imagesSlice";
import { TImageData } from "../../Interfaces and types/Types/types";
import pageChanger from "../../utils/pageChanger";
import { ErrorMessage } from "../../Layouts/index";
import useChangeImageWithKeys from "../../hooks/useChangeImageWithKeys";

export const ImageModal = () => {
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);
    const [disableLoadButton, setToDisableLoadButton] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const globalData = useAppSelector(globalState);
    const imageData = useAppSelector(imageState);

    const controller: AbortController = new AbortController();
    const { signal }: { signal: AbortSignal } = controller;

    const handleNextImage = () => {
        dispatch(setIsLoading(true));
        imageChanger({ movement: "next", imageData, globalData, dispatch });
    };

    const handlePreviousImage = () => {
        dispatch(setIsLoading(true));
        imageChanger({ movement: "previous", imageData, globalData, dispatch });
    };

    useChangeImageWithKeys({ handlePreviousImage, handleNextImage });

    const handlePageChange = async () => {
        pageChanger({
            imageData,
            signal,
            controller,
            setToDisableLoadButton,
            dispatch,
        });
    };

    const currentImage: TImageData | undefined =
        imageData.allData.find((el) => el.links[0]?.href === globalData.modalImageHref) || undefined;

    const handleModalClick = (e: React.MouseEvent<HTMLSpanElement>) => {
        if (e.target === e.currentTarget) {
            e.stopPropagation();
            e.preventDefault();
            dispatch(setToExpandImage({ bool: false, href: "", title: "" }));
            dispatch(setIsLoading(false));
        }
    };

    const handleImageCloase = (): void => {
        dispatch(setToExpandImage({ bool: !globalData.toExpandImage, href: "", title: "" }));
    };

    const handleImageLoaded = (): void => {
        setImageLoaded(true);
        dispatch(setIsLoading(false));
    };

    return (
        <dialog
            className={
                styles[globalData.toExpandImage ? "modal-image-container-expanded" : "modal-image-container"]
            }
            onFocus={() => dispatch(setIsLoading(false))}
        >
            <section
                className={styles["modal-image-and-title-container"]}
                onClick={(e: React.MouseEvent<HTMLSpanElement>) => handleModalClick(e)}
            >
                {(globalData.error.error && globalData.error.page === "image") ||
                globalData.error.page === "modal" ? (
                    <ErrorMessage error={globalData.error.error} />
                ) : !globalData.modalImageHref ? null : (
                    <>
                        <Link
                            className={styles[imageLoaded ? "image-link" : ""]}
                            to={globalData.modalImageHref}
                            target="_blank"
                            rel="noopener"
                        >
                            <img
                                onLoad={() => handleImageLoaded()}
                                className={styles[imageLoaded ? "image-loaded" : ""]}
                                src={globalData.modalImageHref}
                                alt={
                                    "Sorry, there was supposed to be an image here, but something went wrong!"
                                }
                                title={globalData.modalImageTitle}
                            />
                        </Link>
                        {!imageLoaded ? <p className={styles["image-loading-text"]}>Loading...</p> : null}
                        {imageLoaded ? (
                            <p className={styles["modal-image-title"]}>{globalData.modalImageTitle}</p>
                        ) : null}
                        <div className={styles["modal-navigation-container"]}>
                            <p>
                                {currentImage ? imageData?.allData?.indexOf(currentImage) + 1 : "N/A"} /{" "}
                                {imageData?.allData?.length}
                            </p>
                            <div className={styles["modal-buttons-container"]}>
                                <button
                                    disabled={
                                        globalData.loading || currentImage
                                            ? imageData?.allData?.indexOf(currentImage as TImageData) + 1 ===
                                              1
                                            : true
                                    }
                                    onClick={() => handlePreviousImage()}
                                >
                                    Previous
                                </button>
                                <button
                                    disabled={
                                        globalData.loading || currentImage
                                            ? imageData?.allData?.indexOf(currentImage as TImageData) + 1 ===
                                              imageData?.allData?.length
                                            : true
                                    }
                                    onClick={() => handleNextImage()}
                                >
                                    {currentImage
                                        ? imageData?.allData?.indexOf(currentImage as TImageData) + 1 ===
                                          imageData?.allData?.length
                                        : null}
                                    Next
                                </button>
                                {imageData?.allData[0]?.href ? (
                                    <button
                                        className={styles["fetch-more-images"]}
                                        disabled={disableLoadButton}
                                        style={{ color: disableLoadButton ? "red" : "" }}
                                        onClick={() => handlePageChange()}
                                    >
                                        {disableLoadButton ? "No more images" : "More images"}
                                    </button>
                                ) : null}
                                <Link
                                    onClick={() => handleImageCloase()}
                                    to="#"
                                    className={styles["span-link"]}
                                >
                                    <span className={"span-close-image"}>X</span>
                                </Link>
                            </div>
                        </div>
                    </>
                )}
            </section>
        </dialog>
    );
};
export default ImageModal;
