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
    const min = 2;
    pendingTime.innerHTML = `Pending time: ${min-1}:59`
    var timer = new Timer(min);
    window.setInterval(function(){
        const message = timer.decreaseTime();
        pendingTime.innerHTML = message;
        if(!timer.min && !timer.sec) {
            //clearInterval(intervalId) 
        }
    }, 1000);
}