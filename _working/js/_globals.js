var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');
var rows = canvas.height / scale;
var columns = canvas.width / scale;

// user defined
var scale = SNAKESPEEDFACTOR;
var gamespeed = GAMESPEED;
var gamemode = 'train';

// init
var gameid = 0;
var snake;
var robot;