import { useState, useEffect } from "react";
import { getAllCards, getPrediction } from "../services/readingService";
import cardBack from "../assets/img/img_cardback.png";
import Lottie from "lottie-react";
import crystalBallAnimation from "../assets/img/ani_crystalBall.json";

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
  const [prediction, setPrediction] = useState(null);
  const [loadingPrediction, setLoadingPrediction] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

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

  // Efecto typewriter para la predicción
  useEffect(() => {
    if (!prediction || !prediction.prediction) return;

    setDisplayedText("");
    setIsTyping(true);

    let currentIndex = 0;
    const fullText = prediction.prediction;
    const typingSpeed = 20; // Milisegundos por carácter (30ms = rápido pero legible)

    const timer = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, typingSpeed);

    return () => clearInterval(timer);
  }, [prediction]);

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

  // Revelar las cartas y obtener predicción
  const handleReveal = async () => {
    setRevealed(true);
    setLoadingPrediction(true);

    try {
      const predictionData = await getPrediction(
        selectedCards.past.id,
        selectedCards.present.id,
        selectedCards.future.id
      );
      setPrediction(predictionData);
    } catch (err) {
      console.error("Error al obtener predicción:", err);
      setError("Error al generar la predicción");
    } finally {
      setLoadingPrediction(false);
    }
  };

  // Reiniciar la lectura
  const handleReset = () => {
    setSelectedCards({ past: null, present: null, future: null });
    setRevealed(false);
    setOpenedCard(null);
    setPrediction(null);
    setError(null);
    setDisplayedText("");
    setIsTyping(false);
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
          <div className="mb-8 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
            <Lottie
              animationData={crystalBallAnimation}
              loop={true}
              className="w-full h-full"
            />
          </div>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sunflare-orange mx-auto mb-4"></div>
          <p className="text-moonlight-linen font-truculenta">
            Preparando el oráculo...
          </p>
        </div>
      </div>
    );
  }

  if (error && !prediction) {
    return (
      <div className="min-h-screen bg-nebula-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-supernova-coral font-truculenta text-lg mb-4">
            {error}
          </p>
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-sunflare-orange hover:bg-supernova-coral text-nebula-black rounded-lg font-truculenta font-bold transition-all duration-300"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-nebula-black via-galactic-purple/30 to-nebula-black text-moonlight-linen py-8 px-4">
      {/* Header con efectos místicos */}
      <div className="text-center mb-8 relative">
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
                        ? selectedCards.past.arcanaImage?.imageUrl
                        : cardBack
                    }
                    alt={
                      revealed ? selectedCards.past.name : "Carta boca abajo"
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
                        ? selectedCards.present.arcanaImage?.imageUrl
                        : cardBack
                    }
                    alt={
                      revealed ? selectedCards.present.name : "Carta boca abajo"
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
                        ? selectedCards.future.arcanaImage?.imageUrl
                        : cardBack
                    }
                    alt={
                      revealed ? selectedCards.future.name : "Carta boca abajo"
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

      {/* Loading de Predicción */}
      {loadingPrediction && (
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-galactic-purple/60 backdrop-blur-sm border border-cosmic-plum/50 rounded-2xl p-8 text-center">
            <div className="w-32 h-32 mx-auto mb-4">
              <Lottie
                animationData={crystalBallAnimation}
                loop={true}
                className="w-full h-full"
              />
            </div>
            <p className="text-radiant-apricot font-truculenta text-lg animate-pulse">
              Consultando las energías cósmicas...
            </p>
          </div>
        </div>
      )}

      {/* Predicción */}
      {prediction && !loadingPrediction && (
        <div className="max-w-4xl mx-auto mb-8 animate-[fadeIn_1s_ease-out]">
          <div className="bg-galactic-purple/80 backdrop-blur-sm border-2 border-sunflare-orange/50 rounded-3xl p-6 md:p-8 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-montez text-sunflare-orange text-center mb-6 animate-[fadeIn_0.5s_ease-out]">
              Tu Revelación
            </h2>

            <div className="space-y-6">
              {/* Predicción completa con efecto typewriter REAL */}
              <div className="bg-nebula-black/40 rounded-xl p-4 md:p-6 border-l-4 border-sunflare-orange animate-[fadeIn_0.5s_ease-out]">
                <p className="text-moonlight-linen font-truculenta leading-relaxed text-sm md:text-base whitespace-pre-line">
                  {displayedText}
                  {isTyping && <span className="typewriter-cursor">|</span>}
                </p>

                {/* La firma estilo carta mística - solo aparece cuando termina de escribir */}
                {!isTyping && (
                  <div className="mt-6 flex justify-end animate-[fadeIn_0.5s_ease-out]">
                    <div className="text-right">
                      <p className="text-xs text-moonlight-linen/40 font-truculenta uppercase tracking-widest mb-1">
                        Sellado por el destino, así que ajo y agua
                      </p>
                      <p className="text-lg md:text-3xl font-montez text-sunflare-orange">
                        fdo: Madame Web
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Energía dominante - solo aparece cuando termina de escribir */}
              {!isTyping && prediction.dominant_energy && (
                <div className="bg-gradient-to-r from-sunflare-orange/20 to-cosmic-plum/20 rounded-xl p-4 md:p-6 text-center animate-[fadeIn_0.5s_ease-out]">
                  <p className="text-radiant-apricot font-truculenta leading-relaxed text-sm md:text-base italic">
                    Energía dominante:{" "}
                    <span className="capitalize font-bold">
                      {prediction.dominant_energy}
                    </span>
                  </p>
                </div>
              )}
            </div>

            {/* Decoración - solo aparece cuando termina de escribir */}
            {!isTyping && (
              <div className="flex justify-center items-center space-x-4 mt-8 animate-[fadeIn_0.5s_ease-out]">
                <div className="w-2 h-2 bg-sunflare-orange rounded-full animate-pulse"></div>
                <div
                  className="w-1 h-1 bg-cosmic-plum rounded-full animate-pulse"
                  style={{ animationDelay: "0.3s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-wink-pink rounded-full animate-pulse"
                  style={{ animationDelay: "0.6s" }}
                ></div>
                <div
                  className="w-1 h-1 bg-madame-mystic rounded-full animate-pulse"
                  style={{ animationDelay: "0.9s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-sunflare-orange rounded-full animate-pulse"
                  style={{ animationDelay: "1.2s" }}
                ></div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mazo estirado en escalera */}
      {!revealed && availableCards.length > 0 && (
        <div className="relative">
          <p className="text-center mb-6 px-4">
            <span
              className="block text-radiant-apricot font-truculenta text-lg md:text-xl italic 
                   opacity-90 animate-[pulse_4s_infinite] hover:opacity-100 transition-opacity duration-500 
                   drop-shadow-[0_0_10px_rgba(255,111,60,0.3)]"
            >
              "Elige tres y susurra: 'Tengo el control de mi vida'. Mentir es
              gratis, adelante."
            </span>
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
              <div className="w-full md:w-2/5 flex-shrink-0">
                <img
                  src={openedCard.arcanaImage?.imageUrl}
                  alt={openedCard.name}
                  className="w-full rounded-xl shadow-2xl"
                />
              </div>

              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-montez text-sunflare-orange mb-4">
                  {openedCard.name}
                </h2>

                {openedCard.themes && (
                  <div className="mb-4">
                    <p className="text-cosmic-plum font-truculenta text-lg font-medium mb-2">
                      Temas:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {openedCard.themes.map((theme, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-nebula-black/40 text-radiant-apricot rounded-full text-base font-truculenta"
                        >
                          {theme}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mb-4">
                  <p className="text-moonlight-linen/70 font-truculenta text-lg">
                    <span className="text-wink-pink font-medium">Energía:</span>{" "}
                    {openedCard.energy}
                  </p>
                  <p className="text-moonlight-linen/70 font-truculenta text-lg">
                    <span className="text-wink-pink font-medium">Arcano:</span>{" "}
                    {openedCard.arcana} •{" "}
                    <span className="text-wink-pink font-medium">Número:</span>{" "}
                    {openedCard.number}
                  </p>
                </div>

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
          padding: 3rem 1rem 2rem 1rem; /* Padding-top aumentado para evitar corte en hover */
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

        /* Cursor parpadeante para el efecto typewriter */
        .typewriter-cursor {
          color: rgba(255, 111, 60, 0.8);
          animation: blink 0.7s infinite step-end;
          font-weight: 100;
          margin-left: 2px;
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        @media (min-width: 768px) {
          .deck-card {
            width: 140px;
            height: 220px;
            margin-left: -90px;
          }
          
          .deck-container {
            padding: 4rem 1rem 2rem 1rem; /* Más padding en desktop */
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
