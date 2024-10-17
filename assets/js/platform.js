export class Platform {
    constructor(x, y, width, height) {
        this.position = {
            x: x,
            y: y,
        };
        this.size = {
            width: width,
            height: height,
        };
    }

    draw(ctx) {
        ctx.fillStyle = 'brown';
        ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
    }
}
