import { Toaster } from "react-hot-toast"
import { Pokemon } from "./Pokemon"

export const App = () => {
  return (
    <>
      <Toaster position='top-right' reverseOrder={false} />
      <Pokemon />
    </>
  )
}

export default App