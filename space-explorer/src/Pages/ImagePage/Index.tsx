import { useRef, useState } from "react";
import styles from "./index.module.scss";

import { globalState } from "../../redux-slices/globalSlice";
import { imageState } from "../../redux-slices/imagesSlice";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import { SearchForm, ImageModal, ImageComponent } from "../../Components/index";
import { ErrorMessage } from "../../Layouts/index";

import { TImageData } from "../../Interfaces and types/Types/types";
import useIntersectionHook from "../../hooks/useIntersectionHook";
import pageChanger from "../../utils/pageChanger";

import { ImageListItem } from "@mui/material";

export const ImagePage = () => {
    const divRef = useRef<HTMLDivElement>(null);
    useIntersectionHook(divRef, "#gallery");

    const imageData = useAppSelector(imageState);
    const globalData = useAppSelector(globalState);
    const dispatch = useAppDispatch();

    const controller: AbortController = new AbortController();
    const { signal }: { signal: AbortSignal } = controller;

    const [disableLoadButton, setToDisableLoadButton] = useState<boolean>(false);

    const handlePageChange = async () => {
        pageChanger({
            imageData,
            signal,
            controller,
            setToDisableLoadButton,
            dispatch,
        });
    };

    const hasImageData = imageData?.allData[0]?.links[0].href !== undefined;
    const hasError =
        (globalData.error.error && globalData.error.page === "images") || globalData.error.page === "modal";

    return (
        <section id="gallery" className={styles["image-container"]}>
            <div className={styles["trigger"]} ref={divRef}></div>
            <div className={styles["image-container-heading-container"]}>
                <h1>Gallery</h1>
                {<SearchForm {...{ setToDisableLoadButton, pageView: "images" }} />}

                {hasImageData ? (
                    <p style={{ margin: "1rem 0" }}>
                        Showing {imageData?.allData?.length}
                        {imageData.allData.length <= 1 ? " image" : " images"}
                    </p>
                ) : null}
            </div>
            {// IF MODAL IS TO BE SHOWN
            globalData.toExpandImage ? <ImageModal /> : null}

            {hasError ? (
                <div className={styles["loader-error"]}>
                    <ErrorMessage error={globalData.error.error} />
                </div>
            ) : // IF THERE ARE IMAGES IN THE GLOBAL DATA, SHOW THE LIST OF IMAGES
            hasImageData ? (
                <div className={styles["image-list"]}>
                    {imageData.allData.map((item: TImageData) => (
                        <ImageListItem className={styles["image-list-item"]} key={item.data[0].nasa_id}>
                            <ImageComponent {...item} />
                        </ImageListItem>
                    ))}
                </div>
            ) : null

            // IF THERE ARE NO IMAGES, CHECK IF IT'S STILL LOADING OR IF THERE IS AN ERROR
            }
            {hasImageData ? (
                <button
                    className={styles["fetch-more-images"]}
                    disabled={disableLoadButton}
                    style={{ color: disableLoadButton ? "red" : "" }}
                    onClick={() => handlePageChange()}
                >
                    {disableLoadButton ? "NO more images to load" : "Load more images"}
                </button>
            ) : null}
        </section>
    );
};

export default ImagePage;
