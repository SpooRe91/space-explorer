import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "../redux-slices/globalSlice";
import imageSlice from "../redux-slices/imagesSlice";
import PODslice from "../redux-slices/PODslice";


export const store = configureStore({
    reducer: {
        globalSlice: globalSlice,
        imageSlice: imageSlice,
        podSlice: PODslice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;