let canvas = document.querySelector('#canvas')
let ctx = canvas.getContext('2d')
let pipes = new Array()
let b = new bird(canvas, 15)
let hscore = 0
if(localStorage.getItem('hscore')){
  console.log(hscore)
  hscore = parseInt(localStorage.getItem('hscore'))
}
let score = 0
function draw(){
  //clearing background every single frame
  ctx.clearRect(0,0,canvas.width,canvas.height)
  //showing pipes
  for(let i=pipes.length-1; i>0; i--){
    pipes[i].show(ctx)
    pipes[i].move()
  }
  //showing bird
  b.show(ctx)
  b.fall()
  ctx.font = '30px Arial'
  ctx.fillStyle = 'red'
  if(score>hscore){
    hscore=score
  }
  ctx.fillText(`HI-Score: ${hscore}, Score: ${score}`, 30, 30)
}
setInterval(function(){
  score++
  draw()
  if(pipes.length>20){
    pipes = pipes.slice(10)
  }
  pipes.forEach(pipe=>{
    if(pipe.hits(b)){
      pipe.fillColor(ctx, 'red')
      pipes = []
      if(score==hscore){
        console.log('done')
        localStorage.setItem('hscore', score)
      }
      score = 0
    }
    // if(b.y > canvas.height-15){
    //   pipe.fillColor(ctx, 'red')
    //   pipes = []
    //   if(score==hscore){
    //     console.log('done')
    //     localStorage.setItem('hscore', score)
    //   }
    //   score = 0
    // }
  })
}, 20)
setInterval(function(){
  pipes.push(new pipe(canvas))
}, 800)
window.onkeydown = e => {
  if(e.keyCode == 32){
    b.up()
  }
}
canvas.onclick = () =>{
  b.up()
}
