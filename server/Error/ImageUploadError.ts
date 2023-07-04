export class ImageUploadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ImageUploadError';
    Object.setPrototypeOf(this, ImageUploadError.prototype);
  }
}
