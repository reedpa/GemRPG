
function Region(regionData) {
    this.topLeft = regionData.topLeft;
    this.targetLeft = regionData.topLeft;
    this.topTop = regionData.topTop;
    this.targetTop = regionData.topTop;
    this.width = regionData.width;
    this.height = regionData.height;
    this.color = regionData.color;
    this.zindex = 5;
    this.isBlocker = !!regionData.isBlocker;
    
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
            if (Math.floor(Math.random() * 100) === 1 ) {
                graphics.graphicsObjects = null;
                ai.aiObjects = null;
                physics.physObjects = null;
                graphics = null;
                ai = null;
                physics = null;
                gameBoard = null;
                mainMenu = null;
                graphics = new Graphics();
                ai = new AI();
                physics = new Physics();
                interaction = new Interaction();
                var gameBoard = new GameBoard("Score Blitz");
                graphics.addObject(gameBoard);
                ai.addObject(gameBoard);
                dataStore.lastLeft = player.topLeft;
                dataStore.lastTop = player.topTop;
            }
        }
    }
    
    ai.addObject(this);
    graphics.addObject(this);
    physics.addObject(this);
}