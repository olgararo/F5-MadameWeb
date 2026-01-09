import { describe, it, expect } from 'vitest';
import predictionService from '../services/predictionService';

describe('PredictionService', () => {
  describe('getAllCards', () => {
    it('debería devolver 22 arcanos', () => {
      const cards = predictionService.getAllCards();
      expect(cards).toHaveLength(22);
    });

    it('cada carta debería tener las propiedades requeridas', () => {
      const cards = predictionService.getAllCards();
      cards.forEach(card => {
        expect(card).toHaveProperty('id');
        expect(card).toHaveProperty('name');
        expect(card).toHaveProperty('energy');
        expect(card).toHaveProperty('themes');
        expect(card).toHaveProperty('description');
      });
    });
  });

  describe('getCardById', () => {
    it('debería devolver la carta correcta por ID', () => {
      const card = predictionService.getCardById(1);
      expect(card).toBeDefined();
      expect(card.id).toBe(1);
      expect(card.name).toBe('El Loco');
    });

    it('debería lanzar error si la carta no existe', () => {
      expect(() => {
        predictionService.getCardById(999);
      }).toThrow('Carta con ID 999 no encontrada');
    });

    it('debería lanzar error si el ID no es un número', () => {
      expect(() => {
        predictionService.getCardById('abc');
      }).toThrow();
    });
  });

  describe('getPrediction', () => {
    it('debería generar una predicción válida con 3 cartas diferentes', () => {
      const prediction = predictionService.getPrediction(1, 5, 12);
      
      expect(prediction).toHaveProperty('prediction');
      expect(prediction).toHaveProperty('cards_used');
      expect(prediction).toHaveProperty('dominant_energy');
      
      expect(prediction.cards_used).toHaveLength(3);
      expect(typeof prediction.prediction).toBe('string');
      expect(prediction.prediction.length).toBeGreaterThan(50);
    });

    it('debería rechazar cartas duplicadas', () => {
      expect(() => {
        predictionService.getPrediction(1, 1, 5);
      }).toThrow('Las cartas deben ser diferentes');
    });

    it('debería calcular energía dominante correctamente', () => {
      // Cartas con energía positiva: 1 (El Loco), 2 (El Mago), 4 (La Emperatriz)
      const prediction = predictionService.getPrediction(1, 2, 4);
      expect(prediction.dominant_energy).toBe('positiva');
    });

    it('debería incluir las posiciones correctas (past, present, future)', () => {
      const prediction = predictionService.getPrediction(1, 5, 12);
      
      expect(prediction.cards_used[0].position).toBe('past');
      expect(prediction.cards_used[1].position).toBe('present');
      expect(prediction.cards_used[2].position).toBe('future');
    });

    it('cada ejecución debería generar predicciones diferentes (aleatoriedad)', () => {
      const pred1 = predictionService.getPrediction(1, 5, 12);
      const pred2 = predictionService.getPrediction(1, 5, 12);
      
      // Aunque usen las mismas cartas, el texto debería variar
      expect(pred1.prediction).not.toBe(pred2.prediction);
    });
  });
});
