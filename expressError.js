/** ExpressError extends normal JS error so we can
 *  add a status when we make an instance of it.
 *  Used from ExpressError file from previous exercises
 *  Why reinvent the wheel
 *  The error-handling middleware will return this.
 */

class ExpressError extends Error {
    constructor(message, status) {
      super();
      this.message = message;
      this.status = status;
    }
  }
  
  /** 404 NOT FOUND error. */
  
  class NotFoundError extends ExpressError {
    constructor(message = "Not Found") {
      super(message, 404);
    }
  }
  
  /** 401 UNAUTHORIZED error. */
  
  class UnauthorizedError extends ExpressError {
    constructor(message = "Unauthorized") {
      super(message, 401);
    }
  }
  
  /** 400 BAD REQUEST error. */
  
  class BadRequestError extends ExpressError {
    constructor(message = "Bad Request") {
      super(message, 400);
    }
  }

  class FoodNotFoundError extends ExpressError {
    constructor(foodItem){
      let concatMessage = `'The food you searched for, ${foodItem}, is not in our dataset.  Try submitting its ingredients if applicable instead'`
      super(concatMessage, 404);
    }
  }

  class LimitHit extends ExpressError {
    constructor(message = 'Rate Limit Hit') {
      super(message, 500);
    }
  }
  
  /** 403 BAD REQUEST error. */
  
  class ForbiddenError extends ExpressError {
    constructor(message = "Bad Request") {
      super(message, 403);
    }
  }
  
  module.exports = {
    ExpressError,
    NotFoundError,
    UnauthorizedError,
    BadRequestError,
    FoodNotFoundError,
    LimitHit,
    ForbiddenError
  };