document.getElementById("gamemode").addEventListener("change",(e)=>{
    gamemode = e.target.value;
    snake.reset();
})
document.getElementById("gamespeed").addEventListener("change",(e)=>{
    gamespeed = e.target.value;
    SetLoop();
})
window.addEventListener('keydown', (evt) => {
    if('train' != gamemode)return
    const direction = evt.key.replace('Arrow', '');
    snake.changeDirection(direction);
});