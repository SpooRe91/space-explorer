import { Link } from "react-router-dom";
import styles from "./index.module.scss";
import { useRef } from "react";
import useIntersectionHook from "../../customHooks/useIntersectionHook";
import icon from "../../assets/icons/android-chrome-256x256.png";

export const AboutPage = () => {

    const divRef = useRef<HTMLDivElement>(null);
    // THIS CONTROLS WHETHER THE CURRENT REF ELEMENT IS ACTIVE, SO IT CAN APPLY STYLES TO IT
    const isActive = useIntersectionHook(divRef, '#about');

    return (
        // IF THE CURRENT REF ELEMENT IS ACTIVE, IT WILL APPLY A SPECIFIC SYLE TO IT
        <section id="about" ref={divRef} className={styles["about-container"]}>
            <div
                className={styles[isActive ? "slide-in" : "slide-out"]}
            >
                <h2 className={styles["already-reg"]}>About <span>"Space-explorer"</span></h2>
                <p className={styles["already-reg"]}>This is a personal project made with:
                </p>
                <span className={styles["emph-text"]}>
                    React, Redux, TypeScript, SCSS, ReactRouter, AXIOS, MaterialUi.
                </span>
                <p className={styles["already-reg"]}>
                    A fan page of space exploration, different articles and images from the NASA APIs.
                    If you enjoy the website, you can follow me on
                    <Link to={'https://github.com/SpooRe91'}> GitHub </Link>
                    and reach me on
                    <Link to={"https://www.linkedin.com/in/mbogdanov9110/"}> LinkedIn </Link>
                </p>
                <img
                    src={icon}
                    alt="logo"
                    className={styles[isActive ? "slide-in-img" : "slide-out-img"]} />
            </div>
        </section>

    );
}
export default AboutPage;