import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Product from "./Pages/Product"
import Login from "./Pages/Login"
import Pricing from "./Pages/Pricing";
import HomePage from "./pages/Homepage";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./Pages/PageNotFound";
import CityList from "./components/CityList";
import City from "./components/City";
import CountriesList from "./components/CountriesList";
import Form from "./components/Form";
import { CitiesProvider } from "./contexts/CitiesContext";
function App() {
 

  return (
    <div>
      <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/product" element={<Product />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Navigate replace to="cities"/>} />
            <Route path="cities" element={<CityList />} />
            <Route path='cities/:id' element={<City />} />
            <Route path="countries" element={<CountriesList/>} />
            <Route path="form" element={<Form />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </CitiesProvider>
    </div>);
}
export default App;

