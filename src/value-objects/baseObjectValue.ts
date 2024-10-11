export abstract class AbstractObjectValue<O> {
  protected constructor(public readonly value: O) {
    Object.freeze(this);
  }

  public equals(
    otherObjectValue: AbstractObjectValue<O> | null | undefined,
  ): boolean {
    return (
      !!otherObjectValue &&
      Object.getPrototypeOf(otherObjectValue) === Object.getPrototypeOf(this) &&
      otherObjectValue.value === this.value
    );
  }
}

export class InvalidObjectValueError extends Error {
  constructor(public message: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
