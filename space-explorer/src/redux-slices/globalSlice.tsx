import type { RootState } from "../App/store";
import { createSlice } from "@reduxjs/toolkit";
import { IGlobal } from "../Interfaces and types/Interfaces/interfaces";

const initialState: IGlobal = {
    loading: false,
    error: '',
    showSideNav: false
}

export const globalActions = createSlice({
    name: 'globalSlice',
    initialState,
    reducers: {
        setIsLoading: (state, action) => {
            state.loading = action.payload;
        },

        setError: (state, action) => {
            state.error = action.payload;
        },

        setShowSideNav: (state, action) => {
            state.showSideNav = action.payload;
        }
    }
});

export const { setIsLoading, setError, setShowSideNav } = globalActions.actions;
export const globalState = (state: RootState) => state.globalSlice;
export default globalActions.reducer;