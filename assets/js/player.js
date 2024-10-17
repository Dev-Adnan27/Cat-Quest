export class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 0,
        };
        this.size = {
            width: 50,
            height: 50,
        };
        this.gravity = 0.5;
        this.velocity = {
            x: 0,
            y: 0,
        };
    }

    draw(ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
    }

    update(ctx) {
        this.velocity.y += this.gravity;
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        // Only check top and side boundaries
        if (this.position.y < 0) {
            this.position.y = 0;
            this.velocity.y = 0;
        }
        if (this.position.x < 0) {
            this.position.x = 0;
            this.velocity.x = 0;
        }
        if (this.position.x + this.size.width > ctx.canvas.width) {
            this.position.x = ctx.canvas.width - this.size.width;
            this.velocity.x = 0;
        }
    }
}
