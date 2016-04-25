function ItemBox(itemProps) {
    this.itemProps = itemProps;
    this.spriteProps = itemProps.spriteProps;
    this.id = "ItemBox_" + GetGuid();
    this.index = 0;
    this.zindex = inventoryBoxZIndex;
    
    this.width = 50;
    this.height = 50;
    
    this.grabbed = false;
    
    this.draw = function() {
        if (this.isInView()) {
            graphics.setStrokeStyle("grey");
            
            graphics.strokeRect(this.topLeft,
                this.topTop,
                inventoryBoxWidth,
                inventoryBoxHeight);
                
            if (!inventoryScreen.grabbedThing || 
                (inventoryScreen.grabbedThing && inventoryScreen.grabbedThing.id !== this.id)) {
                graphics.drawSprite(this.itemProps.spriteProps, 0, this.topLeft + 5, this.topTop + 5);
            }
            
            graphics.setFillStyle("white");
            if (physics.mouseIsInside(this)) {
                graphics.setFillStyle("gold");
            }
            graphics.setFont(10, "Arial");
            if (this.itemProps.subType && this.itemProps.subType === "healing") {
                graphics.fillText("Hel " + this.itemProps.damageModifier * basicDamage * -1, this.topLeft + 2, this.topTop + 30);
            } else {
                graphics.fillText("Dam " + this.itemProps.damageModifier * basicDamage, this.topLeft + 2, this.topTop + 30);
            }
            graphics.fillText("Swg " + this.itemProps.speedModifier.toString(), this.topLeft + 2, this.topTop + 40);
        }
    }
    
    this.doActions = function() {
        if (mouseCameDown && this.isInView()) {
            if (physics.mouseIsInside(this)) {
                inventoryScreen.grabbedThing = this;
                this.grabbed = true;
            }
        }
    }
    
    this.isInView = function() {
        return this.index - inventoryScreen.itemPage < inventoryItemPageSize;
    }
    
    ai.addObject(this);
    graphics.addObject(this);
}