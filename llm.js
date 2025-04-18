const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

app.post("/llm", async (req, res) => {
  const userMessage = req.body.question;
  console.log("Pergunta do usuário:", userMessage);
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "perplexity/llama-3.1-sonar-small-128k-online",
        messages: [
          {
            role: "system",
            content: "Você é um bot especialista em CS:GO, com foco no time FURIA. Responda de forma curta, em português, e apenas sobre o time FURIA.",
          },
          {
            role: "user",
            content: userMessage,
          },
        ],
        max_tokens: 300 
      },
      {
        headers: {
          Authorization: `Bearer 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`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("🔍 Dados recebidos da LLM:", response.data);

    const reply = response.data?.choices?.[0]?.message?.content;

    if (!reply) {
      throw new Error("Resposta da LLM vazia ou inválida.");
    }
    console.log("💬 Resposta da LLM:", reply);
    res.json({ answer: reply });

  } catch (err) {
    console.error("Erro com LLM:", err.response?.data || err.message);
    res.status(500).json({ error: "Erro ao consultar o LLM" });
  }
});



app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});