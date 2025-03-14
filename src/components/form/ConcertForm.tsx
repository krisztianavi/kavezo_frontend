import { useState } from "react";
import { createConcert } from "../../services/concertService";
import "./ConcertForm.css";

const ConcertForm = () => {
  const [artist, setArtist] = useState("");
  const [stime, setStime] = useState("");
  const [duration, setDuration] = useState(60);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const formattedStime = new Date(stime).toISOString();

      await createConcert({ artist, stime: formattedStime, duration });
      alert("Koncert sikeresen hozzáadva!");
    } catch (err: any) {
      setError(err.message || "Hiba történt");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="concert-form">
      <label>Előadó:</label>
      <input value={artist} onChange={(e) => setArtist(e.target.value)} required />

      <label>Időpont:</label>
      <input type="datetime-local" value={stime} onChange={(e) => setStime(e.target.value)} required />

      <label>Időtartam (perc):</label>
      <input type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} min="1" required />

      {error && <p className="error">{error}</p>}

      <button type="submit">Hozzáadás</button>
    </form>
  );
};

export default ConcertForm;
