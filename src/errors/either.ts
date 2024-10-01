export type Either<L, R> = Wrong<L> | Right<R>;

export class Wrong<L> {
  readonly value: L;

  constructor(value: L) {
    this.value = value;
  }

  isWrong(): boolean {
    return true;
  }

  isRight(): boolean {
    return false;
  }
}

export class Right<R> {
  readonly value: R;

  constructor(value: R) {
    this.value = value;
  }

  isWrong(): boolean {
    return false;
  }

  isRight(): boolean {
    return true;
  }
}

export const wrong = <L, R>(value: L): Either<L, R> => new Wrong(value);
export const right = <L, R>(value: R): Either<L, R> => new Right(value);
