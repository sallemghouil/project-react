const mongoose = require("mongoose")
const { modelName } = require("./User")

const commentSchema = new mongoose.Schema(
  {

    status: {
      type: Number,
      required: true,
    },
    
    userId: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("comment", commentSchema)
