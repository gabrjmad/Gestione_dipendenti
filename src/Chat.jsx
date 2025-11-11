import { useState } from "react";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleSend = async () => {
    if (!message.trim()) return;

    const parts = message.split(",").map((p) => p.trim());
    if (parts[0].toUpperCase() !== "AGGIUNGI") {
      setResponse("❌ Usa il formato corretto (inizia con AGGIUNGI, ...)");
      return;
    }

    try {
      const newRow = parts.slice(1); // esclude la parola AGGIUNGI
      const res = await fetch("http://localhost:5000/api/addRow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ row: newRow }),
      });

      if (res.ok) {
        setResponse("✅ Riga aggiunta con successo!");
      } else {
        setResponse("❌ Errore durante l'aggiunta.");
      }
    } catch (err) {
      setResponse("❌ Errore di connessione al server.");
    }

    setMessage("");
  };

  return (
    <div className="chat-box">
      <input
        type="text"
        placeholder="AGGIUNGI, AUTISTA, ABBIATI, ALESSANDRO, 4593, 2025-07-01, 4, DISTRETTI, 118, DISTRETTO, July"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSend}>Invia</button>
      <p>{response}</p>
    </div>
  );
}
