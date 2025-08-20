import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";


/* import Product from './pages/Product';
import Pricing from './pages/Pricing';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import AppLayout from './pages/AppLayout';
import PageNotFound from './pages/PageNotFound'; */

const Homepage = lazy(()=>import('./pages/Homepage'));
const Product = lazy(()=>import('./pages/Product'));
const Pricing = lazy(()=>import('./pages/Pricing'));
const Login = lazy(()=>import('./pages/Login'));
const AppLayout = lazy(()=>import('./pages/AppLayout'));
const PageNotFound = lazy(()=>import('./pages/PageNotFound'));

// dist/assets/index-6fc81bc8.css   30.25 kB │ gzip:   5.06 kB
// dist/assets/index-7ff6e169.js   509.70 kB │ gzip: 148.68 kB

function App() {

  return (
<AuthProvider>
  <CitiesProvider>
    <BrowserRouter>
      <Suspense fallback={<SpinnerFullPage/>}>
        <Routes>
          <Route index element={<Homepage/>}/>
          <Route path="product" element={<Product/>}/>
          <Route path="pricing" element={<Pricing/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="app" element={
            <ProtectedRoute>
              <AppLayout/>
            </ProtectedRoute>
            }>
            <Route index element={<Navigate replace to="cities"/>}/>
            <Route path="cities" element={<CityList/>}/>
            <Route path="cities/:id" element={<City />}/>
            <Route path="countries" element={<CountryList/>}/>
            <Route path="form" element={<Form/>}/>
          </Route>
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
      </Suspense>
    </BrowserRouter>
  </CitiesProvider>
</AuthProvider>
  )
}

export default App
