import { Link, NavLink, useLocation } from "react-router-dom";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import {
  globalState,
  setIsLoading,
  setShowNav,
  setToShowPoD,
} from "../../redux-slices/globalSlice";

import styles from "./NavBar.module.scss";
import icon from "../../assets/icons/android-chrome-192x192.png";
import { useEffect } from "react";

const NavBar = () => {
  const globalData = useAppSelector(globalState);
  const dispatch = useAppDispatch();
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (pathname !== "") {
      hash.replace(hash, "");
    }
    screen.width > 766 ? dispatch(setShowNav(true)) : "";
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        window.location.hash = "";
        if (element && element.id !== "home") {
          element?.scrollIntoView();
        }
        if (element?.id === "home") {
          element?.scrollTo({ top: 160, left: 0 });
        }
      }, 0);
    }
    return () => {
      clearTimeout(0);
    };
  }, [pathname, hash, key, dispatch]);

  const checkIfMobile = (): void => {
    if (screen.width <= 766) {
      dispatch(setShowNav(!globalData.showSideNav));
    }
  };

  return (
    <div className={styles["main-nav-container"]}>
      <div className={styles["nav-logo-container"]}>
        <NavLink
          to={"/#home"}
          className={styles["nav-logo-item"]}
          onClick={() => dispatch(setToShowPoD(false))}
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
              to={"/#home"}
              onClick={() => dispatch(setToShowPoD(false))}
              className={() =>
                globalData.activeNavElement.activeEl.includes("home")
                  ? styles["active"]
                  : styles["pending"]
              }
            >
              Home
            </NavLink>
          </li>
          <li className={styles["nav-link-item"]}>
            <NavLink
              aria-label="Gallery"
              to={"/#gallery"}
              onClick={() => dispatch(setToShowPoD(false))}
              className={() =>
                globalData.activeNavElement.activeEl.includes("gallery")
                  ? styles["active"]
                  : styles["pending"]
              }
            >
              Gallery
            </NavLink>
          </li>
          {/* <li className={styles["nav-link-item"]}>
                        <NavLink aria-label="Articles" to={"/#articles"}
                            onClick={() => dispatch(setToShowPoD(false))}
                            className={() =>
                                globalData.activeNavElement.activeEl.includes("articles")
                                    ? styles["active"]
                                    : styles['pending']
                            }>
                            Articles
                        </NavLink>
                    </li> */}
          <li className={styles["nav-link-item"]}>
            <NavLink
              aria-label="About"
              to={"/#about"}
              onClick={() => dispatch(setToShowPoD(false))}
              className={() =>
                globalData.activeNavElement.activeEl.includes("about")
                  ? styles["active"]
                  : styles["pending"]
              }
            >
              About
            </NavLink>
          </li>
        </ul>
        <div className={styles["nav-navbar-collapse"]}>
          <Link
            to={"https://www.nasa.gov/"}
            className={styles["nav-item-nasa"]}
            rel="noreferrer"
            target="_blank"
          >
            NASA
          </Link>
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
        <div
          className={styles["nav-toggler-contaier"]}
          onClick={() => checkIfMobile()}
        >
          <BiDotsHorizontalRounded />
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
