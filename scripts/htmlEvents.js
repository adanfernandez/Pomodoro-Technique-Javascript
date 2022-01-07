const taskInput = document.querySelector("#taskname");  
const startButton = document.querySelector("#start");
    
taskInput.addEventListener("input", validate);

function validate(){
    if(taskInput.value === ""){
        startButton.setAttribute("disabled","disabled");
    } else {
        startButton.removeAttribute("disabled");  
    }
}  