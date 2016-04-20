function Enemy(enemyProps) {
    this.image = enemyProps.image;
    this.health = enemyProps.health;
    this.maxHealth = enemyProps.health;
    this.tempDamage = 0;
    this.index = enemyProps.index;
    this.zindex = enemyZIndex;
    this.actionMax = enemyProps.actionMax;
    this.actionTimer = 0;
    
    this.topLeft = 225;
    this.topTop = 75 + ((30 + 30) * this.index);
    
    this.draw = function() {
        if (this.health > 0) {
            graphics.setFillStyle(this.image); //temporary until I have actual art assets
            graphics.fillRect(this.topLeft, this.topTop, 30, 30);
            
            //health bar
            graphics.setFillStyle("green");
            var fillLength = Math.ceil(this.health / this.maxHealth * 30);
            graphics.fillRect(this.topLeft, this.topTop + 32, fillLength, 5);
            //health bar border
            graphics.setLineWidth(1);
            graphics.setStrokeStyle("black");
            graphics.strokeRect(this.topLeft, this.topTop + 32, 30, 5);
            
            //action bar
            graphics.setFillStyle("blue");
            fillLength = Math.ceil(this.actionTimer / this.actionMax * 30);
            graphics.fillRect(this.topLeft, this.topTop + 40, fillLength, 5);
            //action bar border
            graphics.setLineWidth(1);
            graphics.setStrokeStyle("black");
            graphics.strokeRect(this.topLeft, this.topTop + 40, 30, 5);
        }
    }
    
    this.doActions = function() {
        if (this.actionTimer <= this.actionMax) {
            this.actionTimer += 1;
        } else {
            this.actionTimer = 0;
        }
    }
    
    ai.addObject(this);
    graphics.addObject(this);
}