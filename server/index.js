import express from "express";
import colors from "colors";
import cors from "cors";
import dotenv from "dotenv";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema/schema.js";
import db from "./config/db.js";

dotenv.config();
db();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
