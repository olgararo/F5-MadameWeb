import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import About from "../pages/About";
import ArcaneGrid from "../pages/ArcaneGrid";
import ArcaneDetail from "../pages/ArcaneDetail";
import ArcaneReading from "../pages/ArcaneReading";


const routerMadameWeb = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      //{ path: "/about", element: <About /> },
      { path: "/grid", element: <ArcaneGrid /> },
      { path: "/detail/:id", element: <ArcaneDetail /> },
      { path: "/reading", element: <ArcaneReading /> },
    ],
  },
]);

export default routerMadameWeb;
