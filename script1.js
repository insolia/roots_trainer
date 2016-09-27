/**
 * Created by Insolia on 25.01.16.
 */



var corAns;
var score = 0;
var firstLaunch = true;
var maxN = 99, minN = 11;
var timeLimit = 60000;
var tics = 0;
var ticTime = 50;
var initialWidth = 90;
var initialMl = (100-initialWidth)/2;
var widthTic = initialWidth * ticTime / timeLimit;



function ansSub() {
    var ans = document.getElementById('inp_area').value;
    if (firstLaunch == true) {

        document.getElementById("question").innerHTML = "";
        document.getElementById("question").className = "number question main_message";
        document.getElementById("inp_area").value = "";
        document.getElementById("score").innerHTML = "0";

        timer_start();
        newQuest();

        firstLaunch = false;
        return;
    }

    if ((ans.trim() != ans)) {


        if (ans.trim() == corAns) {
            document.getElementById("debug").innerHTML = "correct!";
            score += 1;
            document.getElementById("score").innerHTML = score;
            newQuest();
        } else {
            document.getElementById("debug").innerHTML = "incorrect<br>try again";
            score -= 1;
            document.getElementById("score").innerHTML = score;

        }

        document.getElementById('inp_area').value = '';
    }


}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function newQuest() {
    corAns = getRandomIntInclusive(minN, maxN);

    document.getElementById("question").innerHTML = '--- ' + corAns * corAns + ' ---';

    return corAns
}


/* timer tics every 1/10 sec = 100 milisec */


function timer_start() {
    var new_w = initialWidth - widthTic * tics;
    var new_ml = initialMl + (widthTic * tics)/2
    document.getElementById("time_bar").style.width = new_w + "%";
    document.getElementById("time_bar").style.marginLeft = new_ml + "%";

    if (tics % (1000 / ticTime) == 0) {
        document.getElementById("timer").innerHTML = (Math.floor(timeLimit / 1000) - (tics / (1000 / ticTime)));
    }
    if (Math.floor(timeLimit / 1000) - (tics / (1000 / ticTime)) != 0) {
        tics = tics + 1;
        setTimeout(timer_start, ticTime);
    } else {
        timer_end();
    }
}

function timer_end() {
    alert('times up, your result is ' + score);
}



function checkInput(ob) {
    /* preventing not numeric input*/

    var invalidChars = /[^0-9]/gi
    if(invalidChars.test(ob.value)) {
        ob.value = ob.value.replace(invalidChars,"");
    }
}
