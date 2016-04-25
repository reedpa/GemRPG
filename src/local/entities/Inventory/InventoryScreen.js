var inventoryBoxWidth = 50;
var inventoryBoxHeight = 50;
var inventoryItemPageSize = 18;
var inventoryCharacterPageSize = 18;

function InventoryScreen() {
    this.topLeft = 0;
    this.topTop = 0;
    this.zindex = inventoryZIndex;
    this.id = "InventoryScreen";
    
    this.items = dataStore.inventory.items;
    this.characters = dataStore.inventory.characters;
    
    this.itemPage = 0;
    
    var inventoryPageRight = {};
    var inventoryPageLeft = {};
    
    this.characterPage = 0;
    
    this.grabbedThing = null;
    
    this.itemBoxes = [];
    this.characterBoxes = [];
    for (var i = 0; i < this.items.length; i++) {
        var newItemBox = new ItemBox(this.items[i]);
        newItemBox.topLeft = ((i - this.itemPage) % 6 ) * inventoryBoxWidth + 5;
        newItemBox.topTop = top = Math.floor( (i - this.itemPage) / 6) * inventoryBoxHeight + 5;
        newItemBox.index = i;
        this.itemBoxes.push(newItemBox);
    }
    
    for (var i = 0; i < this.characters.length; i++) {
        var newCharacterBox = new CharacterBox(this.characters[i]);
        newCharacterBox.topLeft = ((i - this.characterPage) % 6 ) * inventoryBoxWidth + 5;
        newCharacterBox.topTop = Math.floor( (i - this.characterPage) / 6) * inventoryBoxHeight + 175;
        newCharacterBox.index = i; 
        this.characterBoxes.push(newCharacterBox); 
    }
    
    this.draw = function() {
        graphics.setFillStyle("black");
        graphics.fillRect(0, 0, 360, 640);
        
        graphics.setFont(20, "Arial");
        graphics.setFillStyle("white");
        graphics.fillText("X", 330, 20);
        
        if (this.grabbedThing) {
            graphics.drawSprite(
                this.grabbedThing.spriteProps,
                0,
                mouseX - 10,
                mouseY - 10
            );
        }
        
        /*for (var i = this.inventoryPage; i < Math.min(this.items.length, 18 + this.inventoryPage); i++) {
            graphics.setStrokeStyle("grey");
            var left = ((i - this.inventoryPage) % 6 ) * inventoryBoxWidth + 5;
            var top = Math.floor( (i - this.inventoryPage) / 6) * inventoryBoxHeight + 5;
            graphics.strokeRect(left,
                top,
                inventoryBoxWidth,
                inventoryBoxHeight);
            graphics.drawSprite(this.items[i].spriteProps, 0, left + 5, top + 5);
            
            graphics.setFillStyle("white");
            graphics.setFont(10, "Arial");
            if (this.items[i].subType && this.items[i].subType === "healing") {
                graphics.fillText("Hel " + this.items[i].damageModifier * basicDamage * -1, left + 2, top + 30);
            } else {
                graphics.fillText("Dam " + this.items[i].damageModifier * basicDamage, left + 2, top + 30);
            }
            graphics.fillText("Swg " + this.items[i].speedModifier.toString(), left + 2, top + 40);
        }
        
        for (var i = this.characterPage; i < Math.min(this.characters.length, 18 + this.characterPage); i++) {
            graphics.setStrokeStyle("grey");
            var left = ((i - this.characterPage) % 6 ) * inventoryBoxWidth + 5;
            var top = Math.floor( (i - this.characterPage) / 6) * inventoryBoxHeight + 175;
            graphics.strokeRect(left,
                top,
                inventoryBoxWidth,
                inventoryBoxHeight);
            graphics.drawSprite(this.characters[i].spriteProps, 0, left + 5, top + 5);
        }*/
    }
    
    this.doActions = function() {
        if (mouseCameDown) {
            if (physics.mouseIsInside({topLeft: 330, topTop: 0, width: 30, height: 30})) {
                audio.stopSound(this.music);
                audio.playSound("buttonclick");
                ResetAllObjects();
                var mainMap = new Walkabout(dataStore.lastWalkabout);
                player.topLeft = dataStore.lastLeft;
                player.targetLeft = dataStore.lastLeft;
                player.topTop = dataStore.lastTop;
                player.targetTop = dataStore.lastTop;
            }
        }
        if (mouseCameUp) {
            if (this.grabbedThing) {
                this.grabbedThing.grabbed = false;
            }
            this.grabbedThing = null;
        }
    }
    
    graphics.addObject(this);
    ai.addObject(this);
}