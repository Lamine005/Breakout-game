const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#Score')
const blockWidth = 100
const blockHeight = 20
const boardWidth = 560
const boardHeight = 300
const ballDiameter = 20
let xDirection = -2
let yDirection = 2
let intervalDelay = 30


const userStart = [230,10]
const ballStart = [270,40]
let currentPosition = userStart
let ballPosition = ballStart

let TimerId 
let score = 0

//my block
class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis]
    this.bottomRight = [xAxis + blockWidth, yAxis]
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    this.topLeft = [xAxis, yAxis + blockHeight]
  }
}

//all my blocks
const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
  ]

//draw my blocks
function addBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement('div')
    block.classList.add('block')
    block.style.left = blocks[i].bottomLeft[0] + 'px'  
    block.style.bottom = blocks[i].bottomLeft[1] + 'px'  
    grid.appendChild(block)
    console.log(blocks[i].bottomLeft)
  }
}
addBlocks()

// add user

const user = document.createElement('div');
user.classList.add('user')
grid.appendChild(user)
drawUser();


// draw user
function drawUser(){
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'
}

// move user

function moveUser(e) {
    switch (e.key) {
      case 'ArrowLeft':
        if (currentPosition[0] > 0) {
          currentPosition[0] -= 10
          console.log(currentPosition[0] > 0)
          drawUser()   
        }
        break
      case 'ArrowRight':
        if (currentPosition[0] < (boardWidth - blockWidth)) {
          currentPosition[0] += 10
          console.log(currentPosition[0])
          drawUser()   
        }
        break
    }
  }

document.addEventListener('keydown',moveUser)

function drawBall(){
ball.style.left = ballPosition[0] + 'px'
ball.style.bottom = ballPosition[1] + 'px'
}

// add ball

const ball = document.createElement('div')
ball.classList.add('ball')
grid.appendChild(ball)
drawBall();

// move ball
function moveBall() {
    ballPosition[0] += xDirection
    ballPosition[1] += yDirection
    drawBall()
    checkForCollisions()}

TimerId = setInterval(moveBall,intervalDelay)

//check for collisions
function checkForCollisions() {
    //check for block collision
    for (let i = 0; i < blocks.length; i++){
      if
      (
        (ballPosition[0] > blocks[i].bottomLeft[0] && ballPosition[0] < blocks[i].bottomRight[0]) &&
        ((ballPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballPosition[1] < blocks[i].topLeft[1]) 
      )
        {
        const allBlocks = Array.from(document.querySelectorAll('.block'))
        allBlocks[i].classList.remove('block')
        blocks.splice(i,1)
        speedIncrease()
        changeDirection()   
        score++
        scoreDisplay.innerHTML = score
        if (blocks.length == 0) {
          scoreDisplay.innerHTML = 'You Win!'
          clearInterval(TimerIdimerId)
          document.removeEventListener('keydown', moveUser)
        }
      }
    }
    // check for wall hits
    if (ballPosition[0] >= (boardWidth - ballDiameter) || ballPosition[0] <= 0 || ballPosition[1] >= (boardHeight - ballDiameter))
    {
      changeDirection()
    }
  
    //check for user collision
    
if (
    (ballPosition[0] + ballDiameter > currentPosition[0] && ballPosition[0] < currentPosition[0] + blockWidth) &&
    (ballPosition[1] > currentPosition[1] && ballPosition[1] < currentPosition[1] + blockHeight) 
) {
    if (ballPosition[1] <= currentPosition[1] + blockHeight) {
        yDirection *= -1; // Reverse the yDirection if it hits the top of the paddle
    }
}

  
    //game over
    if (ballPosition[1] <= 0) {
      clearInterval(TimerId)
      scoreDisplay.innerHTML = 'You lose!'
      document.removeEventListener('keydown', moveUser)
    }
  }

function changeDirection() {
    if (ballPosition[0] >= (boardWidth - ballDiameter) || ballPosition[0] <= 0) {
        xDirection *= -1; // Reverse the xDirection if it hits left or right walls
    }
    if (ballPosition[1] >= (boardHeight - ballDiameter)) {
        yDirection *= -1; // Reverse the yDirection if it hits the top wall
    }
}


function speedIncrease(){
    // Decrease the delay to increase speed
    intervalDelay -= 1

    // Ensure delay doesn't get too low
    if (intervalDelay<5){
        intervalDelay = 5
    }
    // Clear the existing interval and start a new one with the updated delay

    clearInterval(TimerId)
    TimerId= setInterval(moveBall,intervalDelay)
}

const increaseButton = document.querySelector('button')
increaseButton.addEventListener('click',speedIncrease)