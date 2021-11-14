// Abstract class describing an HTTP exception with status code, message,
// and an optional details object.
export abstract class HttpException extends Error {
  // HTTP status code of the exception
  status: number;
  // Description of the exception
  message: string;
  // Optional details about the exception
  details?: unknown;

  protected constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.status = status;
    this.message = message;
    this.details = details;
  }
}
