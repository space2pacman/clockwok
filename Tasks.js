const Task = require('./Task');

class Tasks {
  constructor() {
    this._tasksList = {};
  }

  add(params) {
    const task = new Task(params.id, params.time, params.callback);
    const id = task.id;

    if (this._tasksList[id] === undefined) {
      this._tasksList[id] = [];
    }

    this._tasksList[id].push(task);

    task.on('remove', () => {
      clearInterval(task.timerId);

      const index = this._tasksList[id].indexOf(task);
      
      this._tasksList[id].splice(index, 1);
    });
  }

  start(id) {
    this._runTask(id);
  }

  findById(id) {
    const tasks = this._tasksList[id];

    if (!tasks) {
      return [];
    }

    return tasks.filter(task => task.id === id);
  }

  _runTask(id) {
    const task = this._tasksList[id][0];

    if (!task) {
      return;
    }

    task.timerId = setInterval(() => {
      task.run();
    }, task.time);

    task.on('stop', () => {
      clearInterval(task.timerId);

      this._tasksList[id] = this._tasksList[id].slice(1);

      this._runTask(id);
    });
  }
}

module.exports = Tasks;