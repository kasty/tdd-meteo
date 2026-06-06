import type { Localisation, MeteoData } from '../src/domain/conseiller-meteo.types';

// Local declaration to avoid depending on external path during tests
export interface FournisseurMeteo {
  getCurrentMeteo(lieu: Localisation): Promise<MeteoData>
}

export class InMemoryMeteoRepository implements FournisseurMeteo {
  constructor(private readonly conditions: MeteoData) {}

  async getCurrentMeteo(_lieu: Localisation) { return this.conditions }
}