const taskInput = document.querySelector("#taskname");  
const startButton = document.querySelector("#start");
const pendingTime = document.querySelector("#pendingTime");
    
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
    pendingTime.style.display= 'block';
    startButton.setAttribute("disabled","disabled");
    taskInput.setAttribute("disabled","disabled");
    const min = 1;
    pendingTime.innerHTML = `Pending time: ${min-1}:59`
    var timer = new Timer(min);
    var interval = window.setInterval(function(){
        const message = timer.decreaseTime();
        pendingTime.innerHTML = message;
        if(!timer.min && !timer.sec)  stopCounter(interval);        
   // }, 1000);
    }, 100);
}

function stopCounter(interval) {
    clearInterval(interval);
    pendingTime.style.display= 'none';
    startButton.removeAttribute('disabled');  
    taskInput.value = '';
    taskInput.removeAttribute("disabled");  
}