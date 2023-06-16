import { useAppDispatch, useAppSelector } from "./App/hooks"
import { globalState, setIsLoading } from "./redux-slices/globalSlice";

import * as component from "./all-imported-components";
import { Suspense, useEffect } from "react";
import { useLocation } from "react-router";
import "./styles/index.scss";

function App() {

  const globalData = useAppSelector(globalState);
  const dispatch = useAppDispatch();
  const { hash } = useLocation();

  useEffect(() => {
    dispatch(setIsLoading(false));
  }, []);

  return (
    <div className="main"
      onLoad={() => hash
        ? document.querySelector(hash)?.scrollIntoView()
        : null}
    >
      <component.NavBar />
      <>
        {
          globalData.loading
            ?
            <div className="loader-comp">
              <component.GlobalLoader />
            </div>
            : null
        }
        < Suspense >
          <component.HomePage />
          <component.ImagePage />
          <component.AboutPage />
        </Suspense>
      </>
    </div >
  )
}
export default App
