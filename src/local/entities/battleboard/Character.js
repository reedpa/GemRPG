
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
    this.actionMax = basicSpeed * this.weaponProps.speedModifier;
    this.gemAffinity = characterData.gemAffinity;
    this.damageMultiplier = characterData.damageMultiplier;
    this.actionTimer = 0 + Math.floor(Math.random() * this.actionMax / 2);
    this.attacks = [];
    this.ticksAlive = Math.floor(Math.random() * this.spriteProps.frames) * 10;
    this.targeted = false;
    
    this.lastAttackCountDown = 0;
    
    this.topLeft = characterData.fieldStart - 75 * Math.floor(this.index / 3);
    this.topTop = 50 + ((30 + 45) * (this.index % 3));
    this.width = this.spriteProps.spriteSize;
    this.height = this.spriteProps.spriteSize;
    
    this.draw = function() {
        var spriteProps = deathSprite;

        if (this.health > 0) {
            spriteProps = this.spriteProps;
            if (gameBoard.infusion[this.gemAffinity] > 0) {
                var infusion = gameBoard.infusion[this.gemAffinity];
                graphics.setGlobalAlpha(Math.min(infusion / 120, 0.8));
                graphics.drawCircle(this.gemAffinity, this.topLeft + 16, this.topTop + 16, spriteProps.spriteSize);
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
            
            if (this.targeted) {
                graphics.drawSprite(
                    targetSprite,
                    Math.floor(this.ticksAlive / 16) % 2,
                    this.topLeft,
                    this.topTop
                )
            }
        }
        
        var topLeftModifier;
        this.type === "character" ? topLeftModifier = this.lastAttackCountDown : topLeftModifier = (-1 * this.lastAttackCountDown);
        graphics.drawSprite(
            spriteProps, 
            Math.abs(Math.floor(this.lastAttackCountDown / this.spriteProps.frames) % this.spriteProps.frames), 
            this.topLeft + topLeftModifier, 
            this.topTop);
    }
    
    this.doActions = function() {
        if (mouseCameDown) {
            if (this.type === "character") {
                this.tryInfusionAttack();
            } else {
                this.tryGettingtargeted();
            }
        }
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
                //this.lastAttackCountDown -= 8;
            }
            this.lastHealth = this.health;
            
            this.ticksAlive++;
            if (this.actionTimer <= this.actionMax) {
                this.actionTimer += 1;
            } else {
                this.attacks.push(basicDamage);
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
    
    this.tryInfusionAttack = function() {
        if (physics.mouseIsInside(this)) {
            if (this.health > 0) {
                if (gameBoard.infusion[this.gemAffinity] > 0) {
                    var attackProps = {
                        topTop: 15,
                        topLeft: 150,
                        damage: gameBoard.infusion[this.gemAffinity] * this.damageMultiplier,
                        targetList: gameBoard.enemies,
                        image: this.gemAffinity + "_blast"
                    }
                    var attack = new BlastAttack(attackProps);
                    gameBoard.infusion[this.gemAffinity] = 0;
                }
            }
        }
    }
    
    this.tryGettingtargeted = function() {
        if (physics.mouseIsInside(this)) {
            if (gameBoard.targetedEnemy !== null) {
                gameBoard.targetedEnemy.targeted = false;
            }
            this.targeted = true;
            gameBoard.targetedEnemy = this;
        }
    }
    
    this.pickTarget = function(damage) {
        var target;
        var targetList = [];
        if (this.type === "character") {
            if (this.weaponProps.subType !== null && this.weaponProps.subType === "healing") {
                targetList = gameBoard.characters;
                targetList.sort((left, right) => {
                    return left.health - right.health;
                });
            } else {
                targetList = gameBoard.enemies;
                if (gameBoard.targetedEnemy !== null) {
                    targetList.splice(0, 0, gameBoard.targetedEnemy);
                }
            }
        } else {
            if (this.weaponProps.subType !== null && this.weaponProps.subType === "healing") {
                targetList = gameBoard.enemies;
                targetList.sort((left, right) => {
                    return left.health - right.health;
                });
            } else {
                for (var i = 0; i < gameBoard.characters.length; i++) {
                    if (gameBoard.characters[i].maxHealth - gameBoard.characters[i].tempDamage > 0) {
                        targetList.push(gameBoard.characters[i]);
                    }
                }
                targetList.sort((a, b) => {
                    return Math.random() - Math.random();
                });
            }
        }
        for (var j = targetList.length - 1; j >= 0 ; j--) {
            if (targetList[j].maxHealth - targetList[j].tempDamage > 0) {
                target = targetList[j];
            }
        }
        if (target) {
            damage = damage + gameBoard.infusion[this.gemAffinity];
            damage = Math.floor(damage * this.weaponProps.damageModifier);
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