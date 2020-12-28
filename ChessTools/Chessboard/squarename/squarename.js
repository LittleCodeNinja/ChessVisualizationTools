import { Chessboard } from "/modules/chessboard.js";

let stats = document.getElementById('stats')

let wins = localStorage.getItem('squarename_wins')
let attempts = localStorage.getItem('squarename_attempts')

if (wins === null) {
    wins = 0
}

if (attempts === null) {
    attempts = 0
}

let successrate = ((wins / attempts) * 100).toFixed(2)

if (isNaN(successrate)) successrate = 0

stats.innerHTML = `${wins.big().fontcolor('white')} correct answers out of ${attempts.big().fontcolor('white')} | Success rate: ${`${successrate}%`.big().fontcolor('white')}`

let done = false

function random(ei, si=0) {
    let id = ei - si

    return Math.floor(Math.random() * (id))
};

function createboard() {
    let fenlist = ['8', '8', '8', '8', '8', '8', '8', '8']

    if (files.indexOf(file) != 0 && files.indexOf(file) != 7) {
        fenlist[8 - rank] = `${files.indexOf(file)}K${7 - files.indexOf(file)}`
    } else if (files.indexOf(file) == 0) {
        fenlist[8 - rank] = 'K7'
    } else {
        fenlist[8 - rank] = '7K'
    }

    let board = new Chessboard('questionboard', `${fenlist.join('/')} w - - 0 1`)

    board.printboard()
};

document.getElementById('squareinput').addEventListener('keyup', e => {
    let key = e.key || e.keyCode

    if (key == 'Enter' || key == 13) {
        if (done == false) {
            const urllocation = window.location.href
    
            let result = document.createElement('p')
            let nextdiv = document.createElement('div')
            let next  = document.createElement('a')
    
            result.setAttribute('class', 'squareColor result')
            nextdiv.setAttribute('class', 'squareColor')
            next.setAttribute('class', 'squareColor')
    
            nextdiv.setAttribute('id', 'nextdiv')
    
            next.setAttribute('href', urllocation)
            next.setAttribute('id', 'next')
            next.innerHTML = 'Continue ->'
    
            let answerobj = document.createElement('p')

            answerobj.setAttribute('id', 'wantedanswer')

            if (document.getElementById('squareinput').value.toLowerCase() == answer) {
                result.setAttribute('id', 'correct')
    
                result.innerHTML = 'Correct!'

                window.localStorage.setItem('squarename_wins', parseInt(wins) + 1)
            } else {
                result.setAttribute('id', 'incorrect')
    
                answerobj.innerHTML = `The answer was ${answer}`
                
                result.innerHTML = 'Incorrect'
            }
    
            window.localStorage.setItem('squarename_attempts', parseInt(attempts) + 1)

            document.body.appendChild(result)
    
            document.body.appendChild(answerobj)
    
            document.body.appendChild(nextdiv)
            nextdiv.appendChild(next)
    
            let boardhost = document.createElement('div')
            boardhost.setAttribute('id', 'answerboard')
    
            document.body.appendChild(boardhost)
    
            done = true
        }
    }
})

let files  = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
let ranks = [1, 2, 3, 4, 5, 6, 7, 8];

let file = files[random(files.length)]
let rank = ranks[random(ranks.length)]

let answer = `${file}${rank}`

createboard()