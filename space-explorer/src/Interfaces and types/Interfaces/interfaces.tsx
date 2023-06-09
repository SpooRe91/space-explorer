import { TImageData } from "../Types/types";

export interface IGlobal {
    loading: boolean;
    error: string;
    showSideNav: boolean;
    toExpandImage: boolean;
    modalImageHref: string;
    modalImageTitle: string;
    activeNavElement: { isActive: boolean, activeEl: string };
    showPoD: boolean;
}

export interface IImageData {
    allData: TImageData[],
    imagePage: number,
    queryString: string
}

export interface IAction<T, P> {
    readonly type: T;
    readonly payload: P;
}