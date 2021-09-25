const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} = require("graphql")

const { User, Post, Comment } = require("../models")

const UserType = new GraphQLObjectType({
  name: "User",
  description: "User type",
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    displayName: { type: GraphQLString },
    userType: { type: GraphQLString },
    address: { type: GraphQLString },
    cv: { type: GraphQLString },
    
 
    
  }),
})

const PostType = new GraphQLObjectType({
  name: "Post",
  description: "Post type",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    status: { type: GraphQLInt },
    keywords: { type: GraphQLString },
    experience: { type: GraphQLString },
    type: { type: GraphQLString },
    salary: { type: GraphQLString },
    date_time: { type: GraphQLString },

    category: { type: GraphQLString },
    
    
    
    author: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.authorId)
      },
    },
    comments: {
      type: GraphQLList(CommentType),
      resolve(parent, args) {
        return Comment.find({ postId: parent.id })
      },
    },
  }),
})

const CommentType = new GraphQLObjectType({
  name: "Comment",
  description: "Comment type",
  fields: () => ({
    id: { type: GraphQLID },
    status: { type: GraphQLInt },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId)
      },
    },
    post: {
      type: PostType,
      resolve(parent, args) {
        return Post.findById(parent.postId)
      },
    },
  }),
})

module.exports = { UserType, PostType, CommentType }
