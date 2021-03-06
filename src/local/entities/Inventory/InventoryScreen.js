var inventoryBoxWidth = 50;
var inventoryBoxHeight = 50;
var inventoryItemPageSize = 18;
var inventoryCharacterPageSize = 12;

var detailsBox = null;

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
    
    var inventoryPageLeft = {image: document.getElementById("leftarrow"), topLeft: 320, topTop: 80, width: 20, height: 20};
    var inventoryPageRight = {image: document.getElementById("rightarrow"), topLeft: 320, topTop: 100, width: 20, height: 20};
    
    var characterPageLeft = {image: document.getElementById("leftarrow"),topLeft: 320, topTop: 210, width: 20, height: 20 };
    var characterPageRight = {image: document.getElementById("rightarrow"), topLeft: 320, topTop: 230, width: 20, height: 20 };
    
    this.grabbedThing = null;
    
    this.itemBoxes = [];
    this.characterBoxes = [];
    
    this.initializeObjects = function() {
        this.items = dataStore.inventory.items;
        this.characters = dataStore.inventory.characters;
        for (var i = 0; i < this.items.length; i++) {
            var newItemBox = new ItemBox(this.items[i]);
            newItemBox.topLeft = (i % 6 ) * inventoryBoxWidth + 5;
            newItemBox.topTop = top = (Math.floor( i / 6 ) % 3) * inventoryBoxHeight + 5;
            newItemBox.index = i;
            newItemBox.zindex += i;
            this.itemBoxes.push(newItemBox);
        }
        
        for (var i = 0; i < this.characters.length; i++) {
            var newCharacterBox = new CharacterBox(this.characters[i]);
            newCharacterBox.topLeft = (i % 6 ) * inventoryBoxWidth + 5;
            newCharacterBox.topTop = ( Math.floor( i/ 6) % 2 ) * inventoryBoxHeight + 175;
            newCharacterBox.index = i; 
            newCharacterBox.zindex += i;
            this.characterBoxes.push(newCharacterBox); 
        }
        
        for (var i = 0; i < dataStore.characters.length; i++) {
            var newCharacterBox = new CharacterBox(dataStore.characters[i]);
            newCharacterBox.topLeft = 80 - Math.floor(i / 3) * 65;
            newCharacterBox.topTop = 285 + (i % 3) * 120;
            newCharacterBox.index = 0;
            newCharacterBox.isEquipped = true;
            this.characterBoxes.push(newCharacterBox);
            
            var newItemBox = new ItemBox(dataStore.characters[i].weapon);
            newItemBox.topLeft = newCharacterBox.topLeft + 10;
            newItemBox.topTop = newCharacterBox.topTop + 55;
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
        if (this.grabbedThing) {
            this.grabbedThing.grabbed = false;
            this.grabbedThing = null;
        }
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
            var jiggle = physics.mouseIsInside(inventoryPageLeft) ? 1 : 0;
            graphics.drawImage(inventoryPageLeft.image, inventoryPageLeft.topLeft + jiggle, inventoryPageLeft.topTop + jiggle, inventoryPageLeft.width, inventoryPageRight.height);
        }
        if (this.itemBoxes.length - 6 /*the "wielded" area*/ - this.itemPage > inventoryItemPageSize) {
            var jiggle = physics.mouseIsInside(inventoryPageRight) ? 1 : 0;
            graphics.drawImage(inventoryPageRight.image, inventoryPageRight.topLeft + jiggle, inventoryPageRight.topTop + jiggle, inventoryPageRight.width, inventoryPageRight.height);
        }
        
        if (this.characterPage > 0) {
            var jiggle = physics.mouseIsInside(characterPageLeft) ? 1 : 0;
            graphics.drawImage(characterPageLeft.image, characterPageLeft.topLeft + jiggle, characterPageLeft.topTop + jiggle, characterPageLeft.width, characterPageLeft.height);
        }
        if (this.characterBoxes.length - 6 /*the "wielded" area*/ - this.characterPage > inventoryCharacterPageSize) {
            var jiggle = physics.mouseIsInside(characterPageRight) ? 1 : 0;
            graphics.drawImage(characterPageRight.image, characterPageRight.topLeft + jiggle, characterPageRight.topTop + jiggle, characterPageRight.width, characterPageRight.height);
        }
        
        graphics.setFont(25, "Arial");
        graphics.setFillStyle("white");
        
        graphics.fillText("Gold: " + dataStore.gold.toString(), detailsBox.topLeft, detailsBox.topTop - 30);
        graphics.fillText("XP: " + dataStore.xp.toString(), detailsBox.topLeft, detailsBox.topTop - 5);
        
    }
    
    
    this.doActions = function() {
        if (mouseCameDown) {
            if (physics.mouseIsInside({topLeft: 330, topTop: 0, width: 30, height: 30})) {
                audio.stopSound(this.music);
                audio.playSound("buttonclick");
                ResetAllObjects();
                walkabout = new Walkabout(dataStore.lastWalkabout);
                player.topLeft = dataStore.lastLeft;
                player.targetLeft = dataStore.lastLeft;
                player.topTop = dataStore.lastTop;
                player.targetTop = dataStore.lastTop;
            } else if (physics.mouseIsInside(inventoryPageRight)) {
                if (this.itemBoxes.length - this.itemPage > inventoryItemPageSize) {
                    audio.playSound("buttonclick");
                    this.itemPage += inventoryItemPageSize;
                }
            } else if (physics.mouseIsInside(inventoryPageLeft)) {
                if (this.itemPage > 0) {
                    audio.playSound("buttonclick");
                    this.itemPage -= inventoryItemPageSize;
                }
            } else if (physics.mouseIsInside(characterPageRight)) {
                if (this.characterBoxes.length - this.characterPage > inventoryCharacterPageSize) {
                    audio.playSound("buttonclick");
                    this.characterPage += inventoryCharacterPageSize;
                }
            } else if (physics.mouseIsInside(characterPageLeft)) {
                if (this.characterPage > 0) {
                    audio.playSound("buttonclick");
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
    detailsBox = new DetailsBox();
    graphics.addObject(this);
    ai.addObject(this);
}