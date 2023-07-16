import type { RootState } from "../App/store";
import { createSlice } from "@reduxjs/toolkit";
import { IAction, IGlobal } from "../Interfaces and types/Interfaces/interfaces";

const initialState: IGlobal = {
    loading: false,
    error: '',
    showSideNav: false,
    toExpandImage: false,
    modalImageHref: '',
    modalImageTitle: '',
    activeNavElement: {
        isActive: false,
        activeEl: ''
    },
    showPoD: false
}


export const globalActions = createSlice({
    name: 'globalSlice',
    initialState,
    reducers: {
        setIsLoading: (state: IGlobal, action: IAction<string, boolean>) => {
            state.loading = action.payload;
        },

        setError: (state: IGlobal, action: IAction<string, string>) => {
            state.error = action.payload;
        },

        setShowSideNav: (state: IGlobal, action: IAction<string, boolean>) => {
            state.showSideNav = action.payload;
        },

        setToExpandImage: (state: IGlobal,
            action: IAction<string,
                { bool: boolean, href: string | null, title: string }>) => {
            state.toExpandImage = action.payload.bool;
            state.modalImageHref = action.payload.href;
            state.modalImageTitle = action.payload.title;
        },

        setActiveNavElement: (state: IGlobal, action: IAction<string, { isActive: boolean, activeEl: string }>) => {
            state.activeNavElement.isActive = action.payload.isActive;
            state.activeNavElement.activeEl = action.payload.activeEl;
        },

        setToShowPoD: (state: IGlobal, action: IAction<string, boolean>) => {
            state.showPoD = action.payload;
        }
    }
});

export const { setIsLoading,
    setError,
    setShowSideNav,
    setToExpandImage,
    setActiveNavElement,
    setToShowPoD } = globalActions.actions;
export const globalState = (state: RootState) => state.globalSlice;
export default globalActions.reducer;