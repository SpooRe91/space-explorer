import { TImageData } from "../../Interfaces and types/Types/types";

import styles from "./ImageComponent.module.scss";

import { useAppDispatch } from "../../App/hooks";
import { setIsLoading, setToExpandImage } from "../../redux-slices/globalSlice";

export const ImageComponent = ({ href, data }: TImageData) => {
    const dispatch = useAppDispatch();

    return (
        <div
            onClick={() =>
                href !== undefined && data[0].title !== undefined
                    ? [
                          dispatch(
                              setToExpandImage({
                                  bool: true,
                                  href: href,
                                  title: data[0].title,
                              })
                          ),
                          dispatch(setIsLoading(true)),
                      ]
                    : null
            }
            className={styles["card-component"]}
        >
            {<img loading="lazy" src={href} alt="No image, sorry! Imagine something cool!" />}
            <div className={styles["card-content"]}>
                <p className={styles["card-content-title"]}>{data[0].title}</p>
            </div>
        </div>
    );
};

export default ImageComponent;
