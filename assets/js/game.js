import { Player } from './player.js';
import { Platform } from './platform.js';
// import { Coin } from './coin.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const player = new Player();
let platformScrollSpeed = 0;
let gameOver = false;
const platforms = [
    new Platform(0, canvas.height - 150, 300, 30),
    new Platform(400, canvas.height - 250, 200, 30),
    new Platform(700, canvas.height - 350, 300, 30),
    new Platform(200, canvas.height - 450, 250, 30),
];

// Add this before creating platforms and starting the game
function loadAssets(callback) {
    const brickImage = new Image();
    brickImage.src = 'assets/images/bricks.png';
    brickImage.onload = () => {
        Platform.brickImage = brickImage;
        callback();
    };
}

// Wrap the existing initialization code in a function
function initGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (!gameOver) {
        platforms.forEach(platform => {
            platform.position.x -= platformScrollSpeed;
            if (platform.position.x + platform.size.width < 0) {
                platform.position.x = canvas.width;
            } else if (platform.position.x > canvas.width) {
                platform.position.x = -platform.size.width;
            }
        });
        
        player.update(ctx);
        platforms.forEach(platform => {
            platform.draw(ctx);
            checkCollision(player, platform);
        });
        
        checkGameOver();
    }
    player.draw(ctx);
    
    requestAnimationFrame(animate);
}

// Load assets before starting the game
loadAssets(initGame);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (!gameOver) {
        platforms.forEach(platform => {
            platform.position.x -= platformScrollSpeed;
            if (platform.position.x + platform.size.width < 0) {
                platform.position.x = canvas.width;
            } else if (platform.position.x > canvas.width) {
                platform.position.x = -platform.size.width;
            }
        });
        
        player.update(ctx);
        platforms.forEach(platform => {
            platform.draw(ctx);
            checkCollision(player, platform);
        });
        
        checkGameOver();
    }
    player.draw(ctx);
    
    requestAnimationFrame(animate);
}

animate();


function checkCollision(player, platform) {
    const playerBottom = player.position.y + player.size.height;
    const playerTop = player.position.y;
    const playerRight = player.position.x + player.size.width;
    const playerLeft = player.position.x;

    const platformBottom = platform.position.y + platform.size.height;
    const platformTop = platform.position.y;
    const platformRight = platform.position.x + platform.size.width;
    const platformLeft = platform.position.x;

    if (playerBottom >= platformTop && playerTop <= platformBottom &&
        playerRight >= platformLeft && playerLeft <= platformRight) {
        const overlapTop = playerBottom - platformTop;
        const overlapBottom = platformBottom - playerTop;
        const overlapLeft = playerRight - platformLeft;
        const overlapRight = platformRight - playerLeft;
        const minOverlap = Math.min(overlapTop, overlapBottom, overlapLeft, overlapRight);
        if (minOverlap === overlapTop) {
            player.position.y = platformTop - player.size.height;
            player.velocity.y = 0;
        } else if (minOverlap === overlapBottom) {
            player.position.y = platformBottom;
            player.velocity.y = 0;
        } else if (minOverlap === overlapLeft) {
            player.position.x = platformLeft - player.size.width;
            player.velocity.x = 0;
        } else if (minOverlap === overlapRight) {
            player.position.x = platformRight;
            player.velocity.x = 0;
        }
    }
}





function checkGameOver() {
    if (player.position.y + player.size.height > canvas.height) {
        gameOver = true;
        console.log("Game Over");
        player.velocity.x = 0;
        player.velocity.y = 0;
        platformScrollSpeed = 0;
        player.position.y = canvas.height - player.size.height;
    }
}





window.addEventListener('keydown', (e) => {
    if (!gameOver) {
        switch (e.key) {
            case 'ArrowRight':
            case 'd':
            case 'D':
                platformScrollSpeed = 3; 
                player.velocity.x = 5; 
                break;
            case 'ArrowLeft':
            case 'a':
            case 'A':
                platformScrollSpeed = -3; 
                player.velocity.x = -5; 
                break;
            case 'ArrowUp':
            case 'w':
            case 'W':
            case ' ':
                player.velocity.y = -10; 
                break;
        }
    }
});

window.addEventListener('keyup', (e) => {
    if (!gameOver) {
        switch (e.key) {
            case 'ArrowRight':
            case 'd':
            case 'D':
            case 'ArrowLeft':
            case 'a':
            case 'A':
                platformScrollSpeed = 0;
                player.velocity.x = 0;
                break;
        }
    }
});
