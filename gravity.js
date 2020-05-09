const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

let gravity = 1
let friction = 0.95

// Objects
class Ball {
  constructor(x, y, radius, color, dy, dx) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.dy = dy
    this.dx = dx
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.stroke()
    c.closePath()
  }

  update() {
      if(this.y + this.radius + this.dy > canvas.height) {
        this.dy = -this.dy * friction
      } else {
          this.dy += gravity
      }
      this.x += this.dx
      this.y += this.dy
    this.draw()
  }
}

// Implementation
let objects
let ball
let ballArray = []

function init() {
    let radius = 30
    for(let i = 0; i < 100; i++) {
        let x = Math.random() * canvas.width - radius
        let y = Math.random() * canvas.width - radius
        let dx = Math.random() * -2 + 2
        ballArray.push(new Ball(x, y, radius, 'red', 20, dx))
    }
    console.log(ballArray)
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    for(let i = 0; i < ballArray.length; i++) {
         ballArray[i].update()
    }
}

init()
animate()