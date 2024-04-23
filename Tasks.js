const Task = require('./Task');

class Tasks {
  constructor() {
    this._tasksList = new Proxy([], {
      set(target, property, value) {
        target[property] = value;
        
        if (typeof value === 'object') {
          value.timerId = setInterval((function tick() {
            value.run();
            
            return tick;
          })(), value.time);
        }

        return true;
      }
    });
  }

  add(params) {
    const task = new Task(params.name, params.callback, params.time);

    this._tasksList.push(task);

    return task;
  }

  find(name) {
    const tasks = this._tasksList.filter(task => task.name === name);

    return tasks;
  }
}

module.exports = Tasks;