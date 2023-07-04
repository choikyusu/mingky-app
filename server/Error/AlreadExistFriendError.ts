export class AlreadExistFriendError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AlreadExistFriendError';
    Object.setPrototypeOf(this, AlreadExistFriendError.prototype);
  }
}
