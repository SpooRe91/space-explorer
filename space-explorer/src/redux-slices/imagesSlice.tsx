import type { RootState } from "../App/store";
import { createSlice } from "@reduxjs/toolkit";
import { IImageData } from "../Interfaces and types/Interfaces/interfaces";

const initialState: IImageData = {
    allData: [{
        href: '',
        data: [{
            center: '',
            date_created: '',
            description: '',
            description_508: '',
            keywords: [],
            media_type: '',
            nasa_id: '',
            secondary_creator: '',
            title: ''
        }],
        links: [{
            href: '',
            rel: '',
            render: ''
        }]
    }]
}

export const imageSlice = createSlice({
    name: 'imageSlice',
    initialState,
    reducers: {
        setImageData: (state, action) => {
            state.allData = action.payload;
        }
    }
});

export const { setImageData } = imageSlice.actions;
export const imageState = (state: RootState) => state.imageSlice;
export default imageSlice.reducer;