import type { Localisation, MeteoData } from '../src/domain/conseiller-meteo.types';
import { MeteoIndisponibleError } from '../src/domain/errors';
import type { FournisseurMeteo } from '../src/domain/ports/fournisseur-meteo';


export class InMemoryMeteoRepository implements FournisseurMeteo {
  constructor(private readonly conditions: MeteoData, private readonly forceFailure = false,) {}

  async getCurrentMeteo(_lieu: Localisation) { 
    if (this.forceFailure) {
      throw new MeteoIndisponibleError({ cause: 'Simulated failure' });
    }
    return this.conditions
  }

  // ↓ factory : un fake qui échoue toujours, sans avoir à fournir de conditions bidon
  static inFailure(): InMemoryMeteoRepository {
    const conditionsIgnorees: MeteoData = {
      temperature: 0, feelLikeTemperature: 0, windSpeed: 0, precipitation: 0,
    };
    return new InMemoryMeteoRepository(conditionsIgnorees, true);
  }
}