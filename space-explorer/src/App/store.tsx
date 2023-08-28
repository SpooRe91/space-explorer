import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "../redux-slices/globalSlice";
import imageSlice from "../redux-slices/imagesSlice";
import PODslice from "../redux-slices/PODslice";
import articleSlice from './../redux-slices/articleSlice';


export const store = configureStore({
    reducer: {
        globalSlice: globalSlice,
        imageSlice: imageSlice,
        podSlice: PODslice,
        articleSlice: articleSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;