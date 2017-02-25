function ConversationLog() {
    this.topTop = 0;
    this.topLeft = 0;
    this.zindex = 0;
    this.order = 0;

    this.bestiaryTab = new BestiaryTab();
    this.bestiaryTab.active = false;
    this.conversationTab = new ConversationTab();
    this.conversationTab.active = false;
    this.settingsTab = new SettingsTab();
    this.settingsTab.active = false;

    var conversationsHitBox = {topLeft: 15, topTop: 20, width: 130, height: 20};
    var bestiaryHitBox = {topLeft: 165, topTop: 20, width: 80, height: 20};
    var settingsHitBox = {topLeft: 255, topTop: 20, width: 75, height: 20};

    this.draw = function() {
        graphics.setFillStyle("black");
        graphics.fillRect(0, 0, 360, 640);
        
        graphics.setFont(20, "Arial");
        graphics.setFillStyle("white");
        graphics.fillText("X", 330, 20);

        var jiggle = physics.mouseIsInside(conversationsHitBox) ? 1 : 0;
        if (this.conversationTab.active) {
            graphics.setFillStyle("gold");
        } else {
            graphics.setFillStyle("white");
        }
        graphics.fillText("Conversations", 10 + jiggle, 40 + jiggle);

        jiggle = physics.mouseIsInside(bestiaryHitBox) ? 1 : 0;
        if (this.bestiaryTab.active) {
            graphics.setFillStyle("gold");
        } else {
            graphics.setFillStyle("white");
        }
        graphics.fillText("Bestiary", 160 + jiggle, 40 + jiggle);
        
        jiggle = physics.mouseIsInside(settingsHitBox) ? 1 : 0;
        if (this.settingsTab.active) {
            graphics.setFillStyle("gold");
        } else {
            graphics.setFillStyle("white");
        }
        graphics.fillText("Settings", 250 + jiggle, 40 + jiggle);
    }

    this.doActions = function() {
        if (mouseCameDown) {
            if (physics.mouseIsInside({topLeft: 330, topTop: 0, width: 30, height: 30})) {
                audio.stopSound(this.music);
                audio.playSound("buttonclick");
                ResetAllObjects();
                walkabout = new Walkabout(dataStore.lastWalkabout);
                player.topLeft = dataStore.lastLeft;
                player.targetLeft = dataStore.lastLeft;
                player.topTop = dataStore.lastTop;
                player.targetTop = dataStore.lastTop;
            } else if (physics.mouseIsInside(conversationsHitBox)) {
                this.conversationTab.active = true;
                this.bestiaryTab.active = false;
                this.settingsTab.active = false;
            } else if (physics.mouseIsInside(bestiaryHitBox)) {
                this.bestiaryTab.active = true;
                this.conversationTab.active = false;
                this.settingsTab.active = false;
            } else if (physics.mouseIsInside(settingsHitBox)) {
                this.settingsTab.active = true;
                this.bestiaryTab.active = false;
                this.conversationTab.active = false;
            }
        }
    }

    ai.addObject(this);
    graphics.addObject(this);
}