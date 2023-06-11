
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import { globalState, setError, setIsLoading } from "../../redux-slices/globalSlice";
import { imageState, setImageData } from "../../redux-slices/imagesSlice";
import { ImageListItem } from "@mui/material";
import { fetchImages } from "../../utils/Api";

import styles from './index.module.scss';
import { ErrorMessage, GlobalLoader, ImageComponent, ImageModal } from "../../all-imported-components";
import { TImageData } from "../../Interfaces and types/Types/types";
import useIntersectionHook from "../../customHooks/useIntersectionHook";

const ImagePage = () => {

    const imageData = useAppSelector(imageState);
    const globalData = useAppSelector(globalState);
    const dispatch = useAppDispatch();

    const controller: AbortController = (new AbortController());
    const { signal }: { signal: AbortSignal } = controller;

    const divRef = useRef<HTMLDivElement>(null);

    const isActive = useIntersectionHook(divRef, 'imagePage');

    useEffect(() => {
        (async function () {
            const data = await fetchImages(signal, controller);
            dispatch(setIsLoading(true));

            typeof data === typeof [data]
                ? (dispatch(setIsLoading(false)), dispatch(setImageData(data)))
                : (dispatch(setIsLoading(false)), dispatch(setError(data)))
        })();
    }, [])

    return (
        <section id="gallery" className={styles["image-container"]}>
            <div className={styles["image-container-heading-container"]}>
                <h1>Gallery</h1>
            </div>
            {
                globalData.toExpandImage
                    ?
                    <ImageModal />
                    : null
            }
            {
                imageData.allData[0].href !== ''
                    ?
                    <div ref={divRef} className={styles[isActive
                        ? "image-list"
                        : "image-list-not-active"
                    ]}>
                        {imageData.allData.map((item: TImageData) => (
                            <ImageListItem key={item.data[0].nasa_id} >
                                <ImageComponent {...item} />
                            </ImageListItem>
                        ))}
                    </div>
                    :
                    <div>
                        {
                            globalData
                                ? <ErrorMessage />
                                : <GlobalLoader />
                        }
                    </div>
            }

        </section >
    )
}

export default ImagePage