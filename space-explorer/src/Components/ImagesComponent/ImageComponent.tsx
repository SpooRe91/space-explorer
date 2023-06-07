import { TImageData } from "../../Interfaces and types/Types/types";
import styles from './ImageComponent.module.scss';
import { Link } from "react-router-dom";

const ImageComponent = (item: TImageData) => {

    return (
        <div className={styles["card-component"]}>
            <Link to={`${item?.links[0]?.href}`} rel="noopenner" target="_blank">
                <img
                    loading="lazy"
                    src={item?.links[0]?.href}
                    alt="../../assets/icons/img not found.png"
                />
            </Link>
            <div className={styles["card-content"]}>
                <p className={styles["card-content-title"]}>
                    {item?.data[0].title}
                </p>
            </div>
        </div>
    );
};

export default ImageComponent;
