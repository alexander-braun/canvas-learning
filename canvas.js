const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const c = canvas.getContext('2d')



/*
c.fillRect(200, 200, 200, 200)
c.fillRect(400, 400, 100, 100)
c.fillRect(500, 500, 50, 50)

//Line
c.beginPath()
c.moveTo(50, 300)
c.lineTo(300, 100)
c.lineTo(400, 500)
c.strokeStyle = 'blue'
c.stroke()

//Arc
c.beginPath()
c.arc(200, 600, 50, 0, Math.PI * 2, false)
c.strokeStyle = 'green'
c.stroke()

let width = 500
let position = 200

for(let i = 0; i < 200; i++) {
    c.beginPath()
    c.arc(position, position, width, 0, Math.PI * 2, false)
    c.strokeStyle = 'green'
    c.stroke()
    width = width / 2
    position = position + width
}
*/
/*
function Circle(x, y, dx, dy, radius){
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius

    this.draw = function() {
        c.beginPath()
        c.arc(x, y, radius, 0, Math.PI * 2, false)
        c.strokeStyle = 'green'
        c.stroke()
        radius = radius / 2
        x = x + radius
    }

    this.update = function(){
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy
        }
        this.x += this.dx
        this.y += this.dy
        this.draw()
    }
}

let cir = new Circle(200, 200, 1, 2, 30)
cir.draw()

let circleArr = []

for(let i = 0; i < 100; i++) {
    let radius = Math.random() * 3 + 1
    let x = Math.random() * (innerWidth - radius * 2) + radius
    let y = Math.random() * (innerHeight - radius * 2) + radius
    let dx = (Math.random() - 0.5)
    let dy = (Math.random() - 0.5)
    circleArr.push(new Circle(x, y, dx, dy, radius))
}

const animate = () => {
    requestAnimationFrame(animate)
    cir.draw()
    c.clearRect(0, 0, innerWidth, innerHeight)
    for(let i = 0; i < circleArr.length; i++) {
        //circleArr[i].update()
    }
}

animate()


let x = Math.random() * innerWidth
let y = Math.random() * innerHeight

let dx = (Math.random() - 0.5) * 50
let dy = (Math.random() - 0.5) * 50

let radius = 30
*/

let mouse = {
    x: undefined,
    y: undefined
}

const maxRadius = 50
const minRadius = 0

const colorArr = [
    '#D9961A',
    '#BF6B04',
    '#A64F03',
    '#731702',
    '#260101'
]

window.addEventListener('mousemove', (e) => {
    mouse.x = event.x
    mouse.y = event.y
})

window.addEventListener('resize', (e) => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    init()
})

class Circle {
    constructor(x, y, dx, dy, radius) {
        this.x = x
        this.y = y
        this.dx = dx
        this.dy = dy
        this.radius = radius
        this.minRadius = minRadius
        this.color = colorArr[Math.floor(Math.random() * colorArr.length)]

        this.draw = () => {
            c.beginPath()
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
            c.fillStyle = this.color
            c.fill()
        }

        this.update = () => {
            if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
                this.dx = -this.dx
            }
            if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
                this.dy = -this.dy
            }

            this.x += this.dx
            this.y += -this.dy

            if(mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
                mouse.y - this.y < 50 && mouse.y - this.y > -50) {
                if(this.radius < maxRadius) {
                    this.radius += 1    
                }
            } else if(this.radius > this.minRadius) {
                    this.radius -= 1
            }

            this.draw()
        }
    }
}

let circleArr = []
function init() {
    circleArr = []
    for(let i = 0; i < 800; i++) {
        let radius = Math.ceil(Math.random() * 15 + 1)
        let x = Math.random() * (innerWidth - radius * 2) + radius
        let y = Math.random() * (innerHeight -radius * 2) + radius
        let dx = (Math.random() - 0.5) * 10
        let dy = (Math.random() - 0.5) * 10   
        circleArr.push(new Circle(x, y, dx, dy, radius))
    }
}

init()

const animate = () => {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, innerWidth, innerHeight)
    for(let i = 0; i < circleArr.length; i++) {
        circleArr[i].update()
    }
}

animate()