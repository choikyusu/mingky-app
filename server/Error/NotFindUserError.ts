export class NotFindUserError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFindUserError';
    Object.setPrototypeOf(this, NotFindUserError.prototype);
  }
}
