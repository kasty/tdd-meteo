import { conseillerTenue } from "../../app/conseiller-tenue";
import { useState } from "react";
import type { FournisseurMeteo } from "../../domain/ports/fournisseur-meteo";

function FormMeteo({ fournisseur }: { fournisseur: FournisseurMeteo }) {
  const [conseil, setConseil] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const latitude = formData.get("latitude");
    const longitude = formData.get("longitude");
    try {
      const res = await conseillerTenue(fournisseur, { latitude: Number(latitude), longitude: Number(longitude) });
      setConseil(res);
    } catch (err) {
      setError("Erreur lors de la récupération des données météo.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="latitude">Latitude :</label>
      <input type="text" id="latitude" name="latitude" />
      <label htmlFor="longitude">Longitude :</label>
      <input type="text" id="longitude" name="longitude" />
      <button type="submit" disabled={loading}>
        {loading ? "Récupération en cours..." : "Conseille moi"}
      </button>
      {conseil && <p>Conseil : {conseil}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

export default FormMeteo;