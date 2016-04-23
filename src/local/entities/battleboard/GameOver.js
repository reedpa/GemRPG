
function GameOver() {
    this.zindex = gameOverZIndex;
    this.id = "GameOver";
    this.gold = 0;
    this.currentGold = 0;
    this.goldSpeed = 0;
    this.xp = 0;
    this.currentXp = 0;
    this.xpSpeed = 0;
    
    gameBoard.result === "FAILURE" ? this.music = "lose_screen_music" : this.music = "win_screen_music";
    gameBoard.result === "FAILURE" ? this.goldModifier = -1 : this.goldModifier = 1;
    
    this.button = document.getElementById("buttonwhite");
    
    this.doActions = function() {
        if (mouseCameDown) {
            this.loadMainMenu();
        }
        if (this.currentGold !== this.gold) {
            this.currentGold = Math.min(this.currentGold + this.goldSpeed, this.gold);
        }
        if (this.currentXp !== this.xp) {
            this.currentXp = Math.min(this.currentXp + this.xpSpeed, this.xp);
        }
    }
    
    this.getLoot = function() {
        for (var i = 0; i < gameBoard.encounterData.enemies.length; i++) {
            var goldAmount = gameBoard.encounterData.enemies[i].goldDrop;
            goldAmount += Math.floor(Math.random() * goldAmount); 
            this.gold +=  goldAmount * this.goldModifier;
            this.xp += gameBoard.encounterData.enemies[i].xpDrop;
        }
        
        this.goldSpeed = Math.ceil(this.gold / 64);
        this.xpSpeed = Math.ceil(this.xp / 64);
        
        dataStore.gold = Math.max(dataStore.gold + this.gold, 0);
        dataStore.xp += this.xp;
    }
    
    this.draw = function() {
        graphics.setFillStyle("black");
        graphics.setGlobalAlpha(0.2);
        graphics.fillRect(0, 0, canvas.width, canvas.height);
        graphics.setGlobalAlpha(1);
        
        graphics.setFont(40, "Arial");
        graphics.setFillStyle("white");
        graphics.fillText(gameBoard.result, 80, 140);
        
        if (this.gold !== 0) {
            graphics.setFont(30, "Arial");
            graphics.setFillStyle("white");
            graphics.fillText("Gold: " + this.currentGold.toString(), 80, 200);
        }
        
        if (this.xp !== 0) {
            graphics.setFont(30, "Arial");
            graphics.setFillStyle("white");
            graphics.fillText("XP: " + this.currentXp.toString(), 80, 230);
        }
    }
    
    this.loadMainMenu = function() {
        audio.stopSound(this.music);
        audio.playSound("buttonclick");
        ResetAllObjects();
        var mainMap = new Walkabout(dataStore.lastWalkabout);
        player.topLeft = dataStore.lastLeft;
        player.targetLeft = dataStore.lastLeft;
        player.topTop = dataStore.lastTop;
        player.targetTop = dataStore.lastTop;
    }
    
    this.getLoot();
    audio.playMusic(this.music);

    graphics.addObject(this);
    ai.addObject(this);
}