const jwt = require("jsonwebtoken");
const AUTH = require("../models/authSchema");

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization required" });
  }
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await AUTH.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    res.status(401).json({ error: "Authorization required" });
  }
};

module.exports = authMiddleware;
