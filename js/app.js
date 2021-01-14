const ROW = 10;
const COL = 10;
const PLAYER1 = '⛀';
const PLAYER2 = '⛂';
const PLAYER1DRAGROM = '⛁';
const PLAYER2DRAGROM = '⛃';
const OPTIONS = 'O';

// get the curr pos and the next pos.
var gFirstPos;
var gSecondPos;
// get the soldier string.
var gFirstClickLogo;
// get the empty cell the player can movment.
var gshowTheEmptyOptionsMove;
// count of the soldier for each side.
var gCountSoliderOnBoard = 0;
var gBoard;
// check who is turn.
var gIsPlayer1Turn = false;
var gIsPlayer2Turn = false;

// count of players eats.
var gPlayer1EatsCount;
var gPlayer2EatsCount;


// run game.
init();

function init() {
    // restart the players turns.
    gIsPlayer1Turn = false;
    gIsPlayer2Turn = false;
    // restart the players eat another.
    gPlayer1EatsCount = 0;
    gPlayer2EatsCount = 0;
    //get the board.
    gBoard = buildBoard();
    // show the board.
    renderToHtml(gBoard);
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
    var player1Eats = `player1 eats: <span class="player-eats-count">${gPlayer1EatsCount}</span>`;
    var player2Eats = `player2 eats: <span class="player-eats-count">${gPlayer2EatsCount}</span>`;
    strHtml += `<div class="player-eats">${player1Eats} ${player2Eats}</div>`
        // show the game over modal who win.
    strHtml += `<div class="game-over">Game Over
     <span class="who-win">${((gPlayer2EatsCount === gCountSoliderOnBoard) ? 'Player2 Win' : '')}</span>   
     <span class="who win">${((gPlayer1EatsCount === gCountSoliderOnBoard) ? 'Player1 Win' : '')}</span>
     <button onClick="isClickOnRestartGame()" class="restart-game">RESTART GAME</<button>
    </div>`


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

    // console.log(elCell)


    gSecondPos = [];
    // main dom of all the movement.
    var currCell = gBoard[i][j];

    // check if the correct for player1 clicked (not empty cell).
    if (currCell === PLAYER1 && !gIsPlayer2Turn) {

        gIsPlayer1Turn = true;
        // get options for player to move.
        getCurrOptionsNeighbors(currCell, i, j, false, true)
    } else {
        // check if the correct for player2 clicked (not empty cell).
        if (currCell === PLAYER2 && gIsPlayer2Turn) {
            // console.log('Player2');
            gIsPlayer1Turn = false;
            // get options for player to move.
            getCurrOptionsNeighbors(currCell, i, j, true, false);
        }
    }

    // when player click on one of the options to move.
    getNextPosOptions(currCell, i, j);

    // update dom when player EAT.
    // update dom.
    updateDomWhenPlayer1Eat(i, j);


    // // console.log(gBoard);
    renderToHtml(gBoard);

    checkWin();

    // elCell.style.backgroundColor = "red";
}


function updateDomWhenPlayer1Eat() {

    if (gIsPlayer1Turn) {

        // only if the player start to move.
        if (gSecondPos) {
            // when player1 click to eat to LEFT side.
            player1Eat(2, 2, 1, 1);
            // // when player1 click to eat to RIGHT side.
            player1Eat(2, -2, 1, -1)
        }
    }
}
// move to the correct eat and reomove that player1 eat.
function player1Eat(iGoTo, jGoTo, iDelete, jDelete) {
    // check if has a options to eat. this player is eat?
    var checkForI = (gFirstPos.i + iGoTo === gSecondPos.i);
    var checkForJ = (gFirstPos.j - jGoTo === gSecondPos.j);

    if (checkForI && checkForJ) {
        // count the player1 eats player2.
        gPlayer1EatsCount++;
        gBoard[gFirstPos.i + iDelete][gFirstPos.j - jDelete] = '';
    }
}
// move to the correct eat and reomove that player2

