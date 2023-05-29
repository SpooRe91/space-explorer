
import { ImageListItemBar } from "@mui/material";
import { TImageData } from "../../Interfaces and types/Types/types";
import styles from './ImageComponent.module.scss';
import { Link } from "react-router-dom";

const ImageComponent = (item: TImageData) => {
    return (
        <div className={styles["card-component"]}>
            <Link to={`${item?.links[0]?.href}`} rel="noopenner" target="_blank">
                <img
                    src={item?.links[0]?.href}

                    alt="#"
                />
            </Link>
            <div className={styles["card-content"]}>
                <ImageListItemBar className={styles["card-content-title"]}
                    title={item?.data[0].title}
                    position="below"
                />
                <p className={styles["card-content-description"]}>
                    {item?.data[0].description}
                </p>
                <button>Learn More</button>
            </div>
        </div>
    );
};

export default ImageComponent;
