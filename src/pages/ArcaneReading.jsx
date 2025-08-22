import Lottie from "lottie-react";
import crystalBallAnimation from "../assets/img/ani_crystalBall.json";

export default function ArcaneReading() {
  return (
    <div className="min-h-screen bg-nebula-black flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-truculenta text-sunflare-orange mb-8">
        Coming Soon...
      </h1>

      {/* Animación Lottie de Bola de Cristal con el json */}
      <div className="mb-8 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
        <Lottie
          animationData={crystalBallAnimation}
          loop={true}
          className="w-full h-full"
        />
      </div>

      <p className="text-moonlight-linen font-truculenta text-lg max-w-md">
        La magia de las lecturas místicas llegará pronto. Prepárate para
        descubrir los secretos del universo.
      </p>

      {/* Decoración puntitos animación pulsos */}
      <div className="flex items-center space-x-4 mt-8">
        <div className="w-2 h-2 bg-sunflare-orange rounded-full animate-pulse"></div>
        <div className="w-1 h-1 bg-cosmic-plum rounded-full animate-pulse delay-300"></div>
        <div className="w-2 h-2 bg-wink-pink rounded-full animate-pulse delay-600"></div>
        <div className="w-1 h-1 bg-madame-mystic rounded-full animate-pulse delay-900"></div>
        <div className="w-2 h-2 bg-sunflare-orange rounded-full animate-pulse delay-1200"></div>
      </div>
    </div>
  );
}
