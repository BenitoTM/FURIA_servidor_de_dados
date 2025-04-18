Visão Geral

Este servidor RESTful em Node.js fornece dados do time FURIA via HLTV e 
expõe um endpoint para consulta de LLM com o modelo hospedado na OpenRouter.

Esse projeto foi criado para funcionar de forma concomitante ao projeto FURIA_ChatBot_Telegram.

Endpoints disponíveis:

GET /team
- Retorna os jogadores da FURIA.
- Usa a biblioteca hltv.

GET /matches
- Retorna os próximos jogos da FURIA.
- Usa a biblioteca hltv.

GET /results
- Retorna os últimos resultados.
- Usa a biblioteca hltv.

POST /llm
- Envia uma pergunta para o modelo da OpenRouter.
- Corpo da requisição:
    {
    "question": "Quando é o próximo jogo da FURIA?"
    }
  Retorno:
    {
    "answer": "A FURIA joga amanhã contra a NAVI."
    }


Execução:

Instale as dependências:
- npm install

Inicie o servidor (em dois terminais separados):
- node index.js
- node llm.js
