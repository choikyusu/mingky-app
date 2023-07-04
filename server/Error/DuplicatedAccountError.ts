export class DuplicatedAccountError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DuplicatedAccountError';
    Object.setPrototypeOf(this, DuplicatedAccountError.prototype);
  }
}
