export class NotFindTokenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFindToken';
    Object.setPrototypeOf(this, NotFindTokenError.prototype);
  }
}
