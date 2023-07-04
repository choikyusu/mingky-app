export class CannotAddFriendError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CannotAddFriendError';
    Object.setPrototypeOf(this, CannotAddFriendError.prototype);
  }
}
