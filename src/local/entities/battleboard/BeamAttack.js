function BeamAttack(attackProps) {
    this.zindex = attackZIndex;
    this.order = attackZIndex;
    this.attackProps = attackProps;
    this.target = attackProps.target;
    this.ticksToLive = 32;
    
    this.topLeft = attackProps.topLeft;
    this.topTop = attackProps.topTop;
    
    this.id = "BeamAttack_" + GetGuid();
    this.image = document.getElementById("buttonpurple");
    
    this.distance = 0;
    this.angle = 0;
    this.angleModifier = 1;
    
    this.draw = function() {
        //graphics.drawImage(this.image, this.topLeft, this.topTop + 5, this.target.topLeft - this.topLeft, 20);
        graphics.drawImageRotated(this.image, this.angleModifier * this.angle, this.topLeft, this.topTop, this.distance, 20);
    }
    
    this.doActions = function() {
        this.ticksToLive--;
        if (this.ticksToLive <= 0) {
            this.target.health -= this.attackProps.damage;
            ai.removeObject(this);
            graphics.removeObject(this);
        }
    }
    
    this.calculateTriangle = function() {
        var horizontalDistance = this.target.topLeft - this.topLeft;
        var verticalDistance = this.target.topTop - this.topTop;
        if (verticalDistance === 0) {
            this.distance = horizontalDistance;
            this.angle = 0;
        } else { //time for some trig
            var distanceSquared = horizontalDistance * horizontalDistance + verticalDistance * verticalDistance;
            this.distance = Math.sqrt(distanceSquared);
            var mySin = Math.abs(verticalDistance / this.distance);
            this.angle = Math.asin(mySin);
            
            if (verticalDistance < 0 ) {
                this.angleModifier = -1;
            }
        }
    }
    
    this.calculateTriangle();
    
    this.target.tempDamage += this.attackProps.damage;
    
    ai.addObject(this);
    graphics.addObject(this);
}