import { useRef } from "react";
import useIntersectionHook from "../../customHooks/useIntersectionHook";
import styles from './index.module.scss'
// import { ArticleCard } from "../../all-imported-components";
// import { useAppDispatch, useAppSelector } from "../../App/hooks";
// import { imageState } from "../../redux-slices/imagesSlice";

const ArticlesPage = () => {

    const divRef = useRef<HTMLDivElement>(null);
    useIntersectionHook(divRef, '#articles');

    // const imageData = useAppSelector(imageState);
    // const dispatch = useAppDispatch();

    return (
        <section id="articles" className={styles["articles-main-container"]}>
            <div ref={divRef} className={styles["articles-secondary-container"]}>
                {/* <ArticleCard /> */}
            </div>
        </section>
    );
}

export default ArticlesPage