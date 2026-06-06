import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App';
import {OpenMeteoProvider} from "../infrastructure/OpenMeteoProvider";

const openMeteoUrl = import.meta.env.VITE_URL_OPEN_METEO;
  console.log(openMeteoUrl)

  if(!openMeteoUrl) {
    throw new Error("L'URL de l'API Open Meteo n'est pas définie dans les variables d'environnement.");
  }

  const fournisseur = new OpenMeteoProvider(openMeteoUrl);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App fournisseur={fournisseur} />
  </StrictMode>,
)
