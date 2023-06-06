
import { useEffect, useRef } from "react";
import { setError, setIsLoading } from "../../redux-slices/globalSlice";
import { imageState, setImageData } from "../../redux-slices/imagesSlice";
import { useAppDispatch, useAppSelector } from "../../App/hooks";

import styles from './index.module.scss';
import { fetchImages } from "../../utils/Api";
import { GlobalLoader, ImageComponent } from "../../all-imported-components";
import { ImageListItem } from "@mui/material";
import { TImageData } from "../../Interfaces and types/Types/types";

const ImagePage = () => {

    const imageData = useAppSelector(imageState);
    const dispatch = useAppDispatch();

    const controller: AbortController = (new AbortController());
    const { signal }: { signal: AbortSignal } = controller;

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
                imageData.allData[0].href !== ''
                    ?
                    <div className={styles["image-list"]}>
                        {imageData.allData.map((item: TImageData) => (
                            <ImageListItem key={item.data[0].nasa_id} >
                                <ImageComponent {...item} />
                            </ImageListItem>
                        ))}
                    </div>
                    : <GlobalLoader />
            }

        </section >
    )
}

export default ImagePage