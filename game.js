const canvas = document.querySelector("#game")
const game = canvas.getContext("2d")
const buttonUp = document.querySelector("#up")
const buttonLeft = document.querySelector("#left")
const buttonRight = document.querySelector("#right")
const buttonDown = document.querySelector("#down")
const spanLives = document.querySelector("#lives")
const spanTime = document.querySelector("#time")
const spanRecord = document.querySelector("#record")
const pResult = document.querySelector("#result")

window.addEventListener("load", setCanvas)
window.addEventListener("resize", setCanvas)

let canvasSize
let elementSize
let level = 0
let lives = 3

let timeStart
let timeInterval
let timePlayer


const playerPosition = {
    x: undefined,
    y: undefined,
}
const giftPosition = {
    x: undefined,
    y: undefined,
}
let bombPositions = []


function setCanvas(){

    if (window.innerHeight > window.innerWidth){
        canvasSize = window.innerWidth * 0.7
    }
    else {
        canvasSize = window.innerHeight * 0.7
    }

    canvasSize = Number(canvasSize.toFixed(0))

    canvas.setAttribute("width", canvasSize)
    canvas.setAttribute("height", canvasSize)
    elementSize = canvasSize / 10
    startGame()
}

function startGame(){

    game.font = elementSize + "px Verdana"
    game.textAlign = "end"

    const map = maps[level]

    if (!map){
        gameWin()
        return
    }

    if (!timeStart){
        timeStart = Date.now()
        timeInterval = setInterval(showTime, 100)
        showRecord()
    }

    const rows = map.trim().split("\n")
    const rowsCols = rows.map(row => row.trim().split(""))

    showLives()

    bombPositions = []
    game.clearRect(0, 0, canvasSize, canvasSize)

    rowsCols.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const posX = elementSize * (colIndex + 1)
            const posY = elementSize * (rowIndex + 1)

            if (col == "O"){
                if (!playerPosition.x && !playerPosition.y){
                    playerPosition.x = posX
                    playerPosition.y = posY
                }
            } else if (col == "I"){
                giftPosition.x = posX
                giftPosition.y = posY
            } else if (col == "X"){
                bombPositions.push({
                    x: posX,
                    y: posY,
                })
            }

            game.fillText(emojis[col], posX, posY)
        })
    })
    movePlayer()
}

function movePlayer(){
    const giftCollisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3)
    const giftCollisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3)
    const giftCollison = giftCollisionX && giftCollisionY
    if (giftCollison){
        levelWin()
    }

    const bombCollision = bombPositions.find(bomb => {
        const bombCollisionX = bomb.x.toFixed(3) == playerPosition.x.toFixed(3)
        const bombCollisionY = bomb.y.toFixed(3) == playerPosition.y.toFixed(3)
        return bombCollisionX && bombCollisionY
    })
    if (bombCollision){
        levelFail()
    }
    game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y)
}

function levelWin(){
    level++
    startGame()
}

function levelFail(){
    lives --
    if (lives <= 0){
        level = 0
        lives = 3
        timeStart = undefined
    }
    playerPosition.x = undefined
    playerPosition.y = undefined
    startGame()
}

function gameWin(){
    clearInterval(timeInterval)
    setRecord()
}

function setRecord(){
    const recordTime = localStorage.getItem("record_time")
    const playerTime = Date.now() - timeStart

    if (recordTime){
        if (recordTime >= playerTime){
            localStorage.setItem("record_time", playerTime)
            pResult.innerHTML = "Superaste el Récord"
        } else {
            pResult.innerHTML = "Ganaste pero lo puedes hacer en un mejor tiempo"
        }
    } else {
        localStorage.setItem("record_time", playerTime)
    }
}

function showLives() {
    spanLives.innerHTML = emojis["HEART"].repeat(lives)
}

function showTime(){
    spanTime.innerHTML = Date.now() - timeStart
}

function showRecord(){
    spanRecord.innerHTML = localStorage.getItem("record_time")
}



window.addEventListener("keydown", moveKeyboard)
buttonUp.addEventListener("click", moveUp)
buttonLeft.addEventListener("click", moveLeft)
buttonRight.addEventListener("click", moveRight)
buttonDown.addEventListener("click", moveDown)

function moveKeyboard(event){
    if (event.key == "ArrowUp" || event.key == "w") moveUp();
    else if (event.key == "ArrowLeft" || event.key == "a") moveLeft(); 
    else if (event.key == "ArrowRight" || event.key == "d") moveRight(); 
    else if (event.key == "ArrowDown" || event.key == "s") moveDown();

}


function moveUp(){
    if ((playerPosition.y - elementSize) < elementSize){
    } else{
        playerPosition.y -= elementSize
        startGame()
    }
}

function moveLeft(){
    if ((playerPosition.x - elementSize) < elementSize){
    } else{
        playerPosition.x -= elementSize
        startGame()
    }
}

function moveRight(){
    if ((playerPosition.x + elementSize) > canvasSize){
    } else{
        playerPosition.x += elementSize
        startGame()
    }
}

function moveDown(){
    if ((playerPosition.y + elementSize) > canvasSize){
    } else{
        playerPosition.y += elementSize
        startGame()
    }
}

