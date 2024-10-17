export class Player {
    constructor() {
        this.position = {
            x: 0,
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
        this.draw = function (ctx) {
            ctx.fillStyle = 'red';
            ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
        }

        this.update = function (ctx) {
            this.velocity.y += this.gravity;

            // Check vertical boundaries
            if (this.position.y + this.velocity.y > 0 &&
                this.position.y + this.size.height + this.velocity.y < ctx.canvas.height) {
                this.position.y += this.velocity.y;
            } else {
                this.velocity.y = 0;
                if (this.position.y <= 0) {
                    this.position.y = 0;
                }
                if (this.position.y + this.size.height >= ctx.canvas.height) {
                    this.position.y = ctx.canvas.height - this.size.height;
                }
            }
            // Check horizontal boundaries
            if (this.position.x + this.velocity.x > 0 && 
                this.position.x + this.size.width + this.velocity.x < ctx.canvas.width) {
                this.position.x += this.velocity.x;
            } else {
                this.velocity.x = 0;
                if (this.position.x <= 0) {
                    this.position.x = 0;
                }
                if (this.position.x + this.size.width >= ctx.canvas.width) {
                    this.position.x = ctx.canvas.width - this.size.width;
                }
            }
            this.draw(ctx);
        }
    }
}