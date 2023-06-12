import { TImageData } from "../Types/types";

export interface IGlobal {
    loading: boolean;
    error: string;
    showSideNav: boolean;
    toExpandImage: boolean;
    modalImageHref: string;
    modalImageTitle: string;
    activeNavElement: { isActive: boolean, activeEl: string };
}

export interface IImageData {
    allData: [object: TImageData],
}

