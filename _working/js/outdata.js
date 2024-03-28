var OUTDATA = {
    init(
        gametimeout,
        gamespeed,
        scale,
        rows, 
        columns  
    ) {
        this.outdata.step = 0;
        this.outdata.snakes = [];
        this.outdata.fruits = [];
        this.outdata.game = new OUTDATAgame();
        this.outdata.game.gametimeout = gametimeout;
        this.outdata.game.gamespeed = gamespeed;
        this.outdata.game.scale = scale;
        this.outdata.game.rows = rows;
        this.outdata.game.columns = columns;
    },
    gameOver:function(){
        Ajax.record(OUTDATA.outdata,AJAXPATH + CURRENTTESTTYPE + VERSION + 'record&dbname='+DBNAME);
    },
    newSnake:function(
        x,y,tail,
        direction,
        distance_to_fruit,
        direction_of_fruit,
        eating_fruit = false,
        dying = false){ 
        let s = new OUTDATAsnake();
            s.tail = tail;
            s.x = x;
            s.y = y;
            s.step = this.outdata.step;
            s.direction = direction;
            s.distance_to_fruit = Math.round(distance_to_fruit,6);
            s.direction_of_fruit = Math.round(direction_of_fruit,6);
            s.eating_fruit = eating_fruit;
            //s.dying = dying;
        this.outdata.snakes.push(s);
    },
    newFruit:function(x,y,gamespeed){
        let a = new OUTDATAfruit();
            a.x = x;
            a.y = y;
            a.step = this.outdata.step;
            a.gamespeed = gamespeed;
        this.outdata.fruits.push(a);
    },
    outdata:{
        snakes:this.snakes,
        fruits:this.fruits,
        step:0
    }
} 
class OUTDATAgame
{
    constructor(){
        this.gametimeout = 0
        this.gamespeed = 0
        this.scale = 0
        this.rows = 0 
        this.columns = 0
    }
}
class OUTDATAsnake
{
    constructor()
    {
        this.tail = []
        this.x = 0
        this.y = 0
        this.direction = 0
        this.distance_to_fruit = 0
        this.direction_of_fruit = 0 // cartessian direction
        this.eating_fruit = false
        //this.dying = false
        this.step = 0
    }
}
class OUTDATAfruit
{
    constructor()
    {
        this.x = 0
        this.y = 0
        this.step = 0
        this.gamespeed = 0
    }
}