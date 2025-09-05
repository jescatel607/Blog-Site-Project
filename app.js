require("dotenv").config();

const expressLayouts = require("express-ejs-layouts");
const express = require("express");
const app = express();
const PORT = 4000;

const connectDB = require("./server/config/db");
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

app.use(expressLayouts);
app.use("/static", express.static("public"));
app.set("view engine", "ejs");
app.set("layout", "./layout/main");

app.use("/", require("./server/routes/main"));

(async () => {
  await connectDB();
})();

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
