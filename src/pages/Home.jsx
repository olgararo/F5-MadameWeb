import { Link } from "react-router-dom";
import madameWebImg from "../assets/img/img_madameWeb.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-nebula-black relative overflow-hidden">
      {/* Efectos de fondo místicos */}
      <div className="absolute inset-0">
        {/* Haces de luz de fondo */}
        <div className="absolute top-20 left-10 w-32 h-1 bg-gradient-to-r from-transparent via-sunflare-orange/30 to-transparent animate-pulse"></div>
        <div className="absolute top-40 right-20 w-40 h-0.5 bg-gradient-to-r from-transparent via-cosmic-plum/40 to-transparent animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-16 w-28 h-1 bg-gradient-to-r from-transparent via-wink-pink/25 to-transparent animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-12 w-36 h-0.5 bg-gradient-to-r from-transparent via-madame-mystic/35 to-transparent animate-pulse delay-500"></div>

        {/* Partículas flotantes */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-sunflare-orange/60 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-cosmic-plum/70 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-wink-pink/50 rounded-full animate-bounce delay-1100"></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-radiant-apricot/60 rounded-full animate-bounce delay-1500"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Título principal */}
          <div className="mb-10">
            <h1 className="text-6xl md:text-8xl font-montez text-sunflare-orange my-8 animate-pulse mystic-text">
              Madame Web
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-cosmic-plum to-transparent mx-auto animate-pulse delay-500"></div>
          </div>

          {/* Imagen principal con animaciones */}
          <div className="mb-10 flex justify-center">
            <div className="relative group">
              {/* Resplandor de fondo */}
              <div className="absolute -inset-4 bg-gradient-to-br from-sunflare-orange/20 via-cosmic-plum/20 to-madame-mystic/20 rounded-3xl blur-xl animate-pulse"></div>

              {/* Contenedor de imagen con proporción original */}
              <div className="relative aspect-[2/3] w-64 md:w-80 lg:w-96">
                <img
                  src={madameWebImg}
                  alt="Madame Web"
                  className="w-full h-full object-cover rounded-2xl shadow-2xl transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlay con efectos místicos */}
                <div className="absolute inset-0 bg-gradient-to-t from-nebula-black/40 via-transparent to-cosmic-plum/20 rounded-2xl"></div>

                {/* Brillos flotantes */}
                <div className="absolute top-4 left-4 w-3 h-3 bg-moonlight-linen/80 rounded-full animate-ping"></div>
                <div className="absolute bottom-8 right-6 w-2 h-2 bg-sunflare-orange/70 rounded-full animate-ping delay-1000"></div>
                <div className="absolute top-1/3 right-4 w-1 h-1 bg-wink-pink/90 rounded-full animate-ping delay-500"></div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mb-8">
            <Link to="/grid">
              <button className="group relative px-12 py-4 bg-gradient-to-r from-sunflare-orange to-supernova-coral rounded-full font-truculenta text-xl font-bold text-nebula-black hover:from-supernova-coral hover:to-sunflare-orange transition-all duration-500 transform hover:scale-110 hover:shadow-2xl">
                {/* Efecto de brillo en el botón */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-moonlight-linen/30 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <span className="relative z-10 tracking-wide">
                  ENTRA SI TE ATREVES
                </span>

                {/* Decoración de llamas */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-wink-pink rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity delay-200"></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-cosmic-plum rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity delay-400"></div>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Efecto de velo místico */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-nebula-black/20 pointer-events-none"></div>
    </div>
  );
}
