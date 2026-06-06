import { MeteoIndisponibleError } from "../domain/errors";
import { OpenMeteoProvider } from "./OpenMeteoProvider";

describe('OpenMeteoProvider', () => {
  const fakeUrl = "https://fake-url.com?latitude=%latitude%&longitude=%longitude%";
  let mockFetch: ReturnType<typeof vi.fn>;
  beforeEach(() => {
    vi.resetAllMocks();
    mockFetch = vi.fn();
    global.fetch = mockFetch;
  });

  it('lance une erreur si le réseau échoue', async () => {
    mockFetch.mockRejectedValueOnce(new Error('network down'));   // ← rejette, pas resolve
    const repo = new OpenMeteoProvider(fakeUrl);
     expect(repo.getCurrentMeteo({ latitude: 0, longitude: 0 })).rejects.toBeInstanceOf(MeteoIndisponibleError);
  });

  it('interroage l’API avec les bonnes coordonnées', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        current: {
          temperature_2m: 20,
          apparent_temperature: 18,
          wind_speed_10m: 10,
          precipitation: 0,
        }
      })
    });

    const repo = new OpenMeteoProvider(fakeUrl);
    await repo.getCurrentMeteo({ latitude: 12.34, longitude: 56.78 });

    expect(mockFetch).toHaveBeenCalledWith("https://fake-url.com?latitude=12.34&longitude=56.78");
  });

  it('doit tradurie la réponse en MeteoData', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        current: {
          temperature_2m: 20,
          apparent_temperature: 18,
          wind_speed_10m: 10,
          precipitation: 0,
        }
      })
    });

    const repo = new OpenMeteoProvider(fakeUrl);
    const response = await repo.getCurrentMeteo({ latitude: 0, longitude: 0 });

    expect(response).toEqual({
      temperature: 20,
      feelLikeTemperature: 18,
      windSpeed: 10,
      precipitation: 0
    });
  });

  it('doit lancer une erreur si la requête échoue', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: "Internal Server Error" 
    });

    const repo = new OpenMeteoProvider(fakeUrl);
    await expect(repo.getCurrentMeteo({ latitude: 0, longitude: 0 })).rejects.toBeInstanceOf(MeteoIndisponibleError)
  });

  it('doit lancer une erreur si la donnée est mal formatée', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        current_weather: {
          temperature_2m: 20,
          apparent_temperature: 18,
          wind_speed_10m: 10,
          precipitation: 0,
        }
      })
    });

    const repo = new OpenMeteoProvider(fakeUrl);
    await expect(repo.getCurrentMeteo({ latitude: 0, longitude: 0 })).rejects.toBeInstanceOf(MeteoIndisponibleError)
  });
});