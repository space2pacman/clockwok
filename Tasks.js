const Task = require('./Task');

class Tasks {
  constructor() {
    this._tasksList = [];
  }

  add(params) {
    const task = new Task(params.id, params.time, params.callback);

    this._tasksList.push(task);

    task.on('remove', () => {
      const index = this._tasksList.indexOf(task);
      
      this._tasksList.splice(index, 1);
    });
  }

  start() {
    this._runTask();
  }

  findById(id) {
    const tasks = this._tasksList.filter(task => task.id === id);

    return tasks;
  }

  _runTask() {
    const task = this._tasksList[0];

    if (!task) {
      return;
    }

    task.timerId = setInterval(() => {
      task.run();
    }, task.time);

    task.on('stop', () => {
      this._tasksList = this._tasksList.slice(1);

      this._runTask();
    });
  }
}

module.exports = Tasks;