export class AppError extends Error {
  statusCode: number;
  status: string;

  constructor(message: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}
