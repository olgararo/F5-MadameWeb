import { useEffect, useState } from "react";
import { getAllCards } from "../services/tarotService";
import CardList from "../components/CardList";

export default function ArcaneGrid() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCards = async () => {
      //manejo de errores con try y catch
      try {
        setLoading(true);
        const data = await getAllCards();
        setCards(data);
      } catch (err) {
        setError("Error al cargar las cartas. Por favor, inténtalo de nuevo.");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

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
            <p className="text-moonlight-linen font-truculenta">
              Cargando cartas del tarot...
            </p>
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
            <p className="text-supernova-coral font-truculenta text-lg mb-4">
              {error}
            </p>
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
      <h1 className="text-center text-3xl font-truculenta text-sunflare-orange py-8">
        Arcanos y Diosas
      </h1>
      <div className="text-center mb-6">
        <p className="text-moonlight-linen/80 font-truculenta text-lg max-w-2xl mx-auto leading-relaxed">
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
      {cards.length > 0 ? (
        <CardList cards={cards} />
      ) : (
        <div className="text-center py-10">
          <p className="text-moonlight-linen font-truculenta">
            No se encontraron cartas
          </p>
        </div>
      )}
    </main>
  );
}
