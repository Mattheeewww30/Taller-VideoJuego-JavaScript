const canvas = document.querySelector("#game")
const game = canvas.getContext("2d")

window.addEventListener("load", setCanvas)
window.addEventListener("resize", setCanvas)

let canvasrSize
let elementSize

function setCanvas(){

    if (window.innerHeight > window.innerWidth){
        canvasrSize = window.innerWidth * 0.8
    }
    else {
        canvasrSize = window.innerHeight * 0.8
    }
    canvas.setAttribute("width", canvasrSize)
    canvas.setAttribute("height", canvasrSize)
    elementSize = canvasrSize / 10
    startGame()
}


function startGame(){

    game.font = elementSize + "px Verdana"
    game.textAlign = "end"

    const map = maps[0]
    const rows = map.trim().split("\n")
    const rowsCols = rows.map(row => row.trim().split(""))

    rowsCols.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const posX = elementSize * (colIndex + 1)
            const posY = elementSize * (rowIndex + 1)
            game.fillText(emojis[col], posX, posY)
        })
    })
} 