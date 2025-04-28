// const express = require("express");
// const cors = require("cors");
// const { HLTV } = require("hltv");

// const app = express();
// app.use(cors());
// const PORT = 3000;
// const FURIA_ID = 8297;

// app.get("/team", async (req, res) => {
//   try {
//     const team = await HLTV.getTeam({ id: FURIA_ID });
//     res.json(team);
//   } catch (err) {
//     console.error("Erro no /team:", err.message);
//     res.status(500).json({ error: "Erro ao buscar dados do time FURIA." });
//   }
// });


// app.get("/matches", async (req, res) => {
//   const matches = await HLTV.getMatches(); 
//   const furiaMatches = matches.filter(
//     m => m.team1.name === "Astralis" || m.team2.name === "Astralis"
//   );
//   res.json(furiaMatches);
// });

// app.get("/results", async (req, res) => {
//   try {
//     console.log("/results chamado");

//     const results = await HLTV.getResults({}); // fetch tudo
//     console.log("/results buscado");
//     const furiaResults = results
//       .filter(r =>
//         (r.team1?.name === "FURIA" || r.team2?.name === "FURIA")
//       )
//       .slice(0, 5); // mostra só os 5 mais recentes

//     const formatted = furiaResults.map(r => ({
//       adversario:
//         r.team1?.name === "FURIA"
//           ? r.team2?.name
//           : r.team1?.name || "Desconhecido",
//       resultado: r.result ? `${r.result.team1} x ${r.result.team2}` : "N/A",
//       evento: r.event?.name || "Evento desconhecido",
//       data: r.date ? new Date(r.date).toLocaleString("pt-BR") : "Sem data",
//     }));

//     res.json(formatted);
//   } catch (err) {
//     console.error("Erro ao buscar resultados:", err);
//     res.status(500).json({ error: "Erro ao buscar resultados." });
//   }
// });  

// app.listen(PORT, () => {
//   console.log(`API HLTV rodando em http://localhost:${PORT}`);
// });


const express = require("express");
const cors = require("cors");
const { HLTV } = require("hltv");

const app = express();
app.use(cors());
const FURIA_ID = 8297;

app.get("/team", async (req, res) => {
  const team = await HLTV.getTeam({ id: FURIA_ID });
  res.json(team);
});

app.get("/matches", async (req, res) => {
  const matches = await HLTV.getMatches();
  const furiaMatches = matches.filter(
    m => m.team1.name === "FURIA" || m.team2.name === "FURIA"
  );
  res.json(furiaMatches);
});

app.get("/results", async (req, res) => {
  try {
    console.log("/results chamado");

    const results = await HLTV.getResults({});
    console.log("/results buscado");

    const furiaResults = results
      .filter(r =>
        (r.team1?.name === "FURIA" || r.team2?.name === "FURIA")
      )
      .slice(0, 5);

    const formatted = furiaResults.map(r => ({
      adversario:
        r.team1?.name === "FURIA"
          ? r.team2?.name
          : r.team1?.name || "Desconhecido",
      resultado: r.result ? `${r.result.team1} x ${r.result.team2}` : "N/A",
      evento: r.event?.name || "Evento desconhecido",
      data: r.date ? new Date(r.date).toLocaleString("pt-BR") : "Sem data",
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Erro ao buscar resultados:", err);
    res.status(500).json({ error: "Erro ao buscar resultados." });
  }
});

module.exports = app;  // EXPORTA o app
