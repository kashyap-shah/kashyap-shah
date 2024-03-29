/*PRELOADER*/
var preloader = document.getElementById("loading");
function loadingFunction() {
	preloader.style.display = 'none';
}

/*MAIN*/
const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// create the unit
const box = 32;

// load images

const ground = new Image();
ground.src = "assets/images/ground.png";

const foodImg = new Image();
foodImg.src = "assets/images/food.png";

// load audio files

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "assets/audio/dead.mp3";
eat.src = "assets/audio/eat.mp3";
up.src = "assets/audio/up.mp3";
right.src = "assets/audio/right.mp3";
left.src = "assets/audio/left.mp3";
down.src = "assets/audio/down.mp3";

// create the snake

let snake = [];

snake[0] = {
    x : 9 * box,
    y : 10 * box
};

// create the food

let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

// Check if the snake's location is equal to the food's location
if(food.x === snake[0].x && food.y === snake[0].y) {
    console.log('TRIGGERED');
    // If they are randomly the same we can hard code a new x or y value 
    // to either food or snake. I choose food's x coordinate here.
    if(food.x > 100) food.x = 50; //If it's over 100 we hardcode a number under 100
    else food.x = 150; //If it's under 100 we hardcode a number over 100
}

// create the score var

let score =0;
let score_name="Score: ";

//control the snake

let d;

document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
    if( key == 37 && d != "RIGHT"){
        left.play();
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
        up.play();
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
        right.play();
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
        down.play();
    }
}

function upArrow(){
	if(d != "DOWN"){
		d = "UP";
        	up.play();
	}
}

function leftArrow(){
	if(d != "RIGHT"){
		left.play();
        	d = "LEFT";
	}
}

function downArrow(){
	if(d != "UP")
		d = "DOWN";
        	down.play();
	}
}

function rightArrow(){
	if(d != "LEFT"){
		d = "RIGHT";
        	right.play();
	}
}

// cheack collision function
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

// draw everything to the canvas

function draw(){
    
    ctx.drawImage(ground,0,0);
    
    for( let i = 0; i < snake.length ; i++){
        ctx.fillStyle = ( i == 0 )? "green" : "#43D721";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        
        ctx.strokeStyle = "#000";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    
    ctx.drawImage(foodImg, food.x, food.y);
    
    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    // which direction
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;
    
    // if the snake eats the food
    if(snakeX == food.x && snakeY == food.y){
        score++;
        eat.play();
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
        // we don't remove the tail
    }else{
        // remove the tail
        snake.pop();
    }
    
    // add new Head
    
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    
    // game over
    
    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
        clearInterval(game);
        dead.play();
        setTimeout(myFunction,500);
    }

    function myFunction() {
            alert('Game Over! To start a new game, Click Play Again button.');
        }
    
    snake.unshift(newHead);
    
    ctx.fillStyle = "#fff";
    ctx.font = "45px Roboto";
    ctx.fillText(score_name+score,1*box,1.6*box);
}

// call draw function every 100 ms

let game = setInterval(draw,100);

//Arrow

