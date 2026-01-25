import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import routerMadameWeb from './router/Router.jsx'
import CookieBanner from './components/cookieBanner/CookieBanner.jsx'
import './index.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CookieBanner />
    <RouterProvider router={routerMadameWeb} />
  </StrictMode>,
);
