function adjustXForWalkabout(x) {
    return x + 175 - player.topLeft;
}

function adjustYForWalkabout(y) {
    return y + 315 - player.topTop;
}

function doFootstepActions(stepper) {
    if (stepper.footsteps) {
        var pushNewFootstep = false;
        if (stepper.footstepList.length > 0) {
            var xDiff = stepper.footstepList[stepper.footstepList.length - 1].x - stepper.topLeft;
            var yDiff = stepper.footstepList[stepper.footstepList.length - 1].y - stepper.topTop;
            
            if (Math.abs(xDiff) + Math.abs(yDiff) > 20) {
                pushNewFootstep = true;
            }
        } else {
            pushNewFootstep = true;
        }

        if (pushNewFootstep) {
            stepper.footstepList.push({x: stepper.topLeft, y: stepper.topTop, color: stepper.footsteps.footstepsColor, ticksAlive: 0, duration: stepper.footsteps.footstepsDuration / 2});
        }
        

        stepper.footsteps.ticksAlive++;
        if (stepper.footsteps.ticksAlive >= stepper.footsteps.footstepsDuration) {
            stepper.footsteps = null;
        }
    }
    
    for (var i = 0; i < stepper.footstepList.length; i++) {
        stepper.footstepList[i].ticksAlive++;
        if (stepper.footstepList[i].ticksAlive >= stepper.footstepList[i].duration) {
            stepper.footstepList.splice(i, 1);
        }
    }
}

function drawFootsteps(stepper) {
    for (var i = 0; i < stepper.footstepList.length; i++) {
        graphics.setGlobalAlpha((stepper.footstepList[i].duration - stepper.footstepList[i].ticksAlive) / stepper.footstepList[i].duration);
        graphics.drawCircle(stepper.footstepList[i].color, adjustXForWalkabout(stepper.footstepList[i].x) + 2, adjustYForWalkabout(stepper.footstepList[i].y) + 30, 2);
        graphics.drawCircle(stepper.footstepList[i].color, adjustXForWalkabout(stepper.footstepList[i].x) + 10, adjustYForWalkabout(stepper.footstepList[i].y) + 30, 2);
        graphics.setGlobalAlpha(1);
    }
}