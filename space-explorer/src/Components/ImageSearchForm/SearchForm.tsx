import { ChangeEvent, FormEvent, useState } from 'react';
import styles from "./SearchForm.module.scss";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";

import { setError } from '../../redux-slices/globalSlice';
import { imageState, setImagePage } from '../../redux-slices/imagesSlice';
import { useAppSelector, useAppDispatch } from '../../App/hooks';

import formChecker from '../../utils/formChecker';
import itemsGetter from '../../utils/itemsGetter';

const SearchForm = ({ setToDisableLoadButton, pageView }:
    {
        setToDisableLoadButton: React.Dispatch<React.SetStateAction<boolean>>,
        pageView: 'images' | 'articles'
    }) => {
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
        itemsGetter({ signal, controller, imageData, searchValue, setSearchValue, dispatch, pageView });
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
            <div className={styles['main-element']}>
                <label className={styles["form-label"]}
                    htmlFor={pageView === "images" ? "search-images" : "search-articles"}>
                    <ImageSearchIcon />
                    Search {pageView === "images" ? "images" : "articles"}
                </label>
                <input
                    className={styles["form-input"]}
                    onChange={(e) => handleInput(e)}
                    type="text"
                    id={pageView === "images" ? "search-images" : "search-articles"}
                    name={pageView === "images" ? "search-images" : "search-articles"}
                    value={searchValue}
                    placeholder="e.g. sun spots"
                    pattern="[A-Za-z\d\s]*"
                    minLength={0}
                    maxLength={50}
                    autoCorrect='true'
                    required
                />
            </div>
            <input
                type="submit"
                value="search"
                disabled={disableButton}
                className={styles["form-submit-button"]}
            />
        </form>
    )
}

export default SearchForm