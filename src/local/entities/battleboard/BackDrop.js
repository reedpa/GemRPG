function BackDrop(backDropImage) {
    this.zindex = backDropZIndex;
    this.top = 0;
    this.left = 0;
    this.width = 0;
    this.height = 0;
    this.image = document.getElementById(backDropImage);
    
    this.draw = function() {
        graphics.setFillStyle("#FFFFFF");
        graphics.drawImage(this.image, 0, 0);
        
        if (dataStore.debug) {
            graphics.setFont(25, "Arial");
            graphics.setFillStyle("#000000");
            graphics.fillText("X", 340, 22);
        }
    };
    
    graphics.addObject(this);
}