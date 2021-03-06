var conversing = false;

function Conversation(conversationProps, followers) {
    this.activeText = [];
    this.zindex = lootPopZindex;
    this.id = "conversation_" + GetGuid();

    conversing = true;

    this.currentIndex = 0;
    this.duration = 120 * (2.5 - ((dataStore.settings.conversationSpeed) / 75));
    this.ticksAlive = 0;

    this.maxIndex = 0;
    for (var i = 0; i < conversationProps.conversation.length; i++) {
        if (conversationProps.conversation[i].index > this.maxIndex) {
            this.maxIndex++;
        }
    }
    
    this.doActions = function() {

        for (var i = 0; i < conversationProps.conversation.length; i++) {
            if (conversationProps.conversation[i].index === this.currentIndex) {
                if (this.ticksAlive === 0 && conversationProps.conversation[i].action) {
                    conversationProps.conversation[i].action();
                }
            }
        }

        if (this.currentIndex > this.maxIndex) {
            ai.removeObject(this);
            graphics.removeObject(this);
            conversing = false;
        }

        this.ticksAlive++;
        if (this.ticksAlive >= this.duration) {
            this.ticksAlive = 0;
            this.currentIndex++;
        }

    }

    this.draw = function() {
        for (var i = 0; i < conversationProps.conversation.length; i++) {
            if (conversationProps.conversation[i].index === this.currentIndex) {
                if (conversationProps.conversation[i].character) {
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

                    this.drawText(conversationProps.conversation[i].text, speakingCharacter.characterProps.gemAffinity, adjustXForWalkabout(speakingCharacter.topLeft), adjustYForWalkabout(speakingCharacter.topTop - 5));
                } else if (conversationProps.conversation[i].location) {
                    this.drawText(conversationProps.conversation[i].text, 
                        conversationProps.conversation[i].color,
                        adjustXForWalkabout(conversationProps.conversation[i].location.topLeft), 
                        adjustYForWalkabout(conversationProps.conversation[i].location.topTop - 5));
                } else if (conversationProps.conversation[i].offscreen) {
                    if (conversationProps.conversation[i].offscreen === "right") {
                        this.drawText(conversationProps.conversation[i].text, 
                            conversationProps.conversation[i].color,
                            250, 
                            350);
                    } else if (conversationProps.conversation[i].offscreen === "left") {
                        this.drawText(conversationProps.conversation[i].text, 
                            conversationProps.conversation[i].color,
                            20, 
                            350);
                    }
                }

            }
        }
    }

    this.drawText = function(text, color, topLeft, topTop, nobreak) {
        if (!nobreak) {
            var outOfRightBound = false;
            var outOfLeftBound = false;
            var outOfTopBound = false;
            var outOfBottomBound = false;

            var textLength = graphics.getTextWidth(text);
            var properLeftLocation = Math.max(graphics.getRightBound() - textLength - 10, Math.floor(canvas.width / 2));

            if (topLeft > properLeftLocation) {
                outOfRightBound = true;
            } else if (topLeft < 0) {
                outOfLeftBound = true;
            }

            if (topTop < 25) {
                outOfTopBound = true;
            } else if (topTop > (graphics.getBottomBound() - 25)) {
                outOfBottomBound = true;
            }


            if (outOfRightBound || outOfLeftBound || outOfTopBound || outOfBottomBound) {
                var newTopLeft = topLeft;
                var newTopTop = topTop;

                if (outOfRightBound) {
                    newTopLeft = properLeftLocation;
                } else if (outOfLeftBound) {
                    newTopLeft = 25;
                }

                if (outOfBottomBound) {
                    newTopTop = graphics.getBottomBound() - 25;
                } else if (outOfTopBound) {
                    newTopTop = 25
                }

                this.drawText(text, color, newTopLeft, newTopTop, nobreak);
                return;
            }
        }

        graphics.setFillStyle("black");
        graphics.setFont(25, "Arial");

        if (graphics.outsideRightBound(topLeft + graphics.getTextWidth(text)) && 
                text.indexOf(" ") !== -1 && 
                !nobreak) {
            var textSize = graphics.getTextWidth(text);
            var availableSize = graphics.measureSpace(topLeft);
            var piecesNeeded = Math.ceil(textSize / availableSize);
            var textPieces = splitText(piecesNeeded, text);

            for (var i = 0; i < textPieces.length; i++) {
                this.drawText(Chomp(textPieces[i]), color, topLeft, topTop - (20 * (textPieces.length - 1 - i)), true);
            }
            return;
        }


        graphics.setFillStyle(color);
        graphics.setFont(25, "Arial");
        graphics.fillTextWithOutline(color, "black", text, topLeft, topTop);
    }

    ai.addObject(this);
    graphics.addObject(this);
    dataStore.conversations.push(conversationProps.conversation);
}