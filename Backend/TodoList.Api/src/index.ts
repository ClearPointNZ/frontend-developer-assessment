import * as dotenv from "dotenv";
import { getApp } from "./app";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = getApp();
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

export default app;
