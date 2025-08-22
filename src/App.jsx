import { Outlet, Link, useLocation } from "react-router-dom";
import "./App.css";

function App() {
  const location = useLocation();

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  // Ocultar navbar en la home
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-nebula-black flex flex-col">
      {/* Navbar con animaciones místicas - Oculta en home */}
      {!isHomePage && (
        <header className="relative">
        {/* Haces de luz animados de fondo */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-2 -left-4 w-32 h-1 bg-gradient-to-r from-transparent via-sunflare-orange to-transparent opacity-30 animate-pulse"></div>
          <div className="absolute -top-1 left-20 w-24 h-0.5 bg-gradient-to-r from-transparent via-cosmic-plum to-transparent opacity-40 animate-pulse delay-1000"></div>
          <div className="absolute -top-3 right-16 w-28 h-1 bg-gradient-to-r from-transparent via-wink-pink to-transparent opacity-25 animate-pulse delay-2000"></div>
          <div className="absolute top-0 right-4 w-20 h-0.5 bg-gradient-to-r from-transparent via-supernova-coral to-transparent opacity-35 animate-pulse delay-500"></div>
        </div>
        
        {/* Navbar principal */}
        <nav className="relative z-10 bg-galactic-purple/80 backdrop-blur-sm border-b border-cosmic-plum/50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Logo/Título */}
              <Link to="/" className="group">
                <h1 className="text-4xl font-montez text-sunflare-orange group-hover:text-supernova-coral transition-colors duration-300 drop-shadow-lg">
                  Madame Web
                </h1>
                <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-sunflare-orange to-supernova-coral transition-all duration-500"></div>
              </Link>

              {/* Links de navegación */}
              <ul className="flex space-x-8">
                <li>
                  <Link 
                    to="/" 
                    className={`font-truculenta text-sm transition-all duration-300 relative group ${
                      isActiveLink('/') 
                        ? 'text-sunflare-orange' 
                        : 'text-moonlight-linen hover:text-cosmic-plum'
                    }`}
                  >
                    Inicio
                    <div className={`absolute -bottom-1 left-0 h-0.5 bg-sunflare-orange transition-all duration-300 ${
                      isActiveLink('/') ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></div>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/grid" 
                    className={`font-truculenta text-sm transition-all duration-300 relative group ${
                      isActiveLink('/grid') 
                        ? 'text-sunflare-orange' 
                        : 'text-moonlight-linen hover:text-cosmic-plum'
                    }`}
                  >
                    Arcanos & Diosas
                    <div className={`absolute -bottom-1 left-0 h-0.5 bg-sunflare-orange transition-all duration-300 ${
                      isActiveLink('/grid') ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></div>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/reading" 
                    className={`font-truculenta text-sm transition-all duration-300 relative group ${
                      isActiveLink('/reading') 
                        ? 'text-sunflare-orange' 
                        : 'text-moonlight-linen hover:text-cosmic-plum'
                    }`}
                  >
                    Lectura
                    <div className={`absolute -bottom-1 left-0 h-0.5 bg-sunflare-orange transition-all duration-300 ${
                      isActiveLink('/reading') ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></div>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/about" 
                    className={`font-truculenta text-sm transition-all duration-300 relative group ${
                      isActiveLink('/about') 
                        ? 'text-sunflare-orange' 
                        : 'text-moonlight-linen hover:text-cosmic-plum'
                    }`}
                  >
                    El Proyecto
                    <div className={`absolute -bottom-1 left-0 h-0.5 bg-sunflare-orange transition-all duration-300 ${
                      isActiveLink('/about') ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      )}

      {/* Contenido principal */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="relative mt-auto">
        {/* Haces de luz animados en el footer */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute bottom-2 left-8 w-40 h-0.5 bg-gradient-to-r from-transparent via-madame-mystic to-transparent opacity-20 animate-pulse delay-300"></div>
          <div className="absolute bottom-1 right-12 w-32 h-1 bg-gradient-to-r from-transparent via-radiant-apricot to-transparent opacity-15 animate-pulse delay-1500"></div>
          <div className="absolute bottom-3 left-1/3 w-24 h-0.5 bg-gradient-to-r from-transparent via-wink-pink to-transparent opacity-25 animate-pulse delay-800"></div>
        </div>

        {/* Footer principal */}
        <div className="relative z-10 bg-galactic-purple/90 backdrop-blur-sm border-t border-cosmic-plum/50">
          <div className="container mx-auto px-4 py-6">
            <div className="text-center space-y-2">
              <p className="font-truculenta text-moonlight-linen text-sm">
                © 2025 · Proyecto realizado por{" "}
                <span className="text-sunflare-orange font-medium">Olga Ramírez</span>{" "}
                para el Bootcamp Fullstack
              </p>
              <p className="font-truculenta text-moonlight-linen text-sm">
                <span className="text-cosmic-plum">(Femcoders – Factoría F5)</span>
              </p>
              <p className="font-truculenta text-radiant-apricot text-xs opacity-80">
                Todos los contenidos tienen fines educativos y de divulgación.
              </p>
              
              {/* Decoración mística */}
              <div className="flex justify-center items-center space-x-4 mt-4">
                <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-cosmic-plum opacity-50"></div>
                <div className="w-2 h-2 bg-sunflare-orange rounded-full animate-pulse opacity-60"></div>
                <div className="w-1 h-1 bg-wink-pink rounded-full animate-pulse delay-500 opacity-40"></div>
                <div className="w-2 h-2 bg-madame-mystic rounded-full animate-pulse delay-1000 opacity-50"></div>
                <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-cosmic-plum opacity-50"></div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
