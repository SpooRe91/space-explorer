import { useAppSelector } from "./App/hooks";
import { globalState } from "./redux-slices/globalSlice";

import * as component from "./all-imported-components";

function App() {

  const globalData = useAppSelector(globalState);

  return (
    <>
      < component.NavBar />
      {
        globalData.loading
          ?
          <component.GlobalLoader />
          : <>
            <component.HomePage />
            <component.ImagePage />
            <component.AboutPage />
          </>
      }

    </ >
  )
}

export default App
