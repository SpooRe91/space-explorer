import { ChangeEvent, FormEvent, useRef, useState } from "react";

import * as imageSlice from "../../redux-slices/imagesSlice";
import { globalState, setError, setIsLoading } from "../../redux-slices/globalSlice";
import { useAppDispatch, useAppSelector } from "../../App/hooks";

import { fetchImages } from "../../utils/Fetch-search-images.api";
import { TImageData } from "../../Interfaces and types/Types/types";

import styles from './index.module.scss';
import { ImageListItem } from "@mui/material";
import * as component from "../../all-imported-components";
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import useIntersectionHook from "../../customHooks/useIntersectionHook";


const ImagePage = () => {

    const imageData = useAppSelector(imageSlice.imageState);
    const globalData = useAppSelector(globalState);
    const dispatch = useAppDispatch();

    const controller: AbortController = (new AbortController());
    const { signal }: { signal: AbortSignal } = controller;

    const divRef = useRef<HTMLDivElement>(null);
    useIntersectionHook(divRef, '#gallery');

    const [searchValue, setSearchValue] = useState<string>('');
    const [disableButton, setToDisableButton] = useState<boolean>(false);
    const forbiddenStrings = ['javascript', 'script', 'code', '/', ':', '<', '>', '\\'];


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (forbiddenStrings.includes(searchValue)) {
            dispatch(setError('This is not a valid search option!'));
            dispatch(imageSlice.setClearImageData(true));
            setSearchValue('');
            return;
        }

        setToDisableButton(false);
        dispatch(imageSlice.setClearImageData(true));
        dispatch(imageSlice.setImageQueryString(searchValue));

        if (searchValue === '') {
            dispatch(setIsLoading(false));
            dispatch(setError('Please enter your search first!'));
            dispatch(imageSlice.setImagePage(1));
            return;
        }

        dispatch(setIsLoading(true));
        const data = await fetchImages(signal, controller, imageData.imagePage, searchValue);
        setSearchValue('');

        if (data.length && typeof data !== "string") {
            dispatch(setIsLoading(false));
            dispatch(imageSlice.setImageData(data));
            dispatch(imageSlice.setImagePage(imageData.imagePage + 1));
            return;
        }

        if (!data.length && typeof data !== "string") {
            dispatch(setIsLoading(false));
            dispatch(imageSlice.setImagePage(1));
            dispatch(setIsLoading(false)), dispatch(setError("Sorry, no results found!"));
            return;

        } else {
            dispatch(setIsLoading(false));
            dispatch(imageSlice.setImagePage(1));
            dispatch(setIsLoading(false)), dispatch(setError(data));
            return;
        }

    };

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value.toLocaleLowerCase());
        dispatch(setError(''));
        dispatch(imageSlice.setImagePage(1));
    }

    const handlePageChange = async () => {

        dispatch(setIsLoading(true));
        dispatch(imageSlice.setImagePage(imageData.imagePage + 1));

        const data = await fetchImages(signal, controller, imageData.imagePage, imageData.queryString);

        if (data.length && typeof data !== "string") {
            dispatch(setIsLoading(false));
            dispatch(imageSlice.setAdditionalImageData(data));
            dispatch(imageSlice.setImagePage(imageData.imagePage + 1));
            return;
        }

        if (!data.length && typeof data !== "string") {
            if (imageData.imagePage) {
                setToDisableButton(true);
                dispatch(setIsLoading(false));
                return;
            }
            dispatch(imageSlice.setImagePage(1));
            dispatch(setIsLoading(false)), dispatch(setError("Sorry, no results found!"));
            return;

        } else {
            dispatch(setIsLoading(false));
            dispatch(imageSlice.setImagePage(1));
            dispatch(setIsLoading(false)), dispatch(setError(data));
            return;
        }

    }

    return (
        <section id="gallery" className={styles["image-container"]}>
            <div ref={divRef} className={styles["image-container-heading-container"]}>
                <h1>Gallery</h1>
                <form
                    className={styles['search-form']}
                    onSubmit={(e) => handleSubmit(e)}>
                    <label
                        className={styles["form-label"]}
                        htmlFor="search-images">
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
                            placeholder="enter your search here"
                            pattern="[A-Za-z\d\s]*"
                            minLength={0}
                            maxLength={50}
                            required
                        />
                        <input type="submit" value="search" className={styles["form-submit-button"]} />
                    </span>
                </form>
                {
                    imageData?.allData[0]?.href
                        ?
                        <p style={{ margin: '1rem 0' }}>
                            Showing {imageData.allData.length}
                            {imageData.allData.length <= 1 ? " image" : " images"}
                        </p>
                        : null
                }
            </div>
            {
                // IF MODAL IS TO BE SHOWN
                globalData.toExpandImage
                    ?
                    <component.ImageModal />
                    : null
            }
            {
                // IF THERE ARE IMAGES IN THE GLOBAL DATA, SHOW THE LIST OF IMAGES

                globalData.error
                    ?
                    <div className={styles['loader-error']}>
                        <component.ErrorMessage error={globalData.error} />
                    </div>
                    :
                    imageData?.allData[0]?.href
                        ?
                        <div className={styles["image-list"]}>
                            {imageData.allData.map((item: TImageData) => (
                                <ImageListItem
                                    className={styles["image-list-item"]}
                                    key={item.data[0].nasa_id} >
                                    <component.ImageComponent {...item} />
                                </ImageListItem>
                            ))}
                        </div>
                        : null

                // IF THERE ARE NO IMAGES, CHECK IF IT'S STILL LOADING OR IF THERE IS AN ERROR
            }
            {
                imageData?.allData[0]?.href
                    ?
                    <button
                        className={styles["fetch-more-images"]}
                        disabled={disableButton}
                        style={{ color: disableButton ? 'red' : "" }}
                        onClick={() => handlePageChange()}>
                        {
                            disableButton
                                ? 'NO more images to load'
                                : 'Load more images'
                        }
                    </button>
                    : null
            }
        </section >
    )
}

export default ImagePage