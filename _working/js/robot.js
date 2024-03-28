/**
 * This program will play the game based on the training data
 */
class Robot
{
    constructor()
    {
        this.trainingdata = null;
        this.loading = false;
        this.direction = null;
        // get the trained data via ajax
        // play the game
    }
    loop()
    {
        if(null == this.trainingdata)
        {
            this.loadTrainingData();
            return;
        }
        // use trainging data to decide
        // move
        snake.changeDirection(this.direction);
    }
    loadTrainingData()
    {
        if(this.loading)return;
        this.loading = true;
        // get training data via ajax
        // once done set this.loading , this.trainingdata
    }
}