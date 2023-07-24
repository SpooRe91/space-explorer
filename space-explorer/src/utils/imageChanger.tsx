import { ThunkDispatch } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import { IGlobal, IImageData } from "../Interfaces and types/Interfaces/interfaces";
import { TImageData, TPicOfTheDay } from "../Interfaces and types/Types/types";
import { setIsLoading, setToExpandImage } from "../redux-slices/globalSlice";


function imageChanger({ movement, imageData, globalData, dispatch }: {
    movement: string; imageData: IImageData; globalData: IGlobal; dispatch: ThunkDispatch<{
        globalSlice: IGlobal;
        imageSlice: IImageData;
        podSlice: TPicOfTheDay;
    }, undefined, AnyAction>
}) {

    if (movement === null) { return }

    if (!imageData.allData.find(el => el.links[0]?.href === globalData.modalImageHref)) {
        dispatch(setIsLoading(false));
        return;
    }

    if (imageData.allData === undefined || imageData.allData === null) return;

    const current: TImageData | undefined =
        imageData.allData.find(el => el.links[0]?.href === globalData.modalImageHref);

    if (current === null || current === undefined) return;

    if (movement === "next") {

        const nextImgIndex: number | undefined = imageData.allData.indexOf(current) + 1;

        if (nextImgIndex < imageData.allData.length) {
            dispatch(setToExpandImage({
                bool: true,
                href: imageData.allData[nextImgIndex].links[0]?.href as keyof IGlobal,
                title: imageData.allData[nextImgIndex].data[0].title
            }));
        } else {
            dispatch(setToExpandImage({ bool: false, href: "", title: "" }));
            dispatch(setIsLoading(false));
        }
    }

    if (movement === "previous") {

        const previousIndex: number | undefined = imageData.allData.indexOf(current) - 1;

        if (imageData.allData[previousIndex] !== null &&
            imageData.allData[previousIndex] !== undefined) {
            dispatch(setToExpandImage({
                bool: true,
                href: imageData.allData[previousIndex].links[0]?.href as keyof IGlobal,
                title: imageData.allData[previousIndex].data[0].title
            }));
        } else {
            dispatch(setToExpandImage({ bool: false, href: "", title: "" }));
            dispatch(setIsLoading(false));
        }
    }
}
export default imageChanger;