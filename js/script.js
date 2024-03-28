const MAXTESTITTERATIONS=1e4,AJAXPATH="/ajax?method=",CURRENTTESTTYPE="Genetic",VERSION="V1",DBNAME="snake.db",GAMESPEED=250,SNAKESPEEDFACTOR=20,SNAKESPEEDMAX=100;var snake,robot,canvas=document.getElementById("gameCanvas"),ctx=canvas.getContext("2d"),rows=canvas.height/scale,columns=canvas.width/scale,scale=20,gamespeed=GAMESPEED,gamemode="train",gameid=0;class Ajax{static record(t,e){fetch(e,{method:"POST",headers:{"Content-Type":"text/html",Accept:"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8","Access-Control-Allow-Methods":"POST, GET","Access-Control-Max-Age":1e3,"Access-Control-Allow-Headers":"origin, x-csrftoken, content-type, accept"},body:"data:'"+JSON.stringify(t)+"'"}).then(t=>t.json()).then(t=>console.log("Success:",t)).catch(t=>console.error("Error:",t))}}function Fruit(){this.x,this.y,this.pickLocation=function(){this.x=(Math.floor(Math.random()*rows-1)+1)*scale,this.y=(Math.floor(Math.random()*columns-1)+1)*scale,OUTDATA.newFruit(this.x,this.y,gamespeed)},this.draw=function(){ctx.fillStyle="#FF0000",ctx.fillRect(this.x,this.y,scale,scale)}}document.getElementById("gamemode").addEventListener("change",t=>{gamemode=t.target.value,snake.reset()}),document.getElementById("gamespeed").addEventListener("change",t=>{gamespeed=t.target.value,SetLoop()}),window.addEventListener("keydown",t=>{if("train"!=gamemode)return;const e=t.key.replace("Arrow","");snake.changeDirection(e)});class Helpers{static GetDist(t,e,i,s){return Math.hypot(i-t,s-e)}}function SetLoop(){console.log("SetLoop",gamespeed),window.clearInterval(gameid),gameid=null,gameid=window.setInterval(()=>{OUTDATA.outdata.step++,OUTDATA.outdata.step>MAXTESTITTERATIONS&&(alert("Game Over due to max test iterations..."),OUTDATA.gameOver(),window.clearInterval(gameid)),ctx.clearRect(0,0,canvas.width,canvas.height),fruit.draw(),snake.update(),snake.draw(),snake.eat(fruit)&&fruit.pickLocation(),snake.checkCollision(),robot.loop()},gamespeed)}var OUTDATA={init(t,e,i,s,a){this.outdata.step=0,this.outdata.snakes=[],this.outdata.fruits=[],this.outdata.game=new OUTDATAgame,this.outdata.game.gametimeout=t,this.outdata.game.gamespeed=e,this.outdata.game.scale=i,this.outdata.game.rows=s,this.outdata.game.columns=a},gameOver:function(){"train"==gamemode&&Ajax.record(OUTDATA.outdata,AJAXPATH+"GeneticV1record&dbname="+DBNAME)},newSnake:function(t,e,i,s,a,n,o=!1,h=!1){if("train"!=gamemode)return;let c=new OUTDATAsnake;c.tail=i,c.x=t,c.y=e,c.step=this.outdata.step,c.direction=s,c.distance_to_fruit=Math.round(a,6),c.direction_of_fruit=Math.round(n,6),c.eating_fruit=o,this.outdata.snakes.push(c)},newFruit:function(t,e,i){if("train"!=gamemode)return;let s=new OUTDATAfruit;s.x=t,s.y=e,s.step=this.outdata.step,s.gamespeed=i,this.outdata.fruits.push(s)},outdata:{snakes:this.snakes,fruits:this.fruits,step:0}};class OUTDATAgame{constructor(){this.gametimeout=0,this.gamespeed=0,this.scale=0,this.rows=0,this.columns=0}}class OUTDATAsnake{constructor(){this.tail=[],this.x=0,this.y=0,this.direction=0,this.distance_to_fruit=0,this.direction_of_fruit=0,this.eating_fruit=!1,this.step=0}}class OUTDATAfruit{constructor(){this.x=0,this.y=0,this.step=0,this.gamespeed=0}}class Robot{constructor(){this.trainingdata=null,this.loading=!1,this.direction=null}loop(){null!=this.trainingdata?snake.changeDirection(this.direction):this.loadTrainingData()}loadTrainingData(){this.loading||(this.loading=!0)}}function Snake(){this.x=0,this.y=0,this.xSpeed=1*scale,this.ySpeed=0,this.total=0,this.tail=[],this.directions=["Up","Down","Left","Right"],this.direction=0,this.distance_to_fruit=0,this.direction_of_fruit=0,this.eating_fruit=!1,this.dying=!1,this.draw=function(){ctx.fillStyle="#FFFFFF";for(let t=0;t<this.tail.length;t++)ctx.fillRect(this.tail[t].x,this.tail[t].y,scale,scale);ctx.fillRect(this.x,this.y,scale,scale)},this.update=function(){for(let t=0;t<this.tail.length-1;t++)this.tail[t]=this.tail[t+1];this.tail[this.total-1]={x:this.x,y:this.y},this.x+=this.xSpeed,this.y+=this.ySpeed,this.x>=canvas.width&&(this.x=0),this.y>=canvas.height&&(this.y=0),this.x<0&&(this.x=canvas.width-scale),this.y<0&&(this.y=canvas.height-scale),this.distance_to_fruit=Math.sqrt(Math.pow(this.x-fruit.x,2)+Math.pow(this.y-fruit.y,2)),this.direction_of_fruit=Math.atan2(this.y-fruit.y,this.x-fruit.x),OUTDATA.newSnake(this.x,this.y,this.tail,this.direction,this.distance_to_fruit,this.direction_of_fruit,this.eating_fruit,this.dying),this.eating_fruit=!1,this.dying=!1},this.changeDirection=function(t){switch(t){case"Up":0===this.ySpeed&&(this.xSpeed=0,this.ySpeed=1*-scale,this.direction=this.directions.indexOf(t));break;case"Down":0===this.ySpeed&&(this.xSpeed=0,this.ySpeed=1*scale,this.direction=this.directions.indexOf(t));break;case"Left":0===this.xSpeed&&(this.xSpeed=1*-scale,this.ySpeed=0,this.direction=this.directions.indexOf(t));break;case"Right":0===this.xSpeed&&(this.xSpeed=1*scale,this.ySpeed=0,this.direction=this.directions.indexOf(t))}},this.eat=function(t){return this.x===t.x&&this.y===t.y&&(this.total++,this.eating_fruit=!0,gamespeed>1&&(gamespeed-=1),SetLoop(),!0)},this.checkCollision=function(){for(let t=0;t<this.tail.length;t++)this.x===this.tail[t].x&&this.y===this.tail[t].y&&this.reset()},this.reset=function(){this.total=0,this.tail=[],this.dying=!0,gamespeed=GAMESPEED,SetLoop(),OUTDATA.gameOver()}}canvas=document.getElementById("gameCanvas"),ctx=canvas.getContext("2d"),rows=canvas.height/scale,columns=canvas.width/scale,OUTDATA.init(MAXTESTITTERATIONS,gamespeed,scale,rows,columns),document.getElementById("gamespeed").value=GAMESPEED,snake=new Snake,fruit=new Fruit,fruit.pickLocation(),robot=new Robot,SetLoop();