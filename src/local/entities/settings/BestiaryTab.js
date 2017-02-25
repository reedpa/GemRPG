function BestiaryTab() {
    this.topLeft = 0;
    this.topTop = 50;
    this.zindex = 10;
    this.order = 10;

    this.offset = 0;

    this.ticksAlive = 0;

    var downArrow = {image: document.getElementById("downarrow"), topLeft: 300, topTop: 600, width: 20, height: 20};
    var upArrow = {image: document.getElementById("uparrow"), topLeft: 320, topTop: 600, width: 20, height: 20};

    this.draw = function() {
        if (!this.active) {
            return;
        }

        graphics.setStrokeStyle("gold");
        graphics.strokeRect(this.topLeft, this.topTop, graphics.getRightBound() - this.topLeft, graphics.getBottomBound() - this.topTop);

        var localTop = this.topTop + this.offset + 10;

        for (var i = 0; i < dataStore.bestiary.length; i++) {
            var creature = dataStore.bestiary[i];
            var localLeft = creature.spriteProps.spriteSize + 20;
            if (localTop >= this.topTop) {
                graphics.drawSprite(creature.spriteProps, Math.floor((this.ticksAlive / 5)) % creature.spriteProps.frames, 10, localTop);
                graphics.setFillStyle("white");
                graphics.setFont(20, "Arial");
                graphics.fillText(creature.name, localLeft, localTop + 20);
                graphics.fillText("Gem: ", localLeft, localTop + 40);
                graphics.setFillStyle(creature.gemAffinity);
                graphics.fillText(creature.gemAffinity, localLeft + 50, localTop + 40);
                graphics.setFillStyle("white");
                graphics.fillText("HP: " + creature.health, localLeft, localTop + 60);
                var dps = creature.weapon.damageModifier * 10 / creature.weapon.speedModifier;
                var dpsString = "DPS: " + toNumberStringWithConstrainedDecimals(dps, 2);
                if (dps < 0) {
                    dpsString += "(Heal)";
                }
                graphics.fillText(dpsString, localLeft, localTop + 80);
            }

            localTop += Math.max(20 + creature.spriteProps.spriteSize, 100);
        }

        if (localTop >= graphics.getBottomBound() || this.offset !== 0) {
            var upJiggle = physics.mouseIsInside(upArrow) ? 1 : 0;
            var downJiggle = physics.mouseIsInside(downArrow) ? 1 : 0;
            graphics.drawImage(upArrow.image, upArrow.topLeft + upJiggle, upArrow.topTop + upJiggle);
            graphics.drawImage(downArrow.image, downArrow.topLeft + downJiggle, downArrow.topTop + downJiggle);
        }
    }

    this.doActions = function() {
        this.ticksAlive++;
        if (!this.active) {
            return;
        }

        if (mouseIsDown) {
            if (physics.mouseIsInside(upArrow)) {
                this.offset = Math.min(0, this.offset + 5);
            }

            if (physics.mouseIsInside(downArrow)) {
                this.offset -= 5;
            }
        }
    }

    ai.addObject(this);
    graphics.addObject(this);
}