import { useRef, useState } from "react";
import useIntersectionHook from "../../customHooks/useIntersectionHook";
import styles from "./index.module.scss";
import { ArticleCard, ErrorMessage } from "../../all-imported-components";
import { useAppSelector } from "../../App/hooks";

import { TArticleItem } from "../../Interfaces and types/Types/types";
import SearchForm from '../../Components/SearchForm/SearchForm';
import { articleState } from "../../redux-slices/articleSlice";
import { globalState } from "../../redux-slices/globalSlice";

const ArticlesPage: React.FC = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const isActive = useIntersectionHook(divRef, "#articles");

  const articleData = useAppSelector(articleState);
  const globalData = useAppSelector(globalState);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [, setToDisableLoadButton] = useState<boolean>(false);

  return (
    <section id="articles" className={styles["articles-main-container"]}>
      <div className={styles["trigger"]} ref={divRef}></div>
      <div className={styles[isActive ? 'active-header-container' : 'inactive-header-container']}
      >
        <h2 className={styles["header"]}>
          Articles
        </h2>
        <div>
          <SearchForm {...{ setToDisableLoadButton, pageView: 'articles' }} />
        </div>
        <p className={styles["sub-text"]}>
          The more you know
        </p>
      </div>
      <div className={styles["articles-secondary-container"]}>
        {
          globalData.error.error && globalData.error.page === "articles" || globalData.error.page === "modal"
            ? <div className={styles["loader-error"]}>
              <ErrorMessage error={globalData.error.error} />
            </div>
            :
            articleData.results?.length
              ?
              articleData.results.map((el: TArticleItem) => {
                return (
                  <ArticleCard {...el} key={el.id ? Math.random() * el.id : Math.random() * 1000 / 5} />
                );
              })
              : null
        }
      </div>
    </section >
  );
};

export default ArticlesPage;
