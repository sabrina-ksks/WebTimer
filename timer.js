let init = {hour: 0, min: 0, sec: 0};
let now = null;
let count = null;
let interval = null;
let state = "initial";  //initial, running, pausing

document.getElementById("inc-hour").addEventListener('click', () => {increment("hour");});
document.getElementById("inc-min").addEventListener('click', () => {increment("min");});
document.getElementById("inc-sec").addEventListener('click', () => {increment("sec");});
document.getElementById("dec-hour").addEventListener('click', () => {decrement("hour");});
document.getElementById("dec-min").addEventListener('click', () => {decrement("min");});
document.getElementById("dec-sec").addEventListener('click', () => {decrement("sec");});
document.getElementById("start").addEventListener('click', startTimer);
document.getElementById("pause").addEventListener('click', pauseTimer);
document.getElementById("reset").addEventListener('click', resetTimer);

function increment(key) {
    if (state != "running") {
        if (key == "hour") {
            if (init[key] == 99) init[key] = 0;
            else init[key]++;
        } else {
            if (init[key] == 59) init[key] = 0;
            else init[key]++;
        }
        initTime();
    }
}

function decrement(key) {
    if (state != "running") {
        if (init[key] == 0) {
            if (key == "hour") init[key] = 99;
            else init[key] = 59;
        } else {
            init[key]--;
        }
        initTime();
    }
}

function initTime() {
    now = null;
    count = init["hour"]*3600 + init["min"]*60 + init["sec"];
    document.getElementById("hour").innerHTML = String(init["hour"]).padStart(2, "0");
    document.getElementById("min").innerHTML = String(init["min"]).padStart(2, "0");
    document.getElementById("sec").innerHTML = String(init["sec"]).padStart(2, "0");
    document.title = String(init["hour"]).padStart(2, "0") + ":"
                    + String(init["min"]).padStart(2, "0") + ":"
                    + String(init["sec"]).padStart(2, "0") + " | WebTimer";
}

function startTimer() {
    if (state != "running") {
        if (state == "initial") {
            now = Object.create(init);
        }
        interval = setInterval(countdown, 1000);
        state = "running";
    }
}

function pauseTimer() {
    if (state == "running") {
        clearInterval(interval);
        state = "pausing";
    }
}

function resetTimer() {
    if (state == "initial") {
        init = {hour: 0, min: 0, sec: 0};
        initTime();
    } if (state == "pausing") {
        clearInterval(interval);
        initTime();
        state = "initial";
    }
}

function countdown() {
    if (count == 0) {

        clearInterval(interval);
        state = "pausing";
    } else {
        count--;
        now["hour"] = Math.floor(count/3600);
        now["min"] = Math.floor(count/60) % 60;
        now["sec"] = count % 60;
        document.getElementById("hour").innerHTML = String(now["hour"]).padStart(2, "0");
        document.getElementById("min").innerHTML = String(now["min"]).padStart(2, "0");
        document.getElementById("sec").innerHTML = String(now["sec"]).padStart(2, "0");
        document.title = String(now["hour"]).padStart(2, "0") + ":"
                        + String(now["min"]).padStart(2, "0") + ":"
                        + String(now["sec"]).padStart(2, "0") + " | WebTimer";
    }
}

initTime();