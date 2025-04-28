// require('./index.js');
// require('./llm.js');

const express = require("express");
const hltvRoutes = require("./hltv");
const llmRoutes = require("./llm");

const app = express();
app.use(express.json());
app.use("/", hltvRoutes);
app.use("/", llmRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor geral rodando na porta ${PORT}`);
});
