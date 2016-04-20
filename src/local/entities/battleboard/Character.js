
function Character(characterData) {
    this.zindex = characterZIndex;
    this.index = characterData.index;
    this.image = characterData.image;
    this.health = characterData.health;
    this.maxHealth = characterData.health;
    this.actionMax = characterData.actionMax;
    this.gemAffinity = characterData.gemAffinity;
    this.damageMultiplier = characterData.damageMultiplier;
    this.actionTimer = 0;
    this.attacks = [];
    
    this.topLeft = 100 - 50 * Math.floor(this.index / 3);
    this.topTop = 75 + ((30 + 30) * (this.index % 3));
    
    this.draw = function() {
        if (this.health > 0) {
            graphics.setFillStyle(this.image); //temporary until I have actual art assets
            graphics.fillRect(this.topLeft, this.topTop, 30, 30);
            
            //action bar
            graphics.setFillStyle("blue");
            var fillLength = Math.ceil(this.actionTimer / this.actionMax * 30);
            graphics.fillRect(this.topLeft, this.topTop + 32, fillLength, 5);
            
            //action bar border
            graphics.setLineWidth(1);
            graphics.setStrokeStyle("black");
            graphics.strokeRect(this.topLeft, this.topTop + 32, 30, 5);
        }
    }
    
    this.doActions = function() {
        if (this.actionTimer <= this.actionMax) {
            this.actionTimer += 1;
        } else {
            this.actionTimer = 0;
        }
        
        for (var i = 0; i < this.attacks.length; i++) {
            this.pickTarget(this.attacks[i]);
        }
        
        this.attacks = [];
    }
    
    this.pickTarget = function(damage) {
        var target;
        for (var j = 0; j < gameBoard.enemies.length; j++) {
            if (gameBoard.enemies[j].maxHealth - gameBoard.enemies[j].tempDamage > 0) {
                target = gameBoard.enemies[j];
            }
        }
        if (target) {
            target.tempDamage += damage;
        
            var attackProps = {
                topLeft: this.topLeft + 30,
                topTop: this.topTop,
                image: this.image,
                target: target,
                damage: damage
            }
            var attack = new Attack(attackProps);
        }
    }
    
    ai.addObject(this);
    graphics.addObject(this);
}