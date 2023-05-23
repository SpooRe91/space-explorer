import { TImageData } from "../Types/types";

export interface IGlobal {
    loading: boolean;
    error: '' | null;
    showSideNav: boolean;
}

export interface IImageData {
    allData: [object: TImageData],
}

