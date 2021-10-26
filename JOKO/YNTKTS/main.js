const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;

// deklarasikan variabel yang dibutuhkan
let spacePressed = false;
let angle =0; 
let hue = 0;
let frame = 0;
let score = 0;
let gameSpeed = 2;

// bakcground
const background1 = new Image();
background1.src = "images/bg.jpg";

const background2 = new Image();
background2.src = "images/bg2.jpg";

const BG = {
    x1 : 0,
    x2 : canvas.width,
    y : 0,
    width : canvas.width,
    height : canvas.height
}

function handleBackground(){
    if(BG.x1 <= -BG.width + gameSpeed) BG.x1 = BG.width;
    else BG.x1 -= gameSpeed;
    if(BG.x2 <= -BG.width + gameSpeed) BG.x2 = BG.width;
    else BG.x2 -= gameSpeed;

    ctx.drawImage(background1, BG.x1, BG.y, BG.width, BG.height);
    ctx.drawImage(background2, BG.x2, BG.y, BG.width, BG.height);
}

// membuat function yang akan memanggil semua function
function animate(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    // ctx.fillRect(10, canvas.height - 90, 50, 50);
    handleBackground();
    handleObstacles();
    bird.update();
    bird.draw();
    ctx.fillStyle = "red";
    ctx.font = "90px Georgia";
    ctx.strokeText(score, 450, 70);
    ctx.fillText(score, 450, 70);
    handleCollisions();
    if(handleCollisions()) return;
    handleParticles();
    requestAnimationFrame(animate);
    angle += 0.12;
    hue++;
    frame++;
}

animate();

window.addEventListener("keydown", function(e){
    if(e.code === "Space") spacePressed = true;
})

window.addEventListener("keyup", function(e){
    if(e.code === "Space") spacePressed = false;
})

const duar = new Image();
duar.src = "images/duar.jpg";

function handleCollisions(){
    for(let i = 0; i < obstaclesArray.length ; i++){
        if(bird.x < obstaclesArray[i].x + obstaclesArray[i].width &&
            bird.x + bird.width > obstaclesArray[i].x &&
            ((bird.y < 0 + obstaclesArray[i].top &&
                bird.y + bird.height > 0 ) ||
                (bird.y>canvas.height - obstaclesArray[i].bottom && 
                    bird.y + bird.height < canvas.height)))
                    {
                        // collision detected
                        ctx.drawImage(duar, bird.x, bird.y, 250, 150);
                        ctx.font = "25px Georgia";
                        ctx.fillStyle = "red";
                        ctx.fillText("Game Over, YNTKTS "  , 160, canvas.height /2 -10)
                        return true;
                    }
    }
}
