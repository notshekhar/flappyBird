class bird {
  constructor(canvas, size) {
    this.x = 200
    this.y = canvas.height/2
    this.limit = canvas.height
    this.v = 0
    this.resistance = 0.90
    this.gravity = 2.0
    this.r = size
    // this.brain = new fnn([ n    ])
  }
  show(ctx){
    ctx.beginPath()
    ctx.fillStyle = 'black'
    ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI)
    ctx.fill()
  }
  fall(){
    this.v += this.gravity
    this.v *= this.resistance
    this.y += this.v
    if(this.y>this.limit-15){
      this.v = 0
      this.gravity = 0
    }else if(this.y<10){
      this.y = 10
    }
  }
  up(){
    this.v = -25
    this.gravity = 2.0
  }
}
