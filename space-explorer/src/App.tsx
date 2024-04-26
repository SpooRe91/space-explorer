import { useAppDispatch, useAppSelector } from "./App/hooks";
import { globalState, setIsLoading } from "./redux-slices/globalSlice";
import { AboutPage, HomePage, ImagePage, PoDPage } from "./Pages/index";
import { ErrorMessage, GlobalLoader, NavBar, NotFound } from "./Layouts/index";
import { Suspense, useEffect } from "react";
import { Route, Routes } from "react-router";
import spaceVideo from "./assets/space-explorer-earth-view-vid.webm";
import useGetAgentView from "./hooks/useGetAgentView";

function App() {
    const globalData = useAppSelector(globalState);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setIsLoading(false));
    }, [dispatch]);

    const { isMobileWidth } = useGetAgentView();

    const hasErrorOnApp = globalData.error.error && globalData.error.page === "app";

    return (
        <div className="main">
            {isMobileWidth && (
                <video className="videoTag" autoPlay loop muted>
                    <source src={spaceVideo} type="video/webm" />
                </video>
            )}
            <Suspense fallback={<GlobalLoader />}>
                <NavBar />
                {globalData.loading && (
                    <div className="loader-comp">
                        <GlobalLoader />
                    </div>
                )}
                {hasErrorOnApp ? <ErrorMessage error={globalData.error.error} /> : null}
                <Routes>
                    <Route path={"/"} Component={HomePage} />
                    <Route path="/gallery" Component={ImagePage} />
                    {/* <Route path="/articles" Component={ArticlesPage} /> */}
                    <Route path="/about" Component={AboutPage} />
                    <Route path="*" Component={NotFound} />
                </Routes>
                {globalData.showPoD ? <PoDPage /> : null}
            </Suspense>
        </div>
    );
}
export default App;
