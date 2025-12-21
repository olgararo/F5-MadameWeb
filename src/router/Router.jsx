import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import About from "../pages/About";
import ArcanaGrid from "../pages/ArcanaGrid";
import ArcanaDetail from "../pages/ArcanaDetail";
import ArcanaReading from "../pages/ArcanaReading";


const routerMadameWeb = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      //{ path: "/about", element: <About /> },
      { path: "/grid", element: <ArcanaGrid /> },
      { path: "/detail/:id", element: <ArcanaDetail /> },
      { path: "/reading", element: <ArcanaReading /> },
    ],
  },
]);

export default routerMadameWeb;
