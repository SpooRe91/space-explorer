import { TImageData } from "../../Interfaces and types/Types/types";

import styles from './ImageComponent.module.scss';

import { useAppDispatch } from "../../App/hooks";
import { setIsLoading, setToExpandImage } from "../../redux-slices/globalSlice";


const ImageComponent: React.FC<TImageData> = (item) => {

    const dispatch = useAppDispatch();

    return (
        <div
            onClick={() => item.links[0]?.href !== undefined
                && item?.data[0].title !== undefined
                ?
                [
                    dispatch(setToExpandImage(
                        {
                            bool: true,
                            href: item.links[0]?.href,
                            title: item?.data[0].title
                        })),
                    dispatch(setIsLoading(true))]
                : null
            }
            className={styles["card-component"]} >
            {
                <img
                    loading="lazy"
                    src={item?.links[0]?.href}
                    alt="No image, sorry! Imagine something cool!"
                />
            }
            <div className={styles["card-content"]}>
                <p className={styles["card-content-title"]}>
                    {item?.data[0].title}
                </p>
            </div>
        </div >
    );
};

export default ImageComponent;
