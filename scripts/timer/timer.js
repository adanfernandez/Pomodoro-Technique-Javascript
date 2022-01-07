
sec = 59;
min = 0;

function timer() {
    this.sec--;
    if(!this.sec) {
        this.sec = 59;
        this.min--;
    }
    if(this.min < 0) {
        this.min = 0;
        this.sec = 0;
    }
    postMessage(`Pending time: ${this.min}: ${this.sec > 9 ? this.sec : '0' + this.sec}`);
}


timer();