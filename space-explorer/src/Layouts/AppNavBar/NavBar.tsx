import { Link, NavLink, useLocation } from "react-router-dom";
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import { globalState, setShowSideNav } from "../../redux-slices/globalSlice";

import styles from "./NavBar.module.scss";
import icon from "../../assets/icons/android-chrome-192x192.png";
import { SideBar } from "../../all-imported-components";
import { useEffect } from "react";

const NavBar = () => {

    const globalData = useAppSelector(globalState);
    const dispatch = useAppDispatch();
    const { pathname, hash, key } = useLocation();

    useEffect(() => {
        if (pathname !== '') { hash.replace(hash, "") }

        if (hash) {
            setTimeout(() => {
                const element = document.querySelector(hash);
                if (element) {
                    element?.scrollIntoView();
                }
            }, 0);
        }
        return () => {
            clearTimeout(0);
        }
    }, [pathname, hash, key]);

    return (
        <div className={styles["main-nav-container"]}>
            <div className={styles["nav-logo-container"]}>
                <NavLink to={'/#home'} className={styles["nav-logo-item"]}>
                    <img src={icon} alt="logo" />
                    Space Explorer
                </NavLink>
            </div>
            <nav className={styles["secondary-nav-container"]}>

                <ul className={styles["nav-links"]} role="list">
                    <li className={styles["nav-link-item"]}>
                        <NavLink aria-label="Home" to={"/#home"}
                            className={() =>
                                globalData.activeNavElement.activeEl.includes("homePage")
                                    ? styles["active"]
                                    : styles['pending']
                            }>
                            Home
                        </NavLink>
                    </li>
                    <li className={styles["nav-link-item"]}>
                        <NavLink aria-label="Gallery" to={"/#gallery"}
                            className={() =>
                                globalData.activeNavElement.activeEl.includes("imagePage")
                                    ? styles["active"]
                                    : styles['pending']
                            }>
                            Gallery
                        </NavLink>
                    </li>
                    <li className={styles["nav-link-item"]}>
                        <NavLink aria-label="Articles" to={"/#articles"}
                            className={() =>
                                globalData.activeNavElement.activeEl.includes("articlesPage")
                                    ? styles["active"]
                                    : styles['pending']
                            }>
                            Articles
                        </NavLink>
                    </li>
                    <li className={styles["nav-link-item"]}>
                        <NavLink aria-label="About" to={"/#about"}
                            className={() =>
                                globalData.activeNavElement.activeEl.includes("aboutPage")
                                    ? styles["active"]
                                    : styles['pending']
                            }>
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
                    <button
                        onClick={() => dispatch(setShowSideNav(!globalData.showSideNav))}
                        className={styles["nav-toggler-item"]}><BiDotsHorizontalRounded />
                    </button>
                </div>
                <div
                    className={styles[globalData.showSideNav
                        ? "nav-sidebar-container-visible"
                        : "nav-sidebar-container-hidden"]}>
                    <SideBar />
                </div>
            </nav>
        </div >
    )
}

export default NavBar