
function GameTimer() {
    this.zindex = gameTimerZIndex;
    
    this.draw = function() {
        graphics.setFont(30, "Consolas");
        graphics.setFillStyle("blue");
        graphics.fillText(ConvertMillisecondsToSecondString(gameTime), 280, 250);
    }

    graphics.addObject(this);
}