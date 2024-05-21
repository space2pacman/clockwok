const Task = require('./Task');

class Tasks {
  constructor() {
    this._tasksList = [];
    this._currentTaskIndex = null;
  }

  add(params) {
    const task = new Task(params.time, params.callback);

    this._tasksList.push(task);
  }

  runTask() {
    const task = this._tasksList[this._currentTaskIndex];

    if (!task) {
      return;
    }

    task.timerId = setInterval(() => {
      task.run();
    }, task.time);

    task.on('stop', () => {
      this._currentTaskIndex = this._currentTaskIndex + 1;

      this.runTask();
    });
  }

  start() {
    if (this._currentTaskIndex === null) {
      this._currentTaskIndex = 0;
    }

    this.runTask();
  }
}

module.exports = Tasks;