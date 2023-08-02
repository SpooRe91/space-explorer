import { ChangeEvent, FormEvent, useState } from 'react';
import styles from "./ImageSearchForm.module.scss";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";

import { setError } from '../../redux-slices/globalSlice';
import { imageState, setImagePage } from '../../redux-slices/imagesSlice';
import { useAppSelector, useAppDispatch } from '../../App/hooks';

import formChecker from '../../utils/formChecker';
import imageGetter from '../../utils/imageGetter';

const ImageSearchForm = ({ setToDisableLoadButton }:
    { setToDisableLoadButton: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [searchValue, setSearchValue] = useState<string>("");
    const [disableButton, setToDisableButton] = useState<boolean>(false);

    const controller: AbortController = new AbortController();
    const { signal }: { signal: AbortSignal } = controller;

    const imageData = useAppSelector(imageState);
    const dispatch = useAppDispatch();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //1. !IMPORTANT helper function to check numerous input conditions
        formChecker({
            searchValue,
            setSearchValue,
            setToDisableButton,
            dispatch,
        }); //!READ POINT 1.
        //FUNCTION THAT FETCHES IMAGE BASED ON SEARCH QUERY
        imageGetter({ signal, controller, imageData, searchValue, setSearchValue, dispatch });
        setToDisableLoadButton(false);
    };

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value.toLocaleLowerCase());
        dispatch(setError({ error: "" }));
        dispatch(setImagePage(1));
    };

    return (
        <form
            className={styles["search-form"]}
            onSubmit={(e) => handleSubmit(e)}
        >
            <label className={styles["form-label"]}
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
                    placeholder="e.g. jupiter"
                    pattern="[A-Za-z\d\s]*"
                    minLength={0}
                    maxLength={50}
                    required
                />
                <input
                    type="submit"
                    value="search"
                    disabled={disableButton}
                    className={styles["form-submit-button"]}
                />
            </span>
        </form>
    )
}

export default ImageSearchForm