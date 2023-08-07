import { ThunkDispatch } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import { IGlobal, IImageData } from "../Interfaces and types/Interfaces/interfaces";
import { TPicOfTheDay } from "../Interfaces and types/Types/types";
import { setIsLoading, setError } from "../redux-slices/globalSlice";
import { fetchImages } from "../services/Fetch-search-images.api";
import { setImagePage, setAdditionalImageData } from "../redux-slices/imagesSlice";

const pageChanger = async ({ imageData, signal, controller, setToDisableLoadButton, dispatch }: {
    imageData: IImageData,
    signal: AbortSignal,
    controller: AbortController,
    setToDisableLoadButton: React.Dispatch<React.SetStateAction<boolean>>,
    dispatch: ThunkDispatch<{
        globalSlice: IGlobal;
        imageSlice: IImageData;
        podSlice: TPicOfTheDay;
    }, undefined, AnyAction>
}) => {
    dispatch(setIsLoading(true));
    dispatch(setImagePage(imageData.imagePage + 1));

    const data = await fetchImages(signal, controller, imageData.imagePage, imageData.queryString);

    if (data.length && typeof data !== "string") {
        dispatch(setIsLoading(false));
        dispatch(setAdditionalImageData(data));
        dispatch(setImagePage(imageData.imagePage + 1));
        return;
    }

    if (!data.length && typeof data !== "string") {
        if (imageData.imagePage) {
            setToDisableLoadButton(true);
            dispatch(setIsLoading(false));
            return;
        }
        dispatch(setImagePage(1));
        dispatch(setIsLoading(false)), dispatch(setError({ error: "Sorry, no results found!", page: 'modal' }));
        return;

    } else {
        dispatch(setIsLoading(false));
        dispatch(setImagePage(1));
        dispatch(setIsLoading(false)), dispatch(setError({ error: data, page: "modal" }));
        return;
    }
}

export default pageChanger