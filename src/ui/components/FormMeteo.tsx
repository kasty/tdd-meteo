import { OpenMeteoProvider } from "../../infrastructure/OpenMeteoProvider";
import { conseillerTenue } from "../../app/conseiller-tenue";
import { useState } from "react";

function FormMeteo({ fournisseur }: { fournisseur: OpenMeteoProvider }) {
  const [conseil, setConseil] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const latitude = formData.get("latitude");
    const longitude = formData.get("longitude");
    const res = await conseillerTenue(fournisseur, { latitude: Number(latitude), longitude: Number(longitude) });
    setConseil(res);
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="latitude">Latitude :</label>
      <input type="text" id="latitude" name="latitude" />
      <label htmlFor="longitude">Longitude :</label>
      <input type="text" id="longitude" name="longitude" />
      <button type="submit">Conseille moi</button>
      {conseil && <p>Conseil : {conseil}</p>}
    </form>
  );
}

export default FormMeteo;