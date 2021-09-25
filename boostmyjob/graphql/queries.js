const { GraphQLList, GraphQLID } = require("graphql")
const { UserType, PostType, CommentType } = require("./types")
const { User, Comment, Post } = require("../models")

const users = {
  type: new GraphQLList(UserType),
  description: "Retrieves list of users",
  resolve(parent, args) {
    return User.find()
  },
}

const user = {
  type: UserType,
  description: "Retrieves one user",
  args: { id: { type: GraphQLID } },

  resolve(parent, args) {
    return User.findById(args.id)
  },
}

const posts = {
  type: new GraphQLList(PostType),
  description: "Retrieves list of posts",
  resolve() {
    return Post.find()
  },
}
 

const myPosts = {
  type: new GraphQLList(PostType),
  description: "Retrieves list of posts",
  resolve() {
    
  },

  resolve(parent, args, { verifiedUser }) {
    console.log("Verified User: ", verifiedUser)
    if (!verifiedUser) {
      throw new Error("Unauthorized")
    }

    return Post.find({authorId:verifiedUser._id})
  },

}

const post = {
  type: PostType,
  description: "Retrieves one post",
  args: { id: { type: GraphQLID } },
  resolve(_, args) {
    return Post.findById(args.id)
  },
}
const comments = {
  type: new GraphQLList(CommentType),
  description: "Retrieves list of comments",
  resolve() {
    return Comment.find()
  },
}

const comment = {
  type: CommentType,
  description: "Retrieves one comment",
  args: { id: { type: GraphQLID } },
  resolve(_, args) {
    return Comment.findById(args.id)
  },
}

const myOffres = {
  type: new GraphQLList(CommentType),
  description: "Retrieves list of offres",
  
  resolve(parent, args, { verifiedUser }) {
    console.log("Verified User: ", verifiedUser)
    if (!verifiedUser) {
      throw new Error("Unauthorized")
    }

    return Comment.find({userId:verifiedUser._id})
  },
}




module.exports = { users, user, posts, post, comments, comment, myPosts, myOffres }
