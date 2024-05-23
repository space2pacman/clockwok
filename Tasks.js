const Task = require('./Task');

class Tasks {
  constructor() {
    this._tasksList = [];
  }

  add(params) {
    const task = new Task(params.time, params.callback);

    this._tasksList.push(task);
  }

  runTask() {
    const task = this._tasksList[0];

    if (!task) {
      return;
    }

    task.timerId = setInterval(() => {
      task.run();
    }, task.time);

    task.on('stop', () => {
      this._tasksList = this._tasksList.slice(1);

      this.runTask();
    });
  }

  start() {
    this.runTask();
  }
}

module.exports = Tasks;