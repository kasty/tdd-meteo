import type { MeteoData } from './conseiller-meteo.types';

export function getMeteoAdvice(data: MeteoData): string {
  const { temperature, feelLikeTemperature, windSpeed, precipitation } = data;

  if (temperature < 10 || feelLikeTemperature < 10) {
    return 'Il fait froid, il est conseillé de porter un manteau.';
  }

  if (precipitation > 0) {
    return 'Il pleut, il est conseillé de prendre un parapluie.';
  }

  if (windSpeed > 20) {
    return 'Il y a du vent, il est conseillé de porter une veste coupe-vent.';
  }

  return 'Le temps est agréable, aucune précaution particulière n\'est nécessaire.';
}