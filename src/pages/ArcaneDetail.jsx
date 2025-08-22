import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCardById } from "../services/tarotService";

export default function ArcaneDetail() {
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
        {/* Botón de navegación */}
        <Link
          to="/grid"
          className="inline-flex items-center text-sunflare-orange hover:text-supernova-coral transition mb-6"
        >
          ← Volver a las cartas
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Imagen del Arcano */}
          <div className="space-y-6">
            <div className="bg-galactic-purple rounded-2xl p-6">
              <img
                src={card.arcaneImage.imageSrc}
                alt={card.arcaneName}
                className="w-full max-w-md mx-auto rounded-lg shadow-lg"
              />
              <div className="mt-4 text-center">
                <p className="text-xs text-radiant-apricot">
                  Imagen: {card.arcaneImage.author}
                </p>
                <p className="text-xs text-radiant-apricot opacity-70">
                  {card.arcaneImage.license}
                </p>
              </div>
            </div>
          </div>

          {/* Información del arcano */}
          <div className="space-y-6">
            <div>
              <p className="text-sunflare-orange font-truculenta text-lg">
                Arcano {card.arcaneNumber}
              </p>
              <h1 className="text-4xl font-montez text-cosmic-plum mb-4">
                {card.arcaneName}
              </h1>
              <p className="text-moonlight-linen leading-relaxed">
                {card.arcaneDescription}
              </p>
            </div>

            {/* Información de la Diosa científica */}
            <div className="bg-galactic-purple rounded-2xl p-6">
              <h2 className="text-2xl font-truculenta text-wink-pink mb-4">
                Diosa Asociada: {card.goddessName}
              </h2>

              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <img
                  src={card.goddessImage.imageSrc}
                  alt={card.goddessName}
                  className="w-32 h-32 rounded-lg object-cover mx-auto md:mx-0"
                />
                <div className="flex-1">
                  <p className="text-moonlight-linen leading-relaxed text-sm">
                    {card.goddessDescription}
                  </p>
                </div>
              </div>

              <div className="text-xs text-radiant-apricot">
                <p>Imagen: {card.goddessImage.author}</p>
                {card.goddessImage.licenseUrl && (
                  <a
                    href={card.goddessImage.licenseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-sunflare-orange transition"
                  >
                    Ver licencia
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
