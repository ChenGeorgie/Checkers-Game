

const ROW = 6;
const COL = 6;
const PLAYER1 = '♖';
const PLAYER2 = '♜';
const OPTIONS = 'O';

// document.body.appendChild(myImage);
var gFirstPos;
var gSecondPos;
var gFirstClickLogo;
var gshowTheEmptyOptionsMove;
var gboard;

var gIsPlayer1Turn = false;
var gIsPlayer2Turn = false;



init();


// start run.
function init() {
    gboard = buildBoard();
    renderToHtml(buildBoard());
}

function renderToHtml(board) {
    var strHtml = '';

    // show who is turn.
    strHtml += `<div class="who-turn">${(!gIsPlayer2Turn) ? 'Player 1 Turn' : 'Player 2 Turn'}</div>`

    // make a board from the build board modal.
    strHtml += `<table>`;
    for (var i = 0; i < board.length; i++) {
        // create a new line.
        strHtml += `<tr>`;
        for (var j = 0; j < board[0].length; j++) {
            // get the correct value class for each td by get the evry each cell background.
            var mainColor = ((i + j) % 2 === 0) ? 'mark-brown' : 'mark-brown-light';
            // create each cell.
            strHtml += `<td onClick="cell(this,${i},${j})" class="col col-${i}-${j} ${mainColor}">${board[i][j]}</td>`
        }

    }
    // close line
    strHtml += `</tr>`;
    // close table.
    strHtml += `</table>`;

    var eLcontainer = document.querySelector('.container');
    eLcontainer.innerHTML = strHtml;
}

// build modal board.
function buildBoard() {
    var board = [];
    for (var i = 0; i < ROW; i++) {
        board[i] = [];
        for (var j = 0; j < COL; j++) {
            board[i][j] = ``;
        }
    }

    // put the player on the board.
    placeThePlayerOnBoard(board);
    return board;

}

function cell(elCell, i, j) {
    // console.log('first player click:', gIsPlayer1Turn);
    // main dom of all the movement.
    var currCell = gboard[i][j];
    
    // check if the curr clicked 
    if (currCell === PLAYER1 && !gIsPlayer2Turn) {
        gIsPlayer1Turn = true;
        // get options for player to move.
        getCurrOptionsNeighbors(currCell, i, j, false, true)
    } else {
        if (currCell === PLAYER2 && gIsPlayer2Turn) {
            gIsPlayer1Turn = false;
            // get options for player to move.
            getCurrOptionsNeighbors(currCell, i, j, true, false);
        }
    }


    // update modal.
    // when player click on one of the options to move.
    moveTheSoliderToCurrOption(currCell, i, j);

    // update dom when player EAT.
    // update dom.
    updateDomWhenPlayerEat(i, j);

    // console.log(gboard);
    gSecondPos = [];
    renderToHtml(gboard);
}

function updateDomWhenPlayerEat() {

    if (gIsPlayer1Turn) {


        // console.warn('check!');
        // only if the player start to move.
        if (gSecondPos) {
            // when player1 click to eat to left side.
            player1Eat(2, 2, 1, 1);
            // // when player1 click to eat to right side.
            player1Eat(2, 2, 1, 1)
            // if (gFirstPos.i + 2 === gSecondPos.i && gFirstPos.j - 2 === gSecondPos.j) {
            //     gboard[gFirstPos.i+1][gFirstPos.j-1] = '';
            //     console.log('eat!!!')
            // } 

            // // when player1 eat to right side.
            // if (gFirstPos.i + 2 === gSecondPos.i && gFirstPos.j + 2 === gSecondPos.j) {
            //     // clear the soldier the player eat.
            //     gboard[gFirstPos.i+1][gFirstPos.j+1] = '';
            //     console.log('eat!!!')
            // }
        }
        // TODO: when player2 eat the player1, this player1 gone from board.

    } else {
        if (gIsPlayer2Turn) {
            if (gSecondPos) {
                console.log('last pos: ', gSecondPos);
                console.log('curr pos: ', gFirstPos);
            }
            console.log('----------')
        }
    }
    // console.log('last pos: ', gSecondPos);
    // console.log('curr pos: ', gFirstPos);
}

function player1Eat(iGoTo, jGoTo, iDelete, jDelete) {
    // check if has a options to eat.
    var checkForI = (gFirstPos.i + iGoTo === gSecondPos.i);
    var checkForJ = (gFirstPos.j - jGoTo === gSecondPos.j);

    if (checkForI && checkForJ) {
        gboard[gFirstPos.i + iDelete][gFirstPos.j - jDelete] = '';
    }
}


function moveTheSoliderToCurrOption(currCell, i, j) {

    // this is  a next click after click the on the curr soldier player.
    if (currCell === OPTIONS) {

        // change between the correct turn; (when player1 click we on true).
        if (gIsPlayer1Turn === true) gIsPlayer2Turn = true; // player1
        if (gIsPlayer1Turn === false) gIsPlayer2Turn = false; // player2

        // get the pos that player click. 
        gSecondPos = { i: i, j: j };

        // remove the first player pos from dom.
        gboard[gFirstPos.i][gFirstPos.j] = '';
        // gboard[gSecondPos.i+2][gSecondPos.j-2] = 'j';
        gboard[gSecondPos.i][gSecondPos.j] = gFirstClickLogo;

        // when we move to next location we clear the all rest options.
        clearOptionsAfterMove();
    }
}

