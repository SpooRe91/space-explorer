import styles from "./PoDModal.module.scss";
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../App/hooks';
import { podState } from '../../redux-slices/PODslice';
import { globalState, setIsLoading, setToShowPoD } from '../../redux-slices/globalSlice';
import { Link } from 'react-router-dom';


export default function PoDModal() {

    const [imageLoaded, setImageLoaded] = useState<boolean>(false);

    const globalData = useAppSelector(globalState);
    const podData = useAppSelector(podState);
    const dispatch = useAppDispatch();

    const handleModalClick = (e: React.MouseEvent<HTMLDivElement>
        | React.MouseEvent<HTMLSpanElement>) => {
        if (e.target === e.currentTarget) {
            e.stopPropagation();
            e.preventDefault();
            dispatch(setIsLoading(false));
            dispatch(setToShowPoD(false))
        }
    }

    const handleImageLoaded = (): void => {
        setImageLoaded(true);
        dispatch(setIsLoading(false));
    }

    return (
        <div className={styles['modal-main-container']}
        >
            <div className={styles['pod-container']}
            >
                {
                    !imageLoaded
                        ?
                        <p className={styles["image-loading-text"]}>
                            Loading...
                        </p>
                        :
                        <section className={styles['text-container']}
                            onClick={(e: React.MouseEvent<HTMLDivElement>) => handleModalClick(e)}>
                            <div className={styles['transition-el']}>
                                <p className={styles["modal-pod-title"]}>
                                    {podData.title}
                                </p>
                                <p className={styles["modal-pod-explanation"]}>
                                    {podData.explanation}
                                </p>
                            </div>
                        </section>
                }
                <section className={styles['img-container']}
                    onClick={(e: React.MouseEvent<HTMLDivElement>) => handleModalClick(e)}>
                    <img
                        className={styles['pod-image']}
                        src={podData.url}
                        onLoad={() => handleImageLoaded()}
                        title={podData.title}
                        loading={'lazy'}
                        alt={!imageLoaded ? "" : globalData.error ||
                            "There was supposed to be a NASA pic, but sometimes things don't go as planned"}
                    />

                </section>
            </div>
            <Link
                to="#"
                className={styles["span-link"]}>
                <span className={styles["span-close-x"]}
                    onClick={(e: React.MouseEvent<HTMLSpanElement>) => handleModalClick(e)}>
                    X
                </span>
            </Link>
        </div>
    );
}

