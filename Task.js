class Task {
  constructor(name, time, callback) {
    this._name = name;
    this._time = time;
    this._callback = callback;
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