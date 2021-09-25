const jwt = require("jsonwebtoken")

const createJwtToken = (user) => {
  return jwt.sign({ user }, "azertyuiop", {
    expiresIn: "30 days",
  })
}

module.exports = { createJwtToken }
