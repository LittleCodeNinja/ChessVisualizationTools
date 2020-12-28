export class Chessboard {
    constructor(id, position='rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1') {
        this.id = id
        this.position = position

        this.board = this.fenToBoard(position)
    }

    fenToBoard = function(position = this.position) {
        let fenpieces = position.split(' ')[0]
        let feninfo = [position.split(' ')[1], position.split(' ')[2], position.split(' ')[3], position.split(' ')[4], position.split(' ')[5]]

        let castleinfo = {white: [], black: []}

        if (feninfo[1].includes('K')) {
            castleinfo.white.push('Kingside')
        }
        if (feninfo[1].includes('Q')) {
            castleinfo.white.push('Queenside')
        }
        if (feninfo[1].includes('k')) {
            castleinfo.black.push('Kingside')
        }
        if (feninfo[1].includes('q')) {
            castleinfo.black.push('Queenside')
        }

        let mkboard = {
            data: Array(63),
            turn: feninfo[0],
            castle: {
                all: castleinfo,
                white: castleinfo.white,
                black: castleinfo.black
            },
            movenumber: feninfo[3],
            halfmovenumber: feninfo[4],

            pressedsquares: []
        }

        let arraypos = 0

        for (let row of fenpieces.split('/')) {
            for (let piece of row) {

                if (isNaN(piece)) {
                    mkboard.data[arraypos] = piece
        
                    arraypos++
                } else {
                    for (let i = 1; i <= piece; i++) {
                        mkboard.data[arraypos] = '.'

                        arraypos++
                    }
                }
            }
        }

        mkboard.ascii = `${mkboard.data[0]} ${mkboard.data[1]} ${mkboard.data[2]} ${mkboard.data[3]} ${mkboard.data[4]} ${mkboard.data[5]} ${mkboard.data[6]} ${mkboard.data[7]} \n${mkboard.data[8]} ${mkboard.data[9]} ${mkboard.data[10]} ${mkboard.data[11]} ${mkboard.data[12]} ${mkboard.data[13]} ${mkboard.data[14]} ${mkboard.data[15]} \n${mkboard.data[16]} ${mkboard.data[17]} ${mkboard.data[18]} ${mkboard.data[19]} ${mkboard.data[20]} ${mkboard.data[21]} ${mkboard.data[22]} ${mkboard.data[23]} \n${mkboard.data[24]} ${mkboard.data[25]} ${mkboard.data[26]} ${mkboard.data[27]} ${mkboard.data[28]} ${mkboard.data[29]} ${mkboard.data[30]} ${mkboard.data[31]} \n${mkboard.data[32]} ${mkboard.data[33]} ${mkboard.data[34]} ${mkboard.data[35]} ${mkboard.data[36]} ${mkboard.data[37]} ${mkboard.data[38]} ${mkboard.data[39]} \n${mkboard.data[40]} ${mkboard.data[41]} ${mkboard.data[42]} ${mkboard.data[43]} ${mkboard.data[44]} ${mkboard.data[45]} ${mkboard.data[46]} ${mkboard.data[47]} \n${mkboard.data[48]} ${mkboard.data[49]} ${mkboard.data[50]} ${mkboard.data[51]} ${mkboard.data[52]} ${mkboard.data[53]} ${mkboard.data[54]} ${mkboard.data[55]} \n${mkboard.data[56]} ${mkboard.data[57]} ${mkboard.data[58]} ${mkboard.data[59]} ${mkboard.data[60]} ${mkboard.data[61]} ${mkboard.data[62]} ${mkboard.data[63]}`

        return mkboard
    }
    
    // legalmoves = function(board = this.board) {
    //     let legalmoves = []

    //     for (let piece of board.data) {
    //         let piece = piece.lower()
    //         let arraypos = board.data.indexOf(piece)

    //         let rank = Math.ceil(arraypos / 8)
    //         let file = arraypos - (rank - 1)

    //         if (piece == 'p') {
    //             // The mighty old pawn
                
    //             let directionfactor

    //             if (board.turn == 'w') directionfactor = 1; else directionfactor = -1

    //             if (board.data[arraypos + (8 * directionfactor)] == '.') {

    //             }

    //             if (board.turn == 'w' && rank == 2 || board.turn == 'b' && rank == 7) {
                    
    //             }
    //         }
    //     }
    // }

    printboard = function(board = this.board) {
        let hostobj = document.getElementById(this.id)

        hostobj.setAttribute('class', 'Chessboard')

        let coverobj = document.createElement('div')

        coverobj.setAttribute('style', `width: ${hostobj.clientWidth}px; height: ${hostobj.clientHeight}px`)

        for (let squarenumber = 1; squarenumber <= board.data.length; squarenumber++) {
            let squareobj = document.createElement('div')
            
            let rank = Math.ceil(squarenumber / 8)
            let file = squarenumber - (rank * 8 - 1)

            let squarecolor = (file + rank) % 2

            let pieceobj = document.createElement('span')

            if (board.data[squarenumber - 1] != '.') {
                pieceobj.innerHTML = board.data[squarenumber - 1]
            } else {
                pieceobj.innerHTML = '.'

                pieceobj.style.opacity = '0'
            }

            squareobj.appendChild(pieceobj)
            
            if (squarecolor == 0) {
                squarecolor = 'darksquare'
            } else {
                squarecolor = 'lightsquare'
            }
            
            squareobj.setAttribute('class', squarecolor)
            squareobj.setAttribute('id', `board_square_${(((squarenumber - 1) % 8) - (rank * 8)) * -1 -1}`)

            squareobj.addEventListener('mousedown', function() {
                squareobj.setAttribute('class', `${squarecolor} squarepressed`)
                board.pressedsquares.push(squarenumber)
            })

            squareobj.addEventListener('mouseup', function() {
                squareobj.setAttribute('class', squarecolor)

                try {
                    board.pressedsquares.splice(board.data.pressedsquares.indexOf(squarenumber), 1)
                } catch {
                    
                }
                
                squareobj.addEventListener('mouseout', function() {
                    squareobj.setAttribute('class', squarecolor)

                    try {
                        board.pressedsquares.splice(board.data.pressedsquares.indexOf(squarenumber), 1)
                    } catch {

                    }
                })
            })

            if (squarenumber != 1) {
                if (squarenumber % 8 == 1) {
                    coverobj.appendChild(document.createElement('br'))
                }
            }

            squareobj.style.display = 'inline-block'
            
            squareobj.style.width = '12.5%'
            squareobj.style.height = '12.5%'

            squareobj.style.margin = '0'

            squareobj.style.textAlign = 'center'

            coverobj.appendChild(squareobj)
        }

        hostobj.appendChild(coverobj)
    }

    clearboard = function() {
        hostobj = document.getElementById(this.id)

        hostobj.removeChild('div')
    } 
}