var inventoryBoxWidth = 50;
var inventoryBoxHeight = 50;
var inventoryItemPageSize = 18;
var inventoryCharacterPageSize = 18;

function InventoryScreen() {
    this.topLeft = 0;
    this.topTop = 0;
    this.zindex = inventoryZIndex;
    this.order = 100;
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
    
    this.initializeObjects = function() {
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
        
        for (var i = 0; i < dataStore.characters.length; i++) {
            var newCharacterBox = new CharacterBox(dataStore.characters[i]);
            newCharacterBox.topLeft = 150 - Math.floor(i / 3) * 125;
            newCharacterBox.topTop = 375 + (i % 3) * 65;
            newCharacterBox.index = 0;
            newCharacterBox.isEquipped = true;
            this.characterBoxes.push(newCharacterBox);
            
            var newItemBox = new ItemBox(dataStore.characters[i].weapon);
            newItemBox.topLeft = newCharacterBox.topLeft + 60;
            newItemBox.topTop = newCharacterBox.topTop + 10;
            newItemBox.index = 0;
            newItemBox.isEquipped = true;
            this.itemBoxes.push(newItemBox);
        }
    }
    
    this.deInitializeObjects = function() {
        for (var i = 0; i < this.characterBoxes.length; i++) {
            ai.removeObject(this.characterBoxes[i]);
            graphics.removeObject(this.characterBoxes[i]);
        }
        this.characterBoxes = [];
        
        for (var i = 0; i < this.itemBoxes.length; i++) {
            ai.removeObject(this.itemBoxes[i]);
            graphics.removeObject(this.itemBoxes[i]);
        }
        this.itemBoxes = [];
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
    this.initializeObjects();
    graphics.addObject(this);
    ai.addObject(this);
}