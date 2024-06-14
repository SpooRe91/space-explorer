import { useState } from "react";
import styles from "./ArticlesPage.module.scss";
import { ErrorMessage } from "../../Layouts/index";
import { ArticleCard } from "../../Components/index";
import { useAppSelector } from "../../App/hooks";

import { TArticleItem } from "../../Interfaces and types/Types/types";
import SearchForm from "../../Components/SearchForm/SearchForm";
import { articleState } from "../../redux-slices/articleSlice";
import { globalState } from "../../redux-slices/globalSlice";

import useGetAgentView from "../../hooks/useGetAgentView";

export const ArticlesPage = () => {

    const articleData = useAppSelector(articleState);
    const globalData = useAppSelector(globalState);

    const { isMobileWidth } = useGetAgentView();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [, setToDisableLoadButton] = useState<boolean>(false);
    return (
        <section
            id="articles"
            style={{ marginTop: isMobileWidth ? "200px" : "" }}
            className={styles["articles-main-container"]}
        >
            <div className={styles["trigger"]}></div>
            <div className={styles["active-header-container"]}>
                <h2 className={styles["header"]}>Articles</h2>
                <div>
                    <SearchForm {...{ setToDisableLoadButton, pageView: "articles" }} />
                </div>
                <p className={styles["sub-text"]}>The more you know</p>
            </div>
            <div className={styles["articles-secondary-container"]}>
                {(globalData.error.error && globalData.error.page === "articles") ||
                globalData.error.page === "modal" ? (
                    <div className={styles["loader-error"]}>
                        <ErrorMessage error={globalData.error.error} />
                    </div>
                ) : articleData.results?.length ? (
                    articleData.results.map((el: TArticleItem) => {
                        return (
                            <ArticleCard
                                {...el}
                                key={el.id ? Math.random() * el.id : (Math.random() * 1000) / 5}
                            />
                        );
                    })
                ) : null}
            </div>
        </section>
    );
};

export default ArticlesPage;
