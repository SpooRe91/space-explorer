import type { RootState } from "../App/store";
import { createSlice } from "@reduxjs/toolkit";
import { TArticleData } from "../Interfaces and types/Types/types";
import { IAction } from './../Interfaces and types/Interfaces/interfaces';

const initialState: TArticleData = {
    count: null,
    next: '',
    previous: null,
    results: null,
}

export const articleSlice = createSlice({
    name: 'articleSlice',
    initialState,
    reducers: {
        setArticles: (state: TArticleData, action: IAction<string, TArticleData>) => {
            state.results = action.payload.results;
        }
    }
});

export const { setArticles } = articleSlice.actions;
export const articleState = (state: RootState) => state.articleSlice;
export default articleSlice.reducer;