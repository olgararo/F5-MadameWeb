
//API
const API_BASE_URL = 'https://6872278c76a5723aacd3cbb3.mockapi.io/api/v1/tarot';

// Función pra obtener TODAS las cartas
export async function getAllCards() {
  try {
    const response = await fetch(API_BASE_URL);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener las cartas:', error);
    throw error;
  }
}

// Función para obtener una carta x ID
export async function getCardById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error al obtener la carta con ID ${id}:`, error);
    throw error;
  }
}