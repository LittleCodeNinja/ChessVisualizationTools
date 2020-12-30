const { Chess } = require('chess.js');
const prompt = require('prompt-sync')();

const chess = new Chess();

function game() {
    let result;

    chess.reset()

    while (!chess.game_over()) { 
        const moves = chess.moves()
        const move = moves[Math.floor(Math.random() * moves.length)]
        chess.move(move)
    }

    if (chess.in_checkmate()) {
        if (chess.turn = 'w') {
            result = [1, 0]
        } else {
            result = [0, 1]
        }
    } else {
        result = [0.5, 0.5]
    };

    if (printPGN) {
        console.log(`\n${chess.pgn()}`)
    }

    return result;
};

function match() {
    let p1 = 0;
    let p2 = 0;

    let white = 1

    while (p1 == p2) {
        let gameResult = game();

        p1 += gameResult[0 + white];
        p2 += gameResult[1 - white];

        if (white == 1) white = 0; else white = 1;

        if (printDuring) {
            console.log([p1, p2])
        }

        if (waitGame) {
            prompt('')
        }
    }

    return {player1: p1, player2: p2}
};

//-------------------- Setup Round --------------------\\

const competitors = prompt('How many bots?');
const printDuring = prompt('Print results of every game?');
const printPGN = prompt('Print pgn of every game?');

let waitGame = false

if (printDuring || printPGN)  {
    waitGame = prompt('Wait after every game?')
}

let waitMatch = false

if (!waitGame) {
    waitMatch = prompt('Wait after every match?')
}

//-----------------------------------------------------\\

let players = [];

for (let i = 1; i <= competitors; i++) {
    players.push(`Random${i}`)
}

let nrplayers = players

let round = 0

let winner

while (winner === undefined) {
    for (let pn = 0; pn <= players.length - 2; pn ++) {
        if (printDuring) {
            console.log(`${players[pn]} vs ${players[pn + 1]}`)
        }

        let matchResult = match()

        if (waitMatch) {
            prompt('')
        }

        console.log(`${players[pn]}: ${matchResult.player1}\n${players[pn + 1]}: ${matchResult.player2}\n\n`)

        if (matchResult.player1 > matchResult.player2) {
            nrplayers.splice(pn + 1, 1)
        } else {
            nrplayers.splice(pn, 1)
        }
    }

    players = nrplayers
    
    round++

    console.log(`----------\nRound ${round} finished.\n----------`)

    if (players.length == 1) {
        console.log(`Tournament finished. ${players[0]} is the winner!`)
        winner = true
    }
}