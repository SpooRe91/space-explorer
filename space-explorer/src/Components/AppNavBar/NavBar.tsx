import { Link, NavLink } from "react-router-dom";
import { BiDotsVerticalRounded } from 'react-icons/bi';
import styles from "./NavBar.module.scss";
import icon from "../../assets/icons/android-chrome-192x192.png";


const NavBar = () => {
    return (
        <div className={styles["main-nav-container"]}>
            <div className={styles["nav-logo-container"]}>
                <NavLink to={'/home'} className={styles["nav-logo-item"]}>
                    <img src={icon} alt="logo" />
                    Space Explorer
                </NavLink>
            </div>
            <nav className={styles["secondary-nav-container"]}>

                <ul className={styles["nav-links"]} role="list">
                    <li className={styles["nav-link-item"]}>
                        <NavLink to={"/home"}>
                            Home
                        </NavLink>
                    </li>
                    <li className={styles["nav-link-item"]}>
                        <NavLink to={"/gallery"}>
                            Gallery
                        </NavLink>
                    </li>
                    <li className={styles["nav-link-item"]}>
                        <NavLink to={"/articles"}>
                            Articles
                        </NavLink>
                    </li>
                    <li className={styles["nav-link-item"]}>
                        <NavLink to={"/about"}>
                            About
                        </NavLink>
                    </li>
                </ul>
                <div className={styles["nav-navbar-collapse"]}>
                    <Link to={'https://www.nasa.gov/'}
                        className={styles["nav-item-nasa"]}
                        rel="noreferrer"
                        target="_blank">
                        NASA
                    </Link>
                    <button className={styles["nav-item-pod"]}>
                        Picture of the day
                    </button>
                </div>
                <div className={styles["nav-toggler-contaier"]}>
                    <button className={styles["nav-toggler-item"]}><BiDotsVerticalRounded /></button>
                </div>
            </nav>
        </div>
    )
}

export default NavBar