const grid = document.querySelector('.grid')
const blockWidth = 100
const blockHeight = 20
const boardWidth = 560
const boardHeight = 300
const ballDiameter = 20
let xDirection = -2
let yDirection = 2


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
    ballCurrentPosition[0] += xDirection
    ballCurrentPosition[1] += yDirection
    drawBall()
    checkForCollisions()
}

TimerId = setInterval(moveBall,30)

//check for collisions
function checkForCollissions(){
    //check for wall collission
    if(ballPosition[0] >= (boardWidth - ballDiameter)){
        changeDirection()
    }
}

function changeDirection(){
    if (xDirection === 2 && yDirection ==2){
            xDirection = -2
            return
    }
}
