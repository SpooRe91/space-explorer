import { useAppSelector } from "./App/hooks"
import * as component from "./all-imported-components"
import { globalState } from "./redux-slices/globalSlice"

function App() {

  const globalData = useAppSelector(globalState);

  return (
    <>
      < component.NavBar />
      {
        globalData.loading
          ?
          <component.GlobalLoader />
          :
          <div>Page loaded</div>
      }
    </>
  )
}

export default App
