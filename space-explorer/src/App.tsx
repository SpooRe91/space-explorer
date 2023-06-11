import { useAppSelector } from "./App/hooks"
import { globalState } from "./redux-slices/globalSlice";

import * as component from "./all-imported-components";
import { Suspense } from "react";
import { useLocation } from "react-router";

function App() {

  const globalData = useAppSelector(globalState);
  const { hash } = useLocation();

  return (
    <div className="main"
      onLoad={() => hash
        ? document.querySelector(hash)?.scrollIntoView()
        : null}
    >
      <component.NavBar />
      {
        globalData.loading
          ?
          <component.GlobalLoader />
          : <>
            <Suspense>
              <component.HomePage />
              <component.ImagePage />
              <component.AboutPage />
            </Suspense>
          </>
      }
    </div>
  )
}
export default App
