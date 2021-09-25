const express = require("express")
const dotenv = require("dotenv")
const { graphqlHTTP } = require("express-graphql")
const schema = require("./graphql/schema")

const { connectDB } = require("./db")
var cors = require('cors')
var app = express()

app.use(cors())

/*
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();

});*/


dotenv.config()
connectDB()





const { authenticate } = require("./middleware/auth")

app.use(authenticate)

app.get("/", (req, res) => {
  res.json({ msg: "Welcome! Go to /graphql" })
})

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
)

app.listen(5000, () => {
  console.log(`App running on PORT 5000`)
})
