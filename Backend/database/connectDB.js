import mongoose from "mongoose";

try {
  await mongoose.connect(process.env.URI_MONGO);
  console.log("Connected to Data Base 😎");
} catch (error) {
  console.log("Conection Error 😥: " + error);
}
