import { BrowserRouter, Route, Routes } from "react-router-dom";
import { IndexPage } from "./pages";



function App() {


  return <BrowserRouter>
    <Routes>
      <Route element={<IndexPage/>} index/>
    </Routes>
  </BrowserRouter>
}

export default App
