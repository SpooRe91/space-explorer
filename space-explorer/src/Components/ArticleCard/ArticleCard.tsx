
import {
  ImageListItem,
  Typography,
} from "@mui/material";
import ShareIcon from '@mui/icons-material/Share';
// import FacebookIcon from '@mui/icons-material/Facebook';
import styles from "./ArticleCard.module.scss";
import { TArticleItem } from "../../Interfaces and types/Types/types";
import { useState } from "react";
import { Link } from "react-router-dom";

const ArticleCard: React.FC<TArticleItem> = (item) => {

  const [textCopied, setToCopy] = useState<boolean>(false);

  const handleShare = async () => {
    if (!item.id) { return }
    await navigator.clipboard.writeText(item.news_site);
    //TEXT SHOULD BE THE HREF OF THE CURRENT ARTICLE
  };

  const handleToCopyText = () => {
    setToCopy(() => true);
    const timeout = setTimeout(() => {
      setToCopy(() => false);
      clearTimeout(timeout);
    }, 300);
  }

  return (
    <div
      className={styles["article-card-wrapper"]}
    >
      <ImageListItem className={styles["article-card-li"]}>
        <div className={styles["article-img-title-container"]}>
          <Link
            to={item.news_site}
            target="_blank"
            rel="noopener"
          >
            <img
              className={styles["article-card-image"]}
              src={item.image_url}
              srcSet={item.image_url}
              alt={item.title}
              loading="lazy"
            />
          </Link>
          <h3 className={"article-card-title"}>
            {item.title}
          </h3>
          {
            item.updated_at
              ?
              <Typography>
                <span>
                  Published:
                </span> {item?.published_at.split('T')[0]}
              </Typography>
              : null
          }
          <div className={styles["article-card-button-container"]}>
            <Link
              to={item.url}
              target="_blank"
              rel="noopener"
              className={styles['card-link']}>
              Read More
            </Link>
            {/* <button
              className={styles['card-button']}
            >
              <Link
                className={styles["facebook-share"]}
                target="_blank"
                to={`https://www.facebook.com/sharer/sharer.php?u=${item.news_site}`}
              >
                <FacebookIcon />
              </Link>
            </button> */}
            <button
              className={styles['card-button']}
              onClick={() => [handleShare(), handleToCopyText()]}>
              <ShareIcon />
              {
                textCopied
                  ? <span className={styles["share-copied"]}>Copied!</span>
                  : null
              }
            </button>
          </div>
        </div>
        <article className={styles["article-card-text-container"]}>
          <p className={styles["article-card-text"]}>
            {item.summary}
          </p>
        </article>
      </ImageListItem>
    </div>
  );
};

export default ArticleCard;
