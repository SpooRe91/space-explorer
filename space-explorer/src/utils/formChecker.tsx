import * as imageSlice from "../redux-slices/imagesSlice";
import { setError, setIsLoading } from "../redux-slices/globalSlice";

import { AnyAction } from "redux";
import { ThunkDispatch } from "@reduxjs/toolkit";

import { IGlobal, IImageData } from "../Interfaces and types/Interfaces/interfaces";
import { TPicOfTheDay } from "../Interfaces and types/Types/types";


const formChecker = async ({ searchValue, setSearchValue, setToDisableButton, dispatch, pageView }: {
    searchValue: string,
    setSearchValue: React.Dispatch<React.SetStateAction<string>>,
    setToDisableButton: React.Dispatch<React.SetStateAction<boolean>>,
    dispatch: ThunkDispatch<{
        globalSlice: IGlobal;
        imageSlice: IImageData;
        podSlice: TPicOfTheDay;
    }, undefined, AnyAction>,
    pageView: string

}) => {

    const forbiddenStrings = ['javascript', 'script', 'code', '/', ':', '<', '>', '\\'];

    if (forbiddenStrings.includes(searchValue)) {
        dispatch(setError({ error: 'This is not a valid search option!', page: 'image' }));
        dispatch(imageSlice.setClearImageData(true));
        setSearchValue('');
        return;
    }
    if (pageView === 'images') {
        setToDisableButton(false);
        dispatch(imageSlice.setClearImageData(true));
        dispatch(imageSlice.setImageQueryString(searchValue));
    }

    if (searchValue === '') {
        dispatch(setIsLoading(false));
        dispatch(setError({ error: 'Please enter your search first!', page: 'image' }));
        dispatch(imageSlice.setImagePage(1));
        return;
    }

}

export default formChecker;