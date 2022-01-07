
class Timer {
    sec = 59;
    min = 0;

    constructor (min) {
        this.min = --min;
    }

    decreaseTime() {
        this.sec--;
        if(!this.sec) {
            this.sec = 59;
            this.min--;
        }
        if(this.min < 0) {
            this.min = 0;
            this.sec = 0;
        }
       return `Pending time: ${this.min}: ${this.sec > 9 ? this.sec : '0' + this.sec}`;
    }
}

