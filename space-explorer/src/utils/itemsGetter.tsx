import { ThunkDispatch } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import { IGlobal, IImageData } from "../Interfaces and types/Interfaces/interfaces";
import { TPicOfTheDay } from "../Interfaces and types/Types/types";
import { setIsLoading, setError } from "../redux-slices/globalSlice";
import { imageSlice } from "../redux-slices/imagesSlice";
import { setArticles } from "../redux-slices/articleSlice";
import { fetchImages } from "../services/Fetch-search-images.api";
import { fetchArticles } from "../services/Fetch-articles-api";

const itemsGetter = async ({ signal, controller, imageData, searchValue, setSearchValue, dispatch, pageView }: {
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
    , pageView: string
}) => {

    dispatch(setIsLoading(true));

    const data =
        pageView === "images"
            ?
            await fetchImages(signal, controller, imageData.imagePage, searchValue)
            : await fetchArticles(signal, controller, searchValue);
    setSearchValue('');
    dispatch(setIsLoading(false));
    if (data?.length && typeof data !== "string" && !(data instanceof Error)) {

        pageView === "images"
            ? (dispatch(imageSlice.actions.setImageData(data)),
                dispatch(imageSlice.actions.setImagePage(imageData.imagePage + 1)))
            :
            dispatch(setArticles(data));
        return;
    }
    if (!data?.length && typeof data !== "string") {

        pageView === "images"
            ?
            (dispatch(imageSlice.actions.setImagePage(1)),
                dispatch(setError({ error: "Sorry, no results found!", page: pageView })),
                dispatch(imageSlice.actions.setClearImageData(true))
            )
            :
            (
                dispatch(setError({ error: "Sorry, no results found!", page: pageView })),
                dispatch(setArticles([]))
            )
        return;

    } else {

        pageView === "images"
            ? (dispatch(imageSlice.actions.setImagePage(1)),
                dispatch(setError({ error: data, page: pageView })),
                dispatch(imageSlice.actions.setClearImageData(true))
            )
            : (
                dispatch(setError({ error: data, page: pageView })),
                dispatch(setArticles([]))
            )
        return;
    }
}
export default itemsGetter;