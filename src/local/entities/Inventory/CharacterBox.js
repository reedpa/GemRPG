function CharacterBox(characterProps) {
    
    this.characterProps = characterProps;
    this.spriteProps = characterProps.spriteProps;
    this.id = "CharacterBox_" + GetGuid();
    this.index = 0;
    this.zindex = inventoryBoxZIndex;
    
    this.width = 50;
    this.height = 50;
    
    this.mouseTicks = 0;
    this.grabbed = false;
    
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
    }
    
    this.isInView = function() {
        return this.index - inventoryScreen.characterPage < inventoryCharacterPageSize;
    }
    
    ai.addObject(this);
    graphics.addObject(this);
}