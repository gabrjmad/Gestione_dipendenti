import { useState, useEffect } from "react";

const GOOGLE_SHEET_URL =
  "https://docs.google.com/spreadsheets/d//edit";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    dipendente: "",
    nome: "",
    cognome: "",
    note: "",
    reparto_assegnato: "",
    reparto_sostituzione: "",
  });
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalHours, setTotalHours] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/data")
      .then((res) => res.json())
      .then((rows) => setData(rows || []))
      .catch((err) => console.error("Errore caricamento dati:", err));
  }, []);

  const handleFilter = () => {
    if (!data.length) return alert("Nessun dato disponibile!");

    let filtered = data.slice(1);

    const indexMap = {
      dipendente: 0,
      cognome: 1,
      nome: 2,
      note: 6,
      reparto_assegnato: 7,
      reparto_sostituzione: 8,
    };

    Object.entries(filters).forEach(([key, value]) => {
      if (value.trim()) {
        const i = indexMap[key];
        filtered = filtered.filter((r) =>
          (r[i] || "").toLowerCase().includes(value.toLowerCase())
        );
      }
    });

    if (startDate && endDate) {
      filtered = filtered.filter((r) => {
        const d = new Date(r[4]);
        return d >= new Date(startDate) && d <= new Date(endDate);
      });
    }

    const total = filtered.reduce((sum, r) => sum + (parseFloat(r[5]) || 0), 0);
    setTotalHours(total);
  };

  return (
    <div className="dashboard">
      <h2>🧮 Conteggio Ore</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Scrivi DIPENDENTE"
          value={filters.dipendente}
          onChange={(e) => setFilters({ ...filters, dipendente: e.target.value })}
        />
        <input
          type="text"
          placeholder="Scrivi NOME"
          value={filters.nome}
          onChange={(e) => setFilters({ ...filters, nome: e.target.value })}
        />
        <input
          type="text"
          placeholder="Scrivi COGNOME"
          value={filters.cognome}
          onChange={(e) => setFilters({ ...filters, cognome: e.target.value })}
        />

        <label>
          Intervallo date:
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </label>

        <input
          type="text"
          placeholder="Scrivi NOTE"
          value={filters.note}
          onChange={(e) => setFilters({ ...filters, note: e.target.value })}
        />
        <input
          type="text"
          placeholder="Scrivi REPARTO_ASSEGNATO"
          value={filters.reparto_assegnato}
          onChange={(e) =>
            setFilters({ ...filters, reparto_assegnato: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Scrivi REPARTO_SOSTITUZIONE"
          value={filters.reparto_sostituzione}
          onChange={(e) =>
            setFilters({ ...filters, reparto_sostituzione: e.target.value })
          }
        />
        <button onClick={handleFilter}>Calcola ore</button>
      </div>

      {totalHours !== null && (
        <div className="result">Totale ore: {totalHours}</div>
      )}

      <div className="sheet-link">
        <a href={GOOGLE_SHEET_URL} target="_blank" rel="noreferrer">
          🔗 Apri Google Sheet
        </a>
      </div>
    </div>
  );
}
