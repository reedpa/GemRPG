function Haste(hasteProps) {
    this.hasteProps = hasteProps;
    
    this.targetList = hasteProps.targetList;
    
    this.zindex = attackZIndex;
    this.order = attackZIndex;
    this.ticksToLive = hasteProps.ticksToLive;
    this.id = "Haste" + GetGuid();
    
    var hasteSpriteProps = {
        sheetName: "items",
        leftIndex: 13,
        topIndex: 75,
        spriteSize: 16,
        frames: 1
    }
    
    this.draw = function() {
        for (var i = 0; i < this.targetList.length; i++) {
            graphics.drawSprite(hasteSpriteProps, 0, this.targetList[i].topLeft + 5, this.targetList[i].topTop + 25);
        }
    }
    
    this.doActions = function() {
        this.ticksToLive--;
        
        if (this.ticksToLive >= 0) {
            for (var i = 0; i < this.targetList.length; i++) {
                this.targetList[i].actionTimer += 2;
            }
        } else {
            graphics.removeObject(this);
            ai.removeObject(this);
        }
        
    }
    
    graphics.addObject(this);
    ai.addObject(this);
}