function player2Eat(iGoTo, jGoTo, iDelete, jDelete) {
    // only if the player eat(jump over the player).
    var checkForI = (gFirstPos.i - iGoTo === gSecondPos.i);
    var checkForJ = (gFirstPos.j + jGoTo === gSecondPos.j);

    // player eat.
    if (checkForI && checkForJ) {
        // count the player2 eats player1.
        gPlayer2EatsCount++;
        // clear from board the soldier he is eat.
        gBoard[gFirstPos.i - iDelete][gFirstPos.j + jDelete] = '';
    }
}

function getNextPosOptions(currCell, i, j) {
    // console.log('last pos: ', gFirstPos);
    // this is  a next click after click the on the curr soldier player.
    if (currCell === OPTIONS) {

        // change between the correct turn; (when player1 click we on true).
        if (gIsPlayer1Turn === true) gIsPlayer2Turn = true; // player1
        if (gIsPlayer1Turn === false) gIsPlayer2Turn = false; // player2

        // get the pos that player click to move. 
        gSecondPos = { i: i, j: j };

        // console.log('curr pos: ', gSecondPos);

        // when player2 click to eat to RIGHT side.
        player2Eat(2, 2, 1, 1);
        // when player2 click to eat to LEFT side.
        player2Eat(2, -2, 1, -1);

        // remove the first player pos from dom.
        gBoard[gFirstPos.i][gFirstPos.j] = '';
        gBoard[gSecondPos.i][gSecondPos.j] = gFirstClickLogo;

        // when we move to next location we clear the all rest options.
        clearOptionsAfterMove();
    }
}

function checkWin() {
    // console.log('maximum soldier:', gCountSoliderOnBoard);
    // console.log('player1 eats soldier:', gPlayer1EatsCount);
    // console.log('player1 eats soldier:', gPlayer2EatsCount);

    // check if player1 win.
    if (gPlayer1EatsCount === gCountSoliderOnBoard) {
        var gameOverModal = document.querySelector('.game-over');
        console.warn('player1 win')

        // show the game over modal.
        gameOverModal.style.display = 'block';

    } else {
        // check if player2 win.
        if (gPlayer2EatsCount === gCountSoliderOnBoard) {
            var gameOverModal = document.querySelector('.game-over');
            console.warn('player2 win')

            // show the game over modal.
            gameOverModal.style.display = 'block';

        }
    }

}

// when game is over and the user click on restart game. 
function isClickOnRestartGame() {
    init();
}


//  when user click on player we check for the neighbors positions.
function getCurrOptionsNeighbors(currCell, i, j, isBottomTurn, isTopTurn) {
    // clear the option (if have rest).
    clearOptionsAfterMove();
    // get the next location.
    gFirstPos = { i: i, j: j };
    // get the empty cell location.
    gshowTheEmptyOptionsMove = neighbors(gBoard, gFirstPos, isBottomTurn, isTopTurn);

    // save the first logo of cell.
    gFirstClickLogo = currCell;

    // update dom.
    showTheEmptyOptions(gshowTheEmptyOptionsMove)

}

// put the player on the board.
function placeThePlayerOnBoard(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {

            // console.log('j:', j, j % 2 !== 0);

            if (j % 2 !== 0) {
                // show on top. 
                board[0][j] = PLAYER1;
                board[2][j] = PLAYER1;

                //show on bottom
                board[board.length - 2][j] = PLAYER2;
                board[board.length - 4][j] = PLAYER2;
            } else {
                // show on top. 
                board[1][j] = PLAYER1;
                board[3][j] = PLAYER1;
                // board[2][j] = PLAYER1;

                // //show on bottom
                board[board.length - 1][j] = PLAYER2;
                board[board.length - 3][j] = PLAYER2;

            }

            // count how many soldier have each player.
            if (board[i][j] === PLAYER1) {
                gCountSoliderOnBoard++
            }

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
            gBoard[currEmptyOption.i][currEmptyOption.j] = OPTIONS;

            // get the elements- of the options(this append when we click on soldier).
            var currTd = document.querySelector(`.col-${currEmptyOption.i}-${currEmptyOption.j}`);
            // console.log(currTd);


        }
    }
}

// check if have a options to move on the board and clean it..
function clearOptionsAfterMove() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var currCell = gBoard[i][j];
            if (currCell === OPTIONS) {
                gBoard[i][j] = '';
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