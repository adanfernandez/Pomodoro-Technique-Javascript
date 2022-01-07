const SUFIX = '_task';

function saveTask(task) {
    localStorage.setItem(task + SUFIX, new Date());
}

function checkTaskExists(task) {
    return localStorage.getItem(task + SUFIX);
}

function getTasks() {
    const tasks = [];
    return Object.keys(localStorage)
        .filter(x => x.includes(SUFIX))
        .map(x =>  new Task(x.replace(SUFIX, ''), localStorage.getItem(x)))
        .sort((a,b) => (a.date > b.date) ? -1 : ((b.date > a.date) ? 1 : 0));
}

function clearTasks() {
    localStorage.clear();
}

class Task {
    constructor(id, date) {
        this.id=id;
        this.date=date;
    }
}