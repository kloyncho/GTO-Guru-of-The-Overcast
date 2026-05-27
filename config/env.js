import dotenv from "dotenv";
import fs from "fs";
import path from "path";

const envPath = path.resolve(process.cwd(), ".env");
console.log("Путь к .env:", envPath);

if (!fs.existsSync(envPath)) {
  console.error("ERROR: .env NOT FOUND!");
  process.exit(1);
}

const result = dotenv.config({ path: envPath });
if (result.error) {
  console.error("READ ERROR .env:", result.error);
  process.exit(1);
}

const { TELEGRAM_TOKEN, WEATHER_API_KEY } = process.env;

console.log("TELEGRAM_TOKEN:", TELEGRAM_TOKEN ? "OK" : "NOT FOUND");
console.log(
  "WEATHER_API_KEY:",
  WEATHER_API_KEY ? `OK (length: ${WEATHER_API_KEY.length})` : "NOT FOUND"
);

if (!TELEGRAM_TOKEN || !WEATHER_API_KEY) {
  console.error("ERROR: tokens not loaded");
  process.exit(1);
}

export { TELEGRAM_TOKEN, WEATHER_API_KEY };
