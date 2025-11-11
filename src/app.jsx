import React from "react";
import Chat from "./Chat";
import Dashboard from "./Dashboard";
import "./index.css";

export default function App() {
  return (
    <div className="container">
      <h1>📋 Gestione Dipendenti</h1>

      <section className="section">
        <h2>💬 Inserisci riga nel foglio</h2>
        <p className="placeholder-info">
          Scrivi un comando separando i valori con virgole:
          <br />
          <span className="example">
            AGGIUNGI, AUTISTA, ABBIATI, ALESSANDRO, 4593, 2025-07-01, 4, DISTRETTI, 118, DISTRETTO, July
          </span>
        </p>
        <Chat />
      </section>

      <section className="section">
        <Dashboard />
      </section>
    </div>
  );
}
