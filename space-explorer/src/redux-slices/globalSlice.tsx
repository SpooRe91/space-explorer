import type { RootState } from "../App/store";
import { createSlice } from "@reduxjs/toolkit";
import { IGlobal } from "../Interfaces and types/Interfaces/interfaces";

const initialState: IGlobal = {
    loading: false,
    error: '',
    showSideNav: false,
    toExpandImage: false,
    modalImageHref: '',
    modalImageTitle: '',
}
type action = {
    payload: any,
    type: string
}

export const globalActions = createSlice({
    name: 'globalSlice',
    initialState,
    reducers: {
        setIsLoading: (state: IGlobal, action: action) => {
            state.loading = action.payload;
        },

        setError: (state: IGlobal, action: action) => {
            state.error = action.payload;
        },

        setShowSideNav: (state: IGlobal, action: action) => {
            state.showSideNav = action.payload;
        },

        setToExpandImage: (state: IGlobal, action: action) => {
            state.toExpandImage = action.payload.bool;
            state.modalImageHref = action.payload.href;
            state.modalImageTitle = action.payload.title;
        }
    }
});

export const { setIsLoading, setError, setShowSideNav, setToExpandImage } = globalActions.actions;
export const globalState = (state: RootState) => state.globalSlice;
export default globalActions.reducer;