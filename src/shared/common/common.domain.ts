export abstract class DomainEntity<M extends object> {
  private _pgState: M | null;

  setPgState(arg: ((a: typeof this) => M) | M | null) {
    if (typeof arg === 'function') {
      this._pgState = arg(this);
      return this;
    }

    this._pgState = arg;
    return this;
  }

  get pgState() {
    return this._pgState;
  }

  get isPersist(): boolean {
    return !!this._pgState;
  }
}
