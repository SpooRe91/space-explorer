import { ThunkDispatch } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import { IGlobal, IImageData } from "../Interfaces and types/Interfaces/interfaces";
import { TPicOfTheDay } from "../Interfaces and types/Types/types";
import { setIsLoading, setError } from "../redux-slices/globalSlice";
import { imageSlice } from "../redux-slices/imagesSlice";
import { fetchImages } from "../services/Fetch-search-images.api";

const imageGetter = async ({ signal, controller, imageData, searchValue, setSearchValue, dispatch, }: {
    signal: AbortSignal,
    controller: AbortController,
    imageData: IImageData,
    searchValue: string,
    setSearchValue: React.Dispatch<React.SetStateAction<string>>,
    dispatch: ThunkDispatch<{
        globalSlice: IGlobal;
        imageSlice: IImageData;
        podSlice: TPicOfTheDay;
    }, undefined, AnyAction>
}) => {

    dispatch(setIsLoading(true));

    const data = await fetchImages(signal, controller, imageData.imagePage, searchValue);
    setSearchValue('');

    if (data.length && typeof data !== "string") {
        dispatch(setIsLoading(false));
        dispatch(imageSlice.actions.setImageData(data));
        dispatch(imageSlice.actions.setImagePage(imageData.imagePage + 1));
        return;
    }

    if (!data.length && typeof data !== "string") {
        dispatch(setIsLoading(false));
        dispatch(imageSlice.actions.setImagePage(1));
        dispatch(setIsLoading(false)), dispatch(setError({ error: "Sorry, no results found!", page: 'image' }));
        return;

    } else {
        dispatch(setIsLoading(false));
        dispatch(imageSlice.actions.setImagePage(1));
        dispatch(setIsLoading(false)), dispatch(setError(data));
        return;
    }
}
export default imageGetter;