class Task {
  constructor(name, callback, time) {
    this._name = name;
    this._callback = callback;
    this._time = time;
    this._timerId = null;
  }

  get name() {
    return this._name;
  }

  get time() {
    return this._time;
  }

  get timerId() {
    return this._timerId;
  }

  set timerId(value) {
    this._timerId = value;
  }

  run() {
    this._callback();
  }

  cancel() {
    clearInterval(this._timerId);
  }
}

module.exports = Task;