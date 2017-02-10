var gameBoard;

function Region(regionData, followers) {
    this.name = regionData.name;
    this.topLeft = regionData.topLeft;
    this.targetLeft = regionData.topLeft;
    this.topTop = regionData.topTop;
    this.targetTop = regionData.topTop;
    this.width = regionData.width;
    this.height = regionData.height;
    this.color = regionData.color;
    this.zindex = regionData.zindex || regionZIndex;
    this.followers = followers;
    //this.isBlocker = !!regionData.isBlocker;
    if (regionData.image) {
        this.image = document.getElementById(regionData.image);
    }
    this.ticksAlive = 0;
    
    this.draw = function() {
        if (this.image) {
            graphics.drawImage(this.image, adjustXForWalkabout(this.topLeft), adjustYForWalkabout(this.topTop), this.width, this.height);
        } else {
            graphics.setFillStyle(this.color);
            ctx.globalAlpha = 0.5;
            graphics.fillRect(adjustXForWalkabout(this.topLeft), adjustYForWalkabout(this.topTop), this.width, this.height)
            ctx.globalAlpha = 1;

            graphics.setStrokeStyle("black");
            if (physics.isInside(player, this)) {
                graphics.setStrokeStyle("gold");
            }
            graphics.strokeRect(adjustXForWalkabout(this.topLeft), adjustYForWalkabout(this.topTop), this.width, this.height);
            graphics.fillText(this.name, adjustXForWalkabout(this.topLeft) + 5, adjustYForWalkabout(this.topTop) + 5);
        }
    }
    
    this.doActions = function() {
        if (!regionData.decorative) {
            if (regionData.encounters) {
                if (physics.isInside(player, this)) {
                    if (this.ticksAlive > 60) {
                        if (regionData.encounters.length >= 1) {
                            if (Math.floor(Math.random() * 100) === 1 && regionData.encounters.length >= 1 ) {
                                var encounter = regionData.encounters[Math.floor(Math.random() * regionData.encounters.length)];
                                ResetAllObjects();
                                gameBoard = new GameBoard(encounter);
                                graphics.addObject(gameBoard);
                                ai.addObject(gameBoard);
                                dataStore.lastLeft = player.topLeft;
                                dataStore.lastTop = player.topTop;
                            }
                        }
                    }
                }
            }
            if (regionData.footstepsDuration) {
                if (physics.isInside(player, this)) {
                    if (!player.footsteps) {
                        player.footsteps = {footstepsDuration: regionData.footstepsDuration, footstepsColor: regionData.footstepsColor, ticksAlive: 0};
                    }
                }

                for (var i = 0; i < this.followers.length; i++) {
                    if (physics.isInside(this.followers[i], this)) {
                        if (!this.followers[i].footsteps) {
                            this.followers[i].footsteps = {footstepsDuration: regionData.footstepsDuration, footstepsColor: regionData.footstepsColor, ticksAlive: 0};
                        }
                    }
                }
            }
        }
        this.ticksAlive++;
    }
    
    ai.addObject(this);
    graphics.addObject(this);
    physics.addObject(this);
}