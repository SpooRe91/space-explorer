import ImageComponent from "./Components/ImagesComponent/ImageComponent";
import NavBar from "./Layouts/AppNavBar/NavBar";
import SideBar from "./Layouts/AppNavBar/SideBar/SideBar";
import GlobalLoader from "./Layouts/GlobalLoader/GlobalLoader";
import ImageModal from "./Components/ImageModal/ImageModal";
import { lazy } from "react";
import ErrorMessage from "./Layouts/ErrorMessage/ErrorMessage";

const HomePage = lazy(() => import('./Pages/HomePage/index'));
const ImagePage = lazy(() => import('./Pages/ImagePage/index'));
const AboutPage = lazy(() => import('./Pages/AboutPage/index'));

export {
    HomePage,
    ImagePage,
    AboutPage,
    NavBar,
    GlobalLoader,
    SideBar,
    ImageComponent,
    ImageModal,
    ErrorMessage
};