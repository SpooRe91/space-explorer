import styles from "./index.module.scss";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import RocketIcon from '@mui/icons-material/Rocket';
import { useRef } from "react";
import { NavLink } from "react-router-dom";
import useIntersectionHook from "../../customHooks/useIntersectionHook";


const HomePage = () => {

    const divRef = useRef<HTMLDivElement>(null);

    // THIS CONTROLS WHETHER THE CURRENT REF ELEMENT IS ACTIVE, SO IT CAN APPLY STYLES TO IT
    useIntersectionHook(divRef, '#home');

    return (
        <section id="home" className={styles["home-hero-section"]}>
            <div ref={divRef}
                className={styles["home-hero-container"]}
            >
                <span className={styles["background"]}></span>
                <div className={styles["home-hero-heading-container"]}>

                    <h1 className={styles["home-hero-header1"]}>
                        Space Explorer
                        <span className={styles["home-hero-icon1"]}><RocketIcon /></span>
                    </h1>

                    <h3 className={styles["home-hero-header3"]}>
                        Delve into the vast cosmos, read many topics and articles, find
                        astronomy images and videos, learn with NASA.
                    </h3>

                    <div className={styles["home-hero-small-text-container"]}>
                        <p className={styles["home-hero-small-text"]}>
                            Discover the experience
                        </p>
                        <p className={styles["home-hero-small-text"]}>
                            Go to gallery
                        </p>
                        <NavLink aria-label="Articles" to="/#gallery"
                            className={styles["home-hero-small-text-link"]}>
                            <ArrowDownwardIcon />
                        </NavLink>
                    </div>
                    <div className={styles["home-hero-image-container"]}>
                    </div>
                </div>
            </div>
        </section >
    );
};

export default HomePage;
