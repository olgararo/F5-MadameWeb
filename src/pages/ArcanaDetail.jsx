import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCardById } from "../services/predictionService";

export default function ArcanaDetail() {
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        setLoading(true);
        const cardData = await getCardById(id);
        setCard(cardData);
      } catch (err) {
        setError("Error al cargar los detalles de la carta");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCard();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-nebula-black flex items-center justify-center">
        <div className="text-center">
          {/* circulito animación de carga*/}
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sunflare-orange mx-auto mb-4"></div>
          <p className="text-moonlight-linen font-truculenta">
            Cargando carta...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-nebula-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-supernova-coral font-truculenta text-lg mb-4">
            {error}
          </p>
          <Link
            to="/grid"
            className="bg-sunflare-orange text-nebula-black px-6 py-2 rounded-lg font-truculenta hover:bg-supernova-coral transition"
          >
            Volver a las cartas
          </Link>
        </div>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="min-h-screen bg-nebula-black flex items-center justify-center">
        <p className="text-moonlight-linen font-truculenta">
          Carta no encontrada
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-nebula-black text-moonlight-linen">
      <div className="container mx-auto px-4 py-8">
        <Link
          to="/grid"
          className="inline-flex items-center font-truculenta text-sunflare-orange hover:text-supernova-coral transition mb-6"
        >
          ← Volver a las cartas
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Imagen del Arcano */}
          <div className="space-y-6">
            <div className="bg-galactic-purple rounded-2xl p-6">
              <img
                src={card.arcanaImage.imageUrl}
                alt={card.arcanaImage.altText}
                className="w-full max-w-md mx-auto rounded-3xl shadow-lg"
              />
              <div className="mt-4 text-center">
                <p className="text-xs text-radiant-apricot">
                  {card.arcanaImage.author}
                </p>
              </div>
            </div>
          </div>

          {/* Información del arcano */}
          <div className="space-y-6">
            <div>
              <p className="text-sunflare-orange font-truculenta text-lg">
                Arcano {card.number}
              </p>
              <h1 className="text-4xl font-montez text-cosmic-plum mb-4">
                {card.name}
              </h1>

              {/* Descripción */}
              <div className="mb-6">
                <h2 className="text-xl font-truculenta text-wink-pink mb-2">
                  Significado
                </h2>
                <p className="text-moonlight-linen leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Interpretación irónica */}
              <div className="bg-galactic-purple rounded-2xl p-6">
                <h2 className="text-xl font-truculenta text-sunflare-orange mb-2">
                  Interpretación Realista
                </h2>
                <p className="text-moonlight-linen leading-relaxed italic">
                  {card.ironicInterpretation}
                </p>
              </div>

              {/* Info adicional */}
              <div className="mt-6 space-y-2">
                <p className="text-moonlight-linen/70 font-truculenta">
                  <span className="text-wink-pink font-medium">Energía:</span>{" "}
                  {card.energy}
                </p>
                <p className="text-moonlight-linen/70 font-truculenta">
                  <span className="text-wink-pink font-medium">Arcano:</span>{" "}
                  {card.arcana}
                </p>
                {card.themes && (
                  <div className="mt-4">
                    <p className="text-wink-pink font-truculenta font-medium mb-2">
                      Temas:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {card.themes.map((theme, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-nebula-black/40 text-radiant-apricot rounded-full text-sm"
                        >
                          {theme}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* CTAs de navegación */}
        <div className="mt-12 mb-8">
          <div className="text-center mb-6">
            <div className="flex justify-center items-center space-x-4 mb-4">
              <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-cosmic-plum opacity-50"></div>
              <div className="w-2 h-2 bg-sunflare-orange rounded-full animate-pulse opacity-60"></div>
              <div className="w-1 h-1 bg-wink-pink rounded-full animate-pulse delay-500 opacity-40"></div>
              <div className="w-2 h-2 bg-madame-mystic rounded-full animate-pulse delay-1000 opacity-50"></div>
              <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-cosmic-plum opacity-50"></div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <Link to="/grid">
              <button className="group relative px-8 py-3 bg-gradient-to-r from-cosmic-plum to-madame-mystic rounded-full font-truculenta text-lg font-bold text-moonlight-linen hover:from-madame-mystic hover:to-cosmic-plum transition-all duration-500 transform hover:scale-110 hover:shadow-2xl">
                <span className="relative z-10">Ver Galería Completa</span>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-sunflare-orange rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </Link>

            <Link to="/reading">
              <button className="group relative px-8 py-3 bg-gradient-to-r from-sunflare-orange to-supernova-coral rounded-full font-truculenta text-lg font-bold text-nebula-black hover:from-supernova-coral hover:to-sunflare-orange transition-all duration-500 transform hover:scale-110 hover:shadow-2xl">
                <span className="relative z-10">Consulta el Oráculo</span>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-cosmic-plum rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
