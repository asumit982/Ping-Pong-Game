// select canvas
const cvs = document.getElementById("pong");
const ctx = cvs.getContext("2d");

//draw rect function
function drawRect(x,y,w,h,color){
    ctx.fillStyle = color;
    ctx.fillRect(x,y,w,h); 
}

drawRect(0,0,cvs.width,cvs.height,"BLACK");

//draw Circle
function drawCircle(x,y,r,color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.Pi*2,false);
    ctx 
}