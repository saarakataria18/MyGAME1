const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let level = 1;

const player = {
    x: 50,
    y: 400,
    w: 32,
    h: 32,
    dx: 0,
    dy: 0,
    speed: 5,
    jump: -12,
    grounded: false
};

const gravity = 0.6;
const keys = {};

document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

let platforms = [];
let spikes = [];
let goal = {};

function loadLevel(num){

    if(num===1){

        platforms=[
            {x:0,y:470,w:900,h:30},
            {x:200,y:380,w:140,h:20},
            {x:420,y:300,w:120,h:20},
            {x:650,y:220,w:120,h:20}
        ];

        spikes=[
            {x:350,y:450,w:70,h:20},
            {x:560,y:280,w:50,h:20}
        ];

        goal={
            x:820,
            y:150,
            w:40,
            h:60
        };

    }else if(num===2){

    // Level 2 code

}else if(num===3){

    // Level 3 code

}else if(num===4){

    // Level 4 code

}

    platforms=[
        {x:0,y:470,w:900,h:30},
        {x:80,y:420,w:60,h:20},
        {x:180,y:360,w:60,h:20},
        {x:300,y:300,w:60,h:20},
        {x:430,y:240,w:60,h:20},
        {x:570,y:180,w:60,h:20},
        {x:710,y:120,w:60,h:20},
        {x:820,y:70,w:50,h:20}
    ];

    spikes=[
        {x:140,y:450,w:50,h:20},
        {x:260,y:340,w:50,h:20},
        {x:390,y:280,w:50,h:20},
        {x:530,y:160,w:50,h:20},
        {x:670,y:100,w:50,h:20}
    ];

    goal={
        x:840,
        y:10,
        w:40,
        h:60
    };
}
platforms=[
        {x:0,y:470,w:900,h:30},
        {x:90,y:420,w:70,h:20},
        {x:210,y:360,w:70,h:20},
        {x:330,y:300,w:70,h:20},
        {x:470,y:250,w:70,h:20},
        {x:610,y:190,w:70,h:20},
        {x:760,y:130,w:70,h:20}
    ];

    spikes=[
        {x:170,y:450,w:70,h:20},
        {x:290,y:340,w:60,h:20},
        {x:430,y:230,w:60,h:20},
        {x:650,y:170,w:60,h:20}
    ];

    goal={
        x:840,
        y:50,
        w:40,
        h:60
    };
}

        platforms=[
            {x:0,y:470,w:900,h:30},
            {x:120,y:410,w:90,h:20},
            {x:250,y:350,w:90,h:20},
            {x:390,y:280,w:90,h:20},
            {x:540,y:210,w:90,h:20},
            {x:710,y:150,w:90,h:20}
        ];

        spikes=[
            {x:180,y:450,w:80,h:20},
            {x:470,y:260,w:60,h:20},
            {x:650,y:130,w:50,h:20}
        ];

        goal={
            x:840,
            y:70,
            w:40,
            h:60
        };
    }

    resetPlayer();
}

loadLevel(1);

function resetPlayer(){
    player.x=50;
    player.y=400;
    player.dy=0;
}

function collide(a,b){
    return(
        a.x<b.x+b.w &&
        a.x+a.w>b.x &&
        a.y<b.y+b.h &&
        a.y+a.h>b.y
    );
}

function update(){

    if(keys["ArrowLeft"])
        player.dx=-player.speed;
    else if(keys["ArrowRight"])
        player.dx=player.speed;
    else
        player.dx=0;

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

    for(let s of spikes){

        if(collide(player,s)){
            resetPlayer();
        }

    }

    if(collide(player,goal)){
if(level===1){
    level=2;
    alert("Level 2!");
    loadLevel(2);

}else if(level===2){
    level=3;
    alert("Level 3!");
    loadLevel(3);

}else if(level===3){
    level=4;
    alert("Level 4!");
    loadLevel(4);

}else{
    alert("You beat all 4 levels!");
    level=1;
    loadLevel(1);
}
function draw(){

    // Sky
    ctx.fillStyle = "#70C5FF";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    // Platforms
    ctx.fillStyle = "#3CB043";
    for(let p of platforms){
        ctx.fillRect(p.x,p.y,p.w,p.h);
    }

    // Spikes
    ctx.fillStyle = "#ff3b30";
    for(let s of spikes){
        ctx.fillRect(s.x,s.y,s.w,s.h);
    }

    // Goal
    ctx.fillStyle = "#FFD700";
    ctx.fillRect(goal.x,goal.y,goal.w,goal.h);

    // Player
    ctx.fillStyle = "#4A6CFF";
    ctx.fillRect(player.x,player.y,player.w,player.h);
}

function game(){
    update();
    draw();
    requestAnimationFrame(game);
}

game();
