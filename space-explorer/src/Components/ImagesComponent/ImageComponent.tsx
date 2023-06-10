import { TImageData } from "../../Interfaces and types/Types/types";
import { GlobalLoader } from "../../all-imported-components";
import styles from './ImageComponent.module.scss';

import { useAppDispatch } from "../../App/hooks";
import { setToExpandImage } from "../../redux-slices/globalSlice";


const ImageComponent = (item: TImageData) => {

    const dispatch = useAppDispatch();

    return (
        <div
            onClick={() => dispatch(setToExpandImage({ bool: true, href: item?.links[0]?.href, title: item?.data[0].title }))}
            className={styles["card-component"]} >
            {
                item?.links[0]?.href
                    ?
                    <img
                        loading="lazy"
                        src={item?.links[0]?.href}
                        alt="../../assets/icons/img not found.png"
                    />
                    :
                    <GlobalLoader />
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
