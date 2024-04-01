import { ImageListItem, Typography } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
// import FacebookIcon from '@mui/icons-material/Facebook';
import styles from "./ArticleCard.module.scss";
import { TArticleItem } from "../../Interfaces and types/Types/types";
import { useState } from "react";
import { Link } from "react-router-dom";

export const ArticleCard = ({
    id,
    news_site,
    image_url,
    title,
    updated_at,
    published_at,
    summary,
    url,
}: TArticleItem) => {
    const [textCopied, setToCopy] = useState<boolean>(false);

    const handleShare = async () => {
        if (!id) {
            return;
        }
        await navigator.clipboard.writeText(url);
        //TEXT SHOULD BE THE HREF OF THE CURRENT ARTICLE
    };

    const handleToCopyText = () => {
        setToCopy(() => true);
        const timeout = setTimeout(() => {
            setToCopy(() => false);
            clearTimeout(timeout);
        }, 300);
    };

    return (
        <div className={styles["article-card-wrapper"]}>
            <ImageListItem className={styles["article-card-li"]}>
                <div className={styles["article-img-title-container"]}>
                    <Link to={news_site} target="_blank" rel="noopener">
                        <img
                            className={styles["article-card-image"]}
                            src={image_url}
                            srcSet={image_url}
                            alt={title}
                            loading="lazy"
                        />
                    </Link>
                    <h3 className={"article-card-title"}>{title}</h3>
                    {updated_at ? (
                        <Typography>
                            <span>Published:</span> {published_at.split("T")[0]}
                        </Typography>
                    ) : null}
                    <div className={styles["article-card-button-container"]}>
                        <Link to={url} target="_blank" rel="noopener" className={styles["card-link"]}>
                            Read More
                        </Link>
                        {/* <button
              className={styles['card-button']}
            >
              <Link
                className={styles["facebook-share"]}
                target="_blank"
                to={`https://www.facebook.com/sharer/sharer.php?u=${news_site}`}
              >
                <FacebookIcon />
              </Link>
            </button> */}
                        <button
                            className={styles["card-button"]}
                            onClick={() => [handleShare(), handleToCopyText()]}
                        >
                            <ShareIcon />
                            {textCopied ? <span className={styles["share-copied"]}>Copied!</span> : null}
                        </button>
                    </div>
                </div>
                <article className={styles["article-card-text-container"]}>
                    <p className={styles["article-card-text"]}>{summary}</p>
                </article>
            </ImageListItem>
        </div>
    );
};

export default ArticleCard;
