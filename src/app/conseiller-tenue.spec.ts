import { describe } from 'vitest';
import { InMemoryMeteoRepository } from '../domain/InMemoryFournisseurMeteo';
import { conseillerTenue } from './conseiller-tenue';

describe('conseillerTenue', () => {
  it('conseille une tenue en fonction de la météo actuelle', async () => {
    const fournisseurMeteo = new InMemoryMeteoRepository({
      temperature: 5,
      feelLikeTemperature: 3,
      windSpeed: 10,
      precipitation: 0,
    });
    const result = await conseillerTenue(fournisseurMeteo, { latitude: 0, longitude: 0 });
    expect(result).toBe('Il fait froid, il est conseillé de porter un manteau.');
  });
});