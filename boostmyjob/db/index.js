const mongoose = require("mongoose")

const connectDB = async () => {
  const conn = await mongoose.connect("mongodb://localhost:27017/test3", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  console.log(`MongoDB connected`)
}

module.exports = { connectDB }
