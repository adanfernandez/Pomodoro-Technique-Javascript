sec = 59;
min = 0;

self.onmessage = function (msg) {

    if(msg != null && msg != undefined){
        min=msg.data;
        decreaseTime();
    }
}

function decreaseTime() {
    --sec;
    if(!sec) {
        sec = 59;
        min--;
    }
    if(min <0) {
        postMessage(0);
    } else {
        //postMessage(`Pending time: ${min}: ${sec > 9 ? sec : '0' + sec}`);
        postMessage([min, sec]);
    }
}
