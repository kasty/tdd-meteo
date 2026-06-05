import type { Localisation, MeteoData } from "../domain/conseiller-meteo.types";
import type { FournisseurMeteo } from "../domain/ports/fournisseur-meteo";

export class MeteoRepository implements FournisseurMeteo {
  getCurrentMeteo(lieu: Localisation): Promise<MeteoData> {

    return new Promise((resolve) => {
      // Simuler une requête asynchrone pour récupérer les données météorologiques
      setTimeout(() => {
        const meteoData: MeteoData = {
          temperature: 15,
          feelLikeTemperature: 13,
          windSpeed: 10,
          precipitation: 0,
        };
        resolve(meteoData);
      }, 1000); // Simuler un délai de 1 seconde
    });
  }
}
