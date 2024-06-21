import { useState } from "react";
import styles from "./ArticlesPage.module.scss";
import { ErrorMessage } from "@SpaceExplorer/Layouts/index";
import InteractiveArticleCard from "@SpaceExplorer/Components/ArticleCard/InteractiveArticleCard";
import { useAppSelector } from "@SpaceExplorer/App/hooks";

import { TArticleItem } from "@SpaceExplorer/Interfaces and types/Types/types";
import SearchForm from "@SpaceExplorer/Components/SearchForm/SearchForm";
import { articleState } from "@SpaceExplorer/redux-slices/articleSlice";
import { globalState } from "@SpaceExplorer/redux-slices/globalSlice";

import useGetAgentView from "@SpaceExplorer/hooks/useGetAgentView";
import { nanoid } from "@reduxjs/toolkit";

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
            <div
                className={
                    styles[isMobileWidth ? "active-header-container-mobile" : "active-header-container"]
                }
            >
                <h2 className={styles["header"]}>Articles</h2>
                <p className={styles["sub-text"]}>The more you know</p>
                <div>
                    <SearchForm {...{ setToDisableLoadButton, pageView: "articles" }} />
                </div>
            </div>
            <div className={styles["articles-secondary-container"]}>
                {(globalData.error.error && globalData.error.page === "articles") ||
                globalData.error.page === "modal" ? (
                    <div className={styles["loader-error"]}>
                        <ErrorMessage error={globalData.error.error} />
                    </div>
                ) : articleData.results?.length ? (
                    articleData.results.map((el: TArticleItem) => {
                        return <InteractiveArticleCard {...el} key={nanoid()} />;
                    })
                ) : null}
            </div>
        </section>
    );
};

export default ArticlesPage;
