const handleErrorResponse = ({
  statusCode = 400,
  msg = "Something went wrong :(",
  res,
}) => res.status(statusCode).json({ msg });

const handleSuccessResponse = ({
  statusCode = 200,
  msg = "Successfully",
  data = "",
  res,
}) => res.status(statusCode).json({ msg, data });

module.exports = {
  handleErrorResponse,
  handleSuccessResponse,
};
