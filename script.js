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

let platforms = [];
let spinners = [];
let portal = {};

function loadLevel(level){

    if(level === 1){

        platforms = [
            {x:0,y:470,w:900,h:30},
            {x:180,y:380,w:160,h:20},
            {x:420,y:290,w:160,h:20},
            {x:680,y:190,w:140,h:20}
        ];

        spinners = [
            {x:350,y:450,r:20,angle:0}
        ];

        portal = {
            x:820,
            y:100,
            w:45,
            h:80
        };

    }else if(level === 2){

        platforms = [
            {x:0,y:470,w:900,h:30},
            {x:120,y:410,w:110,h:20},
            {x:280,y:340,w:90,h:20},
            {x:430,y:270,w:80,h:20},
            {x:560,y:210,w:70,h:20},
            {x:700,y:150,w:60,h:20}
        ];

        spinners = [
            {x:240,y:450,r:20,angle:0},
            {x:520,y:250,r:20,angle:0}
        ];

        portal = {
            x:810,
            y:60,
            w:45,
            h:80
        };

}else if(level === 3){

    platforms = [
        {x:0,y:470,w:900,h:30},

        {x:100,y:410,w:90,h:20},
        {x:240,y:350,w:70,h:20},
        {x:360,y:285,w:60,h:20},
        {x:480,y:220,w:55,h:20},
        {x:610,y:155,w:50,h:20},
        {x:740,y:95,w:45,h:20}
    ];

    spinners = [
        {x:200,y:450,r:20,angle:0},
        {x:430,y:255,r:20,angle:0},
        {x:670,y:130,r:20,angle:0}
    ];

    portal = {
        x:830,
        y:20,
        w:45,
        h:80
    };

}else if(level === 4){

    platforms = [
        {x:0,y:470,w:900,h:30},

        {x:80,y:420,w:80,h:20},
        {x:200,y:360,w:70,h:20},
        {x:320,y:300,w:60,h:20},
        {x:450,y:240,w:55,h:20},
        {x:580,y:180,w:50,h:20},
        {x:690,y:120,w:45,h:20},
        {x:790,y:60,w:40,h:20}
    ];

    spinners = [
        {x:170,y:450,r:20,angle:0},
        {x:300,y:340,r:20,angle:0},
        {x:520,y:220,r:20,angle:0},
        {x:720,y:100,r:20,angle:0}
    ];

    portal = {
        x:840,
        y:0,
        w:40,
        h:70
    };

}else if(level === 5){

    platforms = [
        {x:0,y:470,w:900,h:30},

        {x:120,y:420,w:100,h:20,move:true,min:80,max:260,speed:2,dir:1},
        {x:320,y:340,w:90,h:20},
        {x:470,y:270,w:90,h:20,move:true,min:430,max:650,speed:2.5,dir:1},
        {x:680,y:180,w:80,h:20},
        {x:780,y:90,w:70,h:20}
    ];

    spinners = [
        {x:240,y:450,r:20,angle:0},
        {x:420,y:320,r:20,angle:0},
        {x:610,y:250,r:20,angle:0},
        {x:740,y:150,r:20,angle:0},
        {x:520,y:450,r:20,angle:0}
    ];

    portal = {
        x:830,
        y:10,
        w:45,
        h:80
    };

}else if(level === 6){

    platforms = [
        {x:0,y:470,w:900,h:30},

        {x:100,y:420,w:80,h:20},
        {x:220,y:360,w:70,h:20},
        {x:350,y:300,w:65,h:20},
        {x:490,y:240,w:60,h:20},
        {x:620,y:170,w:55,h:20},
        {x:760,y:90,w:50,h:20}
    ];

    spinners = [
        {x:180,y:450,r:20,angle:0,speed:0.30},
        {x:300,y:340,r:20,angle:0,speed:0.28},
        {x:440,y:280,r:20,angle:0,speed:0.35},
        {x:560,y:200,r:20,angle:0,speed:0.32},
        {x:700,y:130,r:20,angle:0,speed:0.40},
        {x:520,y:450,r:20,angle:0,speed:0.38}
    ];

   portal = {
    x:835,
    y:5,
    w:45,
    h:80
};

    }
    
loadLevel(currentLevel);
    
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

    // Move the platform if it is a moving platform
    if(p.move){

        p.x += p.speed * p.dir;

        if(p.x < p.min || p.x > p.max){
            p.dir *= -1;
        }

    }

    // Player collision
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

const cx = player.x + player.w/2;
const cy = player.y + player.h/2;

for(let spinner of spinners){

    spinner.angle += 0.15;

    const dx = cx - spinner.x;
    const dy = cy - spinner.y;

    const distance = Math.sqrt(dx*dx + dy*dy);

    if(distance < spinner.r + 14){

        resetPlayer();

    }

}

    // ---------- Portal ----------

    if(collideRect(player, portal)){

    if(currentLevel < 10){

        currentLevel++;
        loadLevel(currentLevel);
        resetPlayer();

        alert("Level " + currentLevel + "!");

    }else{

        alert("🎉 You Beat The Game!");

        currentLevel = 1;
        loadLevel(1);
        resetPlayer();

    }

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

for(let s of spinners){

    ctx.save();

    ctx.translate(s.x, s.y);
    ctx.rotate(s.angle);

    ctx.strokeStyle="#888";
    ctx.lineWidth=4;

    for(let i=0;i<8;i++){
        ctx.rotate(Math.PI/4);

        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(s.r,0);
        ctx.stroke();
    }

    ctx.beginPath();
    ctx.arc(0,0,s.r,0,Math.PI*2);
    ctx.stroke();

    ctx.restore();

}
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

function game(){

    update();
    draw();

    requestAnimationFrame(game);

}

game();
