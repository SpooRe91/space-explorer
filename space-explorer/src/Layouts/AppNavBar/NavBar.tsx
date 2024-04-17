import { NavLink } from "react-router-dom";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import {
    globalState,
    setActiveNavElement,
    setIsLoading,
    setShowNav,
    setToShowPoD,
} from "../../redux-slices/globalSlice";

//SOME COMPLETE TESTING TEXT

import styles from "./NavBar.module.scss";
import icon from "../../assets/icons/android-chrome-192x192.png";
import { useState } from "react";
import useHideNavOnScroll from "../../hooks/useHideNavOnScroll";

import useDetectDevice from "../../hooks/useDetectDevice";

//--------------------------------------------------------

export const NavBar = () => {
    const globalData = useAppSelector(globalState);
    const dispatch = useAppDispatch();

    const [scrollNavUp, setToScrollNavUp] = useState<boolean>(false);
    const { currentlyIsMobile } = useDetectDevice();

    const checkIfMobile = (): void => {
        if (currentlyIsMobile) {
            dispatch(setShowNav(!globalData.showSideNav));
        }
    };

    //CUSTOM HOOK TO CONTROL THE SHOWING AND HIDING OF THE NAV BAR on SCROLL
    useHideNavOnScroll(setToScrollNavUp);

    return (
        <section
            className={styles["hiding-nav"]}
            style={scrollNavUp ? { transform: "translateY(-100%)" } : { transform: "translateY(0%)" }}
        >
            <div className={styles["main-nav-container"]}>
                <div className={styles["nav-logo-container"]}>
                    <NavLink
                        to={"/"}
                        className={styles["nav-logo-item"]}
                        onClick={() =>
                            dispatch(
                                setActiveNavElement({
                                    isActive: true,
                                    activeEl: "home",
                                })
                            )
                        }
                    >
                        <img src={icon} alt="logo" />
                        Space Explorer
                    </NavLink>
                </div>
                <nav
                    className={styles["secondary-nav-container"]}
                    style={
                        globalData.showSideNav
                            ? { transform: "translateY(0%)" }
                            : { transform: "translateY(-100%)" }
                    }
                >
                    <ul className={styles["nav-links"]} role="list">
                        <li className={styles["nav-link-item"]}>
                            <NavLink
                                aria-label="Home"
                                to={"/"}
                                className={() =>
                                    globalData.activeNavElement.activeEl.includes("home")
                                        ? styles["active"]
                                        : styles["pending"]
                                }
                                onClick={() =>
                                    dispatch(
                                        setActiveNavElement({
                                            isActive: true,
                                            activeEl: "home",
                                        })
                                    )
                                }
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className={styles["nav-link-item"]}>
                            <NavLink
                                aria-label="Gallery"
                                to={"/gallery"}
                                className={() =>
                                    globalData.activeNavElement.activeEl.includes("gallery")
                                        ? styles["active"]
                                        : styles["pending"]
                                }
                                onClick={() =>
                                    dispatch(
                                        setActiveNavElement({
                                            isActive: true,
                                            activeEl: "gallery",
                                        })
                                    )
                                }
                            >
                                Gallery
                            </NavLink>
                        </li>
                        {/* <li className={styles["nav-link-item"]}>
                            <NavLink
                                aria-label="Articles"
                                to={"/articles"}
                                className={() =>
                                    globalData.activeNavElement.activeEl.includes("articles")
                                        ? styles["active"]
                                        : styles["pending"]
                                }
                                onClick={() =>
                                    dispatch(
                                        setActiveNavElement({
                                            isActive: true,
                                            activeEl: "articles",
                                        })
                                    )
                                }
                            >
                                Articles
                            </NavLink>
                        </li> */}
                        <li className={styles["nav-link-item"]}>
                            <NavLink
                                aria-label="About"
                                to={"/about"}
                                className={() =>
                                    globalData.activeNavElement.activeEl.includes("about")
                                        ? styles["active"]
                                        : styles["pending"]
                                }
                                onClick={() =>
                                    dispatch(
                                        setActiveNavElement({
                                            isActive: true,
                                            activeEl: "about",
                                        })
                                    )
                                }
                            >
                                About
                            </NavLink>
                        </li>
                    </ul>
                    <div className={styles["nav-navbar-collapse"]}>
                        <button
                            className={styles["nav-item-pod"]}
                            onClick={() => [
                                dispatch(setToShowPoD(!globalData.showPoD)),
                                dispatch(setIsLoading(true)),
                            ]}
                        >
                            Picture of the day
                        </button>
                    </div>
                    <div className={styles["nav-toggler-contaier"]} onClick={() => checkIfMobile()}>
                        {currentlyIsMobile ? <BiDotsHorizontalRounded /> : null}
                    </div>
                </nav>
            </div>
        </section>
    );
};

export default NavBar;
