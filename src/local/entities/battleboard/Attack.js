
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
    } else if (this.weaponProps.type === "magic ball") {
        this.topTop -= 5;
        ticksToLand = 32;
        ticksToLive = 64;
        this.spriteProps = this.weaponProps.ammoProps.spriteProps;
    }
    
    this.draw = function() {
        if (this.ticksAlive < ticksToLand) {
            var rotation;
            if (this.weaponProps.type === "melee") {
                rotation = ((this.ticksAlive / (ticksToLand)) + 0.33) * 360 * Math.PI / 180;
            } else {
                rotation = 45 * Math.PI / 180;
            }
            graphics.drawSpriteRotated(
                this.spriteProps,
                0,
                rotation,
                this.topLeft,
                this.topTop);
        } else if (this.ticksAlive === ticksToLand && gameBoard.state !== "Game Over") {
            audio.playSoundAsync(this.weaponProps.sound);
        }
    }
    
    this.doActions = function() {
        if (gameBoard.state !== "Game Over") {
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
    
    // d = vt + (att) / 2
    // a = (d - vt) 2 /  tt
    this.calculateArc = function() {
        var verticalDistance = (this.target.topTop + 10) - this.topTop;
        var horizontalDistance = (this.target.topLeft + 20) - this.topLeft;
        
        this.horizontalSpeed = horizontalDistance / ticksToLand;

        if (this.weaponProps.type === "melee") {
            var verticalTarget = this.topTop - 30;
            if (this.target.topTop < this.topTop) {
                verticalTarget = this.target.topTop - 30;
            }
            var tempVerticalDistance = verticalTarget - this.topTop;
            this.verticalSpeed = tempVerticalDistance / (ticksToLand / 3);
            this.verticalAccel = (verticalDistance - (this.verticalSpeed * ticksToLand)) * 2 / (ticksToLand * ticksToLand);
        } else if (this.weaponProps.type === "thrown") {
            this.verticalSpeed = verticalDistance / ticksToLand;
        } else if (this.weaponProps.type === "shooter") {
            this.verticalSpeed = verticalDistance / ticksToLand;
        } else if (this.weaponProps.type === "magic ball") {
            this.verticalSpeed = verticalDistance / ticksToLand;
        }
    }
    
    this.calculateArc();
    
    graphics.addObject(this);
    ai.addObject(this);
}