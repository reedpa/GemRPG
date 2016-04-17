var player;

function Walkabout(data) {
    this.image = document.getElementById("overlandmap");
    this.zindex = 0;
    this.order = 1;
    player = new MainCharacter();
    this.data = data;
    dataStore.lastWalkabout = data;
    this.image = document.getElementById(this.data.image);
    player.topLeft = this.data.startingLocation[0];
    player.topTop = this.data.startingLocation[1];
    player.targetLeft = player.topLeft;
    player.targetTop = player.topTop;

    this.regions = [];
    
    for (var i = 0; i < this.data.regions.length; i++) {
        this.regions.push(new Region(this.data.regions[i]));
    }
    
    this.doActions = function() {
        
    }
    
    this.draw = function() {
        //ctx.translate(0 - mainCharacterX, 0 - mainCharacterY);
        graphics.drawImage(this.image, 0 + 175 - player.topLeft, 0 + 315 - player.topTop);
    }
    
    ai.addObject(this);
    
    graphics.addObject(this);
}