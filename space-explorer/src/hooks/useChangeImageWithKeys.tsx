import { useEffect } from "react";
type ChangeImageProps = {
    handlePreviousImage: () => void;
    handleNextImage: () => void;
};

export const useChangeImageWithKeys = (props: ChangeImageProps) => {
    const { handlePreviousImage, handleNextImage } = props;

    const handleKeydown = (event: KeyboardEvent) => {
        event.key === "ArrowLeft" ? handlePreviousImage() : handleNextImage();
    };
    useEffect(() => {
        window.addEventListener("keydown", handleKeydown);

        return () => {
            window.removeEventListener("keydown", handleKeydown);
        };
    }, [handlePreviousImage, handleNextImage]);
};
export default useChangeImageWithKeys;