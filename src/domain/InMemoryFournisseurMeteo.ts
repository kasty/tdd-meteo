import type { Localisation, MeteoData } from './conseiller-meteo.types';
import type { MeteoRepository } from '../infrastructure/MeteoRepository';



export type InMemorySujetsRepository = MeteoRepository ;

export class InMemoryMeteoRepository implements MeteoRepository {
  constructor(private readonly conditions: MeteoData) {}

  async getCurrentMeteo(_lieu: Localisation) { return this.conditions }
}