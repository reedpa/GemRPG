
function MainCharacter() {
    this.topLeft = 0;
    this.topTop = 0;
    this.width = 10;
    this.height = 10;
    this.targetLeft = 0;
    this.targetTop = 0;
    this.zindex = 2;
    this.order = 2;
    this.speed = 2;
    this.image;
    
    this.doActions = function() {
        if (mouseCameDown) {
            this.targetLeft = mouseX - 175 + this.topLeft;
            this.targetTop = mouseY - 315 + this.topTop;
        }
    }
    
    this.draw = function() {
        graphics.setLineWidth(1);
        graphics.strokeRect(175, 315, 10, 10);
        //graphics.drawImage(this.image, 360/2, 640/2);
    }
    
    physics.addObject(this);
    ai.addObject(this);
    graphics.addObject(this);
}