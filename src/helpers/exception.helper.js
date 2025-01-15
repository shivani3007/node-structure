const errorHandler = (err, req,res, next) => {
    console.log(err.details);
    
    if (err && err.details) {
        const errorDetails = err.details.body.map(detail => ({
          message: detail.message, // Error message from Joi validation
          path: detail.path,       // Path (field) that failed validation
          type: detail.type        // Type of validation error (e.g., 'string.base')
        }));
    
        return res.status(400).json({
          status: 'error',
          message: 'Validation failed',
          statusCode: 400,
          error: errorDetails[0].message  // Return detailed validation error info
        });
      }

      // If it's not a Joi validation error, pass it to the default error handler
      res.status(500).json({
        status: 'error',
        message: err.message ? err.message : 'Internal Server Error',
        statusCode: err.statusCode ?  err.statusCode :500,
      });

}

module.exports = {
    errorHandler,
};