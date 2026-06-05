import type { Localisation, MeteoData } from "../conseiller-meteo.types";

export interface FournisseurMeteo {
    getCurrentMeteo(lieu: Localisation): Promise<MeteoData>
  }