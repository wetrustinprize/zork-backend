class HTTPError extends Error {
  code: number;

  constructor(message: string, code: number) {
    super(message);
    this.code = code;
  }
}

class BadRequestError extends HTTPError {
  constructor(message: string) {
    super(message, 400);
  }
}

class UnauthorizedError extends HTTPError {
  constructor(message: string) {
    super(message, 401);
  }
}

class ForbiddenError extends HTTPError {
  constructor(message: string) {
    super(message, 403);
  }
}

class NotFoundError extends HTTPError {
  constructor(message: string) {
    super(message, 404);
  }
}

export {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  ForbiddenError,
  HTTPError,
};
