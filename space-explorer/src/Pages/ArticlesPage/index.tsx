import { useRef } from "react";
import useIntersectionHook from "../../customHooks/useIntersectionHook";
import styles from "./index.module.scss";
import { ArticleCard } from "../../all-imported-components";
import { useAppSelector } from "../../App/hooks";
import { imageState } from "../../redux-slices/imagesSlice";
import { TImageData } from "../../Interfaces and types/Types/types";

const ArticlesPage = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const isActive = useIntersectionHook(divRef, "#articles");

  const imageData = useAppSelector(imageState);

  return (
    <section id="articles" className={styles["articles-main-container"]}>
      <div className={styles[isActive ? 'active-header-container' : 'inactive-header-container']}
      >
        <h2 className={styles["header"]}>
          Articles
        </h2>
        <p className={styles["sub-text"]}>
          The more you know
        </p>
      </div>
      <div ref={divRef} className={styles["articles-secondary-container"]}>
        {
          imageData?.allData[0]?.href !== ""
            ?
            imageData?.allData?.map((el: TImageData) => {
              return (
                <ArticleCard item={el} key={el.data[0].nasa_id} />
              );
            })
            : null
        }
      </div>
    </section >
  );
};

export default ArticlesPage;
