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

}