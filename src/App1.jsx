import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Product from "./pages/Product"
import Login from "./pages/Login"
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage_abc";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import CityList from "./components/CityList";
import City from "./components/City";
import CountriesList from "./components/CountriesList";
import Form from "./components/Form";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRoutes from "./pages/ProtectedRoutes";
function App() {


  
  return (
    <div>
      <AuthProvider>
        <CitiesProvider>
          <BrowserRouter>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="/product" element={<Product />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
              <Route path="/app" element={<ProtectedRoutes><AppLayout /></ProtectedRoutes>}>
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path='cities/:id' element={<City />} />
                <Route path="countries" element={<CountriesList />} />
                <Route path="form" element={<Form />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CitiesProvider>
      </AuthProvider>
    </div>);
}
export default App;
