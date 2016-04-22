
function Attack(attackProps) {
    this.zindex = attackZIndex;
    this.topLeft = attackProps.topLeft;
    this.topTop = attackProps.topTop;
    this.image = attackProps.image;
    this.target = attackProps.target;
    this.damage = attackProps.damage;
    this.weaponProps = attackProps.weaponProps;
    this.spriteProps = this.weaponProps.spriteProps;

    this.horizontalSpeed = 0;
    this.verticalSpeed = 0;
    this.verticalAccel = 0;
    this.ticksAlive = 0;
    this.id = "attackId" + GetGuid();
    
    var ticksToLand = 16;
    var ticksToLive = 32;
    
    if (this.weaponProps.type === "melee") {
        ticksToLand = 32;
        ticksToLive = 64;
    } else if (this.weaponProps.type === "thrown") {
        this.topTop += 10;
    } else if (this.weaponProps.type === "shooter") {
        this.topLeft -= 5;
        this.topTop -= 5;
        this.spriteProps = this.weaponProps.ammoProps.spriteProps;
    }
    
    this.draw = function() {
        if (this.ticksAlive < ticksToLand) {
            var rotation;
            if (this.weaponProps.type === "melee") {
                rotation = ((this.ticksAlive / (ticksToLand)) + 0.33) * 360 * Math.PI / 180;
            } else {
                rotation = 0.13 * 360 * Math.PI / 180;
            }
            graphics.drawSpriteRotated(
                this.spriteProps,
                0,
                rotation,
                this.topLeft,
                this.topTop);
        }
    }
    
    this.doActions = function() {
        if (gameBoard.state === "playing") {
            this.topLeft += this.horizontalSpeed;
            this.topTop += this.verticalSpeed;
            this.verticalSpeed += this.verticalAccel;
            this.ticksAlive += 1;
            if (this.ticksAlive === ticksToLand) {
                this.target.health -= this.damage; 
            } else if (this.ticksAlive > ticksToLive) {
                ai.removeObject(this);
                graphics.removeObject(this);
            }
        }
    }
    
    this.calculateArc = function() {
        var verticalDistance = this.topTop - (this.target.topTop + 10);
        var horizontalDistance = -1 * (this.topLeft - (this.target.topLeft + 20));
        
        this.horizontalSpeed = horizontalDistance / ticksToLand;

        if (this.weaponProps.type === "melee") {
            this.verticalSpeed = -1 * Math.abs(this.horizontalSpeed);
            this.verticalAccel = -1 * ((this.verticalSpeed + (verticalDistance / ticksToLand)) / (ticksToLand / 2));
        } else if (this.weaponProps.type === "thrown") {
            this.verticalSpeed = -1 * verticalDistance / ticksToLand;
        } else if (this.weaponProps.type === "shooter") {
            this.verticalSpeed = -1 * verticalDistance / ticksToLand;
        }
    }
    
    this.calculateArc();
    
    graphics.addObject(this);
    ai.addObject(this);
}