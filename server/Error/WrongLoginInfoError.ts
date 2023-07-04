export class WrongLoginInfoError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'WrongLoginInfoError';
    Object.setPrototypeOf(this, WrongLoginInfoError.prototype);
  }
}
