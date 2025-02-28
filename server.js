import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const port = 8000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
