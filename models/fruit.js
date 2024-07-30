import mongoose from "mongoose"

const fruitSchema = new mongoose.Schema({
    name: String,
    isReadyToEat: Boolean,
  });

const Fruit = mongoose.model("Fruit", fruitSchema);

export default Fruit;