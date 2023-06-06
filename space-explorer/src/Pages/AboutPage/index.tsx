import { Link } from "react-router-dom";
import styles from "./index.module.scss";

export const AboutPage = () => {

    return (
        //TODO: NEED TO STYLE THIS AND ADD SOME ADDITIONAL ELEMENTS!
        <>
            {/* <div className={styles["dark-bg"]} /> */}
            <div className={styles["centered"]}
                id="about"
            >
                <div className={styles["already-reg"]}>
                    <h1 className={styles["already-reg"]}>About <span>"Space-explorer"</span></h1>
                    <p className={styles["already-reg"]}>
                        This is a personal project made with React, TypeScript, SCSS, ReactRouter, AXIOS, MaterialUi.
                        Fan page of space exploration, different articles and images from the NASA APIs.
                        If you enjoy the website, you can follow me on
                        <Link to={'https://github.com/SpooRe91'}>
                            GitHub
                        </Link>
                        and reach me on
                        <Link to={"https://www.linkedin.com/in/mbogdanov9110/"}>
                            LinkedIn
                        </Link>
                    </p>
                </div>

            </div>
        </>
    );
}
export default AboutPage;