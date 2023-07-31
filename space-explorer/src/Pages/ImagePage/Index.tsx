import { ChangeEvent, FormEvent, useRef, useState } from "react";

import * as imageSlice from "../../redux-slices/imagesSlice";
import { globalState, setError } from "../../redux-slices/globalSlice";

import { useAppDispatch, useAppSelector } from "../../App/hooks";
import { TImageData } from "../../Interfaces and types/Types/types";

import * as component from "../../all-imported-components";
import formChecker from "../../utils/formChecker";
import useIntersectionHook from "../../customHooks/useIntersectionHook";

import styles from "./index.module.scss";
import { ImageListItem } from "@mui/material";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import pageChanger from "../../utils/pageChanger";

const ImagePage = () => {
  const divRef = useRef<HTMLDivElement>(null);
  useIntersectionHook(divRef, "#gallery");

  const imageData = useAppSelector(imageSlice.imageState);
  const globalData = useAppSelector(globalState);
  const dispatch = useAppDispatch();

  const controller: AbortController = new AbortController();
  const { signal }: { signal: AbortSignal } = controller;

  const [searchValue, setSearchValue] = useState<string>("");
  const [disableButton, setToDisableButton] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //1. !IMPORTANT helper function to check numerous input conditions
    formChecker({
      searchValue,
      imageData,
      setSearchValue,
      setToDisableButton,
      dispatch,
      controller,
      signal,
    }); //!READ POINT 1.
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value.toLocaleLowerCase());
    dispatch(setError({ error: "" }));
    dispatch(imageSlice.setImagePage(1));
  };

  const handlePageChange = async () => {
    //2. !IMPORTANT helper function to check numerous conditions
    // before and after changing a page for next request of images
    // or if there are any more to request
    pageChanger({
      imageData,
      signal,
      controller,
      setToDisableButton,
      dispatch,
    }); //!READ POINT 2.
  };

  return (
    <section id="gallery" className={styles["image-container"]}>
      <div ref={divRef} className={styles["image-container-heading-container"]}>
        <h1>Gallery</h1>
        <form
          className={styles["search-form"]}
          onSubmit={(e) => handleSubmit(e)}
        >
          <label className={styles["form-label"]} htmlFor="search-images">
            Search images:
          </label>
          <span>
            <ImageSearchIcon />
            <input
              className={styles["form-input"]}
              onChange={(e) => handleInput(e)}
              type="text"
              name="search-images"
              value={searchValue}
              placeholder="e.g. jupiter"
              pattern="[A-Za-z\d\s]*"
              minLength={0}
              maxLength={50}
              required
            />
            <input
              type="submit"
              value="search"
              className={styles["form-submit-button"]}
            />
          </span>
        </form>
        {imageData?.allData[0]?.href ? (
          <p style={{ margin: "1rem 0" }}>
            Showing {imageData.allData.length}
            {imageData.allData.length <= 1 ? " image" : " images"}
          </p>
        ) : null}
      </div>
      {// IF MODAL IS TO BE SHOWN
      globalData.toExpandImage ? <component.ImageModal /> : null}
      {// IF THERE ARE IMAGES IN THE GLOBAL DATA, SHOW THE LIST OF IMAGES

      globalData.error.error && globalData.error.page === "image" ? (
        <div className={styles["loader-error"]}>
          <component.ErrorMessage error={globalData.error.error} />
        </div>
      ) : imageData?.allData[0]?.href ? (
        <div className={styles["image-list"]}>
          {imageData.allData.map((item: TImageData) => (
            <ImageListItem
              className={styles["image-list-item"]}
              key={item.data[0].nasa_id}
            >
              <component.ImageComponent {...item} />
            </ImageListItem>
          ))}
        </div>
      ) : null

      // IF THERE ARE NO IMAGES, CHECK IF IT'S STILL LOADING OR IF THERE IS AN ERROR
      }
      {imageData?.allData[0]?.href ? (
        <button
          className={styles["fetch-more-images"]}
          disabled={disableButton}
          style={{ color: disableButton ? "red" : "" }}
          onClick={() => handlePageChange()}
        >
          {disableButton ? "NO more images to load" : "Load more images"}
        </button>
      ) : null}
    </section>
  );
};

export default ImagePage;
