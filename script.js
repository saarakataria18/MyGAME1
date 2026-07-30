// ==========================
// WHERE ARE YOU GONNA END UP?
// PART 1
// ==========================

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

// ---------- Game ----------

let gameState = "menu";
let currentLevel = 1;

// ---------- Player ----------

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

// ---------- Keyboard ----------

const keys = {};

document.addEventListener("keydown", (e) => {

    keys[e.key] = true;

    if (gameState === "menu" && e.key === "Enter") {
        gameState = "play";
    }

});

document.addEventListener("keyup", (e) => {

    keys[e.key] = false;

});

// ---------- Clouds ----------

const clouds = [
    {x:80, y:70, size:45, speed:0.30},
    {x:300, y:120, size:55, speed:0.25},
    {x:560, y:60, size:40, speed:0.35},
    {x:850, y:140, size:60, speed:0.20}
];

// ---------- Level Objects ----------

const platforms = [
    {x:0,y:470,w:900,h:30},
    {x:180,y:380,w:160,h:20},
    {x:420,y:290,w:160,h:20},
    {x:680,y:190,w:140,h:20}
];

const spinner = {
    x:350,
    y:450,
    r:20,
    angle:0
};

const portal = {
    x:820,
    y:100,
    w:45,
    h:80
};

// ---------- Reset ----------

function resetPlayer(){

    player.x = 50;
    player.y = 400;

    player.dx = 0;
    player.dy = 0;

}

// ---------- Collision ----------

function collideRect(a,b){

    return (

        a.x < b.x + b.w &&
        a.x + a.w > b.x &&
        a.y < b.y + b.h &&
        a.y + a.h > b.y

    );

}
// ==========================
// PART 2
// ==========================

function update(){

    // ---------- Menu ----------

    if(gameState === "menu"){

        for(let c of clouds){

            c.x += c.speed;

            if(c.x > WIDTH + 100){
                c.x = -100;
            }

        }

        return;

    }

    // ---------- Left & Right ----------

    if(keys["ArrowLeft"]){

        player.dx = -player.speed;

    }else if(keys["ArrowRight"]){

        player.dx = player.speed;

    }else{

        player.dx = 0;

    }

    player.x += player.dx;

    // ---------- Gravity ----------

    player.dy += gravity;
    player.y += player.dy;

    player.grounded = false;

    // ---------- Platforms ----------

    for(let p of platforms){

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

    // ---------- Jump ----------

    if(keys["ArrowUp"] && player.grounded){

        player.dy = player.jump;

    }

    // ---------- Spinner ----------

    spinner.angle += 0.15;

    const cx = player.x + player.w/2;
    const cy = player.y + player.h/2;

    const dx = cx - spinner.x;
    const dy = cy - spinner.y;

    const distance = Math.sqrt(dx*dx + dy*dy);

    if(distance < spinner.r + 14){

        resetPlayer();

    }

    // ---------- Portal ----------

    if(collideRect(player, portal)){

        alert("🎉 Level Complete!");

        resetPlayer();

    }

    // ---------- Clouds ----------

    for(let c of clouds){

        c.x += c.speed;

        if(c.x > WIDTH + 100){

            c.x = -100;

        }

    }

}
// ==========================
// PART 3
// ==========================

// ---------- Cloud ----------

function drawCloud(x, y, size){

    ctx.fillStyle = "white";

    ctx.beginPath();
    ctx.arc(x, y, size*0.35, 0, Math.PI*2);
    ctx.arc(x+size*0.3, y-10, size*0.3, 0, Math.PI*2);
    ctx.arc(x+size*0.6, y, size*0.35, 0, Math.PI*2);
    ctx.fill();

}

// ---------- Draw ----------

function draw(){

    // Sky
    ctx.fillStyle = "#7EC8FF";
    ctx.fillRect(0,0,WIDTH,HEIGHT);

    // Clouds
    for(let c of clouds){
        drawCloud(c.x,c.y,c.size);
    }

    // ---------- MENU ----------

    if(gameState==="menu"){

        ctx.fillStyle="white";
        ctx.textAlign="center";

        ctx.font="48px Arial";
        ctx.fillText("Where Are You Gonna End Up?", WIDTH/2, 90);

        ctx.font="28px Arial";
        ctx.fillText("Press ENTER to Play", WIDTH/2, 145);

        ctx.font="22px Arial";
        ctx.fillText("Levels", WIDTH/2, 210);

        for(let i=1;i<=10;i++){
            ctx.fillText("Level "+i, WIDTH/2, 210+i*28);
        }

        return;
    }

    // ---------- Platforms ----------

    for(let p of platforms){

        // Dirt
        ctx.fillStyle="#8B5A2B";
        ctx.fillRect(p.x,p.y,p.w,p.h);

        // Grass
        ctx.fillStyle="#3CB043";
        ctx.fillRect(p.x,p.y,p.w,6);

    }

    // ---------- Spinner ----------

    ctx.save();

    ctx.translate(spinner.x, spinner.y);
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

    // ---------- Portal ----------

    ctx.strokeStyle="#C34CFF";
    ctx.lineWidth=5;

    ctx.beginPath();
    ctx.ellipse(
        portal.x+portal.w/2,
        portal.y+portal.h/2,
        portal.w/2,
        portal.h/2,
        0,
        0,
        Math.PI*2
    );
    ctx.stroke();

    // ---------- Player ----------

    ctx.fillStyle="#3D7EFF";
    ctx.fillRect(player.x,player.y,player.w,player.h);

    // Eyes
    ctx.fillStyle="white";
    ctx.fillRect(player.x+7,player.y+8,5,5);
    ctx.fillRect(player.x+20,player.y+8,5,5);

    ctx.fillStyle="black";
    ctx.fillRect(player.x+9,player.y+10,2,2);
    ctx.fillRect(player.x+22,player.y+10,2,2);

}
// ==========================
// PART 4
// ==========================

function game(){

    update();
    draw();

    requestAnimationFrame(game);

}

game();
