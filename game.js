const canvas = document.querySelector("#game")
const game = canvas.getContext("2d")

window.addEventListener("load", startGame)

function startGame(){
    let canvasrSize

    if (window.innerHeight > window.innerWidth){
        canvasrSize = window.innerWidth * 0.8
    }
    else {
        canvasrSize = window.innerHeight * 0.8
    }
    canvas.setAttribute("width", canvasrSize)
    canvas.setAttribute("height", canvasrSize)

    const bombSize = canvasrSize / 10
    game.font = bombSize + "px Verdana"
    game.textAlign = "end"
    for (let i = 1; i <= 10; i++) {
        game.fillText(emojis["X"], bombSize, bombSize * i)
    }

}