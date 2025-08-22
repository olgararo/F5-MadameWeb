import { useState } from "react";
import { Link } from "react-router-dom";
import cardBack from "../assets/img/img_cardback.png"; 

const Card = ({ arcane }) => {
  // estado para controlar si está mostrando front o back
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = (e) => {
    // Si ya está girada, permitir navegación al detalle
    if (isFlipped) {
      // El Link se encargará de la navegación
      return;
    } else {
      // Si no está girada, prevenir navegación y solo girar
      e.preventDefault();
      setIsFlipped(true);
    }
  };

  return (
    <Link to={`/detail/${arcane.id}`} onClick={handleCardClick}>
      <div className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer">
        <div className="aspect-[2/3] w-full">
          <img 
            src={isFlipped ? arcane.arcaneImage.imageSrc : cardBack} 
            alt={isFlipped ? arcane.arcaneName : "Carta del tarot boca abajo"} 
            className="w-full h-full object-cover" 
          />
        </div>
        {isFlipped && (
          <div className="p-3 bg-galactic-purple text-moonlight-linen">
            <h3 className="font-truculenta text-sm font-bold">{arcane.arcaneName}</h3>
            <p className="text-xs opacity-80">Haz clic para ver detalles</p>
          </div>
        )}
      </div>
    </Link>
  );
};

export default Card;