const canvas = document.querySelector("#game")
const game = canvas.getContext("2d")
const buttonUp = document.querySelector("#up")
const buttonLeft = document.querySelector("#left")
const buttonRight = document.querySelector("#right")
const buttonDown = document.querySelector("#down")

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

window.addEventListener("keydown", moveKeyboard)
buttonUp.addEventListener("click", moveUp)
buttonLeft.addEventListener("click", moveLeft)
buttonRight.addEventListener("click", moveRight)
buttonDown.addEventListener("click", moveDown)

function moveKeyboard(event){
    if (event.key === "ArrowUp" || event.key === "w") moveUp()
    else if (event.key === "ArrowLeft" || event.key === "a") moveLeft() 
    else if (event.key === "ArrowRight" || event.key === "d") moveRight() 
    else if (event.key === "ArrowDown" || event.key === "s") moveDown()
    }


function moveUp(){
    console.log("arriba")
}

function moveLeft(){
    console.log("izquierda")
}

function moveRight(){
    console.log("derecha")
}

function moveDown(){
    console.log("abajo")
}