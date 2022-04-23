export class CustomError extends Error {
  public status: number;
  public name: string;
  public message: string;

  constructor(message: string, status: number) {
    super();
    this.status = status;
    this.message = message;
    this.name = "CustomError";
  }
}
