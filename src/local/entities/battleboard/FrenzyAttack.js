function FrenzyAttack(frenzyProps) {
    this.frenzyProps = frenzyProps;
    
    this.target = frenzyProps.target;
    
    this.topLeft = this.target.topLeft;
    this.topTop = this.target.topTop;
    
    this.zindex = attackZIndex;
    this.order = attackZIndex;
    this.id = "FrenzyAttack" + GetGuid();
    
    this.ticksToLive = frenzyProps.ticksToLive;
    
    var iconSpriteProps = {
            sheetName: "items",
            leftIndex: 13,
            topIndex: 75,
            spriteSize: 16,
            frames: 1
        };
    
    this.draw = function() {
        //action bar
        graphics.setFillStyle("red");
        graphics.fillRect(this.topLeft, this.topTop + 40, 30, 5);
        //action bar border
        graphics.setLineWidth(1);
        graphics.setStrokeStyle("black");
        graphics.strokeRect(this.topLeft, this.topTop + 40, 30, 5);

        graphics.drawSprite(iconSpriteProps, 0, this.topLeft, this.topTop + 25);
    }
    
    this.doActions = function() {
        this.ticksToLive--;
        if (this.ticksToLive <= 0) {
            ai.removeObject(this);
            graphics.removeObject(this);
        } else {
            this.target.pickTarget(basicDamage, true);
            this.target.pickTarget(basicDamage, true);
            this.target.lastAttackCountDown = 25;
        }
    }
    
    ai.addObject(this);
    graphics.addObject(this);
}