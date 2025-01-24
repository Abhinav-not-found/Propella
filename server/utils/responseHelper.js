
const sendResponse = (res, statusCode, status, message, data, error) => {
  const response = {
    status:status,
    message:message,
    data:data || null,
    error:error || null,
  };
  return res.status(statusCode).json(response);
};

module.exports = sendResponse;
