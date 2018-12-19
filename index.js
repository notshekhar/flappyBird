let canvas = document.querySelector('#canvas')
let ctx = canvas.getContext('2d')
let b = new bird(canvas)
let pipes = new Array()
pipes.push(new pipe(canvas))
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
  for(let i=0; i<pipes.length; i++){
    if(pipes[i].offscreen()){
      pipes = pipes.slice(i)
    }
  }
  // console.log(pipes)
  // starting new game on hitting with pipe
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
  })
}, 20)
setInterval(function(){
  pipes.push(new pipe(canvas))
}, 1000)
window.onkeydown = e=>{
  if(e.keyCode == 32){
    b.up()
  }
}

window.onkeydown = e => {
  if(e.keyCode == 32){
    b.up()
  }
}
canvas.onclick = () =>{
  b.up()
}
