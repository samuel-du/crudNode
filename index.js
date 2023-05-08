const express = require("express");
const mongoose = require("mongoose");
const app = express();

//json middleware
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

const personRoutes = require("./routes/personRoutes");
app.use("/person", personRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Oi Express" });
});

mongoose
  .connect(
    "mongodb+srv://samueldu:gsykoralMQwzaNAn@cluster0.kgj6hdv.mongodb.net/bancoCrud?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(3000);
    console.log("Rodando na porta 3000");
  })
  .catch((err) => console.log(err));
