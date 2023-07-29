import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../App/hooks";
import {
  globalState,
  setIsLoading,
  setToExpandImage,
} from "../../redux-slices/globalSlice";

import imageChanger from "../../utils/imageChanger";
import styles from "./ImageModal.module.scss";

import { useState } from "react";
import { imageState } from "../../redux-slices/imagesSlice";
import { TImageData } from "../../Interfaces and types/Types/types";

const ImageModal = () => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const globalData = useAppSelector(globalState);
  const imageData = useAppSelector(imageState);

  const currentImage: TImageData | undefined =
    imageData.allData.find(
      (el) => el.links[0]?.href === globalData.modalImageHref
    ) || undefined;

  const handleModalClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (e.target === e.currentTarget) {
      e.stopPropagation();
      e.preventDefault();
      dispatch(setToExpandImage({ bool: false, href: "", title: "" }));
      dispatch(setIsLoading(false));
    }
  };

  const handleImageLoaded = (): void => {
    setImageLoaded(true);
    dispatch(setIsLoading(false));
  };

  //!IMPORTANT imageChanger func:
  //HELPER FUNCTION TO MAKE CHECKS OF CERTAIN CONDITIONS
  //BEFORE EXECUTIN A REQUEST WITH THE GIVEN INPUT

  const handleNextImage = () => {
    dispatch(setIsLoading(true));
    imageChanger({ movement: "next", imageData, globalData, dispatch });
  };

  const handlePreviousImage = () => {
    dispatch(setIsLoading(true));
    imageChanger({ movement: "previous", imageData, globalData, dispatch });
  };

  return (
    <dialog
      className={
        styles[
          globalData.toExpandImage
            ? "modal-image-container-expanded"
            : "modal-image-container"
        ]
      }
      onFocus={() => dispatch(setIsLoading(false))}
    >
      <section
        className={styles["modal-image-and-title-container"]}
        onClick={(e: React.MouseEvent<HTMLSpanElement>) => handleModalClick(e)}
      >
        {!globalData.modalImageHref ? null : (
          <>
            <Link
              className={styles[imageLoaded ? "image-link" : ""]}
              to={globalData.modalImageHref}
              target="_blank"
              rel="noopener"
            >
              <img
                onLoad={() => handleImageLoaded()}
                className={styles[imageLoaded ? "image-loaded" : ""]}
                src={globalData.modalImageHref}
                alt={
                  "Sorry, there was supposed to be an image here, but something went wrong!"
                }
                title={globalData.modalImageTitle}
              />
            </Link>
            {!imageLoaded ? (
              <p className={styles["image-loading-text"]}>Loading...</p>
            ) : null}
            {imageLoaded ? (
              <p className={styles["modal-image-title"]}>
                {globalData.modalImageTitle}
              </p>
            ) : null}
            <div className={styles["modal-navigation-container"]}>
              <p>
                {currentImage
                  ? imageData?.allData?.indexOf(currentImage) + 1
                  : "N/A"}{" "}
                of {imageData?.allData?.length}
              </p>
              <div className={styles["modal-buttons-container"]}>
                <button
                  disabled={
                    globalData.loading || currentImage
                      ? imageData?.allData?.indexOf(
                          currentImage as TImageData
                        ) +
                          1 ===
                        1
                      : true
                  }
                  onClick={() => handlePreviousImage()}
                >
                  Previous
                </button>
                <button
                  disabled={
                    globalData.loading || currentImage
                      ? imageData?.allData?.indexOf(
                          currentImage as TImageData
                        ) +
                          1 ===
                        imageData?.allData?.length
                      : true
                  }
                  onClick={() => handleNextImage()}
                >
                  {currentImage
                    ? imageData?.allData?.indexOf(currentImage as TImageData) +
                        1 ===
                      imageData?.allData?.length
                    : null}
                  Next
                </button>
                <Link to="#" className={styles["span-link"]}>
                  <span
                    className={"span-close-x"}
                    onClick={(e) => handleModalClick(e)}
                  >
                    X
                  </span>
                </Link>
              </div>
            </div>
          </>
        )}
      </section>
    </dialog>
  );
};
export default ImageModal;
