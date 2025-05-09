import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "./index.css";
import Layout from "./pages/layout/Layout";
import Home from "./pages/home/Home";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import Product from "./pages/product/Product";
import ProductList from "./pages/productList/ProductList";
import Dashboard from "./pages/dashboard/Dashboard";
import LandingPage from "./pages/landingpage/LandingPage";
import AddToCart from "./pages/add to cart/AddToCart";
import ProductPhone from "./component/productcomp/ProductPhone";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const routs = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
        {
        index:true,
        element:<LandingPage/>
    },
    {
        path:"Signup",
        element:<Signup/>
    },
    {
        path:"Home",
        element:<Home/>
    },
    {
        path:"ProductPhone/:id",
        element:<ProductList/>
    },
    {
        path:"Product",
        element:<Product/>
    },
    {
        path:"Product/:id",
        element:<ProductList/>
    }
    ,{
        path:"Login",
        element:<Login/>
    },
    {
        path:"Dashboard",
        element:<Dashboard/>
    }
    ,{
        path:"AddToCart",
        element:<AddToCart/>
    }
],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={routs} />
);
