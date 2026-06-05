import { getMeteoAdvice } from './conseiller';

describe('conseiller', () => {

  it('étant donné un ressenti de 3,le conseiller recommande un manteau', () => {
    const given = {
      temperature: 5,
      feelLikeTemperature: 3,
      windSpeed: 10,
      precipitation: 0,
    };
    const then = getMeteoAdvice(given);
    expect(then).toBe('Il fait froid, il est conseillé de porter un manteau.');
  });

  it('étant donné un taux de précipitation de 5, le conseiller recommande de prendre un parapluie', () => {
    const given = {
      temperature: 15,
      feelLikeTemperature: 13,
      windSpeed: 10,
      precipitation: 5,
    };
    const then = getMeteoAdvice(given);
    expect(then).toBe('Il pleut, il est conseillé de prendre un parapluie.');
  });

  it('étant donné un taux de vent de 25, le conseiller recommande de porter une veste coupe-vent', () => {
    const given = {
      temperature: 15,
      feelLikeTemperature: 13,
      windSpeed: 25,
      precipitation: 0,
    };
    const then = getMeteoAdvice(given);
    expect(then).toBe('Il y a du vent, il est conseillé de porter une veste coupe-vent.');
  });

  it('étant donné un ressenti de 20, le conseiller recommande de ne prendre aucune précaution particulière', () => {
    const given = {
      temperature: 20,
      feelLikeTemperature: 20,
      windSpeed: 10,
      precipitation: 0,
    };
    const then = getMeteoAdvice(given);
    expect(then).toBe('Le temps est agréable, aucune précaution particulière n\'est nécessaire.');
  });

})
