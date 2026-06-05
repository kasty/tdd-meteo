import { describe, expect, it } from 'vitest';
import { InMemoryMeteoRepository } from './InMemoryFournisseurMeteo';
import type { Localisation } from './conseiller-meteo.types';

describe('createInMemoryFournisseurMeteo', () => {
  it('lists what was seeded', async () => {
    const repo = new InMemoryMeteoRepository({
          temperature: 15,
          feelLikeTemperature: 13,
          windSpeed: 10,
          precipitation: 0,
        });
    const res = await repo.getCurrentMeteo({ latitude: 0, longitude: 0 } as Localisation);
    expect(res).toEqual({
      temperature: 15,
      feelLikeTemperature: 13,
      windSpeed: 10,
      precipitation: 0,
    });
  });

  // it('assigns an id and draft status on create and stores the sujet', async () => {
  //   const repo = createInMemorySujetsRepository();
  //   const created = await repo.create({ titre: 'New' });
  //   expect(created).toMatchObject({ titre: 'New', statut: 'draft' });
  //   expect(created.id).toBeTruthy();
  //   expect(repo.sujets).toContainEqual(created);
  // });
});