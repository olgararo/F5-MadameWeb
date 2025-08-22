import { useEffect, useState } from "react";
import { getAllCards } from "../services/tarotService";
import CardList from "../components/CardList";

export default function ArcaneGrid() {
  const [allCards, setAllCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Estados para pagination
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;

  useEffect(() => {
    const fetchCards = async () => {
        //manejo de errores con try y catch
      try {
        setLoading(true);
        const data = await getAllCards();
        setAllCards(data);
      } catch (err) {
        setError('Error al cargar las cartas. Por favor, inténtalo de nuevo.');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  // Función para hacer scroll al principio de la página
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);


  // Calcular paginación
  const totalCards = allCards.length;
  const totalPages = Math.ceil(totalCards / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentCards = allCards.slice(startIndex, endIndex);

  // Funciones de navegación con scroll al principio del todo
  const goToPrevious = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const goToNext = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };


  // Calcular rango mostrado
  const startCard = totalCards === 0 ? 0 : startIndex + 1;
  const endCard = Math.min(endIndex, totalCards);

  if (loading) {
    return (
      <main className="min-h-screen bg-nebula-black">
        <h1 className="text-center text-3xl font-truculenta text-sunflare-orange py-8">
          Arcanos y Diosas
        </h1>
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            {/* circulito animación de carga*/}
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sunflare-orange mx-auto mb-4"></div>
            <p className="text-moonlight-linen font-truculenta">Cargando cartas del tarot...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-nebula-black">
        <h1 className="text-center text-3xl font-truculenta text-sunflare-orange py-8">
          Arcanos y Diosas
        </h1>
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <p className="text-supernova-coral font-truculenta text-lg mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-sunflare-orange text-nebula-black px-6 py-2 rounded-lg font-truculenta hover:bg-supernova-coral transition"
            >
              Reintentar
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-nebula-black">
      <h1 className="text-center text-3xl font-truculenta text-supernova-coral py-8">
        Arcanos y Diosas
      </h1>
      
      <div className="text-center mb-6">
        <p className="text-moonlight-linen font-truculenta text-lg">
           Descubre los secretos del universo a través de los arcanos del tarot
          científico.
        </p>
        <p className="text-moonlight-linen/80 font-truculenta text-lg max-w-2xl mx-auto leading-relaxed">
          Cada carta revela la historia de una{" "}
          <span className="text-cosmic-plum font-medium">
            diosa de la tecnología{" "}
          </span>
          que cambió el mundo.
        </p>
      </div>

      {/* circulitos decoración */}
      <div className="text-center mb-6">
         <div className="flex justify-center items-center space-x-2 mt-2">
          <div className="w-2 h-2 bg-cosmic-plum rounded-full animate-pulse"></div>
          <div className="w-1 h-1 bg-sunflare-orange rounded-full animate-pulse delay-300"></div>
          <div className="w-2 h-2 bg-wink-pink rounded-full animate-pulse delay-600"></div>
        </div>
      </div>

      {/* Grid de cartas */}
      {currentCards.length > 0 ? (
        <CardList cards={currentCards} />
      ) : (
        <div className="text-center py-10">
          <p className="text-moonlight-linen font-truculenta">No se encontraron cartas</p>
        </div>
      )}

      {/* Controles de paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-6 py-8 mb-4">
          {/* Botón Anterior */}
          <button
            onClick={goToPrevious}
            disabled={currentPage === 1}
            className={`group relative flex items-center space-x-2 px-6 py-3 rounded-lg font-truculenta text-sm transition-all duration-300 ${
              currentPage === 1
                ? 'bg-galactic-purple/30 text-moonlight-linen/50 cursor-not-allowed'
                : 'bg-galactic-purple/60 text-moonlight-linen hover:bg-cosmic-plum/60 hover:text-sunflare-orange hover:scale-105'
            }`}
          >
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Anterior</span>
            {currentPage > 1 && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-sunflare-orange rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity"></div>
            )}
          </button>

          {/* Indicador de página actual */}
          <div className="flex items-center space-x-4">
            <div className="bg-galactic-purple/80 px-4 py-2 rounded-lg border border-cosmic-plum/50">
              <span className="text-sunflare-orange font-truculenta font-bold text-lg">
                {currentPage}
              </span>
              <span className="text-moonlight-linen/70 font-truculenta text-sm mx-2">de</span>
              <span className="text-cosmic-plum font-truculenta font-bold text-lg">
                {totalPages}
              </span>
            </div>
          </div>

          {/* Botón Siguiente */}
          <button
            onClick={goToNext}
            disabled={currentPage === totalPages}
            className={`group relative flex items-center space-x-2 px-6 py-3 rounded-lg font-truculenta text-sm transition-all duration-300 ${
              currentPage === totalPages
                ? 'bg-galactic-purple/30 text-moonlight-linen/50 cursor-not-allowed'
                : 'bg-galactic-purple/60 text-moonlight-linen hover:bg-cosmic-plum/60 hover:text-sunflare-orange hover:scale-105'
            }`}
          >
            <span>Siguiente</span>
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            {currentPage < totalPages && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-sunflare-orange rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity"></div>
            )}
          </button>
        </div>
      )}
{/* Texto indicativo paginación */}
 <div className="text-center mb-6">
        <p className="text-radiant-apricot font-truculenta text-sm">
          Mostrando {startCard}-{endCard} de {totalCards} cartas
        </p>
       
      </div>

      {/* Decoración mística inferior */}
      <div className="flex justify-center items-center space-x-6 pb-8">
        <div className="w-2 h-2 bg-sunflare-orange rounded-full animate-pulse"></div>
        <div className="w-1 h-1 bg-cosmic-plum rounded-full animate-pulse delay-300"></div>
        <div className="w-2 h-2 bg-wink-pink rounded-full animate-pulse delay-600"></div>
        <div className="w-1 h-1 bg-madame-mystic rounded-full animate-pulse delay-900"></div>
        <div className="w-2 h-2 bg-sunflare-orange rounded-full animate-pulse delay-1200"></div>
      </div>
    </main>
  );
}