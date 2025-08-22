import { Link } from "react-router-dom";
import Card from "./Card";

export default function CardList({ cards }) {
  return (
    <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-6">
      {cards.map((card) => (
        <Card key={card.id} arcane={card} />
      ))}
    </div>
  );
}
