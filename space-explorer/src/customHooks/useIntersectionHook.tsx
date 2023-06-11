
import { useEffect, useState } from "react";
import { useAppDispatch } from "../App/hooks";
import { setActiveNavElement } from "../redux-slices/globalSlice";

const useIntersectionHook = (tragetRef: React.RefObject<HTMLElement>,
    pageName: string) => {

    const [isActive, setIsActive] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    useEffect(() => {

        const observer = new IntersectionObserver((entries) => {
            const [entry] = entries;
            setIsActive(entry.isIntersecting);
            if (entry.isIntersecting && tragetRef.current) {
                dispatch(setActiveNavElement({
                    isActive: true,
                    activeEl: pageName
                }))
            } else {
                dispatch(setActiveNavElement({
                    isActive: false,
                    activeEl: ""
                }))
            }
        },
            { threshold: 1 }
        );

        if (tragetRef.current) {
            observer.observe(tragetRef.current);
        }
        if (isActive && tragetRef.current) {
            observer.unobserve(tragetRef.current);
        }

    }, []);

    return isActive;
}
export default useIntersectionHook;