// select canvas
const cvs = document.getElementById("pong");
const ctx = cvs.getContext("2d");

//create the user paddle
const user = {
    x : 0,
    y : cvs.height/2 - 100/2,
    width : 10,
    height : 100,
    color : "WHITE",
    score : 0
}

//create the com paddle
const com = {
    x : cvs.width - 10,
    y : cvs.height/2 - 100/2,
    width : 10,
    height : 100,
    color : "WHITE",
    score : 0
}

//create the ball
const ball = {
    x : cvs.width/2,
    y : cvs.height/2,
    radius : 10,
    speed : 5,
    velocitX : 5,
    velocitY : 5,
    color : "WHITE"
}

//create the net
const net = {
    x : cvs.width/2 - 1,
    y : 0,
    width : 2,
    height : 10,
    color : "WHITE"
}

//draw the net
function drawNet(){
    for(let i = 0; i <= cvs.height; i+=15){
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
    }
}


//draw rect function
function drawRect(x,y,w,h,color){
    ctx.fillStyle = color;
    ctx.fillRect(x,y,w,h); 
}


//draw Circle
function drawCircle(x,y,r,color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2,false);
    ctx.closePath();
    ctx.fill();
}


//draw Text
function drawText(text,x,y,color){
    ctx.fillStyle = color;
    ctx.font = "45px fanatsy";
    ctx.fillText(text,x,y);
}


//Render the Game
function render(){
    //clear the canvas
    drawRect(0,0,cvs.width,cvs.height,"BLACK");

    //draw the net
    drawNet();

    //draw score
    drawText(user.score,cvs.width/4,cvs.height/4,"WHITE");
    drawText(com.score,3*cvs.width/4,cvs.height/4,"WHITE");

    //draw the user and com paddle
    drawRect(user.x,user.y,user.width,user.height,user.color);
    drawRect(com.x,com.y,com.width,com.height,com.color);

    //draw the ball
    drawCircle(ball.x,ball.y,ball.radius,ball.color);

}

// control the user padde

cvs.addEventListener("mousemove", movePaddle);

function movePaddle(evt){
    let rect = cvs.getBoundingClientRect();
    user.y = evt.clientY - rect.top - user.height/2;
}


//collision detection
function collision(b,p){
     b.top = b.y - b.radius;
     b.bottom = b.y + b.radius;
     b.left = b.x - b.radius;
     b.right = b.x + b.radius;

     p.top = p.y;
     p.bottom = p.y + p.height;
     p.left = p.x;
     p.right = p.x + p.width;

     return b.right > p.left && b.bottom > p.top && b.left < p.right &&
     b.top < p.bottom;
}

//update : pos,mov,score, ...
function update(){
    ball.x += ball.velocitX;
    ball.y += ball.velocitY;

    //simple AI to control the computer paddle
    let computerLevel = 0.1;
    com.y += (ball.y - (com.y + com.height/2)) * computerLevel;

    if(ball.y + ball.radius > cvs.height || ball.y - ball.radius < 0){
        ball.velocitY = -ball.velocitY;
    }

    let player = (ball.x < cvs.width/2)? user:com;

    if(collision(ball,player)){
        

    }
}


// game init
function game(){
    update();
    render();
}

// loop 
const framePerSecond = 50;
setInterval(game,1000/framePerSecond);

