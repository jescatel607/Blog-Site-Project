require("dotenv").config();

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const PORT = 4000;

const connectDB = require("./server/config/db");
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("layouts", "./layourt/main");

app.use("/", require("./server/routes/main"));

(async () => {
  await connectDB();
})();

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
