import { Link } from "react-router-dom";
import styles from "./index.module.scss";
import { useRef, useState } from "react";

export const AboutPage = () => {

    const [isVisible, setIsVisible] = useState<boolean>(false);

    const divRef = useRef<HTMLDivElement>(null);
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }),
        {
            threshold: 1,
        }
    });

    if (divRef.current)
        observer.observe(divRef.current);

    return (
        <div id="about" ref={divRef} className={styles["about-container"]}>
            <div className={styles[isVisible ? "slide-in" : "centered"]}>
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
            {/* TODO: NEED TO STYLE THIS AND ADD SOME ADDITIONAL ELEMENTS! */}
        </div>

    );
}
export default AboutPage;