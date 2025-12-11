import { BrowserRouter, Route, Routes } from "react-router-dom"
import Product from "./Pages/Product"
import Pricing from "./Pages/Pricing";
import Home from "./Pages/Home";
import PageNotFound from "./Pages/PageNotFound";

function App() {
  return (
    <div>


    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="*" element={<PageNotFound/>}/>

      </Routes>
    </BrowserRouter>
    </div>);
}
export default App;

