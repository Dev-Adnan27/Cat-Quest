import { Player } from './player.js';
import { Platform } from './platform.js';
// import { Coin } from './coin.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
console.log(ctx);

canvas.width = 1024;
canvas.height = 576;

const player = new Player();

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.update(ctx);
    requestAnimationFrame(animate);
}

animate();

window.addEventListener('keydown', (e) => {
    console.log(e.key);
    switch(e.key){
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
    console.log(e.key);
    switch(e.key){
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
