export class ExpiredTokenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ExpiredTokenError';
    Object.setPrototypeOf(this, ExpiredTokenError.prototype);
  }
}
