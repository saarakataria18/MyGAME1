let score = 0;

const button = document.getElementById("btn");

button.onclick = function () {
    score++;
    button.textContent = "Score: " + score;
};
