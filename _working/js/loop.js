function SetLoop()
{
    console.log("SetLoop", gamespeed);
    // clear the interval before setting anew one
    window.clearInterval(gameid);
    gameid = null; // probably not necessary but I've seen this as an issue before
    // set the interval to the id
    gameid = window.setInterval(() => {
        // increment the step for the AI to match the psoition in the game
        OUTDATA.outdata.step++;
        // don;t let it run forever 
        if(OUTDATA.outdata.step > MAXTESTITTERATIONS){
            alert("Game Over due to max test iterations...");
            OUTDATA.gameOver();
            window.clearInterval(gameid);
        }
        // clear and draw
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fruit.draw();
        snake.update();
        snake.draw();
        // if eat resatrt
        if (snake.eat(fruit)) {
            fruit.pickLocation();
        }
        // check collision
        snake.checkCollision();
        // loop the robot
        robot.loop()
    }, gamespeed);
}