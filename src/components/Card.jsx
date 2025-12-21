import { useState } from "react";
import { Link } from "react-router-dom";
import cardBack from "../assets/img/img_cardback.png"; 

const Card = ({ arcana }) => {
  // is showing front or back
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = (e) => {
    // if front, allow going to detail
    if (isFlipped) {
      return;
    } else {
      e.preventDefault();
      setIsFlipped(true);
    }
  };

  return (
    <Link to={`/detail/${arcana.id}`} onClick={handleCardClick}>
      <div className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer w-full max-w-[180px] mx-auto">
        <div className="aspect-[2/3] w-full">
          <img 
            src={isFlipped ? arcana.arcanaImage.imageUrl : cardBack} 
            alt={isFlipped ? arcana.name : "Carta del tarot boca abajo"} 
            className="w-full h-full object-cover" 
          />
        </div>
        {isFlipped && (
          <div className="p-3 bg-galactic-purple text-moonlight-linen">
            <h3 className="font-truculenta text-base font-bold">{arcana.name}</h3>
            <p className="text-xs opacity-80">Haz clic para ver detalles</p>
          </div>
        )}
      </div>
    </Link>
  );
};

export default Card;