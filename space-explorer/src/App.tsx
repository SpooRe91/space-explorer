import { useAppSelector } from "./App/hooks";
import { globalState } from "./redux-slices/globalSlice";

import * as component from "./all-imported-components";

function App() {

  const globalData = useAppSelector(globalState);

  return (
    <div className="main">
      {
        globalData.loading
          ?
          <component.GlobalLoader />
          : <>
            <component.NavBar />
            <component.HomePage />
            <component.ImagePage />
            <component.AboutPage />
          </>
      }
    </div>
  )
}
export default App
