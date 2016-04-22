
function GameOver() {
    this.zindex = gameOverZIndex;
    this.id = "GameOver";
    
    this.button = document.getElementById("buttonwhite");
    
    this.doActions = function() {
        if (mouseCameDown) {
            this.loadMainMenu();
        }
    }
    
    this.draw = function() {
        graphics.setFillStyle("black");
        graphics.setGlobalAlpha(0.2);
        graphics.fillRect(0, 0, canvas.width, canvas.height);
        graphics.setGlobalAlpha(1);
        graphics.setFont(40, "Arial");
        graphics.setFillStyle("white");
        graphics.fillText("SUCCESS", 80, 140);
    }
    
    this.loadMainMenu = function() {
        audio.playSound("buttonclick");
        ResetAllObjects();
        var mainMap = new Walkabout(dataStore.lastWalkabout);
        player.topLeft = dataStore.lastLeft;
        player.targetLeft = dataStore.lastLeft;
        player.topTop = dataStore.lastTop;
        player.targetTop = dataStore.lastTop;
    }
    
    graphics.addObject(this);
    ai.addObject(this);
}