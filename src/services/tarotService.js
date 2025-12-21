const API_BASE_URL = import.meta.env.DEV
  ? "http://localhost:3001/api"
  : "https://madame-web-api.onrender.com/api";

console.log(`Conectado a: ${API_BASE_URL}`);

/**
 * Función para obtener TODAS las cartas
 * GET /api/cards
 */
export async function getAllCards() {
  try {
    const response = await fetch(`${API_BASE_URL}/cards`);

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error("Error al obtener las cartas:", error);
    throw error;
  }
}

/**
 * Función para obtener una carta por ID
 * GET /api/cards/:id
 */
export async function getCardById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/cards/${id}`);

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const result = await response.json();
    return result.data || null;
  } catch (error) {
    console.error(`Error al obtener la carta con ID ${id}:`, error);
    throw error;
  }
}

/**
 * Función para obtener una predicción basada en 3 cartas
 * GET /api/prediction?card1=X&card2=Y&card3=Z
 * @param {number} card1Id - ID de la carta del pasado
 * @param {number} card2Id - ID de la carta del presente
 * @param {number} card3Id - ID de la carta del futuro
 */
export async function getPrediction(card1Id, card2Id, card3Id) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/prediction?card1=${card1Id}&card2=${card2Id}&card3=${card3Id}`
    );

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const result = await response.json();
    return result.data || null;
  } catch (error) {
    console.error("Error al obtener la predicción:", error);
    throw error;
  }
}
