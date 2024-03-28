function Fruit() {
    this.x;
    this.y;

    this.pickLocation = function() {
        this.x = (Math.floor(Math.random() * rows - 1) + 1) * scale;
        this.y = (Math.floor(Math.random() * columns - 1) + 1) * scale;
        
        OUTDATA.newFruit(this.x, this.y, gamespeed);
    };

    this.draw = function() {
        ctx.fillStyle = "#FF0000"; // Color of the fruit
        ctx.fillRect(this.x, this.y, scale, scale);
    };
}