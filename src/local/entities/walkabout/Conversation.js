function Conversation(conversationProps, followers) {
    this.activeText = [];
    this.zindex = lootPopZindex;
    this.id = "conversation_" + GetGuid();

    this.currentIndex = 0;
    this.duration = 244;
    this.ticksAlive = 0;

    this.maxIndex = 0;
    for (var i = 0; i < conversationProps.conversation.length; i++) {
        if (conversationProps.conversation[i].index > this.maxIndex) {
            this.maxIndex++;
        }
    }
    
    this.doActions = function() {
        this.ticksAlive++;

        if (this.ticksAlive >= this.duration) {
            this.ticksAlive = 0;
            this.currentIndex++;
        }

        if (this.currentIndex > this.maxIndex) {
            ai.removeObject(this);
            graphics.removeObject(this);
        }
    }

    this.draw = function() {
        for (var i = 0; i < conversationProps.conversation.length; i++) {
            if (conversationProps.conversation[i].index === this.currentIndex) {
                var speakingCharacter;
                for (var j = 0; j < dataStore.characters.length; j++) {
                    if (dataStore.characters[j].id === conversationProps.conversation[i].character) {
                        if (j === 0) {
                            speakingCharacter = player;
                        } else {
                            speakingCharacter = followers[j-1];
                        }
                        break;
                    }
                }

                this.drawText(conversationProps.conversation[i].text, speakingCharacter.characterProps.gemAffinity, adjustXForWalkabout(speakingCharacter.topLeft), adjustYForWalkabout(speakingCharacter.topTop));

            }
        }
    }

    this.drawText = function(text, color, topLeft, topTop) {
        graphics.setFillStyle("black");
        graphics.setFont(25, "Arial");

        if (graphics.outsideRightBound(topLeft + graphics.measureText(text).width) && text.indexOf(" ") !== -1) {
            var textSize = graphics.measureText(text).width;
            var availableSize = graphics.measureSpace(topLeft);
            var piecesNeeded = Math.ceil(textSize / availableSize);
            var textPieces = this.splitText(piecesNeeded, text);

            for (var i = 0; i < textPieces.length; i++) {
                this.drawText(Chomp(textPieces[i]), color, topLeft, topTop + (20 * i));
            }
            return;
        }

        graphics.fillText(text, topLeft - 1, topTop - 1);

        graphics.setFillStyle("black");
        graphics.setFont(25, "Arial");
        graphics.fillText(text, topLeft - 1, topTop);

        graphics.setFillStyle("black");
        graphics.setFont(25, "Arial");
        graphics.fillText(text, topLeft, topTop - 1);

        graphics.setFillStyle("black");
        graphics.setFont(25, "Arial");
        graphics.fillText(text, topLeft + 1, topTop + 1);

        graphics.setFillStyle("black");
        graphics.setFont(25, "Arial");
        graphics.fillText(text, topLeft + 1, topTop);

        graphics.setFillStyle("black");
        graphics.setFont(25, "Arial");
        graphics.fillText(text, topLeft, topTop + 1);

        graphics.setFillStyle(color);
        graphics.setFont(25, "Arial");
        graphics.fillText(text, topLeft, topTop);
    }

    this.splitText = function(pieces, text) {
        var split = [];
        var length = text.length;
        var pieceLength = Math.ceil(text.length / pieces);

        var lastSpace = 0;
        var lastRoot = 0;
        for (var i = 0; i < text.length; i++) {
            if (text[i] === " ") {
                lastSpace = i;
            }

            if (i - lastRoot > pieceLength && lastRoot !== lastSpace) {
                split.push(text.substr(lastRoot, lastSpace - lastRoot));
                lastRoot = lastSpace;
            }
        }

        split.push(text.substr(lastRoot, text.length -1));

        return split;
    }

    ai.addObject(this);
    graphics.addObject(this);
}