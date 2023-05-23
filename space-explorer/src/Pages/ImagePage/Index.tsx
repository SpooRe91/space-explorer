
import { useEffect } from "react";
import { globalState, setError, setIsLoading } from "../../redux-slices/globalSlice";
import { imageState, setImageData } from "../../redux-slices/imagesSlice";
import { useAppDispatch, useAppSelector } from "../../App/hooks";

import styles from './index.module.scss';
import { imagesApi } from "../../utils/Api";
import { GlobalLoader, ImageComponent } from "../../all-imported-components";

const ImagePage = () => {

    const imageData = useAppSelector(imageState);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchImages = (async () => {
            try {
                const res = await imagesApi.get(`search?q=solar%20system%20planets&media_type=image`);
                dispatch(setIsLoading(true));

                if (res.status === 200) {
                    dispatch(setImageData(res.data.collection.items));
                    dispatch(setIsLoading(false));
                }
            } catch (error) {
                dispatch(setError(error?.message));
                dispatch(setIsLoading(false));
            }
        })();
    }, [])

    return (
        <section id="gallery" className={styles["image-container"]}>
            {
                imageData.allData[0].href !== ''
                    ? imageData.allData.slice(0, 20).map((item) => {
                        return <ImageComponent {...item} key={item.data[0].nasa_id} />
                    })
                    : <GlobalLoader />
            }

        </section>
    )
}

export default ImagePage