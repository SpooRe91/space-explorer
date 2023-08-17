
import {
  ImageListItem,
  Typography,
} from "@mui/material";
import ShareIcon from '@mui/icons-material/Share';
import FacebookIcon from '@mui/icons-material/Facebook';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import styles from "./ArticleCard.module.scss";
import { TImageData } from "../../Interfaces and types/Types/types";
import { useState } from "react";
import { Link } from "react-router-dom";

const ArticleCard = (item: { item: TImageData }) => {

  const [expand, setToExpand] = useState<boolean>(false);
  const [copy, setToCopy] = useState<boolean>(false);

  const handleShare = async () => {
    if (!item.item.links[0]) { return }
    await navigator.clipboard.writeText(item.item.links[0].href);
    //TEXT SHOULD BE THE HREF OF THE CURRENT ARTICLE
  };

  const handleExpand = () => {
    setToExpand(state => !state);
  }

  const handleToCopyText = () => {
    setToCopy(() => true);
    const timeout = setTimeout(() => {
      setToCopy(() => false);
      clearTimeout(timeout);
    }, 300);
  }

  return (
    <div className={styles["article-card-wrapper"]}
      style={
        expand
          ? { transform: 'translateX(0%)' }
          : { transform: 'translateX(67%)' }
      }
    >
      <ImageListItem className={styles["article-card-li"]}>
        <div className={styles["article-img-title-container"]}>
          <Link
            to={item.item.links[0].href}
            target="_blank"
            rel="noopener"
          >
            <img
              className={styles["article-card-image"]}
              src={item.item.links[0]?.href}
              srcSet={item.item.links[0]?.href}
              alt={item.item.data[0].title}
              loading="lazy"
            />
          </Link>
          <h3 className={"article-card-title"}>
            {item.item.data[0].title}
          </h3>
          {
            item.item.data[0].secondary_creator
              ?
              <Typography>
                <span>
                  Created by:
                </span> {item.item.data[0].secondary_creator}
              </Typography>
              : null
          }
          <div className={styles["article-card-button-container"]}>
            <button
              className={styles['card-button']}
              onClick={() => handleExpand()}
              style={
                expand
                  ? {
                    backgroundColor: '#4990be96',
                    transform: 'rotate(0deg)'
                  }
                  : {
                    backgroundColor: '',
                    transform: 'rotate(180deg)'
                  }
              }>
              <ArrowForwardIcon />
            </button>
            <button
              className={styles['card-button']}
              onClick={() => [handleShare(), handleToCopyText()]}>
              <ShareIcon />
              {
                copy
                  ? <span className={styles["share-copied"]}>Copied!</span>
                  : null
              }
            </button>
            <button
              className={styles['card-button']}
            >
              <Link
                className={styles["facebook-share"]}
                target="_blank"
                to={`https://www.facebook.com/sharer/sharer.php?u=${item.item.links[0].href}`}
              >
                <FacebookIcon />
              </Link>
            </button>
          </div>
        </div>
        <article className={styles["article-card-text-container"]}>
          <p className={styles["article-card-text"]}>
            {item.item.data[0].description}
          </p>
        </article>
      </ImageListItem>
    </div>
  );
};

export default ArticleCard;
