const notFoundHandler = (req, res, next) => {
  const errorMessage = new Error(
    `${req.originalUrl} : Sorry, Route not found!`
  );
  res.status(404);
  next(errorMessage);
};

const customErrorHandler = (err, req, res, next) => {
  const status = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(status);
  res.json({
    message: err.message,
  });
};

export { notFoundHandler, customErrorHandler };
