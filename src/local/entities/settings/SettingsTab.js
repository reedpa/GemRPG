function SettingsTab() {
    this.topLeft = 0;
    this.topTop = 50;
    this.zindex = 10;
    this.order = 10;

    var conversationSpeedBar = {topLeft: this.topLeft + 200, topTop: this.topTop + 12, width: 150, height: 20};
    var encounterRateBar = {topLeft: this.topLeft + 200, topTop: this.topTop + 64, width: 150, height: 20};

    this.draw = function() {
        if (!this.active) {
            return;
        }

        graphics.setStrokeStyle("gold");
        graphics.strokeRect(this.topLeft, this.topTop, graphics.getRightBound() - this.topLeft, graphics.getBottomBound() - this.topTop);

        graphics.setFillStyle("white");
        graphics.setFont(20, "Arial");
        graphics.fillText("Conversation Speed", this.topLeft + 5, this.topTop + 30);
        graphics.fillText("Slow", this.topLeft + 200, this.topTop + 50);
        graphics.fillText("Fast", this.topLeft + 310, this.topTop + 50);
        graphics.setStrokeStyle("white");
        graphics.strokeRect(conversationSpeedBar.topLeft, conversationSpeedBar.topTop, conversationSpeedBar.width, conversationSpeedBar.height);
        graphics.setFillStyle("blue");
        graphics.fillRect(conversationSpeedBar.topLeft + 1, conversationSpeedBar.topTop + 1, dataStore.settings.conversationSpeed - 2, conversationSpeedBar.height - 2);

        graphics.setFillStyle("white");
        graphics.setFont(20, "Arial");
        graphics.fillText("Encounter Rate", this.topLeft + 5, this.topTop + 80);
        graphics.fillText("None", this.topLeft + 200, this.topTop + 100);
        graphics.fillText("Lots", this.topLeft + 310, this.topTop + 100);
        graphics.setStrokeStyle("white");
        graphics.strokeRect(encounterRateBar.topLeft, encounterRateBar.topTop, encounterRateBar.width, encounterRateBar.height);
        graphics.setFillStyle("blue");
        graphics.fillRect(encounterRateBar.topLeft, encounterRateBar.topTop, dataStore.settings.encounterRate, encounterRateBar.height);
    }

    this.doActions = function() {
        if (!this.active) {
            return;
        }

        if (mouseIsDown) {
            if (physics.mouseIsInside(conversationSpeedBar)) {
                var newSpeedSetting = mouseX - conversationSpeedBar.topLeft;
                dataStore.settings.conversationSpeed = newSpeedSetting;
            }
            if (physics.mouseIsInside(encounterRateBar)) {
                var newEncounterRate = mouseX - conversationSpeedBar.topLeft;
                dataStore.settings.encounterRate = newEncounterRate;
            }
        }
    }

    ai.addObject(this);
    graphics.addObject(this);
}