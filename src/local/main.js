var canvas;
var ctx;

var graphics;
var ai;
var interaction;
var physics;
var audio;
var mainMenu;
var gameOver;
var dataStore = new DataStore(); //don't destroy it!

function InitializeGame() {
    ai = new AI();
    graphics = new Graphics();
    interaction = new Interaction();
    physics = new Physics();
    audio = new Audio();
    mainMenu = new MainMenu();
}

function main() {
    canvas = document.getElementById("mainCanvas");
    ctx = canvas.getContext("2d");
    InitializeGame();
    MainLoop();
}

main();