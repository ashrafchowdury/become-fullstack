// errorMiddleware.js

const errorMiddleware = (req, res, next) => {
  // Create a new Error object with a 404 status
  const error = new Error("Not Found");
  error.status = 404;
  // Forward the error to the next middleware
  next(error);
};

// Global Error handling middleware
const globalErrorMiddleware = (err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      status: err.status,
      message: err.message || "Internal Server Error",
    },
  });
};

module.exports = {
  errorMiddleware,
  globalErrorMiddleware,
};
