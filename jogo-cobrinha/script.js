let speedP = Number(prompt('Digite um número para a velocidade do jogo: 1=rapida, 2=normal'));

if (speedP == 1) {
	speed = 100
	alert('ok, o jogo será na velocidade rápida(1)')	
}
else if (speedP == 2) {
	speed = 200
	alert('ok, o jogo será na velocidade normal(2)')
}
else{
    speed = 200
	alert('Número diferente digitado, a velocidade será normal')	
}

let foodT = 0;

let canvas = document.getElementById("snake");
let context = canvas.getContext("2d"); // context renderiza desenho do canvas, 2d para tratar como 2d.
let box = 32;       // cada quadradinho do jogo = 32 pixels
let snake = [];
snake[0] = {
    x : 8 * box, 
    y : 8 * box,
}
let direction = "right";
let food = {         // comidinha muda de lugar
    x: Math.floor(Math.random() * 15 + 1) * box, // math.floor retira o 0.(parte flutuante)
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG() {
    context.fillStyle = "black";  // cor de fundo do jogo(fillStyle define stilo do nosso canvas/contexto)
    context.fillRect(0, 0, 16 * box, 16* box); // desenha onde vai acontecer o jogo (retangulo) x,y,alt,larg
                                                // 16 quadradinho de altura por 16 de larg.
}

function criarCobrinha(){
    for(i=0; i < snake.length; i++){
        context.fillStyle = "gray"; // preencher cor da cobrinha
        context.fillRect(snake[i].x, snake[i].y, box, box); // define tamanho dela. tamanha box q vai ser o tamanho dela.
    }
}

function drawFood(){  // desenhando comidinha
    context.fillStyle = "yellow";
    context.fillRect(food.x, food.y, box, box); // (box box = altura e largura)
}

document.addEventListener('keydown', update); 
        // keydown é evendo de clique no teclado, EventListener pega clique e ativa update

function update (event){            // muda se direcao nao ser oposta
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";

}

function iniciarJogo(){           
        // 1ª linha abaixo, permitir q ela atravesse as paredes.  plano cartesiano.
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0; //  se fim da direita, aparece esq.
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Game Over :(');
        }
    }

    criarBG(); // cobrinha será um array de coordenadas
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;  // setar movimento da cobrinha. Array na posição 0 de x, idem p/ y
    let snakeY = snake[0].y;
    
    if(direction == "right") snakeX += box;    // criar coord da cobrinha, onde ela vai seguir.
    if(direction == "left") snakeX -= box;      // decrementa para esquerda.
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y){  // se positivo retira ultimo elemento da cobrinha
        snake.pop();        
    }                                          // caso nao,  vai aumentar cobrinha.     
    else{food.x = Math.floor(Math.random() * 15 + 1) * box; // food.x recebe posição aleatória
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        foodT++;  // aumenta o numero de comidinha
        var messageFood = document.getElementById('msg'); // para mudar msg do index.html
        messageFood.innerText = `food = ${foodT}`; // soma a quantidade de comidinha.
        
    }
    
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}  

let jogo = setInterval(iniciarJogo, speed); // intervalo em milisegunos pra renovar sem travar.
