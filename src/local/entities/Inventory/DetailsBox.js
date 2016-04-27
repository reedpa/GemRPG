function DetailsBox() {
    
    this.zindex = detailsBoxZIndex;
    this.order = detailsBoxZIndex;
    
    this.characterProps = null;
    this.itemProps = null;
    
    this.topLeft = 180;
    this.width = 200;
    this.topTop = 340;
    this.height = 400;
    
    this.id = "DetailsBox";
    
    this.isWielded = false;
    
    this.ticksAlive = 0;
    
    var plusButton = { topLeft: this.topLeft + 5, topTop: this.topTop + 153, width: 32, height: 32 };
    
    var sellButton = { topLeft: this.topLeft + 125, topTop: this.topTop + 270, width: 50, height: 20};
    
    this.draw = function() {
        
        graphics.setStrokeStyle("grey");
        graphics.strokeRect(this.topLeft, this.topTop, this.width, this.height);
        
        if (this.itemProps) {
            graphics.drawSprite(this.itemProps.spriteProps, 0, this.topLeft + 5, this.topTop + 5);
            
            graphics.setFillStyle("white");
            graphics.setFont(30, "Arial");
            if (physics.mouseIsInside(plusButton)) {
                graphics.setFillStyle("gold");
                graphics.fillText("+", plusButton.topLeft + 1, plusButton.topTop + 30 + 1);
            } else {
                graphics.fillText("+", plusButton.topLeft, plusButton.topTop + 30);
            }
            
            graphics.setFont(20, "Arial");
            graphics.setFillStyle("white");
            
            if (this.itemProps.subType && this.itemProps.subType === "healing") {
                graphics.fillText(this.itemProps.subType, this.topLeft + 5, this.topTop + 50);
            } else {
                graphics.fillText(this.itemProps.type, this.topLeft + 5, this.topTop + 50);
            }
            
            graphics.fillText("Damage: " + (Math.abs(this.itemProps.damageModifier) * basicDamage).toString(), this.topLeft + 5, this.topTop + 70);
            graphics.fillText("Swing Speed: " + this.itemProps.speedModifier.toString(), this.topLeft + 5, this.topTop + 90);
            
            var dps = (Math.abs(this.itemProps.damageModifier) * basicDamage ) / this.itemProps.speedModifier;
            graphics.fillText("DPS: " + dps.toString(), this.topLeft + 5, this.topTop + 110);
            
            graphics.fillText("Level: " + this.itemProps.level, this.topLeft + 5, this.topTop + 160);
            graphics.fillText("Gold: " + this.itemProps.gold, this.topLeft + 25, this.topTop + 180);
            
            if (!this.isWielded) {
                graphics.setFillStyle("white");
                var selectedMod = 0;
                if (physics.mouseIsInside(sellButton)) {
                    graphics.setFillStyle("gold");
                    selectedMod = 1;
                }
                graphics.fillText("Sell", sellButton.topLeft + selectedMod, sellButton.topTop + 20 + selectedMod);
            }
        } else if (this.characterProps) {
            graphics.drawSprite(this.characterProps.spriteProps, 
                Math.floor(this.ticksAlive / 4) % this.characterProps.spriteProps.frames, 
                this.topLeft + 5, 
                this.topTop + 5);
                
            graphics.setFillStyle("white");
            graphics.setFont(30, "Arial");
            if (physics.mouseIsInside(plusButton)) {
                graphics.setFillStyle("gold");
                graphics.fillText("+", plusButton.topLeft + 1, plusButton.topTop + 30 + 1);
            } else {
                graphics.fillText("+", plusButton.topLeft, plusButton.topTop + 30);
            }
                
            graphics.setFont(20, "Arial");
            graphics.setFillStyle("white");
            graphics.fillText("Infusion: " + this.characterProps.infusionType, this.topLeft + 40, this.topTop + 30);
            graphics.fillText("Gem: ", this.topLeft + 5, this.topTop + 60);
            graphics.setFillStyle(this.characterProps.gemAffinity);
            graphics.fillText(this.characterProps.gemAffinity, this.topLeft + 58, this.topTop + 60);
            graphics.setFillStyle("white");
            graphics.fillText("Health: " + this.characterProps.health.toString(), this.topLeft + 5, this.topTop + 80);
            graphics.fillText("Damage x: " + this.characterProps.damageMultiplier.toString(), this.topLeft + 5, this.topTop + 100);
            
            graphics.fillText("Level: " + this.characterProps.level, this.topLeft + 5, this.topTop + 160);
            graphics.fillText("XP: " + this.characterProps.xp, this.topLeft + 30, this.topTop + 180);
            
            if (!this.isWielded && !this.characterProps.keyCharacter) {
                graphics.setFillStyle("white");
                var selectedMod = 0;
                if (physics.mouseIsInside(sellButton)) {
                    graphics.setFillStyle("gold");
                    selectedMod = 1;
                }
                graphics.fillText("Retire", sellButton.topLeft + selectedMod, sellButton.topTop + 20 + selectedMod);
            }
        }
    }
    
    this.doActions = function() {
        this.ticksAlive++;
        
        if (this.characterProps) {
            for (var i = 0; i < dataStore.characters.length; i++) {
                if (dataStore.characters[i].id === this.characterProps.id) {
                    this.isWielded = true;
                }
            }
        }
        if (this.itemProps) {
            for (var i = 0; i < dataStore.characters.length; i++) {
                if (dataStore.characters[i].weapon.id === this.itemProps.id) {
                    this.isWielded = true;
                }
            }
        }
        
        if (mouseIsDown) {
            if (physics.mouseIsInside(plusButton)) {
                if (this.characterProps) {
                    if (dataStore.xp > 0) {
                        this.characterProps.xp++;
                        dataStore.xp--;
                        
                        this.tryLevellingCharacter();
                    }
                } else if (this.itemProps) {
                    if (dataStore.gold > 0) {
                        this.itemProps.gold++;
                        dataStore.gold--;
                        
                        this.tryLevellingItem();
                    }
                }
            }
            
            if (physics.mouseIsInside(sellButton)) {
                if (this.characterProps && !this.isWielded && !this.characterProps.keyCharacter) {
                    var xp = 0;
                    for (var i = this.characterProps.level; i > 0; i--) {
                        xp += i * i * 10;
                    }
                    
                    for (var i = 0; i < dataStore.inventory.characters.length; i++) {
                        if (dataStore.inventory.characters[i].id === this.characterProps.id) {
                            dataStore.inventory.characters.splice(i, 1);
                        }
                    }
                    
                    dataStore.xp += xp;
                    this.reset();
                    inventoryScreen.dropAndReInitialize();
                    audio.playSound("buttonclick");
                }
                if (this.itemProps && !this.isWielded) {
                    var gold = 0;
                    for (var i = this.itemProps.level; i > 0; i--) {
                        gold += i * i * 10;
                    }
                    
                    for (var i = 0; i < dataStore.inventory.items.length; i++) {
                        if (dataStore.inventory.items[i].id === this.itemProps.id) {
                            dataStore.inventory.items.splice(i, 1);
                        }
                    }
                    
                    dataStore.gold += gold;
                    this.reset();
                    inventoryScreen.dropAndReInitialize();
                    audio.playSound("buttonclick");
                }
            }
        }
    }
    
    this.setItem = function(itemProps) {
        this.reset();
        this.itemProps = itemProps;
        this.isWielded = false;
        
        for (var i = 0; i < dataStore.characters.length; i++) {
            if (dataStore.characters[i].weapon.id === this.itemProps.id) {
                this.isWielded = true;
            }
        }
    }
    
    this.setCharacter = function(characterProps) {
        this.reset();
        this.characterProps = characterProps;
        this.isWielded = false;
        
        for (var i = 0; i < dataStore.characters.length; i++) {
            if (dataStore.characters[i].id === this.characterProps.id) {
                this.isWielded = true;
            }
        }
    }
    
    this.tryLevellingCharacter = function() {
        var levelTimesTwo = (this.characterProps.level + 1) * 2;
        if (this.characterProps.xp > levelTimesTwo * 10) {
            this.characterProps.level++;
            this.characterProps.xp = 0;
            
            this.characterProps.damageMultiplier += levelTimesTwo * 0.1;
            this.characterProps.health += levelTimesTwo * 100;
        }
    }
    
    this.tryLevellingItem = function() {
        var levelTimesTwo = (this.itemProps.level + 1) * 2;
        if (this.itemProps.gold > levelTimesTwo * 10) {
            this.itemProps.level++;
            this.itemProps.gold = 0;
            
            this.itemProps.damageModifier += levelTimesTwo * 0.1;
        }
    }
    
    this.reset = function() {
        this.itemProps = null;
        this.characterProps = null;
    }
    
    ai.addObject(this);
    graphics.addObject(this);
}