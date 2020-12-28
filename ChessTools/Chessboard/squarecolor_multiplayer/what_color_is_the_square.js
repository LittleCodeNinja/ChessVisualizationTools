import { Chessboard } from "/modules/chessboard.js";

const Airtable = require('airtable');
let base = new Airtable({apiKey: 'keyzul3RdWRsCFSlL'}).base('appRmpy8EhT0DInrt');

base('StatTable').update([
    {
      "id": "recKwCmskgsQjZa4R",
      "fields": {
        "Player1Time": "1000",
        "Player2Time": "800",
        "Player1Streak": "5",
        "CurrentProblem": "a3",
        "Player2Streak": "4"
      }
    }], 
    function(err, records) {
        if (err) {
        console.error(err);
        return;
        }
        records.forEach(function(record) {
        console.log(record.get('Player1Time'));
        });
  }
);
  
let done = false

function random(ei, si=0) {
    let id = ei - si

    return Math.floor(Math.random() * (id))
}

window.answerCheck = function (user_answer) {
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

        if (user_answer == answer) {
            result.setAttribute('id', 'correct')
            
            result.innerHTML = 'Correct!'
        } else {
            result.setAttribute('id', 'incorrect')
            
            result.innerHTML = 'Incorrect'
        }

        document.body.appendChild(result)
        document.body.appendChild(nextdiv)
        nextdiv.appendChild(next)

        let boardhost = document.createElement('div')
        boardhost.setAttribute('id', 'answerboard')

        document.body.appendChild(boardhost)

        let fenlist = ['8', '8', '8', '8', '8', '8', '8', '8']

        if (files.indexOf(file) != 0 && files.indexOf(file) != 7) {
            fenlist[8 - rank] = `${files.indexOf(file)}K${7 - files.indexOf(file)}`
        } else if (files.indexOf(file) == 0) {
            fenlist[8 - rank] = 'K7'
        } else {
            fenlist[8 - rank] = '7K'
        }

        let boardobj = new Chessboard('answerboard', `${fenlist.join('/')} w - - 0 1`)

        boardobj.printboard()

        done = true
    }
}

let files  = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
let ranks = [1, 2, 3, 4, 5, 6, 7, 8];

let int_to_color = {0: "black", 1: "white"};

let file = files[random(files.length)]
let rank = ranks[random(ranks.length)]

let answer = int_to_color[(files.indexOf(file) + rank + 1) % 2]

document.getElementById('squarename').innerHTML = `${file}${rank}`