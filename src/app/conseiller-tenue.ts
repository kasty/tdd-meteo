import type { Localisation } from '../domain/conseiller-meteo.types';
import type { FournisseurMeteo } from '../domain/ports/fournisseur-meteo';
import { getMeteoAdvice } from '../domain/conseiller';

  /**
   * Use case : conseille une tenue pour une localisation donnée.
   *
   * Remarque l'INJECTION DE DÉPENDANCE : le use case reçoit le port `FournisseurMeteo`
   * en paramètre. Il ne fabrique JAMAIS lui-même l'adapter (pas de `new OpenMeteo...` ici).
   * → en test tu lui passes le fake, en prod tu lui passeras le vrai adapter. Même code.
   *
   * @param fournisseur  le port (fake en test, Open-Meteo en prod)
   * @param lieu         la localisation à évaluer
   * @returns            le conseil vestimentaire (string)
   */
  export async function conseillerTenue(
    fournisseur: FournisseurMeteo,
    lieu: Localisation,
  ): Promise<string> {
    const meteoData = await fournisseur.getCurrentMeteo(lieu);
    return getMeteoAdvice(meteoData);
  }