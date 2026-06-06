import type { Localisation, MeteoData } from "../domain/conseiller-meteo.types";
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
    const URL = `${this.baseUrl}`.replace('%latitude%', lieu.latitude.toString()).replace('%longitude%', lieu.longitude.toString());
    const response = await fetch(URL);
    const data = (await response.json()) as OpenMeteoResponse;
    const { temperature_2m, apparent_temperature, wind_speed_10m, precipitation } = data.current;

    return {
      temperature: temperature_2m,
      feelLikeTemperature: apparent_temperature,
      windSpeed: wind_speed_10m,
      precipitation
    };
  }
}
