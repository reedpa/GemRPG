function BlastAttack(attackProps) {
    this.zindex = attackZIndex;
    this.id = "BlastAttack" + GetGuid();
    
    this.topLeft = attackProps.topLeft;
    this.topTop = attackProps.topTop;
    this.image = document.getElementById(attackProps.image);
    this.damage = attackProps.damage;
    this.targetList = attackProps.targetList;
    this.sound = attackProps.sound;
    this.type = attackProps.infusionType;
    this.gemAffinity = attackProps.gemAffinity;
    
    this.explosionSpriteProps = {
        sheetName: "explosion_" + this.gemAffinity,
        leftIndex: 0,
        topIndex: 0,
        spriteSize: 32,
        frames: 7
    };
    
    this.ticksAlive = 0;
    
    this.explosions = [];
    
    var ticksToLive = 32;
    
    this.draw = function() {
        if (this.type !== "blast") {
            graphics.setGlobalAlpha(this.ticksAlive / ticksToLive);
            graphics.drawImage(this.image, this.topLeft, this.topTop);
            graphics.setGlobalAlpha(1);
        } else {
            for (var i = 0; i < this.explosions.length; i++) {
                if (this.explosions[i].ticksToLive >= 0) {
                    graphics.drawSprite(
                        this.explosionSpriteProps,
                        7 - this.explosions[i].ticksToLive,
                        this.topLeft + this.explosions[i].topLeft,
                        this.topTop + this.explosions[i].topTop
                    );
                }
            }
        }
    }
    
    this.doActions = function() {
        if (this.type === "blast") {
            for (var i = 0; i < this.explosions.length; i++) {
                this.explosions[i].ticksToLive--;
            }
            var numExplosionsThisTurn = Math.floor(Math.random() * 10);
            for (var i = 0; i < numExplosionsThisTurn; i++) {
                var explosionProps = {
                    topLeft: Math.floor(Math.random() * 300),
                    topTop: Math.floor(Math.random() * 250),
                    ticksToLive: 7
                };
                this.explosions.push(explosionProps);
            }
        }
        if (this.ticksAlive === ticksToLive) {
            //audio.playSound(this.sound);
            for (var i = 0; i < this.targetList.length; i++) {
                if (this.type !== "stun") {
                    this.targetList[i].health -= this.damage;
                } else {
                    this.targetList[i].actionTimer -= this.damage;
                }
            }
            ai.removeObject(this);
            graphics.removeObject(this);
        }
        this.ticksAlive++;
    }
    
    if (this.type !== "stun") {
        for (var i = 0; i < this.targetList.length; i++) {
            this.targetList[i].tempDamage += this.damage;
        }
    }
    
    ai.addObject(this);
    graphics.addObject(this);
}