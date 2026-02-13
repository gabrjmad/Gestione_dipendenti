import express from "express";
import cors from "cors";
import { google } from "googleapis";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());

const SPREADSHEET_ID = " ";
const SHEET_NAME = "Foglio1";

const auth = new google.auth.GoogleAuth({
  keyFile: "credentials.json",
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

// ✅ Endpoint per leggere dati
app.get("/api/data", async (req, res) => {
  try {
    const result = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: SHEET_NAME,
    });
    res.json(result.data.values);
  } catch (error) {
    console.error("❌ Errore lettura:", error);
    res.status(500).json({ error: "Errore nel recupero dei dati" });
  }
});

// ✅ Endpoint per aggiungere una riga
app.post("/api/addRow", async (req, res) => {
  try {
    const { row } = req.body;
    if (!row || !Array.isArray(row)) {
      return res.status(400).json({ error: "Dati non validi" });
    }

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A1`,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      resource: { values: [row] },
    });

    console.log("✅ Riga aggiunta:", row);
    res.json({ message: "Riga aggiunta con successo" });
  } catch (error) {
    console.error("❌ Errore aggiunta:", error);
    res.status(500).json({ error: "Errore nell'aggiunta della riga" });
  }
});

app.listen(5000, () =>
  console.log("✅ Server avviato su http://localhost:5000")
);
