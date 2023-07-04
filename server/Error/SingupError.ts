export class SingupError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SingupError';
    Object.setPrototypeOf(this, SingupError.prototype);
  }
}
