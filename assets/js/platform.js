export class Platform {
    static brickImage = null;

    constructor(x, y, width, height, backgroundColor = '#8B4f39') {
        this.position = {
            x: x,
            y: y,
        };
        this.size = {
            width: width,
            height: height,
        };
        this.backgroundColor = backgroundColor;
        
        // Load the brick image if it hasn't been loaded yet
        if (!Platform.brickImage) {
            Platform.brickImage = new Image();
            Platform.brickImage.src = 'assets/images/bricks.png';
        }
    }

    draw(ctx) {
        // First, draw the background color
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);

        if (Platform.brickImage.complete) {
            // Create a pattern from the brick image
            const pattern = ctx.createPattern(Platform.brickImage, 'repeat');
            ctx.fillStyle = pattern;
            ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
        }
    }
}
