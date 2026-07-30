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

document.addEventListener("keydown", (e) => {
    keys[e.key] = true;
});

document.addEventListener("keyup", (e) => {
    keys[e.key] = false;
});

const platforms = [
    { x: 0, y: 470, w: 900, h: 30 },
    { x: 200, y: 380, w: 120, h: 20 },
    { x: 400, y: 320, w: 120, h: 20 },
    { x: 600, y: 250, w: 120, h: 20 }
];

const spikes = [
    { x: 340, y: 450, w: 60, h: 20 },
    { x: 520, y: 300, w: 40, h: 20 }
];

const goal = {
    x: 820,
    y: 180,
    w: 40,
    h: 60
};

function collide(a, b) {
    return (
        a.x < b.x + b.w &&
        a.x + a.w > b.x &&
        a.y < b.y + b.h &&
        a.y + a.h > b.y
    );
}

function reset() {
    player.x = 50;
    player.y = 400;
    player.dy = 0;
}

function update() {
    if (keys["ArrowLeft"]) player.dx = -player.speed;
    else if (keys["ArrowRight"]) player.dx = player.speed;
    else player.dx = 0;

    player.x += player.dx;

    player.dy += gravity;
    player.y += player.dy;

    player.grounded = false;

    for (let p of platforms) {
        if (
            player.x + player.w > p.x &&
            player.x < p.x + p.w &&
            player.y + player.h > p.y &&
            player.y + player.h < p.y + 20 &&
            player.dy >= 0
        ) {
            player.y = p.y - player.h;
            player.dy = 0;
            player.grounded = true;
        }
    }

    if (keys["ArrowUp"] && player.grounded) {
        player.dy = player.jump;
    }

    for (let s of spikes) {
        if (collide(player, s)) {
            reset();
        }
    }

    if (collide(player, goal)) {
        alert("LEVEL COMPLETE!");
        reset();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "green";
    for (let p of platforms) {
        ctx.fillRect(p.x, p.y, p.w, p.h);
    }

    ctx.fillStyle = "red";
    for (let s of spikes) {
        ctx.fillRect(s.x, s.y, s.w, s.h);
    }

    ctx.fillStyle = "gold";
    ctx.fillRect(goal.x, goal.y, goal.w, goal.h);

    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, player.w, player.h);
}

function game() {
    update();
    draw();
    requestAnimationFrame(game);
}

game();
