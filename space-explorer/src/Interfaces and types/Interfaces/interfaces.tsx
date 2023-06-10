import { TImageData } from "../Types/types";

export interface IGlobal {
    loading: boolean;
    error: '' | null;
    showSideNav: boolean;
    toExpandImage: boolean;
    modalImageHref: string;
    modalImageTitle: string;
}

export interface IImageData {
    allData: [object: TImageData],
}

