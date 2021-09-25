const jwt = require("jsonwebtoken")

const authenticate = async (req, res, next) => {
  const token = req.headers['authorization'];


  console.log("wiouw "+token);


  try {
    const verified = jwt.verify(token, "azertyuiop")
    // const decoded = jwt.decode(token, process.env.JWT_SECRET)
    req.verifiedUser = verified.user
    console.log("Verification success!", verified)
    next()
  } catch (err) {
    console.log("Verification failed!", err)
    next()
  }
}

module.exports = { authenticate }
