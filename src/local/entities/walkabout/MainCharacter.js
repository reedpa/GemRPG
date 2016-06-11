
function MainCharacter() {
    this.topLeft = 0;
    this.topTop = 0;
    this.targetLeft = 0;
    this.targetTop = 0;
    this.width = 32;
    this.height = 32;
    this.targetLeft = 0;
    this.targetTop = 0;
    this.zindex = mainCharacterZIndex;
    this.order = 2;
    this.speed = 2;
    this.image;
    this.ticksAlive = 0;
    this.id = GetGuid();
    
    this.doActions = function() {
        this.ticksAlive++;
        if (mouseCameDown) {
            this.targetLeft = mouseX - 175 + this.topLeft;
            this.targetTop = mouseY - 315 + this.topTop;
        }
    }
    
    this.draw = function() {
        if (this.moving()) {
            graphics.drawSprite(targetSprite, this.getTargetFrame(), adjustXForWalkabout(this.targetLeft), adjustYForWalkabout(this.targetTop));
        }
        graphics.drawSprite(dataStore.characters[0].spriteProps, this.getCharacterFrame(), 175, 315);
    }
    
    this.moving = function() {
        return this.targetLeft !== this.topLeft || this.targetTop !== this.topTop;
    }
    
    this.getTargetFrame = function() {
        return Math.floor( (this.ticksAlive / 16) % 2);
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