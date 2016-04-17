
function Region(regionData) {
    this.topLeft = regionData.topLeft;
    this.targetLeft = regionData.topLeft;
    this.topTop = regionData.topTop;
    this.targetTop = regionData.topTop;
    this.width = regionData.width;
    this.height = regionData.height;
    this.color = regionData.color;
    this.zindex = 5;
    this.isBlocker = !!regionData.isBlocker;
    
    this.draw = function() {
        graphics.setFillStyle(this.color);
        ctx.globalAlpha = 0.5;
        graphics.fillRect(this.topLeft + 175 - player.topLeft, this.topTop + 315 - player.topTop, this.width, this.height)
        ctx.globalAlpha = 1;

        graphics.setStrokeStyle("5px black");
        graphics.strokeRect(this.topLeft + 175 - player.topLeft, this.topTop + 315 - player.topTop, this.width, this.height);
    }
    
    this.doActions = function() {
        
    }
    
    ai.addObject(this);
    graphics.addObject(this);
    physics.addObject(this);
}