const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

var scale = SNAKESPEEDFACTOR;
var gamespeed = GAMESPEED;
var gameid = 0;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

let snake;

(function setup() {
    OUTDATA.init(
        MAXTESTITTERATIONS,
        gamespeed,
        scale,
        rows,
        columns
    );


    snake = new Snake();
    fruit = new Fruit();
    fruit.pickLocation();

    SetLoop(); 
}());

window.addEventListener('keydown', (evt) => {
    const direction = evt.key.replace('Arrow', '');
    snake.changeDirection(direction);
});
function SetLoop()
{
    console.log("SetLoop", gamespeed);
    window.clearInterval(gameid);
    gameid = null;
    gameid = window.setInterval(() => {
        OUTDATA.outdata.step++;
        if(OUTDATA.outdata.step > MAXTESTITTERATIONS){
            alert("Game Over due to max test iterations...");
            OUTDATA.gameOver();
            window.clearInterval(gameid);
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fruit.draw();
        snake.update();
        snake.draw();

        if (snake.eat(fruit)) {
            fruit.pickLocation();
        }

        snake.checkCollision();
    }, gamespeed);
}
function Snake() { 
    this.x = 0;
    this.y = 0;
    this.xSpeed = scale * 1;
    this.ySpeed = 0;
    this.total = 0;
    this.tail = [];
    this.directions = ["Up","Down","Left","Right"];
    this.direction = 0;
    this.distance_to_fruit = 0;
    this.direction_of_fruit = 0;
    this.eating_fruit = false;
    this.dying = false;
    this.draw = function() {
        ctx.fillStyle = "#FFFFFF";

        for (let i = 0; i < this.tail.length; i++) {
            ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
        }

        ctx.fillRect(this.x, this.y, scale, scale);
    };

    this.update = function() {
        for (let i = 0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i+1];
        }

        this.tail[this.total - 1] = { x: this.x, y: this.y };

        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if (this.x >= canvas.width) {
            this.x = 0;
        }

        if (this.y >= canvas.height) {
            this.y = 0;
        }

        if (this.x < 0) {
            this.x = canvas.width - scale;
        }

        if (this.y < 0) {
            this.y = canvas.height - scale;
        }
        this.distance_to_fruit = Math.sqrt(Math.pow(this.x - fruit.x, 2) + Math.pow(this.y - fruit.y, 2));
        this.direction_of_fruit = Math.atan2(this.y - fruit.y, this.x - fruit.x);
        OUTDATA.newSnake(this.x, this.y, this.tail,this.direction,this.distance_to_fruit,this.direction_of_fruit,this.eating_fruit,this.dying);
        this.eating_fruit = false;
        this.dying = false;
    };

    this.changeDirection = function(direction) {
        switch(direction) {
            case 'Up':
                if (this.ySpeed === 0) {
                    this.xSpeed = 0;
                    this.ySpeed = -scale * 1;
                    this.direction = this.directions.indexOf(direction)
                }
                break;
            case 'Down':
                if (this.ySpeed === 0) {
                    this.xSpeed = 0;
                    this.ySpeed = scale * 1;
                    this.direction = this.directions.indexOf(direction)
                }
                break;
            case 'Left':
                if (this.xSpeed === 0) {
                    this.xSpeed = -scale * 1;
                    this.ySpeed = 0;
                    this.direction = this.directions.indexOf(direction)
                }
                break;
            case 'Right':
                if (this.xSpeed === 0) {
                    this.xSpeed = scale * 1;
                    this.ySpeed = 0;
                    this.direction = this.directions.indexOf(direction)
                }
                break;
        }
    };

    this.eat = function(fruit) { 
        if (this.x === fruit.x && this.y === fruit.y) {
            this.total++;
            this.eating_fruit = true;
            if(gamespeed > 1)
                gamespeed -= 1;
            SetLoop();
            return true;
        }

        return false;
    };

    this.checkCollision = function() {
        for (let i = 0; i < this.tail.length; i++) {
            if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
                this.total = 0;
                this.tail = [];
                this.dying = true;
                gamespeed = GAMESPEED;
                SetLoop();
                OUTDATA.gameOver();
            }
        }
    };
}

function Fruit() {
    this.x;
    this.y;

    this.pickLocation = function() {
        this.x = (Math.floor(Math.random() * rows - 1) + 1) * scale;
        this.y = (Math.floor(Math.random() * columns - 1) + 1) * scale;
        OUTDATA.newFruit(this.x, this.y, gamespeed);
    };

    this.draw = function() {
        ctx.fillStyle = "#FF0000"; // Color of the fruit
        ctx.fillRect(this.x, this.y, scale, scale);
    };
}

