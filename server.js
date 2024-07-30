// Here is where we import modules
// We begin by loading Express
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import methodOverride from "method-override";
import morgan from "morgan";
import Fruit from './models/fruit.js';


const app = express();

app.use(express.urlencoded({ extended: false })) 
app.use(methodOverride("_method")); 
app.use(morgan("dev")); 

mongoose.connect(process.env.MONGODB_URI);

// server.js

// GET /
app.get("/", async (req, res) => {
  res.render("index.ejs");
});

app.get("/fruits/new", async (req, res) => {
  res.render("fruits/new.ejs");
});

// POST /fruits
app.post("/fruits", async (req, res) => {
  // talk to the db - through the model
  if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }
  await Fruit.create(req.body);
  res.redirect("/fruits");
});

// GET /fruits
app.get("/fruits", async (req, res) => {
  const allFruits = await Fruit.find();
  res.render("fruits/index.ejs", { fruits: allFruits });
});

app.get("/fruits/:fruitId", async (req, res) => {
  const foundFruit = await Fruit.findById(req.params.fruitId);
  res.render("fruits/show.ejs", { fruit: foundFruit });
});

app.delete("/fruits/:fruitId", async (req, res) => {
  await Fruit.findByIdAndDelete(req.params.fruitId);
  res.redirect("/fruits");
});

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);

  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
});
