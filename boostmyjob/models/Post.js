const mongoose = require("mongoose")

const postSchema = new mongoose.Schema(
  {
    authorId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      required: true,
    },
    keywords: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    }, 
    date_time: {
      type: String,
      required: true,
    }, 
    category: {
      type: String,
      required: true,
    }, 
    


  },
  { timestamps: true }
)

module.exports = mongoose.model("post", postSchema)
