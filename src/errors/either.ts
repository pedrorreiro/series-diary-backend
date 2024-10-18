export type Either<L, R> = Wrong<L, R> | Right<L, R>;

export class Wrong<L, R> {
  readonly value: L;

  constructor(value: L) {
    this.value = value;
  }

  isWrong(): this is Wrong<L, R> {
    return true;
  }

  isRight(): this is Right<L, R> {
    return false;
  }
}

export class Right<L, R> {
  readonly value: R;

  constructor(value: R) {
    this.value = value;
  }

  isWrong(): this is Wrong<L, R> {
    return false;
  }

  isRight(): this is Right<L, R> {
    return true;
  }
}

export function wrong<L, R>(l: L): Either<L, R> {
  return new Wrong(l);
}

export function right<L, R>(r: R): Either<L, R> {
  return new Right(r);
}
