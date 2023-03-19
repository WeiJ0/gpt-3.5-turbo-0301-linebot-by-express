const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

const ask = async (_prompt) => {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-0301",
    messages: [
      {
        role: "user",
        content: _prompt,
      },
    ],
    max_tokens: 300,
  });
  return response.data.choices[0].message.content;
};


module.exports = { ask };
