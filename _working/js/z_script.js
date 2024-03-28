// the root of the application
(function setup() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    rows = canvas.height / scale;
    columns = canvas.width / scale;

    OUTDATA.init(
        MAXTESTITTERATIONS,
        gamespeed,
        scale,
        rows,
        columns
    );
    document.getElementById("gamespeed").value = GAMESPEED;

    snake = new Snake();
    fruit = new Fruit();
    fruit.pickLocation();
    robot = new Robot();
    SetLoop(); 
}()); 