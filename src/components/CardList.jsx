import { Link } from "react-router-dom";
import Card from "./Card";

export default function CardList({ cards }) {
  return (
    <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 px-6 sm:px-12 max-w-4xl mx-auto">
      {cards.map((card) => (
        <Card key={card.id} arcane={card} />
      ))}
    </div>
  );
}
