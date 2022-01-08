const taskInput = document.querySelector("#taskname");  
const startButton = document.querySelector("#start");
const pendingTime = document.querySelector("#pendingTime");
const tasks = document.querySelector("#tasks");
const takeBreakButton = document.querySelector("#take_break");
const startBreakButton = document.querySelector("#start_break");

const taskform = document.querySelector("#taskform");
const breakform = document.querySelector("#breakform");

var counterWorker;

taskInput.addEventListener("input", validate);
pendingTime.style.display= 'none';
breakform.style.display= 'none';



startButton.onclick = startTask;
takeBreakButton.onclick = takeBreak;
startBreakButton.onclick = startBreak;




function validate(){
    if(taskInput.value === "" || checkTaskExists(taskInput.value)){
        startButton.setAttribute("disabled","disabled");
    } else {
        startButton.removeAttribute("disabled");  
    }
} 

function startTask() {
    if (typeof(Worker)!==undefined) {
        pendingTime.style.display= 'block';
        startButton.setAttribute("disabled","disabled");
        takeBreakButton.setAttribute("disabled","disabled");
        taskInput.setAttribute("disabled","disabled");
        var min = parseInt(document.getElementById('taskminutes').value)-1;
        pendingTime.innerHTML = `Pending time: ${min}:59`;
        saveAndShowTasks();
        timerWorker = new Worker("scripts/timer/timer.js");
        var taskInterval = window.setInterval(function(){
            timerWorker.postMessage(min);
            timerWorker.onmessage = function(e) {
                if(!e.data) {
                    stopCounterTask(taskInterval);
                } else {
                    const time = e.data;
                    min = time[0];
                    const sec = time[1];
                    pendingTime.innerHTML = `Pending time: ${min}: ${sec > 9 ? sec : '0' + sec}`;
                }
            };
        }, 1000);
    }
}


function takeBreak() {
    taskform.style.display= 'none';
    breakform.style.display= 'block';
    pendingTime.innerHTML = '';
    pendingTime.style.display= 'block';
}

function startBreak () {
    startBreakButton.setAttribute("disabled","disabled");
    takeBreakButton.setAttribute("disabled","disabled");
    var min = parseInt(document.getElementById('breakminutes').value)-1;
    if (typeof(Worker)!==undefined) {
        var breakInterval = window.setInterval(function(){
            timerWorker.postMessage(min);
            timerWorker.onmessage = function(e) {
                if(!e.data) {
                    stopCounterBreak(breakInterval);
                } else {
                    const time = e.data;
                    min = time[0];
                    const sec = time[1];
                    pendingTime.innerHTML = `Pending time: ${min}:${sec > 9 ? sec : '0' + sec}`;
                }
            };
        }, 1000);
    }
}

function stopCounterTask(interval) {
    clearInterval(interval);
    pendingTime.style.display= 'none';
    startButton.removeAttribute('disabled');  
    takeBreakButton.removeAttribute('disabled');  
    taskInput.value = '';
    taskInput.removeAttribute("disabled");  
    startBreakButton.removeAttribute("disabled");  
}

function stopCounterBreak(interval) {
    clearInterval(interval); 
    taskform.style.display= 'block';
    breakform.style.display= 'none';
    pendingTime.innerHTML = '';
    pendingTime.style.display= 'none';
}


function saveAndShowTasks() {
    saveTask(taskInput.value);
    const task_list = getTasks();
    var cadena = '<h3> Task list </h3>';
    task_list.forEach(x => {
        cadena += `<p> * ${x.id} - ${x.date} </p>`
    });
    tasks.innerHTML = cadena;
}