const canvas = document.createElement('canvas');
const gameArea = document.querySelector('.game-area');
canvas.width = 600;
canvas.height = 400;
gameArea.appendChild(canvas);
const ctx = canvas.getContext('2d');



// Game variables
const cat = {
    x: 50,
    y: 300,
    width: 40,
    height: 40,
    velocityY: 0,
    jumping: false
};

const obstacles = [];
let gameSpeed = 2;
let score = 0;
let gameOver = false;

// Load assets
const catImg = new Image();
catImg.src = '/'; // Replace with your cat image

// Game functions
function drawCat() {
    ctx.drawImage(catImg, cat.x, cat.y, cat.width, cat.height);
}

function drawObstacles() {
    ctx.fillStyle = '#8B4513';
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

function update() {
    if (gameOver) {
        // Draw game over message
        ctx.fillStyle = '#FF0000';
        ctx.font = '40px Arial';
        ctx.fillText('Game Over!', canvas.width/2 - 100, canvas.height/2 - 20);
        ctx.font = '20px Arial';
        ctx.fillText('Press Enter to Restart', canvas.width/2 - 120, canvas.height/2 + 20);
        return;
    }
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update cat position
    cat.y += cat.velocityY;
    if (cat.y + cat.height >= 300) {
        cat.y = 300 - cat.height;
        cat.jumping = false;
    }
    cat.velocityY += 0.5;
    
    // Update obstacles
    for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].x -= gameSpeed;
        if (obstacles[i].x + obstacles[i].width < 0) {
            obstacles.splice(i, 1);
            score++;
        }
    }
    
    // Generate new obstacles
    if (Math.random() < 0.01) {
        const height = Math.random() * 80 + 30; // Reduced max height from 100 to 80
        obstacles.push({
            x: canvas.width,
            y: 300 - height,
            width: 30,
            height: height
        });
    }
    
    // Check collisions
    obstacles.forEach(obstacle => {
        if (cat.x < obstacle.x + obstacle.width &&
            cat.x + cat.width > obstacle.x &&
            cat.y < obstacle.y + obstacle.height &&
            cat.y + cat.height > obstacle.y) {
            gameOver = true;
        }
    });
    
    // Draw everything
    drawCat();
    drawObstacles();
    
    // Draw ground
    ctx.fillStyle = '#228B22';
    ctx.fillRect(0, 300, canvas.width, canvas.height - 300);
    
    // Draw score
    ctx.fillStyle = '#000';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 30);
    
    requestAnimationFrame(update);
}

// Handle keyboard input
document.addEventListener('keydown', (e) => {
    if (e.code === 'KeyW' && !cat.jumping) {
        cat.velocityY = -15;
        cat.jumping = true;
    }
    
    // Restart game on Enter press
    if (e.code === 'Enter' && gameOver) {
        restartGame();
    }
    
    // Suicide on 'O' press
    if (e.code === 'KeyO' && !gameOver) {
        gameOver = true;
    }
});

function restartGame() {
    // Reset game state
    cat.y = 300;
    cat.velocityY = 0;
    cat.jumping = false;
    obstacles.length = 0;
    score = 0;
    gameOver = false;
    
    // Restart game loop
    update();
}

// Start game
update();