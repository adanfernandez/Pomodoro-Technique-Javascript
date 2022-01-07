function saveTaks(task) {
    localStorage.setItem(task, new Date().now());
}

function checkTaskDoesntExist(task) {
    return localStorage.getItem(task);
}

function clearTasks() {
    localStorage.clear();
}