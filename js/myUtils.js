

//!!!!! MY FUNCTION USE!!!!!


// random inclusive

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive 
}

// RANDOM FUNCTION  example: (1,100). - not includes.
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

// generate random hex color. 
function getRandomColor() {
    return '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
}


// stoper timing 
function stoper(event) {
    console.time('Execution Time')
    console.log(event);
    console.timeEnd('Execution Time')
}
// shuffle array.
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// timer first function.
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    gInterval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        // timer restart if game over or time done.
        if (--timer < 0 || gCounterUserStep === gNumbers.length + 1) {
            timer = duration;
            alert('Your time is finish')
            gInterval = clearInterval(gInterval);
            renderBaord();

        }
    }, 1000);
}
// timer in second.
function timer() {
    var fiveMinutes = 60 * 1,
        display = document.querySelector('#time');

    startTimer(fiveMinutes, display);
};

// fast timer milisecond. 
function accuarateTimer() {
    var startTime = Date.now();
    gInterval = setInterval(function() {
        var elapsedTime = Date.now() - startTime;
        document.querySelector("#timer").innerHTML = (elapsedTime / 1000).toFixed(3);
    }, 100);
}

//get how many days over from the date.
// calcDaysFromDate("1993-03-10"); <- example.
function calcDaysFromDate(date) {
    // count the days left from date we put.  
    time = Date.parse(new Date()) -  Date.parse(date);
    var days = time / (1000 * 60 * 60 * 24);
    return Math.floor(days);
}



// ** the fast array sort by javascript **
var array = [3, 5, 2, 1, 6];
// sortArray(arrays)
function sortArray(arrays) {
    arrays.sort((a, b) => a - b);
    return arrays;
}


// get string id like 'cell-1-3' and return coord like {i: 1, j: 3};
function getCellId(strCellId) {
    coord = {};
    part = strCellId.split('-');
    coord.i = +part[1];
    coord.j = +part[2];
    return coord;
}


function neighbors(mat, pos) {
    var count = 0;
    //run on the mat by gUserPos postion.
    for (var i = pos.i - 1; i <= pos.i + 1; i++) {

        // check the wall of the rows.
        if (i < 0 || i > mat.length - 1) continue;
        for (var j = pos.j - 1; j <= pos.j + 1; j++) {
            // check the wall of the cols.
            if (j < 0 || j > mat.length - 1) continue;
            if (i === pos.i && j === pos.j) continue;
            // var currCell = mat[i][j]; 
            console.log(mat[i][j], mat[i][j] === '')
            // count++;
            //check amont of neighbor.
            if (mat[i][j] === '') count++;
            
        }
    }
    // console.log('count of nieghbors: ', count);
    return count;
}


function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            break;
        case 'ArrowDown':
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            break;
        default:
            return null;
    }
    return nextLocation;
}
