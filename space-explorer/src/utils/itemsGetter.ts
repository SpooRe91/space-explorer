import { ItemsGetterProps } from "../Interfaces and types/Types/types";
import { setIsLoading, setError } from "../redux-slices/globalSlice";
import { imageSlice } from "../redux-slices/imagesSlice";
import { setArticles } from "../redux-slices/articleSlice";
import { fetchImages } from "../services/Fetch-search-images.api";
import { fetchArticles } from "../services/Fetch-articles-api";

/**FUNCTION THAT FETCHES IMAGE BASED ON SEARCH QUERY */
const itemsGetter = async ({
    signal,
    controller,
    imageData,
    searchValue,
    setSearchValue,
    dispatch,
    pageView
}: ItemsGetterProps) => {

    dispatch(setIsLoading(true));

    const data =
        pageView === "images"
            ?
            await fetchImages({ signal, controller, page: imageData.imagePage, queryString: searchValue })
            : await fetchArticles({ signal, controller, searchValue });
    setSearchValue('');
    dispatch(setIsLoading(false));
    if (data?.length && typeof data !== "string" && !(data instanceof Error)) {

        pageView === "images"
            ? (dispatch(imageSlice.actions.setImageData(data)),
                dispatch(imageSlice.actions.setImagePage(imageData.imagePage + 1)))
            :
            (dispatch(setArticles(data)),
                dispatch(imageSlice.actions.setImagePage(imageData.imagePage + 1)))
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