var gameBoard;

function Region(regionData, followers) {
    this.name = regionData.name;
    this.id = regionData.id || GetGuid();
    this.regionData = regionData;
    this.topLeft = regionData.topLeft;
    this.targetLeft = regionData.topLeft;
    this.topTop = regionData.topTop;
    this.targetTop = regionData.topTop;
    this.width = regionData.width;
    this.height = regionData.height;
    this.color = regionData.color;
    this.zindex = regionData.zindex || regionZIndex;
    this.followers = followers;
    if (!dataStore.debug) {
        this.isBlocker = !!regionData.isBlocker;
    }
    if (regionData.image) {
        this.image = document.getElementById(regionData.image);
    }
    this.ticksAlive = 0;
    this.inactive = regionData.inactive;

    this.encounterRate = 100 + 3 * (Math.abs(dataStore.settings.encounterRate - 150));
    if (dataStore.settings.encounterRate <= 5) {
        this.encounterRate = 1;
    }
    
    this.draw = function() {
        if (this.inactive) {
            return;
        }
        if (this.image) {
            if (this.flicker) {
                if (this.ticksAlive % 10 >= 5) {
                    return;
                }
            }

            graphics.drawImage(this.image, adjustXForWalkabout(this.topLeft), adjustYForWalkabout(this.topTop), this.width, this.height);
        } else {
            if (!dataStore.debug) {
                return;
            }
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
        if (this.inactive) {
            return;
        }
        if (!regionData.decorative) {
            if (!conversing) {
                if (regionData.encounters) {
                    if (physics.isInside(player, this)) {
                        if (this.ticksAlive > 60) {
                            if (regionData.encounters.length >= 1) {
                                //return; //DEBUG: put this return here to not have encounters
                                if (Math.floor(Math.random() * this.encounterRate) === 10 && regionData.encounters.length >= 1 ) {
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

                if (regionData.conversation) {
                    if (physics.isInside(player, this)) {
                        var conversation = new Conversation({conversation: regionData.conversation}, followers);
                        this.inactive = true;
                        regionData.inactive = true;
                    }
                }
            }

            if (regionData.guaranteedEncounter) {
                if (physics.isInside(player, {topTop: this.topTop - 50, topLeft: this.topLeft - 50, width: this.width + 100, height: this.height +100})) {
                    regionData.inactive = true;
                    var encounter = regionData.guaranteedEncounter;
                    ResetAllObjects();
                    gameBoard = new GameBoard(encounter);
                    graphics.addObject(gameBoard);
                    ai.addObject(gameBoard);
                    dataStore.lastLeft = player.topLeft;
                    dataStore.lastTop = player.topTop;
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
            if (regionData.loot) {
                if (physics.isInside(player, {topTop: this.topTop - 30, topLeft: this.topLeft - 30, width: this.width + 60, height: this.height + 60})) {
                    var lootPopProps = {
                        loot: regionData.loot,
                        topTop: this.topTop,
                        topLeft: this.topLeft
                    }
                    var lootPop = new LootPop(lootPopProps);

                    this.inactive = true;
                    regionData.inactive = true;
                }
            }

            if (regionData.gold) {
                if (physics.isInside(player, {topTop: this.topTop - 30, topLeft: this.topLeft - 30, width: this.width + 60, height: this.height + 60})) {
                    var lootPopProps = {
                        gold: regionData.gold,
                        topTop: this.topTop,
                        topLeft: this.topLeft,
                        loot: {
                            spriteProps: {
                                sheetName: "items",
                                leftIndex: 12,
                                topIndex: 32,
                                spriteSize: 16,
                                frames: 1
                            }
                        }
                    };

                    var lootPop = new LootPop(lootPopProps);
                    this.inactive = true;
                    regionData.inactive = true;
                }
            }

            if (regionData.xp) {
                if (physics.isInside(player, {topTop: this.topTop - 30, topLeft: this.topLeft - 30, width: this.width + 60, height: this.height + 60})) {
                    var lootPopProps = {
                        xp: regionData.xp,
                        topTop: this.topTop,
                        topLeft: this.topLeft,
                        loot: {
                            spriteProps: {
                                sheetName: "items",
                                leftIndex: 11,
                                topIndex: 111,
                                spriteSize: 16,
                                frames: 1
                            }
                        }
                    };

                    var lootPop = new LootPop(lootPopProps);
                    this.inactive = true;
                    regionData.inactive = true;
                }
            }

            if (regionData.character) {
                if (physics.isInside(player, {topTop: this.topTop - 30, topLeft: this.topLeft - 30, width: this.width + 60, height: this.height + 60})) {
                    var lootPopProps = {
                        character: regionData.character,
                        topTop: this.topTop,
                        topLeft: this.topLeft,
                        loot: {
                            spriteProps: regionData.character.spriteProps
                        }
                    };

                    var lootPop = new LootPop(lootPopProps);
                    this.inactive = true;
                    regionData.inactive = true;
                }
            }

        }
        this.ticksAlive++;
    }
    
    ai.addObject(this);
    graphics.addObject(this);
    physics.addObject(this);
}