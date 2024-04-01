import { useEffect } from "react";

export const useScrollIntoItem = (hash: string) => {
    useEffect(() => {
        if (!hash) {
            return;
        }
        const timerId = setTimeout(() => {
            const element = document.querySelector(hash);
            if (!element) {
                return;
            }
            element.id !== "home" && element.id
                ? element?.scrollIntoView({ block: "center" })
                : element.scrollIntoView({ block: "end", behavior: "smooth" });
        }, 100);



        return () => {
            clearTimeout(timerId);
        };
    }, [hash]);
};
export default useScrollIntoItem;
