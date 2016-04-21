function Enemy(enemyProps) {
    this.image = enemyProps.image;
    this.health = enemyProps.health;
    this.maxHealth = enemyProps.health;
    this.lastHealth = enemyProps.health;
    this.tempDamage = 0;
    this.index = enemyProps.index;
    this.zindex = enemyZIndex;
    this.actionMax = enemyProps.actionMax;
    this.actionTimer = 0;
    this.lastDamageBounce = -1;
    
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
        if (gameBoard.state === "playing") {
            if (this.health !== this.lastHealth) {
                var leftOffset = Math.random() * 50 - 25;
                var topOffset = Math.random() * 50 - 25;
                var damageBounceProps = {
                    damage: this.lastHealth - this.health,
                    topLeft: this.topLeft + leftOffset,
                    topTop: this.topTop + topOffset
                };
                var damageBounce = new DamageBounce(damageBounceProps);
                //var timeToWait = Math.max(0, (30 - this.lastDamageBounce) * 16);
                //window.setTimeout(this.createDamageBounce, timeToWait, damageBounceProps);
                //this.lastDamageBounce = 0;
            }
            this.lastHealth = this.health;
            this.lastDamageBounce++;

            if (this.actionTimer <= this.actionMax) {
                this.actionTimer += 1;
            } else {
                this.actionTimer = 0;
            }
        }
    }
    
    this.createDamageBounce = function (damageBounceProps) {
        var damageBounce = new DamageBounce(damageBounceProps);
    }
    
    ai.addObject(this);
    graphics.addObject(this);
}