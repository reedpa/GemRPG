function Physics() {
    this.physObjects = [];
    
    this.moveObjects = function() {
        
        for (var i = 0; i < this.physObjects.length; i++) {
            
            var blocked = false;
            var moving = false;
            var movingObject = this.physObjects[i];
            if (movingObject.topLeft !== movingObject.targetLeft ||
                movingObject.topTop !== movingObject.targetTop) {
                
                moving = true;
                for (var j = 0; j < this.physObjects.length; j++) {
                    var blockingObject = this.physObjects[j];
                    if (blockingObject.isBlocker === true) {
                        blocked = this.willBeInside(movingObject, blockingObject);
                        if (blocked) {
                            break;
                        }
                    }
                }
            }
            
            if (!blocked && moving) {
                if (movingObject.topLeft < movingObject.targetLeft) {
                    movingObject.topLeft += Math.min(movingObject.speed, movingObject.targetLeft - movingObject.topLeft);
                } else {
                    movingObject.topLeft -= Math.min(movingObject.speed, movingObject.topLeft - movingObject.targetLeft);
                }
                
                if (movingObject.topTop < movingObject.targetTop) {
                    movingObject.topTop += Math.min(movingObject.speed, movingObject.targetTop - movingObject.topTop);
                } else {
                    movingObject.topTop -= Math.min(movingObject.speed, movingObject.topTop - movingObject.targetTop);
                }
            } else if (blocked) {
                movingObject.targetTop = movingObject.topTop;
                movingObject.targetLeft = movingObject.topLeft;
            }
        }
        
    };
    
    this.addObject = function(object) {
        this.physObjects.push(object);
    };
    
    this.removeObject = function(object) {
        for (var i = 0; i < this.physObjects.length; i++) {
            if (this.physObjects[i].id === object.id) {
                this.physObjects.splice(i, 1);
                return;
            }
        }
    }
    
    this.willBeInside = function(mover, blocker) {
        if (mover.topLeft < mover.targetLeft) { //going right
            if (mover.topLeft + mover.width <= blocker.topLeft) {
                if (mover.topLeft + mover.width + mover.speed > blocker.topLeft) {
                    if (mover.topTop + mover.height >= blocker.topTop && mover.topTop <= blocker.topTop + blocker.height) {
                        return true;
                    }
                }
            }
        } else if (mover.topLeft > mover.targetLeft) { //going left
            if (mover.topLeft >= blocker.topLeft + blocker.width) {
                if (mover.topLeft - mover.speed < blocker.topLeft + blocker.width) {
                    if (mover.topTop + mover.height >= blocker.topTop && mover.topTop <= blocker.topTop + blocker.height) {
                        return true;
                    }
                }
            }
        }
        
        if (mover.topTop < mover.targetTop) { //going down
            if (mover.topTop + mover.height <= blocker.topTop) {
                if (mover.topTop + mover.height + mover.speed > blocker.topTop) {
                    if (mover.topLeft + mover.width >= blocker.topLeft && mover.topLeft <= blocker.topLeft + blocker.width) {
                        return true;
                    }
                }
            }
        } else if (mover.topTop > mover.targetTop) { //going up
            if (mover.topTop >= blocker.topTop + blocker.height) {
                if (mover.topTop - mover.speed < blocker.topTop + blocker.height) {
                    if (mover.topLeft + mover.width >= blocker.topLeft && mover.topLeft <= blocker.topLeft + blocker.width) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    
    this.isInside = function(thingOne, container) {
        if (thingOne.topTop > container.topTop && thingOne.topTop + thingOne.height < container.topTop + container.height &&
            thingOne.topLeft > container.topLeft && thingOne.topLeft + thingOne.width < container.topLeft + container.width) {
                return true;
            }

        return false;
    }

    this.isPartiallyInside = function(thingOne, thingTwo) {
        if (thingOne.topTop >= thingTwo.topTop && 
        thingOne.topLeft >= thingOne.topLeft && 
        thingOne.topTop <= thingTwo.topTop + thingTwo.height &&
        thingOne.topLeft <= thingTwo.topLeft + thingTwo.width) {
            return true;
        }

        if (thingOne.topTop + thingOne.height >= thingTwo.topTop &&
        thingOne.topLeft + thingOne.width >= thingTwo.topLeft &&
        thingOne.topTop + thingOne.height <= thingTwo.topTop + thingTwo.height &&
        thingOne.topLeft + thingOne.width <= thingTwo.topLeft + thingTwo.width) {
            return true;
        }

        return false;
    }
    
    this.mouseIsInside = function(container) {
        if (mouseX > container.topLeft && mouseX < container.topLeft + container.width) {
            if (mouseY > container.topTop && mouseY < container.topTop + container.height) {
                return true;
            }
        }
        
        return false;
    }
}