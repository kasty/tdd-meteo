import type { OpenMeteoProvider } from "../infrastructure/OpenMeteoProvider";
import FormMeteo from "./components/FormMeteo";
import BaseLayout from "./components/Layout";

function App({ fournisseur }: { fournisseur: OpenMeteoProvider }) {

  return (
    <BaseLayout>
      <h1>Conseiller vestimentaire selon la météo</h1>
      <FormMeteo fournisseur={fournisseur} />
    </BaseLayout>
  );
}

export default App;