var gameBoard;

function Region(regionData) {
    this.topLeft = regionData.topLeft;
    this.targetLeft = regionData.topLeft;
    this.topTop = regionData.topTop;
    this.targetTop = regionData.topTop;
    this.width = regionData.width;
    this.height = regionData.height;
    this.color = regionData.color;
    this.zindex = regionZIndex;
    this.isBlocker = !!regionData.isBlocker;
    this.ticksAlive = 0;
    
    this.draw = function() {
        graphics.setFillStyle(this.color);
        ctx.globalAlpha = 0.5;
        graphics.fillRect(this.topLeft + 175 - player.topLeft, this.topTop + 315 - player.topTop, this.width, this.height)
        ctx.globalAlpha = 1;

        graphics.setStrokeStyle("black");
        if (physics.isInside(player, this)) {
            graphics.setStrokeStyle("gold");
        }
        graphics.strokeRect(this.topLeft + 175 - player.topLeft, this.topTop + 315 - player.topTop, this.width, this.height);
    }
    
    this.doActions = function() {
        if (physics.isInside(player, this)) {
            if (this.ticksAlive > 60) {
                if (Math.floor(Math.random() * 100) === 1 && regionData.encounters.length >= 1 ) {
                    var encounter = regionData.encounters[Math.floor(Math.random() * regionData.encounters.length)];
                    ResetAllObjects();
                    gameBoard = new GameBoard(encounter);
                    graphics.addObject(gameBoard);
                    ai.addObject(gameBoard);
                    dataStore.lastLeft = player.topLeft;
                    dataStore.lastTop = player.topTop;
                }
            }
        }
        this.ticksAlive++;
    }
    
    ai.addObject(this);
    graphics.addObject(this);
    physics.addObject(this);
}