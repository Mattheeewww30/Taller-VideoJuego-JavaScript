const canvas = document.querySelector("#game")
const game = canvas.getContext("2d")

window.addEventListener("load", setCanvas)
window.addEventListener("resize", setCanvas)

let canvasrSize
let bombSize 

function setCanvas(){

    if (window.innerHeight > window.innerWidth){
        canvasrSize = window.innerWidth * 0.8
    }
    else {
        canvasrSize = window.innerHeight * 0.8
    }
    canvas.setAttribute("width", canvasrSize)
    canvas.setAttribute("height", canvasrSize)
    bombSize = canvasrSize / 10
    startGame()
}


function startGame(){
    game.font = bombSize + "px Verdana"
    game.textAlign = "end"

    const rows = maps[1].trim().split("\n")
    const rowsCols = rows.map(row => row.trim().split(""))

    for (let i = 1; i <= 10; i++) {
        for (let j = 1; j <= 10; j++) {
            game.fillText(emojis[rowsCols[i-1][j-1]], bombSize * j, bombSize * i)
        }
    }

}