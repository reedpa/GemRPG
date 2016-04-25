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
    this.characterPage = 0;
    
    var inventoryPageLeft = {topLeft: 320, topTop: 80, width: 20, height: 20};
    var inventoryPageRight = {topLeft: 320, topTop: 100, width: 20, height: 20};
    
    var characterPageLeft = {topLeft: 320, topTop: 250, width: 20, height: 20 };
    var characterPageRight = {topLeft: 320, topTop: 270, width: 20, height: 20 };
    
    this.grabbedThing = null;
    
    this.itemBoxes = [];
    this.characterBoxes = [];
    
    this.initializeObjects = function() {
        for (var i = 0; i < this.items.length; i++) {
            var newItemBox = new ItemBox(this.items[i]);
            newItemBox.topLeft = (i % 6 ) * inventoryBoxWidth + 5;
            newItemBox.topTop = top = (Math.floor( i / 6 ) % 3) * inventoryBoxHeight + 5;
            newItemBox.index = i;
            this.itemBoxes.push(newItemBox);
        }
        
        for (var i = 0; i < this.characters.length; i++) {
            var newCharacterBox = new CharacterBox(this.characters[i]);
            newCharacterBox.topLeft = (i % 6 ) * inventoryBoxWidth + 5;
            newCharacterBox.topTop = ( Math.floor( i/ 6) % 3 ) * inventoryBoxHeight + 175;
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
    
    this.dropAndReInitialize = function() {
        this.grabbedThing.grabbed = false;
        this.grabbedThing = null;
        this.deInitializeObjects();
        this.initializeObjects();
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
        
        
        if (this.itemPage > 0) {
            graphics.setFillStyle("blue");
            graphics.fillRect(inventoryPageLeft.topLeft, inventoryPageLeft.topTop, inventoryPageLeft.width, inventoryPageLeft.height);
        }
        if (this.itemBoxes.length - this.itemPage > inventoryItemPageSize) {
            graphics.setFillStyle("green");
            graphics.fillRect(inventoryPageRight.topLeft, inventoryPageRight.topTop, inventoryPageRight.width, inventoryPageRight.height);
        }
        
        if (this.characterPage > 0) {
            graphics.setFillStyle("blue");
            graphics.fillRect(characterPageLeft.topLeft, characterPageLeft.topTop, characterPageLeft.width, characterPageLeft.height);
        }
        if (this.characterBoxes.length - this.characterPage > inventoryCharacterPageSize) {
            graphics.setFillStyle("green");
            graphics.fillRect(characterPageRight.topLeft, characterPageRight.topTop, characterPageRight.width, characterPageRight.height);
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
            } else if (physics.mouseIsInside(inventoryPageRight)) {
                if (this.itemBoxes.length - this.itemPage > inventoryItemPageSize) {
                    this.itemPage += inventoryItemPageSize;
                }
            } else if (physics.mouseIsInside(inventoryPageLeft)) {
                if (this.itemPage > 0) {
                    this.itemPage -= inventoryItemPageSize;
                }
            } else if (physics.mouseIsInside(characterPageRight)) {
                if (this.characterBoxes.length - this.characterPage > inventoryCharacterPageSize) {
                    this.characterPage += inventoryCharacterPageSize;
                }
            } else if (physics.mouseIsInside(characterPageLeft)) {
                if (this.characterPage > 0) {
                    this.characterPage -= inventoryCharacterPageSize;
                }
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