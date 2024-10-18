import {
  AbstractObjectValue as AbstractObjetoValor,
  InvalidObjectValueError,
} from './baseObjectValue';

export class Duration extends AbstractObjetoValor<number> {
  private constructor(value: number) {
    super(value);
  }

  public static create(value: number): InvalidDurationError | Duration {
    if (Number.isInteger(value) && value >= 0) {
      return new Duration(value);
    }
    return new InvalidDurationError(value);
  }

  public get formatted(): string {
    const days = Math.floor(this.value / 1440);
    const hours = Math.floor((this.value % 1440) / 60);
    const minutes = this.value % 60;

    let formattedString = '';
    if (days > 0) {
      formattedString += `${days}d `;
    }
    if (hours > 0) {
      formattedString += `${hours} h `;
    }
    if (minutes > 0 || formattedString === '') {
      formattedString += `${minutes} min`;
    }

    return formattedString.trim();
  }
}

export class InvalidDurationError extends InvalidObjectValueError {
  constructor(value: number) {
    super(`A duração '${value}' em minutos é inválida!`);
  }
}
