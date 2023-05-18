import type { RootState } from "../App/store";
import { createSlice } from "@reduxjs/toolkit";
import { IGlobal } from "../Interfaces/globalInterface";

const initialState: IGlobal = {
    loading: false,
    error: ''
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
        }
    }
});

export const { setIsLoading, setError } = globalActions.actions;
export const globalState = (state: RootState) => state.globalSlice;
export default globalActions.reducer;