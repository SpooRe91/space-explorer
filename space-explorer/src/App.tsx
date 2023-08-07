import { useAppDispatch, useAppSelector } from "./App/hooks";
import { globalState, setIsLoading } from "./redux-slices/globalSlice";

import * as component from "./all-imported-components";
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
    <div
      className="main"
      onLoad={() =>
        hash ? document.querySelector(hash)?.scrollIntoView() : null
      }
    >
      <video className="videoTag" autoPlay loop muted>
        <source src={sapceVideo} type="video/webm" />
      </video>
      <component.NavBar />
      <>
        {globalData.loading ? (
          <div className="loader-comp">
            <component.GlobalLoader />
          </div>
        ) : null}
        {globalData.error.error && globalData.error.page === "app" ? (
          <component.ErrorMessage error={globalData.error.error} />
        ) : null}
        <component.HomePage />
        <component.ImagePage />
        <component.ArticlesPage />
        {/* <component.AboutPage /> */}
        {globalData.showPoD ? <component.PoDPage /> : null}
      </>
    </div>
  );
}
export default App;
