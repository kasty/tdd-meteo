import { OpenMeteoProvider } from "./OpenMeteoProvider";

describe('OpenMeteoProvider', () => {

  it('doit implémenter le port FournisseurMeteo', async () => {
    const mockFetch = vi.fn();
    global.fetch = mockFetch;
    mockFetch.mockResolvedValueOnce({
      json: async () => ({
        current: {
          temperature_2m: 20,
          apparent_temperature: 18,
          wind_speed_10m: 10,
          precipitation: 0,
        }
      })
    });

    const fakeUrl = "https://fake-url.com?latitude=%latitude%&longitude=%longitude%";
    const repo = new OpenMeteoProvider(fakeUrl);
    expect(repo.getCurrentMeteo).toBeDefined();
    const response = await repo.getCurrentMeteo({ latitude: 0, longitude: 0 });

    expect(response).toEqual({
      temperature: 20,
      feelLikeTemperature: 18,
      windSpeed: 10,
      precipitation: 0
    });
  });
});