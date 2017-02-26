function ConversationTab() {
    this.topLeft = 0;
    this.topTop = 50;
    this.zindex = 10;
    this.order = 10;

    this.offset = 0;

    this.jumpTo = 0;
    this.needsJump = true;

    var downArrow = {image: document.getElementById("downarrow"), topLeft: 300, topTop: 600, width: 20, height: 20};
    var upArrow = {image: document.getElementById("uparrow"), topLeft: 320, topTop: 600, width: 20, height: 20};

    this.draw = function() {
        if (!this.active) {
            return;
        }

        if (this.jumpTo !== 0) {
            this.offset = this.jumpTo;
            this.jumpTo = 0;
        }

        graphics.setStrokeStyle("gold");
        graphics.strokeRect(this.topLeft, this.topTop, graphics.getRightBound() - this.topLeft, graphics.getBottomBound() - this.topTop);

        var localTop = this.topTop + 10 + this.offset;

        for (var i = 0; i < dataStore.conversations.length; i++) {
            if (i === dataStore.conversations.length -1 && i !== 0 && this.needsJump) {
                this.jumpTo = localTop * - 1 + 90;
                this.needsJump = false;
            }
            var conversation = dataStore.conversations[i];
            for (var j = 0; j < conversation.length; j++) {
                var line = conversation[j];
                if (line.text) {
                        var color = "white";
                        var localLeft = this.topLeft + 10;
                        if (line.character) {
                            var character = null;
                            for (var k = 0; k < dataStore.inventory.characters.length; k++) {
                                if (dataStore.inventory.characters[k].id === line.character) {
                                    character = dataStore.inventory.characters[k];
                                }
                            }
                            if (localTop > this.topTop) {
                                graphics.drawSprite(character.spriteProps, 0, localLeft, localTop);
                            }
                            localLeft += 40;
                            color = character.gemAffinity;
                        } else if (line.color) {
                            color = line.color;
                            localLeft += 40;
                        }

                        graphics.setFont(20, "Arial");
                        graphics.setFillStyle(color);
                        localTop += Math.max(40, this.renderText(line.text, localLeft, localTop + 20) + 10);
                }
            }

            if (localTop > this.topTop) {
                graphics.setFillStyle("gold");
                graphics.fillRect(this.topLeft + 50, localTop + 10, 270, 5);
            }
            localTop += 30;
        }

        if (localTop >= graphics.getBottomBound() || this.offset !== 0) {
            var upJiggle = physics.mouseIsInside(upArrow) ? 1 : 0;
            var downJiggle = physics.mouseIsInside(downArrow) ? 1 : 0;
            graphics.drawImage(upArrow.image, upArrow.topLeft + upJiggle, upArrow.topTop + upJiggle);
            graphics.drawImage(downArrow.image, downArrow.topLeft + downJiggle, downArrow.topTop + downJiggle);
        }
    }

    this.doActions = function() {
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

    this.renderText = function(text, x, y) {
        var textPieces = [];
        var textLength = graphics.measureText(text).width;
        var textSpace = graphics.getRightBound() - x;
        if (textLength > textSpace) {
            textPieces = splitText(Math.ceil(textLength / textSpace), text);
        } else {
            textPieces = [text];
        }

        for (var i = 0; i < textPieces.length; i++) {
            if (y + (i * 20) > this.topTop + 20) {
                graphics.fillText(textPieces[i], x, y + (i * 20));
            }
        }

        return textPieces.length * 20;
    }

    ai.addObject(this);
    graphics.addObject(this);
}