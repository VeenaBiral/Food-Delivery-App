import React from "react";
import { Provider } from "react-redux";
import { createRoot } from 'react-dom/client';
import Header from "./components/Header";
import Body from "./components/Body";
import { RouterProvider,createBrowserRouter, Outlet} from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import ResturantMenu from "./components/ResturantMenu";

const App = () => {
 return(
  <div className="app"> 
   <Header/>
   <Outlet/>
  </div>
 )
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
  {
    path:"/",
    element:<Body/>,
  },
  {
    path:"/about",
    element: <About/>
  },
  {
    path:"/contact",
    element: <Contact/>
  },
  {
    path:"/resturants/:resId",
    element: <ResturantMenu/>
  }
],
    errorElement: <Error/>
  }
])

const root = createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={appRouter} />
);

export default appRouter;
