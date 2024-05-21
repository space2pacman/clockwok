const EventEmitter = require('events');

class Task extends EventEmitter {
  constructor(time, callback) {
    super();

    this._time = time;
    this._callback = callback;
    this._timerId = null;

    this._event = {
      runs: 0,
      stop: () => {
        this.emit('stop');
        
        clearInterval(this._timerId);
      }
    }
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
    this._event.runs = this._event.runs + 1;

    this._callback(this._event);
  }
}

module.exports = Task;