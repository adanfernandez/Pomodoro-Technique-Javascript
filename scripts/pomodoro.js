const taskInput = document.querySelector("#taskname");  
const startButton = document.querySelector("#start");
const pendingTime = document.querySelector("#pendingTime");

var counterWorker;

taskInput.addEventListener("input", validate);
pendingTime.style.display= 'none';
startButton.onclick = startTime;

function validate(){
    if(taskInput.value === ""){
        startButton.setAttribute("disabled","disabled");
    } else {
        startButton.removeAttribute("disabled");  
    }
} 

function startTime() {
    if (typeof(Worker)!==undefined) {
        pendingTime.style.display= 'block';
        startButton.setAttribute("disabled","disabled");
        taskInput.setAttribute("disabled","disabled");
        var min = parseInt(document.getElementById('taskminutes').value)-1;
        pendingTime.innerHTML = `Pending time: ${min}:59`
        timerWorker = new Worker("scripts/timer/timer.js");
        var interval = window.setInterval(function(){
            timerWorker.postMessage(min);
            timerWorker.onmessage = function(e) {
                if(!e.data) {
                    stopCounter(interval);
                } else {
                    const time = e.data;
                    min = time[0];
                    const sec = time[1];
                    pendingTime.innerHTML = `Pending time: ${min}: ${sec > 9 ? sec : '0' + sec}`;
                    debugger;
                }
            };
        }, 100);
    }
}

function stopCounter(interval) {
    clearInterval(interval);
    pendingTime.style.display= 'none';
    startButton.removeAttribute('disabled');  
    taskInput.value = '';
    taskInput.removeAttribute("disabled");  
}