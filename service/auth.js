// const sessionIdtoUserMap = new Map();
const jwt = require("jsonwebtoken");
const secret = "todo$123";
function setUser(user) {
  // sessionIdtoUserMap.set(sessionId, user);
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    secret
  );
}

function getUser(token) {
  // return sessionIdtoUserMap.get(sessionId);
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
