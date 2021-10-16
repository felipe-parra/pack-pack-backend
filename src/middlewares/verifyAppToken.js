const jwt = require("jsonwebtoken");
const { appSecret } = require("../config");
const { handleErrorResponse } = require("../utils");

const verifyAppToken = async (req, res, next) => {
  let token = req.headers["access-token-app"];
  
  if (!token) {
    handleErrorResponse({ statusCode: 403, msg: "No token provided", res });
  }
  if (token === appSecret) {
    next();
  } else {
    handleErrorResponse({
      statusCode: 401,
      msg: "Unauthorized!",
      res,
    });
  }
};

module.exports = {
  verifyAppToken,
};
