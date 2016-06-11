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
    this.id = GetGuid();
    this.height = 32;
    this.width = 32;

    this.draw = function() {
        graphics.drawSprite(
            this.spriteProps, 
            this.getCharacterFrame(), 
            adjustXForWalkabout(this.topLeft), 
            adjustYForWalkabout(this.topTop));
    }
    
    this.doActions = function() {
        this.ticksAlive++;

        if (mouseCameDown) {
            this.calcNewLocation();
        }

        var verticalDistanceToPlayer = this.topLeft - player.topLeft;
        var horizontalDistanceToPlayer = this.topTop - player.topTop;
        if (Math.abs(verticalDistanceToPlayer) + Math.abs(horizontalDistanceToPlayer) > 400) {
            this.topLeft = player.topLeft;
            this.topTop = player.topTop;
        }
    }
    
    this.moving = function() {
        return this.topLeft !== this.targetLeft || this.topTop !== this.targetTop;
    }
    
    this.getCharacterFrame = function() {
        var frame = 0;
        if (this.moving()) {
            frame = (this.ticksAlive / 5) % dataStore.characters[0].spriteProps.frames;
        }
        return Math.floor(frame);
    }

    this.calcNewLocation = function() {
        var horizontalOffset = Math.floor(Math.random() * 200) - 100;
        var verticalOffset = Math.floor(Math.random() * 200) - 100;

        this.targetTop = player.targetTop + verticalOffset;
        this.targetLeft = player.targetLeft + horizontalOffset;

        var isBlocked = false;
        var peopleToTest = [player];
        for (var i = 0; i < walkabout.followers.length; i++) {
            peopleToTest.push(walkabout.followers[i]);
        }
        for(var i = 0; i < peopleToTest.length; i++) {
            if (this.id !== peopleToTest[i].id) {
                var thingOne = {
                    topLeft: this.targetLeft,
                    topTop: this.targetTop,
                    width: 32,
                    height: 32
                };
                var thingTwo = {
                    topLeft: peopleToTest[i].targetLeft,
                    topTop: peopleToTest[i].targetTop,
                    width: 32,
                    height: 32
                };
                if (physics.isPartiallyInside(thingOne, thingTwo)) {
                    isBlocked = true;
                    break;
                }
            }
        }

        if (isBlocked) {
            this.calcNewLocation();
        }
    }
    
    physics.addObject(this);
    ai.addObject(this);
    graphics.addObject(this);
} 