function BlastAttack(attackProps) {
    this.zindex = attackZIndex;
    this.id = "BlastAttack" + GetGuid();
    
    this.topLeft = attackProps.topLeft;
    this.topTop = attackProps.topTop;
    this.image = document.getElementById(attackProps.image);
    this.damage = attackProps.damage;
    this.targetList = attackProps.targetList;
    this.sound = attackProps.sound;
    
    this.ticksAlive = 0;
    
    var ticksToLive = 32;
    
    this.draw = function() {
        graphics.setGlobalAlpha(this.ticksAlive / ticksToLive);
        graphics.drawImage(this.image, this.topLeft, this.topTop);
        graphics.setGlobalAlpha(1);
    }
    
    this.doActions = function() {
        if (this.ticksAlive === ticksToLive) {
            //audio.playSound(this.sound);
            for (var i = 0; i < this.targetList.length; i++) {
                this.targetList[i].health -= this.damage;
            }
            ai.removeObject(this);
            graphics.removeObject(this);
        }
        this.ticksAlive++;
    }
    
    for (var i = 0; i < this.targetList.length; i++) {
        this.targetList[i].tempDamage += this.damage;
    }
    
    ai.addObject(this);
    graphics.addObject(this);
}