//  when user click on player we check for the neighbors positions.
function getCurrOptionsNeighbors(currCell, i, j, isBottomTurn, isTopTurn) {
    clearOptionsAfterMove();
    gFirstPos = { i: i, j: j };
    gshowTheEmptyOptionsMove = neighbors(gboard, gFirstPos, isBottomTurn, isTopTurn);
    // // only when player1 play.
    // if (gIsPlayer1Turn) {
    //     console.log('curr pos:', gFirstPos)
    //     console.table(gshowTheEmptyOptionsMove)
    //     console.log('-------')

    // }
    gFirstClickLogo = currCell;

    // update dom.
    showTheEmptyOptions(gshowTheEmptyOptionsMove)

}

// put the player on the board.
function placeThePlayerOnBoard(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {

            // show on top. 
            board[0][j] = PLAYER1;
            board[1][j] = PLAYER1;
            //show on bottom
            board[board.length - 1][j] = PLAYER2;
            board[board.length - 2][j] = PLAYER2;

        }
    }
}
function showTheEmptyOptions(gshowTheEmptyOptionsMove) {
    // show -  only if a empty cell neighbors. 
    if (gshowTheEmptyOptionsMove) {
        for (var i = 0; i < gshowTheEmptyOptionsMove.length; i++) {
            var currEmptyOption = gshowTheEmptyOptionsMove[i];

            // change the cell to the options.
            // update modal and dom.
            gboard[currEmptyOption.i][currEmptyOption.j] = OPTIONS;

            // get the elements- of the options(this append when we click on soldier).
            var currTd = document.querySelector(`.col-${currEmptyOption.i}-${currEmptyOption.j}`);
            // console.log(currTd);


        }
    }
}

// check if have a options to move on the board and clean it..
function clearOptionsAfterMove() {
    for (var i = 0; i < gboard.length; i++) {
        for (var j = 0; j < gboard[0].length; j++) {
            var currCell = gboard[i][j];
            if (currCell === OPTIONS) {
                gboard[i][j] = '';
            }
        }
    }
}


function neighbors(mat, pos, isBottomTurn, isTopTurn) {
    var emptyOptions = [];
    //run on the mat by gUserPos postion.
    for (var i = pos.i - isBottomTurn; i <= pos.i + isTopTurn; i++) {
        // my edit: check if the i of the curr pos we clicked is same to the i of the next pos. (show only slant options).
        if (pos.i === i) continue;
        // check the wall of the rows.
        if (i < 0 || i > mat.length - 1) continue;
        for (var j = pos.j - 1; j <= pos.j + 1; j++) {
            // check the wall of the cols.
            if (j < 0 || j > mat.length - 1) continue;
            if (i === pos.i && j === pos.j) continue;
            // my edit: check if the j of the curr pos we clicked is same to the j of the next pos. (show only slant options).
            if (pos.j === j) continue;
            // console.log('neihbors:', mat[i][j])


            // PLAYER-1 TURN.
            if (gIsPlayer1Turn) {
                // check if player1 move he can get touch in player2.
                if (mat[i][j] === PLAYER2) {
                    // change the options to move to one step jump after the player2.
                    if (mat[i + 1][j + 1] !== PLAYER2) {
                        // open the option to move jump over the player2.
                        emptyOptions.push({ i: i + 1, j: j + 1 });
                    }
                    if (mat[i - 1][j - 1] !== PLAYER2) {
                        // open the option to move jump over the player2.
                        emptyOptions.push({ i: i + 1, j: j - 1 });
                    }
                }
                //check amont of neighbor.
                if (mat[i][j] === '') {
                    emptyOptions.push({ i: i, j: j });
                }
            }


            // PLAYER-2 TURN.
            if (gIsPlayer2Turn) {
                // check if player1 move he can get touch in player2.
                if (mat[i][j] === PLAYER1) {
                    // change the options to move to one step jump after the player2.
                    if (mat[i - 1][j + 1] !== PLAYER1) {
                        // open the option to move jump over the player2.
                        emptyOptions.push({ i: i - 1, j: j + 1 });
                    }
                    if (mat[i - 1][j - 1] !== PLAYER1) {
                        // open the option to move jump over the player2.
                        emptyOptions.push({ i: i - 1, j: j - 1 });
                    }
                }
                //check amont of neighbor.
                if (mat[i][j] === '') {
                    emptyOptions.push({ i: i, j: j });
                }
            }

        }
    }
    // before we return- the options the player can move.
    // we remove the extra options we dont need.
    for (var i = 0; i < emptyOptions.length; i++) {
        var item = emptyOptions[i];
        if (item.j === pos.j) {
            emptyOptions.splice(i, 1);
        }
    }

    return emptyOptions;

}


