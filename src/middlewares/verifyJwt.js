const User = require("../models/user.schema");
const { handleErrorResponse } = require("../utils");

const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");

const verifyToken = async (req, res, next) => {
  let token = req.headers["access-token"];

  if (!token) {
    handleErrorResponse({ statusCode: 403, msg: "No token provided", res });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);

    req.userId = decoded.id;

    const user = await User.findById(req.userId, { password: 0 });

    if (!user)
      handleErrorResponse({
        statusCode: 404,
        res,
      });

    next();
  } catch (error) {
    console.log(error);
    handleErrorResponse({
      statusCode: 401,
      msg: "Unauthorized!",
      res,
    });
  }
};

module.exports = {
  verifyToken,
};
