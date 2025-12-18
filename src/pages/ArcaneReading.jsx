import { useState, useEffect } from "react";
import { getAllCards } from "../services/tarotService";
import cardBack from "../assets/img/img_cardback.png";

export default function ArcaneReading() {
  const [allCards, setAllCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState({
    past: null,
    present: null,
    future: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [openedCard, setOpenedCard] = useState(null);

  // Cargar todas las cartas al montar
  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        const data = await getAllCards();
        setAllCards(data);
      } catch (err) {
        setError("Error al cargar las cartas");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, []);

  // Comprobar si una carta ya está seleccionada
  const isCardSelected = (cardId) => {
    return Object.values(selectedCards).some((card) => card?.id === cardId);
  };

  // Seleccionar carta para el primer slot vacío
  const handleCardSelect = (card) => {
    if (isCardSelected(card.id)) return;

    const { past, present, future } = selectedCards;
    if (!past) {
      setSelectedCards({ ...selectedCards, past: card });
    } else if (!present) {
      setSelectedCards({ ...selectedCards, present: card });
    } else if (!future) {
      setSelectedCards({ ...selectedCards, future: card });
    }
  };

  // Revelar las cartas seleccionadas
  const handleReveal = () => {
    setRevealed(true);
  };

  // Reiniciar la lectura
  const handleReset = () => {
    setSelectedCards({ past: null, present: null, future: null });
    setRevealed(false);
    setOpenedCard(null);
  };

  const canReveal =
    selectedCards.past &&
    selectedCards.present &&
    selectedCards.future &&
    !revealed;
  const availableCards = allCards.filter((card) => !isCardSelected(card.id));

  if (loading) {
    return (
      <div className="min-h-screen bg-nebula-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sunflare-orange mx-auto mb-4"></div>
          <p className="text-moonlight-linen font-truculenta">
            Preparando el oráculo...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-nebula-black flex items-center justify-center">
        <p className="text-supernova-coral font-truculenta text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-nebula-black via-galactic-purple/30 to-nebula-black text-moonlight-linen py-8 px-4">
      {/* Header con efectos místicos */}
      <div className="text-center mb-8 relative">
        {/* Haces de luz decorativos */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-32 h-0.5 bg-gradient-to-r from-transparent via-sunflare-orange/30 to-transparent animate-pulse"></div>
          <div
            className="absolute top-2 right-1/4 w-24 h-0.5 bg-gradient-to-r from-transparent via-cosmic-plum/40 to-transparent animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
        </div>

        <h1 className="text-4xl md:text-5xl font-montez text-sunflare-orange mb-3 animate-pulse mystic-text">
          Lectura de las Tres Cartas
        </h1>
        <p className="text-radiant-apricot font-truculenta text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Descubre lo que el destino guarda tras el velo de lo desconocido
        </p>
        <p className="text-moonlight-linen/80 font-truculenta text-sm md:text-base mt-2">
          Elige tres cartas para revelar tu{" "}
          <span className="text-cosmic-plum font-medium">Pasado</span>,{" "}
          <span className="text-sunflare-orange font-medium">Presente</span> y{" "}
          <span className="text-wink-pink font-medium">Futuro</span>
        </p>

        {/* Decoración de puntos */}
        <div className="flex justify-center items-center space-x-3 mt-4">
          <div className="w-2 h-2 bg-cosmic-plum rounded-full animate-pulse"></div>
          <div
            className="w-1 h-1 bg-sunflare-orange rounded-full animate-pulse"
            style={{ animationDelay: "0.3s" }}
          ></div>
          <div
            className="w-2 h-2 bg-wink-pink rounded-full animate-pulse"
            style={{ animationDelay: "0.6s" }}
          ></div>
        </div>
      </div>

      {/* Slots de selección */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="grid grid-cols-3 gap-3 md:gap-6 px-2">
          {/* Slot Pasado */}
          <div className="text-center">
            <h3 className="text-lg md:text-2xl font-truculenta text-cosmic-plum mb-3 md:mb-4">
              ...Pasado...
            </h3>
            <div
              className={`aspect-[2/3] max-w-[140px] md:max-w-[200px] mx-auto rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-300 ${
                selectedCards.past
                  ? "bg-galactic-purple/60 border-2 border-cosmic-plum shadow-[0_0_20px_rgba(181,128,209,0.4)]"
                  : "bg-galactic-purple/30 border-2 border-dashed border-cosmic-plum/50"
              }`}
            >
              {selectedCards.past ? (
                <div className="relative w-full h-full p-2 md:p-3 group">
                  <img
                    src={
                      revealed
                        ? selectedCards.past.arcaneImage.imageSrc
                        : cardBack
                    }
                    alt={
                      revealed
                        ? selectedCards.past.arcaneName
                        : "Carta boca abajo"
                    }
                    className="w-full h-full object-cover rounded-lg cursor-pointer transition-transform duration-300 group-hover:scale-105"
                    onClick={() =>
                      revealed && setOpenedCard(selectedCards.past)
                    }
                  />
                  {revealed && (
                    <div className="absolute inset-0 bg-gradient-to-t from-nebula-black/60 to-transparent rounded-lg pointer-events-none"></div>
                  )}
                </div>
              ) : (
                <div className="text-cosmic-plum/50 text-4xl md:text-6xl">
                  ?
                </div>
              )}
            </div>
          </div>

          {/* Slot Presente */}
          <div className="text-center">
            <h3 className="text-lg md:text-2xl font-truculenta text-sunflare-orange mb-3 md:mb-4">
              ...Presente...
            </h3>
            <div
              className={`aspect-[2/3] max-w-[140px] md:max-w-[200px] mx-auto rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-300 ${
                selectedCards.present
                  ? "bg-galactic-purple/60 border-2 border-sunflare-orange shadow-[0_0_20px_rgba(255,111,60,0.4)]"
                  : "bg-galactic-purple/30 border-2 border-dashed border-sunflare-orange/50"
              }`}
            >
              {selectedCards.present ? (
                <div className="relative w-full h-full p-2 md:p-3 group">
                  <img
                    src={
                      revealed
                        ? selectedCards.present.arcaneImage.imageSrc
                        : cardBack
                    }
                    alt={
                      revealed
                        ? selectedCards.present.arcaneName
                        : "Carta boca abajo"
                    }
                    className="w-full h-full object-cover rounded-lg cursor-pointer transition-transform duration-300 group-hover:scale-105"
                    onClick={() =>
                      revealed && setOpenedCard(selectedCards.present)
                    }
                  />
                  {revealed && (
                    <div className="absolute inset-0 bg-gradient-to-t from-nebula-black/60 to-transparent rounded-lg pointer-events-none"></div>
                  )}
                </div>
              ) : (
                <div className="text-sunflare-orange/50 text-4xl md:text-6xl">
                  ?
                </div>
              )}
            </div>
          </div>

          {/* Slot Futuro */}
          <div className="text-center">
            <h3 className="text-lg md:text-2xl font-truculenta text-wink-pink mb-3 md:mb-4">
              ...Futuro...
            </h3>
            <div
              className={`aspect-[2/3] max-w-[140px] md:max-w-[200px] mx-auto rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-300 ${
                selectedCards.future
                  ? "bg-galactic-purple/60 border-2 border-wink-pink shadow-[0_0_20px_rgba(255,155,174,0.4)]"
                  : "bg-galactic-purple/30 border-2 border-dashed border-wink-pink/50"
              }`}
            >
              {selectedCards.future ? (
                <div className="relative w-full h-full p-2 md:p-3 group">
                  <img
                    src={
                      revealed
                        ? selectedCards.future.arcaneImage.imageSrc
                        : cardBack
                    }
                    alt={
                      revealed
                        ? selectedCards.future.arcaneName
                        : "Carta boca abajo"
                    }
                    className="w-full h-full object-cover rounded-lg cursor-pointer transition-transform duration-300 group-hover:scale-105"
                    onClick={() =>
                      revealed && setOpenedCard(selectedCards.future)
                    }
                  />
                  {revealed && (
                    <div className="absolute inset-0 bg-gradient-to-t from-nebula-black/60 to-transparent rounded-lg pointer-events-none"></div>
                  )}
                </div>
              ) : (
                <div className="text-wink-pink/50 text-4xl md:text-6xl">?</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
        <button
          onClick={handleReveal}
          disabled={!canReveal}
          className={`px-8 md:px-12 py-3 md:py-4 rounded-full font-truculenta text-base md:text-xl font-bold transition-all duration-500 ${
            canReveal
              ? "bg-gradient-to-r from-sunflare-orange to-supernova-coral text-nebula-black hover:from-supernova-coral hover:to-sunflare-orange hover:scale-110 hover:shadow-2xl cursor-pointer"
              : "bg-galactic-purple/30 text-moonlight-linen/50 cursor-not-allowed"
          }`}
        >
          {canReveal ? "🔮 REVELAR MI DESTINO" : "Selecciona 3 cartas"}
        </button>

        {revealed && (
          <button
            onClick={handleReset}
            className="px-6 md:px-8 py-2 md:py-3 bg-cosmic-plum/30 hover:bg-cosmic-plum/50 text-moonlight-linen rounded-full font-truculenta text-sm md:text-base transition-all duration-300 border border-cosmic-plum/50"
          >
            ✨ Nueva Lectura
          </button>
        )}
      </div>

      {/* Mazo estirado en escalera */}
      {!revealed && availableCards.length > 0 && (
        <div className="relative">
          <p className="text-center text-radiant-apricot font-truculenta text-base md:text-lg mb-6 italic">
            "Elige tu camino: cada carta es una mirada al destino"
          </p>

          <div className="deck-container">
            <div className="deck-spread">
              {availableCards.map((card, index) => (
                <div
                  key={card.id}
                  className="deck-card"
                  style={{
                    "--index": index,
                    "--total": availableCards.length,
                  }}
                  onClick={() => handleCardSelect(card)}
                >
                  <img
                    src={cardBack}
                    alt="Carta del tarot boca abajo"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  {/* Resplandor en hover */}
                  <div className="deck-card-glow"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal de detalle de carta */}
      {openedCard && (
        <div
          className="fixed inset-0 bg-nebula-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-[fadeIn_0.3s_ease]"
          onClick={() => setOpenedCard(null)}
        >
          <div
            className="bg-galactic-purple/95 border border-cosmic-plum rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-4 md:p-8 animate-[slideUp_0.35s_ease]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Imagen */}
              <div className="w-full md:w-2/5 flex-shrink-0">
                <img
                  src={openedCard.arcaneImage.imageSrc}
                  alt={openedCard.arcaneName}
                  className="w-full rounded-xl shadow-2xl"
                />
              </div>

              {/* Texto */}
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-montez text-sunflare-orange mb-4">
                  {openedCard.arcaneName}
                </h2>
                <p className="text-moonlight-linen font-truculenta leading-relaxed text-sm md:text-base mb-6">
                  {openedCard.arcaneDescription}
                </p>

                {/* Info de la Diosa */}
                {openedCard.goddessName && (
                  <div className="bg-nebula-black/40 rounded-xl p-4 mb-4">
                    <h3 className="text-lg font-truculenta text-wink-pink mb-2">
                      Diosa: {openedCard.goddessName}
                    </h3>
                    <p className="text-moonlight-linen/90 font-truculenta text-sm leading-relaxed">
                      {openedCard.goddessDescription}
                    </p>
                  </div>
                )}

                <button
                  onClick={() => setOpenedCard(null)}
                  className="w-full md:w-auto px-8 py-3 bg-sunflare-orange hover:bg-supernova-coral text-nebula-black rounded-lg font-truculenta font-bold transition-all duration-300"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Estilos CSS */}
      <style>{`
        .deck-container {
          overflow-x: auto;
          overflow-y: hidden;
          padding: 2rem 1rem;
          -webkit-overflow-scrolling: touch;
        }

        .deck-spread {
          display: flex;
          justify-content: center;
          align-items: flex-end;
          gap: 0;
          min-width: min-content;
          padding: 0 2rem;
        }

        .deck-card {
          position: relative;
          width: 100px;
          height: 160px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          transform: rotate(calc(-15deg + var(--index) * (30deg / var(--total))));
          margin-left: -70px;
          filter: brightness(0.85);
        }

        .deck-card:first-child {
          margin-left: 0;
        }

        .deck-card:hover {
          transform: rotate(calc(-15deg + var(--index) * (30deg / var(--total)))) translateY(-30px) scale(1.1);
          z-index: 10;
          filter: brightness(1.2);
        }

        .deck-card img {
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
        }

        .deck-card-glow {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,111,60,0.3), rgba(181,128,209,0.3));
          border-radius: 0.5rem;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .deck-card:hover .deck-card-glow {
          opacity: 1;
        }

        @media (min-width: 768px) {
          .deck-card {
            width: 140px;
            height: 220px;
            margin-left: -90px;
          }
        }

        @media (max-width: 767px) {
          .deck-spread {
            justify-content: flex-start;
            padding: 0 1rem;
          }

          .deck-card {
            margin-left: -60px;
            width: 80px;
            height: 130px;
          }

          .deck-card:hover {
            transform: rotate(calc(-15deg + var(--index) * (30deg / var(--total)))) translateY(-20px) scale(1.05);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .mystic-text {
          text-shadow: 
            0 0 5px rgba(255, 111, 60, 0.3),
            0 0 10px rgba(255, 111, 60, 0.2);
        }
      `}</style>
    </div>
  );
}
