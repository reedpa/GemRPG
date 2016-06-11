function Follower(target, spriteProps) {
    this.target = target;
    this.topLeft = target.topLeft - 35;
    this.topTop = target.topTop;
    this.targetLeft = target.targetLeft - 35;
    this.targetTop = target.targetTop;
    this.spriteProps = spriteProps;
    this.ticksAlive = 0;
    this.speed = target.speed;
    this.zindex = mainCharacterZIndex;
    this.order = 2;

    this.draw = function() {
        graphics.drawSprite(
            this.spriteProps, 
            this.getCharacterFrame(), 
            adjustXForWalkabout(this.topLeft), 
            adjustYForWalkabout(this.topTop));
    }
    
    this.doActions = function() {
        this.ticksAlive++;

        if (player.topLeft !== player.targetLeft || player.topTop !== player.targetTop) {
            var horizontalDistance = player.topLeft - player.targetLeft;
            var verticalDistance = player.topTop - player.targetTop;
            if (Math.abs(verticalDistance) > Math.abs(horizontalDistance)) {
                this.targetTop = this.target.topTop + (35 * (verticalDistance / Math.abs(verticalDistance)));
                this.targetLeft = this.target.topLeft;
            } else {
                this.targetLeft = this.target.topLeft + (35 * (horizontalDistance / Math.abs(horizontalDistance)));
                this.targetTop = this.target.topTop;
            }
        } else {
            this.targetLeft = this.topLeft;
            this.targetTop = this.topTop;
        }
    }
    
    this.moving = function() {
        return player.moving();
    }
    
    this.getCharacterFrame = function() {
        var frame = 0;
        if (this.moving()) {
            frame = (this.ticksAlive / 5) % dataStore.characters[0].spriteProps.frames;
        }
        return Math.floor(frame);
    }
    
    physics.addObject(this);
    ai.addObject(this);
    graphics.addObject(this);
}