import { Link } from "react-router-dom";
import styles from "./index.module.scss";
import { useRef } from "react";
import useIntersectionHook from "../../customHooks/useIntersectionHook";

export const AboutPage = () => {

    const divRef = useRef<HTMLDivElement>(null);
    const isActive = useIntersectionHook(divRef, 'aboutPage');

    return (
        <div id="about" ref={divRef} className={styles["about-container"]}>
            <div className={styles[isActive ? "slide-in" : "slide-out"]}>
                <h2 className={styles["already-reg"]}>About <span>"Space-explorer"</span></h2>
                <p className={styles["already-reg"]}>
                    This is a personal project made with React, TypeScript, SCSS, ReactRouter, AXIOS, MaterialUi.
                    Fan page of space exploration, different articles and images from the NASA APIs.
                    If you enjoy the website, you can follow me on
                    <Link to={'https://github.com/SpooRe91'}> GitHub </Link>
                    and reach me on
                    <Link to={"https://www.linkedin.com/in/mbogdanov9110/"}> LinkedIn </Link>
                </p>
            </div>
        </div>

    );
}
export default AboutPage;