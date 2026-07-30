const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const player = {
    x: 50,
    y: 400,
    w: 30,
    h: 30,
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

const platforms = [
    {x:0,y:470,w:900,h:30},
    {x:200,y:380,w:140,h:20},
    {x:420,y:300,w:120,h:20},
    {x:650,y:220,w:120,h:20}
];

const spikes = [
    {x:350,y:450,w:70,h:20},
    {x:560,y:280,w:50,h:20}
];

const goal = {
    x:820,
    y:150,
    w:40,
    h:60
};

function resetPlayer(){
    player.x = 50;
    player.y = 400;
    player.dy = 0;
}

function collide(a,b){
    return (
        a.x < b.x + b.w &&
        a.x + a.w > b.x &&
        a.y < b.y + b.h &&
        a.y + a.h > b.y
    );
}

function update(){

    if(keys["ArrowLeft"]){
        player.dx = -player.speed;
    }else if(keys["ArrowRight"]){
        player.dx = player.speed;
    }else{
        player.dx = 0;
    }

    player.x += player.dx;

    player.dy += gravity;
    player.y += player.dy;

    player.grounded = false;

    for(const p of platforms){

        if(
            player.x + player.w > p.x &&
            player.x < p.x + p.w &&
            player.y + player.h > p.y &&
            player.y + player.h < p.y + 20 &&
            player.dy >= 0
        ){
            player.y = p.y - player.h;
            player.dy = 0;
            player.grounded = true;
        }
    }

    if(keys["ArrowUp"] && player.grounded){
        player.dy = player.jump;
    }

    for(const s of spikes){
        if(collide(player,s)){
            resetPlayer();
        }
    }

    if(collide(player,goal)){
        alert("🎉 You beat Level 1!");
        resetPlayer();
    }
}

function draw(){

    ctx.fillStyle = "#70C5FF";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = "#3CB043";
    for(const p of platforms){
        ctx.fillRect(p.x,p.y,p.w,p.h);
    }

    ctx.fillStyle = "#FF3B30";
    for(const s of spikes){
        ctx.fillRect(s.x,s.y,s.w,s.h);
    }

    ctx.fillStyle = "#FFD700";
    ctx.fillRect(goal.x,goal.y,goal.w,goal.h);

    ctx.fillStyle = "#4A6CFF";
    ctx.fillRect(player.x,player.y,player.w,player.h);
}

function game(){
    update();
    draw();
    requestAnimationFrame(game);
}

game();
