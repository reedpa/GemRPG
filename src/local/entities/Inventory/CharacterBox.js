function CharacterBox(characterProps) {
    
    this.characterProps = characterProps;
    this.spriteProps = characterProps.spriteProps;
    this.id = "CharacterBox_" + GetGuid();
    this.index = 0;
    this.order = 0;
    this.zindex = inventoryBoxZIndex;
    
    this.width = 50;
    this.height = 50;
    
    this.mouseTicks = 0;
    this.grabbed = false;
    
    this.isEquipped = false;
    
    this.draw = function() {
        if (this.isInView()) {
            graphics.setStrokeStyle("grey");
            graphics.strokeRect(this.topLeft,
                this.topTop,
                inventoryBoxWidth,
                inventoryBoxHeight);
            graphics.setGlobalAlpha(0.75);
            graphics.drawCircle(this.characterProps.gemAffinity, 
                this.topLeft + 21,
                this.topTop + 21,
                16);
            graphics.setGlobalAlpha(1);
            if (!this.grabbed) {
                graphics.drawSprite(this.characterProps.spriteProps, 
                    Math.floor((this.mouseTicks / 8)) % this.characterProps.spriteProps.frames, 
                    this.topLeft + 5, 
                    this.topTop + 5);
            }
            
            graphics.setFont(8, "Arial");
            graphics.fillText(this.characterProps.id.toString().substring(0, 2), this.topLeft + 40, this.topTop + 45);
        }
    }
    
    this.doActions = function() {
        if (physics.mouseIsInside(this)) {
            this.mouseTicks++;
        } else {
            this.mouseTicks = 0;
        }
        if (mouseCameDown && this.isInView()) {
            if (physics.mouseIsInside(this)) {
                inventoryScreen.grabbedThing = this;
                this.grabbed = true;
            }
        }
        if (mouseCameUp) {
            if (physics.mouseIsInside(this)) {
                if (inventoryScreen.grabbedThing && inventoryScreen.grabbedThing.characterProps !== null) {
                    if (this.isEquipped === true) {
                        var newSpot = -1;
                        var oldSpot = -1;
                        for (var i = 0; i < dataStore.characters.length; i++) {
                            if (dataStore.characters[i].id === this.characterProps.id) {
                                newSpot = i;
                            }
                            if (dataStore.characters[i].id === inventoryScreen.grabbedThing.characterProps.id) {
                                oldSpot = i;
                            }
                        }
                        
                        if (newSpot !== -1) {
                            dataStore.characters[newSpot] = inventoryScreen.grabbedThing.characterProps;
                            dataStore.characters[newSpot].index = newSpot;
                            if (oldSpot !== -1) {
                                dataStore.characters[oldSpot] = this.characterProps;
                                dataStore.characters[oldSpot].index = oldSpot;
                            }
                            inventoryScreen.dropAndReInitialize();
                        }
                    }
                }
            }
        }
    }
    
    this.isInView = function() {
        var pageIndex = this.index - inventoryScreen.characterPage;
        return this.isEquipped || 
            (pageIndex < inventoryCharacterPageSize && pageIndex >= 0);
    }
    
    ai.addObject(this);
    graphics.addObject(this);
}