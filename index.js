import "dotenv/config";
import TelegramBot from "node-telegram-bot-api";
import http from "http";

import { handleMessage } from "./handlers/message.js";
import { handleLocation } from "./handlers/location.js";

const token = process.env.TELEGRAM_TOKEN;

if (!token) {
  console.error(
    "FATAL ERROR: TELEGRAM_TOKEN not found in the environment variables."
  );
  process.exit(1);
}

const userData = new Map();

const bot = new TelegramBot(token, { polling: true });
console.log("Telegram Bot initialized");

const PORT = process.env.PORT || 10000;

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Bot is running");
  })
  .listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
  });

bot.on("message", handleMessage(bot, userData));
console.log("The message handler has been registered.");

bot.on("location", handleLocation(bot, userData));
console.log("The geolocation handler has been registered.");

bot.on("polling_error", (error) => {
  if (error.code !== "EFATAL" && error.code !== "EPIPE") {
  }
});

console.log(
  `Bot's running; Server time: ${new Date().toLocaleTimeString("ru-RU")}`
);
