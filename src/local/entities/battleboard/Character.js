
function Character(characterData) {
    this.type = characterData.type;
    this.zindex = characterZIndex;
    this.index = characterData.index;
    this.spriteProps = characterData.spriteProps;
    this.weaponProps = characterData.weapon;
    this.health = characterData.health;
    this.maxHealth = characterData.health;
    this.lastHealth = characterData.health;
    this.tempDamage = 0;
    this.actionMax = characterData.actionMax;
    this.actionDamage = characterData.actionDamage;
    this.gemAffinity = characterData.gemAffinity;
    this.damageMultiplier = characterData.damageMultiplier;
    this.actionTimer = 0 + Math.floor(Math.random() * this.actionMax / 2);
    this.attacks = [];
    this.ticksAlive = Math.floor(Math.random() * this.spriteProps.frames) * 10;
    
    this.lastAttackCountDown = 0;
    
    this.topLeft = characterData.fieldStart - 75 * Math.floor(this.index / 3);
    this.topTop = 50 + ((30 + 45) * (this.index % 3));
    
    this.draw = function() {
        var spriteProps = deathSprite;

        if (this.health > 0) {
            spriteProps = this.spriteProps;
            if (gameBoard.infusion[this.gemAffinity] > 0) {
                var infusion = gameBoard.infusion[this.gemAffinity];
                graphics.setGlobalAlpha(Math.min(infusion / 1000, 1));
                graphics.drawCircle(this.gemAffinity, this.topLeft + 16, this.topTop + 16, 40);
                graphics.setGlobalAlpha(1);
            }

            if ( (this.lastAttackCountDown === 0 || this.weaponProps.type === "shooter") 
                && (this.weaponProps.type !== "magic ball")) {
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
        
        var topLeftModifier;
        this.type === "character" ? topLeftModifier = this.lastAttackCountDown : topLeftModifier = (-1 * this.lastAttackCountDown);
        graphics.drawSprite(
            spriteProps, 
            Math.floor(this.lastAttackCountDown / this.spriteProps.frames) % this.spriteProps.frames, 
            this.topLeft + topLeftModifier, 
            this.topTop);
    }
    
    this.doActions = function() {
        if (gameBoard.state !== "Game Over" && this.health > 0) {
            if (this.health !== this.lastHealth) {
                var leftOffset = Math.random() * 50 - 25;
                var topOffset = Math.random() * 50 - 25;
                var damageBounceProps = {
                    damage: this.lastHealth - this.health,
                    topLeft: this.topLeft + leftOffset,
                    topTop: this.topTop + topOffset
                };
                var damageBounce = new DamageBounce(damageBounceProps);
            }
            this.lastHealth = this.health;
            
            this.ticksAlive++;
            if (this.actionTimer <= this.actionMax) {
                this.actionTimer += 1;
            } else {
                this.attacks.push(this.actionDamage);
                this.actionTimer = 0;
            }
            
            for (var i = 0; i < this.attacks.length; i++) {
                this.pickTarget(this.attacks[i]);
                this.lastAttackCountDown = 25;
            }

            this.attacks = [];
        }
        
        if (this.lastAttackCountDown > 0) {
            this.lastAttackCountDown--;
        }
    }
    
    this.pickTarget = function(damage) {
        var target;
        var targetList;
        if (this.type === "character") {
            targetList = gameBoard.enemies;
        } else {
            targetList = gameBoard.characters;
        }
        for (var j = targetList.length - 1; j >= 0 ; j--) {
            if (targetList[j].maxHealth - targetList[j].tempDamage > 0) {
                target = targetList[j];
            }
        }
        if (target) {
            damage = damage + gameBoard.infusion[this.gemAffinity];
            target.tempDamage += damage;
            var topLeftModifier;
            this.type === "character" ? topLeftModifier = 30 : topLeftModifier = 0;
            var attackProps = {
                topLeft: this.topLeft + topLeftModifier,
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