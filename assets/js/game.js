import { Player } from './player.js';
import { Platform } from './platform.js';
// import { Coin } from './coin.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
// console.log(ctx);

canvas.width = 1024;
canvas.height = 576;

const player = new Player();
const platform = new Platform(0, canvas.height - 150, canvas.width - 100, 30);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.update(ctx);
    platform.draw(ctx);
    checkCollision(player, platform);
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





window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowRight':
            player.velocity.x = 5;
            break;
        case 'ArrowLeft':
            player.velocity.x -= 5;
            break;
        case 'ArrowUp':
            player.velocity.y -= 5;
            break;
        case 'ArrowDown':
            player.velocity.y += 5;
            break;
    }
});

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'ArrowRight':
            player.velocity.x = 0;
            break;
        case 'ArrowLeft':
            player.velocity.x = 0;
            break;
        case 'ArrowUp':
            player.velocity.y = 0;
            break;
        case 'ArrowDown':
            player.velocity.y = 0;
            break;
    }
});
