import type { Localisation, MeteoData } from "../domain/conseiller-meteo.types";
import { MeteoIndisponibleError } from "../domain/errors";
import type { FournisseurMeteo } from "../domain/ports/fournisseur-meteo";

interface OpenMeteoResponse {
    current: {
      temperature_2m: number;
      apparent_temperature: number;
      wind_speed_10m: number;
      precipitation: number;
    };
  }

export class OpenMeteoProvider implements FournisseurMeteo {
  constructor(private readonly baseUrl: string) {}
  async getCurrentMeteo(lieu: Localisation): Promise<MeteoData> {
    const apiUrl = `${this.baseUrl}`.replace('%latitude%', lieu.latitude.toString()).replace('%longitude%', lieu.longitude.toString());
    let response: Response;
    try {
      response = await fetch(apiUrl);
    } catch (error) {
      throw new MeteoIndisponibleError({ cause: error });
    }
    if (!response.ok) {
      throw new MeteoIndisponibleError({ cause: `Erreur lors de la récupération des données météo : ${response.status} ${response.statusText}` });
    }
    const data = (await response.json()) as OpenMeteoResponse;
    if(!data.current) {
      throw new MeteoIndisponibleError({ cause: `Données météo mal formatées : ${JSON.stringify(data)}` });
    }
    const { temperature_2m, apparent_temperature, wind_speed_10m, precipitation } = data.current;

    return {
      temperature: temperature_2m,
      feelLikeTemperature: apparent_temperature,
      windSpeed: wind_speed_10m,
      precipitation
    };
  }
}
