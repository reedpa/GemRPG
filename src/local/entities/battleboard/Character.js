
function Character(characterData) {
    this.zindex = characterZIndex;
    this.index = characterData.index;
    this.image = characterData.image;
    this.health = characterData.health;
    this.actionMax = characterData.actionMax;
    this.gemAffinity = characterData.gemAffinity;
    this.damageMultiplier = characterData.damageMultiplier;
    this.actionTimer = 0;
    
    this.draw = function() {
        if (this.health > 0) {
            graphics.setFillStyle(this.image); //temporary until I have actual art assets
            graphics.fillRect(100, 75 + ((30 + 30) * this.index), 30, 30);
            
            //action bar
            graphics.setFillStyle("blue");
            var fillLength = Math.ceil(this.actionTimer / this.actionMax * 30);
            graphics.fillRect(100, 75 + ((30 + 30) * this.index + 32), fillLength, 5);
            
            //action bar border
            graphics.setLineWidth(1);
            graphics.setStrokeStyle("black");
            graphics.strokeRect(100, 75 + ((30 + 30) * this.index + 32), 30, 5);
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