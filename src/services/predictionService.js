import arcanaData from '../data/arcana.json';
import predictionsData from '../data/predictions.json';

class PredictionService {
  /**
   * Get an arcana by its ID
   */
  getArcanaById(id) {
    return arcanaData.find((arcana) => arcana.id === id) || null;
  }

  /**
   * Get all arcanas
   */
  getAllArcanas() {
    return arcanaData;
  }

  /**
   * Calculate dominant energy from 3 arcanas
   */
  calculateDominantEnergy(energies) {
    const count = energies.reduce((acc, energy) => {
      acc[energy] = (acc[energy] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(count).reduce((a, b) => (count[a] > count[b] ? a : b));
  }

  /**
   * Check if fragment conditions match criteria
   */
  matchesConditions(fragmentConditions, searchCriteria) {
    if (!fragmentConditions) return true;

    if (fragmentConditions.dominant_energy) {
      if (fragmentConditions.dominant_energy !== searchCriteria.dominant_energy) {
        return false;
      }
    }

    if (fragmentConditions.themes && searchCriteria.themes) {
      const hasMatchingTheme = fragmentConditions.themes.some((theme) =>
        searchCriteria.themes.includes(theme)
      );
      if (!hasMatchingTheme) return false;
    }

    if (
      fragmentConditions.position !== undefined &&
      searchCriteria.position !== undefined
    ) {
      if (fragmentConditions.position !== searchCriteria.position) {
        return false;
      }
    }

    if (
      fragmentConditions.energy_combination &&
      searchCriteria.energy_combination
    ) {
      const hasAllEnergies = fragmentConditions.energy_combination.every(
        (energy) => searchCriteria.energy_combination.includes(energy)
      );
      if (!hasAllEnergies) return false;
    }

    return true;
  }

  /**
   * Select a random fragment matching criteria
   */
  selectFragment(criteria) {
    const usedIds = criteria.usedIds || [];

    let candidates = predictionsData.filter(
      (f) => f.type === criteria.type && !usedIds.includes(f.id)
    );

    if (criteria.conditions) {
      const matching = candidates.filter((fragment) =>
        this.matchesConditions(fragment.conditions, criteria.conditions)
      );

      if (matching.length > 0) {
        candidates = matching;
      } else {
        const fallback = candidates.filter((f) => !f.conditions);
        if (fallback.length > 0) {
          candidates = fallback;
        }
      }
    }

    if (candidates.length === 0) return null;
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  /**
   * Generate a complete prediction from 3 arcanas
   */
  generatePrediction(card1Id, card2Id, card3Id) {
    const card1 = this.getArcanaById(card1Id);
    const card2 = this.getArcanaById(card2Id);
    const card3 = this.getArcanaById(card3Id);

    if (!card1 || !card2 || !card3) {
      throw new Error('Una o más cartas no fueron encontradas');
    }

    if (card1Id === card2Id || card1Id === card3Id || card2Id === card3Id) {
      throw new Error('Las cartas deben ser diferentes');
    }

    const energies = [card1.energy, card2.energy, card3.energy];
    const dominantEnergy = this.calculateDominantEnergy(energies);

    const usedFragmentIds = [];

    const intro = this.selectFragment({
      type: 'introduccion',
      conditions: { dominant_energy: dominantEnergy },
      usedIds: usedFragmentIds,
    });
    if (intro) usedFragmentIds.push(intro.id);

    const dev1 = this.selectFragment({
      type: 'desarrollo_carta1',
      conditions: { themes: card1.themes, position: 1 },
      usedIds: usedFragmentIds,
    });
    if (dev1) usedFragmentIds.push(dev1.id);

    const trans1 = this.selectFragment({
      type: 'transicion',
      conditions: { energy_combination: [card1.energy, card2.energy] },
      usedIds: usedFragmentIds,
    });
    if (trans1) usedFragmentIds.push(trans1.id);

    const dev2 = this.selectFragment({
      type: 'desarrollo_carta2',
      conditions: { themes: card2.themes, position: 2 },
      usedIds: usedFragmentIds,
    });
    if (dev2) usedFragmentIds.push(dev2.id);

    const trans2 = this.selectFragment({
      type: 'transicion',
      conditions: null,
      usedIds: usedFragmentIds,
    });
    if (trans2) usedFragmentIds.push(trans2.id);

    const dev3 = this.selectFragment({
      type: 'desarrollo_carta3',
      conditions: { themes: card3.themes, position: 3 },
      usedIds: usedFragmentIds,
    });
    if (dev3) usedFragmentIds.push(dev3.id);

    const ending = this.selectFragment({
      type: 'cierre',
      conditions: null,
      usedIds: usedFragmentIds,
    });
    if (ending) usedFragmentIds.push(ending.id);

    const fragments = [intro, dev1, trans1, dev2, trans2, dev3, ending];

    const cleanFragments = fragments
      .filter((f) => f !== null)
      .map((f) => ({ text: f.text.trim(), type: f.type }));

    let fullText = '';

    for (let i = 0; i < cleanFragments.length; i++) {
      const fragment = cleanFragments[i];
      const nextFragment = cleanFragments[i + 1];

      fullText += fragment.text;

      if (nextFragment) {
        const endsWithPunctuation = /[.!?]$/.test(fragment.text);
        fullText += endsWithPunctuation ? ' ' : ', ';
      }
    }

    return {
      prediction: fullText.trim(),
      cards_used: [
        { id: card1.id, name: card1.name, position: 'past' },
        { id: card2.id, name: card2.name, position: 'present' },
        { id: card3.id, name: card3.name, position: 'future' },
      ],
      dominant_energy: dominantEnergy,
    };
  }
}

// Exportar una instancia única
export default new PredictionService();
