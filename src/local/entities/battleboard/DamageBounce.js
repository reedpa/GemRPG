
function DamageBounce(damageBounceProps) {
    this.zindex = DamageBounceZIndex;
    this.damage = damageBounceProps.damage;
    this.topLeft = damageBounceProps.topLeft;
    this.topTop = damageBounceProps.topTop;
    this.id = "DamageBounce" + GetGuid();
    this.fillStyle = "white";
    this.lifeToLive = 32;
    
    if (this.damage < 0) {
        this.damage *= -1;
        this.fillStyle = "blue";
    }
    
    this.draw = function() {
        graphics.setFont(22, "Arial");
        graphics.setFillStyle(this.fillStyle);
        graphics.fillText(this.damage.toString(), this.topLeft, this.topTop - (32 - this.lifeToLive) / 2);
    }
    
    this.doActions = function() {
        this.lifeToLive--;
        if (this.lifeToLive <= 0) {
            graphics.removeObject(this);
            ai.removeObject(this);
        }
    }
    
    graphics.addObject(this);
    ai.addObject(this);
}