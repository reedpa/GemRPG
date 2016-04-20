
function Attack(attackProps) {
    this.zindex = attackZIndex;
    this.topLeft = attackProps.topLeft;
    this.topTop = attackProps.topTop;
    this.image = attackProps.image;
    this.target = attackProps.target;
    this.damage = attackProps.damage;

    this.horizontalSpeed = 0;
    this.verticalSpeed = 0;
    this.verticalAccel = -1;
    this.ticksAlive = 0;
    this.id = "attackId" + (Math.random() * 100000).toString();
    
    var ticksToLand = 32;
    var ticksToLive = 64;
    
    this.draw = function() {
        if (this.ticksAlive < ticksToLand) {
            graphics.setFillStyle("black");
            graphics.fillRect(this.topLeft, this.topTop, 5, 5);
        } else {
            var fontModifier = ((this.ticksAlive - 32) / 2);
            var fontSize = 10 + fontModifier;
            graphics.setFont(fontSize, "Arial");
            graphics.setFillStyle("white");
            graphics.fillText(this.damage.toString(), this.target.topLeft - fontModifier, this.target.topTop);
        }
    }
    
    this.doActions = function() {
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
    
    this.calculateArc = function() {
        var verticalDistance = this.topTop - this.target.topTop;
        var horizontalDistance = -1 * (this.topLeft - this.target.topLeft);
        
        this.horizontalSpeed = horizontalDistance / ticksToLand;
        this.verticalSpeed = -1 * Math.abs(this.horizontalSpeed);
        this.verticalAccel = -1 * ((this.verticalSpeed + (verticalDistance / ticksToLand)) / (ticksToLand / 2));
    }
    
    this.calculateArc();
    
    graphics.addObject(this);
    ai.addObject(this);
}