import type { FournisseurMeteo } from '../domain/ports/fournisseur-meteo';
import type { Localisation, MeteoData } from './conseiller-meteo.types';


export class InMemoryMeteoRepository implements FournisseurMeteo {
  constructor(private readonly conditions: MeteoData) {}

  async getCurrentMeteo(_lieu: Localisation) { return this.conditions }
}