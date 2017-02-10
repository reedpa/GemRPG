var player;
var inventoryScreen;

function Walkabout(data) {
    this.image = document.getElementById("overlandmap");
    this.zindex = walkaboutZIndex;
    this.order = 1;
    this.ticksAlive = 0;
    player = new MainCharacter();
    this.data = data;
    dataStore.lastWalkabout = data;
    this.image = document.getElementById(this.data.image);
    dataStore.lastLeft ? player.topLeft = dataStore.lastLeft : player.topLeft = this.data.startingLocation[0];
    dataStore.lastTop ? player.topTop = dataStore.lastTop : player.topTop = this.data.startingLocation[1]; 
    player.targetLeft = player.topLeft;
    player.targetTop = player.topTop;
    var inventoryButton = {
        spriteProps: {
            sheetName: "items",
            leftIndex: 0,
            topIndex: 58,
            spriteSize: 16,
            frames: 1
        },
        topLeft: 10, topTop: 540, height: 30, width: 30};

    this.regions = [];
    
    this.followers = [];
    
    for (var i = 1; i < dataStore.characters.length; i++) {
        var target;
        if (i === 1) {
            target = player;
        } else {
            target = this.followers[i - 2];
        }
        var follower = new Follower(target, dataStore.characters[i].spriteProps);
        this.followers.push(follower);
    }

    for (var i = 0; i < this.data.regions.length; i++) {
        this.regions.push(new Region(this.data.regions[i], this.followers));
    }
    
    this.doActions = function() {
        this.ticksAlive++;
        
        if (mouseCameDown) {
            if (physics.mouseIsInside(inventoryButton)) {
                ResetAllObjects();
                inventoryScreen = new InventoryScreen();

                dataStore.lastLeft = player.topLeft;
                dataStore.lastTop = player.topTop;
            }
        }
    }
    
    this.draw = function() {
        graphics.drawImage(this.image, 0 + 175 - player.topLeft, 0 + 315 - player.topTop);

        graphics.drawSpriteZoomed(inventoryButton.spriteProps, 0, inventoryButton.topLeft, inventoryButton.topTop, 2);
        graphics.setFillStyle("black");
        graphics.setFont(30, "Arial");
        graphics.fillText("Gold: " + dataStore.gold, 10, 600);
        graphics.fillText("XP: " + dataStore.xp, 10, 630);
    }
    
    ai.addObject(this);
    
    graphics.addObject(this);
}