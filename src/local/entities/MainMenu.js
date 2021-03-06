var topScore = 0;
var topMove = 0;
var topZen = 0;

var walkabout;

function MainMenu() {
    this.zindex = mainMenuZIndex;
    this.active = true;
    this.id = "MainMenu";
    this.image = document.getElementById("mainmenu");
    this.titleImage = document.getElementById("title");

    this.lastX = 0;
    this.lastY = 0;
    
    if (window.localStorage) {
        topScore = window.localStorage.getItem('TopScore') || 0;
        topMove = window.localStorage.getItem('TopMove') || 0;
        topZen = window.localStorage.getItem('TopZen') || 0;
    }

    var gameModes = [
        [100, 165, 160, 50, "New Game", document.getElementById("buttonpurple")]
    ];
    
    this.doActions = function() {
        if (mouseCameDown) {
            this.handleClick();
        }
        
        this.handleMouseMove();
    }

    this.draw = function() {
        graphics.drawImage(this.image, 0, 0, 360, 640)
        graphics.drawImage(this.titleImage, 90, 0);
        graphics.setStrokeStyle("black");
        
        for (var i = 0; i < gameModes.length; i++) {
            var offset = 0;
            if (this.isInside(this.lastX, this.lastY, i)) {
                offset = 1;
            }

            graphics.drawImage(gameModes[i][5], gameModes[i][0] + offset, gameModes[i][1] + offset, gameModes[i][2], gameModes[i][3]);
            graphics.setFont(30, "Arial");
            graphics.setFillStyle("black");
            graphics.fillText(gameModes[i][4], gameModes[i][0]+5+offset, gameModes[i][1]+32+offset);
        }
    };

    this.handleClick = function() {
        if (this.active) {
            for (var i = 0; i < gameModes.length; i++) {
                if (this.isInside(mouseX, mouseY, i)) {
                    audio.playSound("buttonclick");
                    this.initializeGame(i);
                    return;
                }
            }
        }
    };
    
    this.handleMouseMove = function() {
        if (this.active) {
            this.lastX = mouseX;
            this.lastY = mouseY;
        }
    };
    
    this.isInside = function(x, y, i) {
        if (x > gameModes[i][0] && x < (gameModes[i][0] + gameModes[i][2])) {
            if (y > gameModes[i][1] && y < (gameModes[i][1] + gameModes[i][3])) {
                return true;
            }
        }
        return false;
    }

    this.initializeGame = function(index) {
        dataStore.characters = [];
        for (var i = 0; i < starterParty.characters.length; i++) {
            dataStore.characters.push(starterParty.characters[i]);
        }
        dataStore.inventory = {};
        dataStore.inventory.characters = starterParty.characters;
        dataStore.inventory.items = starterInventory;
        dataStore.conversations = [];
        dataStore.bestiary = [];
        dataStore.settings = {};
        dataStore.settings.conversationSpeed = 75;
        dataStore.settings.encounterRate = 75;
        walkabout = new Walkabout(mainMap);
        
        this.active = false;
        graphics.removeObject(this);
    }
    
    if (gameOver !== null) { gameOver = null; }

    graphics.addObject(this);
    ai.addObject(this);
}