import * as imageSlice from "../redux-slices/imagesSlice";
import { setError, setIsLoading } from "../redux-slices/globalSlice";

import { AnyAction } from "redux";
import { ThunkDispatch } from "@reduxjs/toolkit";

import { fetchImages } from "../services/Fetch-search-images.api";
import { IGlobal, IImageData } from "../Interfaces and types/Interfaces/interfaces";
import { TPicOfTheDay } from "../Interfaces and types/Types/types";


const formChecker = async ({ searchValue, imageData, setSearchValue, setToDisableButton, dispatch, controller, signal }: {
    searchValue: string,
    imageData: IImageData,
    setSearchValue: React.Dispatch<React.SetStateAction<string>>,
    setToDisableButton: React.Dispatch<React.SetStateAction<boolean>>,
    dispatch: ThunkDispatch<{
        globalSlice: IGlobal;
        imageSlice: IImageData;
        podSlice: TPicOfTheDay;
    }, undefined, AnyAction>,
    controller: AbortController,
    signal: AbortSignal

}) => {

    const forbiddenStrings = ['javascript', 'script', 'code', '/', ':', '<', '>', '\\'];

    if (forbiddenStrings.includes(searchValue)) {
        dispatch(setError({ error: 'This is not a valid search option!', page: 'image' }));
        dispatch(imageSlice.setClearImageData(true));
        setSearchValue('');
        return;
    }

    setToDisableButton(false);
    dispatch(imageSlice.setClearImageData(true));
    dispatch(imageSlice.setImageQueryString(searchValue));

    if (searchValue === '') {
        dispatch(setIsLoading(false));
        dispatch(setError({ error: 'Please enter your search first!', page: 'image' }));
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
        dispatch(setIsLoading(false)), dispatch(setError({ error: "Sorry, no results found!", page: 'image' }));
        return;

    } else {
        dispatch(setIsLoading(false));
        dispatch(imageSlice.setImagePage(1));
        dispatch(setIsLoading(false)), dispatch(setError(data));
        return;
    }
}

export default formChecker;