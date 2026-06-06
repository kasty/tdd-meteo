import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FormMeteo from './FormMeteo'
import { InMemoryMeteoRepository } from '../../../tests/InMemoryFournisseurMeteo'
import type { MeteoData } from '../../domain/conseiller-meteo.types';
import type { FournisseurMeteo } from '../../domain/ports/fournisseur-meteo';

  describe('FormMeteo', () => {
    it('affiche un conseil après soumission du formulaire', async () => {
      const fournisseurMeteo = new InMemoryMeteoRepository({
        temperature: 3,
        feelLikeTemperature: 3,
        windSpeed: 10,
        precipitation: 0,
      });

      render(<FormMeteo fournisseur={fournisseurMeteo} />);

      await userEvent.type(screen.getByLabelText(/latitude/i), '48.8566');
      await userEvent.type(screen.getByLabelText(/longitude/i), '2.3522');
      await userEvent.click(screen.getByRole('button', { name: /Conseille moi/i }));

      expect(await screen.findByText(/manteau/i)).toBeInTheDocument();
    });

    it('affiche un message d\'erreur en cas de problème avec le fournisseur météo', async () => {
      const fournisseurMeteo = InMemoryMeteoRepository.inFailure();
      render(<FormMeteo fournisseur={fournisseurMeteo} />);

      await userEvent.type(screen.getByLabelText(/latitude/i), '48.8566');
      await userEvent.type(screen.getByLabelText(/longitude/i), '2.3522');
      await userEvent.click(screen.getByRole('button', { name: /Conseille moi/i }));

      expect(await screen.findByText(/erreur/i)).toBeInTheDocument();
    });

    it('affiche un message de chargement pendant la récupération des données météo', async () => {
      let resolvePromise!: (m: MeteoData) => void;
      // on assigne le resolve de la promesse à resolvePromise pour l'appeler manuellement quand on veut
      const pendingPromise = new Promise<MeteoData>((resolve) => { resolvePromise = resolve });

      const fournisseur: FournisseurMeteo = {
        getCurrentMeteo: () => pendingPromise
      }

      render(<FormMeteo fournisseur={fournisseur} />);

      await userEvent.type(screen.getByLabelText(/latitude/i), '48.8566');
      await userEvent.type(screen.getByLabelText(/longitude/i), '2.3522');
      await userEvent.click(screen.getByRole('button', { name: /Conseille moi/i }));

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveTextContent(/Récupération/);

      resolvePromise({
        temperature: 3,
        feelLikeTemperature: 3,
        windSpeed: 10,
        precipitation: 0,
      });

      expect(await screen.findByText(/manteau/)).toBeInTheDocument();
      expect(button).toBeEnabled();
    });
  });