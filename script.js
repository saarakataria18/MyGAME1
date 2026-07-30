const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

let gameState = "menu";
let currentLevel = 1;

// ---------- Clouds ----------

const clouds = [
    {x:100,y:60,size:40,speed:0.3},
    {x:350,y:120,size:55,speed:0.4},
    {x:700,y:80,size:45,speed:0.25},
    {x:900,y:150,size:60,speed:0.5}
];

// ---------- Player ----------
const player = {
    x:50,
    y:400,
    w:32,
    h:32,

    dx:0,
    dy:0,

    speed:5,
    jump:-12,

    grounded:false
};
// ---------- Physics ----------

const gravity = 0.6;

const keys = {};

document.addEventListener("keydown",e=>{

    keys[e.key]=true;

    if(gameState==="menu" && e.key==="Enter"){
        gameState="play";
    }

});

document.addEventListener("keyup",e=>{

    keys[e.key]=false;

});

// ---------- Level ----------

const platforms=[
    {x:0,y:470,w:900,h:30},
    {x:180,y:380,w:160,h:20},
    {x:430,y:290,w:150,h:20},
    {x:670,y:190,w:130,h:20}
];

const portal={
    x:820,
    y:110,
    w:45,
    h:80
};

const spinner={
    x:370,
    y:450,
    r:18,
    angle:0
};

// ---------- Reset ----------

function resetPlayer(){

    player.x=50;
    player.y=400;
    player.dy=0;

}
// ---------- Movement ----------

function collideRect(a,b){

    return(

        a.x < b.x + b.w &&
        a.x + a.w > b.x &&
        a.y < b.y + b.h &&
        a.y + a.h > b.y

    );

}

function update(){

    if(gameState==="menu"){

        for(let c of clouds){

            c.x+=c.speed;

            if(c.x>WIDTH+100){
                c.x=-100;
            }

        }

        return;

    }

    if(keys["ArrowLeft"]){

        player.dx=-player.speed;

    }else if(keys["ArrowRight"]){

        player.dx=player.speed;

    }else{

        player.dx=0;

    }

    player.x+=player.dx;

    player.dy+=gravity;
    player.y+=player.dy;

    player.grounded=false;

    for(let p of platforms){

        if(

            player.x+player.w>p.x &&
            player.x<p.x+p.w &&
            player.y+player.h>p.y &&
            player.y+player.h<p.y+20 &&
            player.dy>=0

        ){

            player.y=p.y-player.h;
            player.dy=0;
            player.grounded=true;

        }

    }

    if(keys["ArrowUp"] && player.grounded){

        player.dy=player.jump;

    }

    spinner.angle+=0.15;

    let cx=player.x+player.w/2;
    let cy=player.y+player.h/2;

    let dx=cx-spinner.x;
    let dy=cy-spinner.y;

    let distance=Math.sqrt(dx*dx+dy*dy);

    if(distance<spinner.r+14){

        resetPlayer();

    }

    if(collideRect(player,portal)){

        alert("🎉 Level Complete!");

        resetPlayer();

    }

    for(let c of clouds){

        c.x+=c.speed;

        if(c.x>WIDTH+100){

            c.x=-100;

        }

    }

}
// ---------- Drawing ----------

function drawCloud(x,y,size){

    ctx.fillStyle="white";

    ctx.beginPath();
    ctx.arc(x,y,size*0.35,0,Math.PI*2);
    ctx.arc(x+size*0.3,y-10,size*0.3,0,Math.PI*2);
    ctx.arc(x+size*0.6,y,size*0.35,0,Math.PI*2);
    ctx.fill();

}

function draw(){

    // Sky
    ctx.fillStyle="#7ec8ff";
    ctx.fillRect(0,0,WIDTH,HEIGHT);

    // Clouds
    for(let c of clouds){
        drawCloud(c.x,c.y,c.size);
    }
    
        ctx.fillStyle="white";
        ctx.textAlign="center";

        ctx.font="48px Arial";
        ctx.fillText("Where Are You Gonna End Up?",WIDTH/2,100);

        ctx.font="30px Arial";
        ctx.fillText("Press ENTER to Play",WIDTH/2,170);

        ctx.font="24px Arial";
        ctx.fillText("Levels",WIDTH/2,240);

        for(let i=1;i<=10;i++){

            ctx.fillText("Level "+i,WIDTH/2,240+i*28);

        }
 return;

    }

    // Grass Platforms
    for(let p of platforms){

        ctx.fillStyle="#4CAF50";
        ctx.fillRect(p.x,p.y,p.w,p.h);

        ctx.fillStyle="#2E7D32";
        ctx.fillRect(p.x,p.y,p.w,5);

    }

    // Spinner
    ctx.save();

    ctx.translate(spinner.x,spinner.y);
    ctx.rotate(spinner.angle);

    ctx.strokeStyle="#888";
    ctx.lineWidth=4;

    for(let i=0;i<8;i++){
         return;

    }

    // Grass Platforms
    for(let p of platforms){

        ctx.fillStyle="#4CAF50";
        ctx.fillRect(p.x,p.y,p.w,p.h);

        ctx.fillStyle="#2E7D32";
        ctx.fillRect(p.x,p.y,p.w,5);

    }

    // Spinner
    ctx.save();

    ctx.translate(spinner.x,spinner.y);
    ctx.rotate(spinner.angle);

    ctx.strokeStyle="#888";
    ctx.lineWidth=4;

    for(let i=0;i<8;i++){
        ctx.rotate(Math.PI/4);

        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(spinner.r,0);
        ctx.stroke();

    }

    ctx.beginPath();
    ctx.arc(0,0,spinner.r,0,Math.PI*2);
    ctx.stroke();

    ctx.restore();

    // Portal
    ctx.strokeStyle="#b84dff";
    ctx.lineWidth=5;
