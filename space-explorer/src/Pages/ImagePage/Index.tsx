import { useRef, useState } from "react";
import styles from "./index.module.scss";

import { globalState } from "../../redux-slices/globalSlice";
import { imageState } from "../../redux-slices/imagesSlice";
import { useAppDispatch, useAppSelector } from "../../App/hooks";


import * as component from "../../all-imported-components";

import { TImageData } from "../../Interfaces and types/Types/types";
import useIntersectionHook from "../../customHooks/useIntersectionHook";
import pageChanger from "../../utils/pageChanger";

import { ImageListItem } from "@mui/material";


const ImagePage = () => {
  const divRef = useRef<HTMLDivElement>(null);
  useIntersectionHook(divRef, "#gallery");

  const imageData = useAppSelector(imageState);
  const globalData = useAppSelector(globalState);
  const dispatch = useAppDispatch();

  const controller: AbortController = new AbortController();
  const { signal }: { signal: AbortSignal } = controller;

  const [disableLoadButton, setToDisableLoadButton] = useState<boolean>(false);

  const handlePageChange = async () => {
    //2. !IMPORTANT helper function to check numerous conditions
    // before and after changing a page for next request of images
    // or if there are any more to request
    pageChanger({
      imageData,
      signal,
      controller,
      setToDisableLoadButton,
      dispatch,
    }); //!READ POINT 2.
  };

  return (
    <section id="gallery" className={styles["image-container"]}>
      <div ref={divRef} className={styles["image-container-heading-container"]}>
        <h1>Gallery</h1>
        {<component.SearchForm {...{ setToDisableLoadButton, pageView: 'images' }} />}

        {imageData?.allData[0]?.href ? (
          <p style={{ margin: "1rem 0" }}>
            Showing {imageData?.allData?.length}
            {imageData.allData.length <= 1 ? " image" : " images"}
          </p>
        ) : null}
      </div>
      {// IF MODAL IS TO BE SHOWN
        globalData.toExpandImage ? <component.ImageModal /> : null}

      {
        globalData.error.error && globalData.error.page === "image" || globalData.error.page === "modal"
          ? <div className={styles["loader-error"]}>
            <component.ErrorMessage error={globalData.error.error} />
          </div>
          // IF THERE ARE IMAGES IN THE GLOBAL DATA, SHOW THE LIST OF IMAGES
          : imageData?.allData[0]?.href
            ? <div className={styles["image-list"]}>
              {imageData.allData.map((item: TImageData) => (
                <ImageListItem
                  className={styles["image-list-item"]}
                  key={item.data[0].nasa_id}
                >
                  <component.ImageComponent {...item} />
                </ImageListItem>
              ))}
            </div>
            : null

        // IF THERE ARE NO IMAGES, CHECK IF IT'S STILL LOADING OR IF THERE IS AN ERROR
      }
      {imageData?.allData[0]?.href ? (
        <button
          className={styles["fetch-more-images"]}
          disabled={disableLoadButton}
          style={{ color: disableLoadButton ? "red" : "" }}
          onClick={() => handlePageChange()}
        >
          {disableLoadButton ? "NO more images to load" : "Load more images"}
        </button>
      ) : null}
    </section>
  );
};

export default ImagePage;
