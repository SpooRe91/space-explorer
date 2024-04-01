import { useEffect } from "react";
import { setShowNav } from "../redux-slices/globalSlice";
import { useAppDispatch } from "../App/hooks";
const WINDOW_WIDTH_THRESHOLD = 766;

const useHandleScreenResize = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            dispatch(setShowNav(screenWidth > WINDOW_WIDTH_THRESHOLD));
            console.log(screenWidth);
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [screen.width, screen.width]);
};
export default useHandleScreenResize;
