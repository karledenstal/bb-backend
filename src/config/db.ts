import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/bb');
    console.log("💾 Connected to mongo");
  } catch (e) {
    console.error("Mongo db couldn't connect", e);
  }
};

export default connect;
