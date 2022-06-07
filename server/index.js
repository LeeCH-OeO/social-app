import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { CONNECTION_URL } from "./CONNECTION_URL.js";
import postRoute from "./routes/posts.js";
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: "true" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: "true" }));
app.use(cors());
app.use("/posts", postRoute);

const PORT = process.env.PORT || 5920;
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT, console.log(`Server running on Port${PORT}`)))
  .catch((err) => console.log(err));
mongoose.set("useFindAndModify", false);
