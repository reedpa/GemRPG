
function Character(characterData) {
    this.zindex = characterZIndex;
    this.index = characterData.index;
    //this.image = docucharacterData.image;
    //this.image = document.getElementById("characters");
    this.spriteProps = characterData.spriteProps;
    this.health = characterData.health;
    this.maxHealth = characterData.health;
    this.actionMax = characterData.actionMax;
    this.actionDamage = characterData.actionDamage;
    this.gemAffinity = characterData.gemAffinity;
    this.damageMultiplier = characterData.damageMultiplier;
    this.actionTimer = 0;
    this.attacks = [];
    this.ticksAlive = 0;
    
    this.topLeft = 100 - 50 * Math.floor(this.index / 3);
    this.topTop = 75 + ((30 + 30) * (this.index % 3));
    
    this.draw = function() {
        if (this.health > 0) {
            //graphics.setFillStyle(this.image); //temporary until I have actual art assets
            //graphics.fillRect(this.topLeft, this.topTop, 30, 30);
            graphics.drawSprite(
                this.spriteProps, 
                Math.floor(this.ticksAlive/10) % (this.spriteProps.frames - 1), 
                this.topLeft, this.topTop);
            //graphics.drawClippedImage(this.image, 0, 0, 32, 32, this.topLeft, this.topTop);
            
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
        if (gameBoard.state === "playing") {
            this.ticksAlive++;
            if (this.actionTimer <= this.actionMax) {
                this.actionTimer += 1;
            } else {
                this.attacks.push(this.actionDamage);
                this.actionTimer = 0;
            }
            
            for (var i = 0; i < this.attacks.length; i++) {
                this.pickTarget(this.attacks[i]);
            }
            
            this.attacks = [];
        }
    }
    
    this.pickTarget = function(damage) {
        var target;
        for (var j = gameBoard.enemies.length - 1; j >= 0 ; j--) {
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