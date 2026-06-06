export class MeteoIndisponibleError extends Error {
    constructor(options?: { cause?: unknown }) {
      super("Impossible de récupérer la météo pour le moment.", options);
      this.name = "MeteoIndisponibleError";
    }
  }