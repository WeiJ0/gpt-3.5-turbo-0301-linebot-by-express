const express = require("express");
const line = require("@line/bot-sdk");
const { ask } = require("./ask");
require("dotenv").config();

const app = express();

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

const client = new line.Client(config);

app
  .get("/", async (req, res) => {
    res.send("Hello World");
  })
  .post("/webhook", line.middleware(config), async (req, res) => {
    const event = req.body.events;
    const message = event.map((i) => i.message)[0].text;
    const replyToken = event.map((i) => i.replyToken)[0];
    console.log({ message });
    console.log({ replyToken });
    const result = await ask(message);
    console.log({ result });
    await client.replyMessage(replyToken, {
      type: "text",
      text: result.replaceAll("/n", ""),
    });
    await res.sendStatus(200);
  });

module.exports = app;