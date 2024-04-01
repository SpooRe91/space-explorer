import { useAppDispatch, useAppSelector } from "./App/hooks";
import { globalState, setIsLoading } from "./redux-slices/globalSlice";
//TODO:ADD THE ARTICLES PAGE WHEN READY
import { AboutPage, HomePage, ImagePage, PoDPage } from "./Pages/index";
import { ErrorMessage, GlobalLoader, NavBar } from "./Layouts/index";
import { useEffect } from "react";
import { useLocation } from "react-router";
import "./styles/index.scss";
import sapceVideo from "./assets/space-explorer-earth-view-vid.webm";

function App() {
    const globalData = useAppSelector(globalState);
    const dispatch = useAppDispatch();
    const { hash } = useLocation();

    useEffect(() => {
        dispatch(setIsLoading(false));
    }, []);

    return (
        <div className="main" onLoad={() => (hash ? document.querySelector(hash)?.scrollIntoView() : null)}>
            <video className="videoTag" autoPlay loop muted>
                <source src={sapceVideo} type="video/webm" />
            </video>
            <NavBar />
            <>
                {globalData.loading ? (
                    <div className="loader-comp">
                        <GlobalLoader />
                    </div>
                ) : null}
                {globalData.error.error && globalData.error.page === "app" ? (
                    <ErrorMessage error={globalData.error.error} />
                ) : null}
                <HomePage />
                <ImagePage />
                {/* <ArticlesPage /> */}
                <AboutPage />
                {globalData.showPoD ? <PoDPage /> : null}
            </>
        </div>
    );
}
export default App;
