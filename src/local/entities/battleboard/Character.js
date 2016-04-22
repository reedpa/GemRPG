
function Character(characterData) {
    this.zindex = characterZIndex;
    this.index = characterData.index;
    //this.image = docucharacterData.image;
    //this.image = document.getElementById("characters");
    this.spriteProps = characterData.spriteProps;
    this.weaponProps = characterData.weapon;
    this.health = characterData.health;
    this.maxHealth = characterData.health;
    this.actionMax = characterData.actionMax;
    this.actionDamage = characterData.actionDamage;
    this.gemAffinity = characterData.gemAffinity;
    this.damageMultiplier = characterData.damageMultiplier;
    this.actionTimer = 0;
    this.attacks = [];
    this.ticksAlive = Math.floor(Math.random() * this.spriteProps.frames) * 10;
    
    this.lastAttackCountDown = 0;
    
    this.topLeft = 100 - 75 * Math.floor(this.index / 3);
    this.topTop = 50 + ((30 + 45) * (this.index % 3));
    
    this.draw = function() {
        if (this.health > 0) {
            graphics.drawSprite(
                this.spriteProps, 
                Math.floor(this.lastAttackCountDown / this.spriteProps.frames), 
                this.topLeft + this.lastAttackCountDown, 
                this.topTop);
            if (this.lastAttackCountDown === 0 || this.weaponProps.type === "shooter") {
                graphics.drawSprite(
                    this.weaponProps.spriteProps,
                    0,
                    this.topLeft + this.lastAttackCountDown + 28,
                    this.topTop + 10
                );
            }
            
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
                this.lastAttackCountDown = 16;
            }

            this.attacks = [];
        }
        
        if (this.lastAttackCountDown > 0) {
            this.lastAttackCountDown--;
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
                damage: damage,
                weaponProps: this.weaponProps
            }
            var attack = new Attack(attackProps);
        }
    }
    
    ai.addObject(this);
    graphics.addObject(this);
}