import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import database from "./config/database";

const port = Number(process.env.PORT);

// connect DB
database();

// start server
app.listen(port, () => {
  console.log(`App listen on port ${port}`);
});