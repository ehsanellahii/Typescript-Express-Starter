export class CustomError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = 'Custom Error';
    this.status = status;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
  toString(): string {
    return `${this.status}: ${this.message}`;
  }
}
