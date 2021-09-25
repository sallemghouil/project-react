const { PostType, CommentType, UserType } = require("./types")

const { User, Post, Comment } = require("../models")
const { GraphQLString, GraphQLInt } = require("graphql")

const { createJwtToken } = require("../util/auth")

const register = {
  type: GraphQLString,
  description: "Register new user",
  args: {
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    displayName: { type: GraphQLString },
    userType: { type: GraphQLString },
    address: { type: GraphQLString },
    
    
  },
  async resolve(parent, args) {
    const { username, email, password, displayName, userType, address } = args
    const user = new User({ username, email, password, displayName , userType , address})

    await user.save()
    const token = createJwtToken(user)
    return token
  },
}

const login = {
  type: GraphQLString,
  description: "Login user",
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent, args) {
    const user = await User.findOne({ email: args.email }).select("+password")
    console.log(user)
    if (!user || args.password !== user.password) {
      throw new Error("Invalid credentials")
    }
    

    const token = createJwtToken(user)
    return token
  },
}

const myInfo = {
  type: UserType,
  description: "Create new blog post",
  args: {},
  resolve(parent, args, { verifiedUser }) {
    console.log("Verified User: ", verifiedUser)
    if (!verifiedUser) {
      throw new Error("Unauthorized")
    }

    const user = User.findById(verifiedUser._id);

    return user;
  },
}

const addPost = {
  type: PostType,
  description: "Create new blog post",
  args: {
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    status: { type: GraphQLInt },
    keywords: { type: GraphQLString },
    experience: { type: GraphQLString },
    type: { type: GraphQLString },
    salary: { type: GraphQLString },
    date_time: { type: GraphQLString },
    category: { type: GraphQLString },
    
  },
  resolve(parent, args, { verifiedUser }) {
    console.log("Verified User: ", verifiedUser)
    if (!verifiedUser) {
      throw new Error("Unauthorized")
    }

    const post = new Post({
      authorId: verifiedUser._id,
      title: args.title,
      body: args.body,
      status: args.status,
      keywords: args.keywords,
      experience: args.experience,
      type: args.type,
      salary: args.salary,
      date_time:args.date_time,
      category:args.category
    })

    return post.save()
  },
}

const updatePost = {
  type: PostType,
  description: "Update blog post",
  args: {
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
  },
  async resolve(parent, args, { verifiedUser }) {
    if (!verifiedUser) {
      throw new Error("Unauthenticated")
    }
    const postUpdated = await Post.findOneAndUpdate(
      {
        _id: args.id,
        authorId: verifiedUser._id,
      },
      { title: args.title, body: args.body },
      {
        new: true,
        runValidators: true,
      }
    )

    if (!postUpdated) {
      throw new Error("No post with the given ID found for the author")
    }

    return postUpdated
  },
}

const deletePost = {
  type: GraphQLString,
  description: "Delete post",
  args: {
    postId: { type: GraphQLString },
  },
  async resolve(parent, args, { verifiedUser }) {
    console.log(verifiedUser)
    if (!verifiedUser) {
      throw new Error("Unauthenticated")
    }
    const postDeleted = await Post.findOneAndDelete({
      _id: args.postId,
      authorId: verifiedUser._id,
    })
    if (!postDeleted) {
      throw new Error("No post with the given ID found for the author")
    }

    return "Post deleted"
  },
}

const addComment = {
  type: CommentType,
  description: "Create a new job offre condidature",
  args: {
    
    postId: { type: GraphQLString },
  },
  resolve(parent, args, { verifiedUser }) {
    const comment = new Comment({
      userId: verifiedUser._id,
      postId: args.postId,
      status: 0
    })
    return comment.save()
  },
}

const updateComment = {
  type: CommentType,
  description: "Update blog comment",
  args: {
    id: { type: GraphQLString },
    comment: { type: GraphQLString },
  },
  async resolve(parent, args, { verifiedUser }) {
    if (!verifiedUser) {
      throw new Error("Unauthenticated")
    }
    const commentUpdated = await Comment.findOneAndUpdate(
      {
        _id: args.id,
        userId: verifiedUser._id,
      },
      { comment: args.comment },
      {
        new: true,
        runValidators: true,
      }
    )

    if (!commentUpdated) {
      throw new Error("No comment with the given ID found for the author")
    }

    return commentUpdated
  },
}

const deleteComment = {
  type: GraphQLString,
  description: "Delete comment",
  args: {
    commentId: { type: GraphQLString },
  },
  async resolve(parent, args, { verifiedUser }) {
    console.log(verifiedUser)
    if (!verifiedUser) {
      throw new Error("Unauthenticated")
    }
    const commentDeleted = await Comment.findOneAndDelete({
      _id: args.commentId
    })
    if (!commentDeleted) {
      throw new Error("No post with the given ID found for the author")
    }

    return "Post deleted"
  },
}

const updateCondidature = {
  type: GraphQLString,
  description: "update condidature",
  args: {
    status: { type: GraphQLInt },
    commentId: { type: GraphQLString }
  },
  async resolve(parent, args, { verifiedUser }) {
    console.log(verifiedUser)
    if (!verifiedUser) {
      throw new Error("Unauthenticated")
    }
    const commentDeleted = await Comment.findOneAndUpdate(
      {
        _id: args.commentId
      },
      { status: args.status },
      {
        new: true,
        runValidators: true,
      }
    
    )
    if (!commentDeleted) {
      throw new Error("No post with the given ID found for the author")
    }

    return "Post deleted"
  },
}


const updateProfileCV = {
  type: UserType,
  description: "Update user cv",
  args: {
    cv: { type: GraphQLString }, 
  },
  async resolve(parent, args, { verifiedUser }) {
    if (!verifiedUser) {
      throw new Error("Unauthenticated")
    }
    const userUpdated = await User.findOneAndUpdate(
      { 
        _id: verifiedUser._id,
      },
      { cv: args.cv },
      {
        new: true,
        runValidators: true,
      }
    )

    if (!userUpdated) {
      throw new Error("No comment with the given ID found for the author")
    }

    return userUpdated
  },
}

module.exports = {
  register,
  login,
  addPost,
  addComment,
  updatePost,
  deletePost,
  updateComment,
  deleteComment,
  myInfo,
  updateProfileCV,
  updateCondidature
}
