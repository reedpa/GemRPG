function Inventory() {
    this.zindex = inventoryButtonZIndex;
    this.ticksAlive = 0;
    var inventoryButton = {
        spriteProps: {
            sheetName: "items",
            leftIndex: 0,
            topIndex: 58,
            spriteSize: 16,
            frames: 1
        },
        topLeft: 10, 
        topTop: 540, 
        height: 30, 
        width: 30
    };


    this.doActions = function() {
        this.ticksAlive++;
        if (mouseCameDown) {
            if (physics.mouseIsInside(inventoryButton)) {
                ResetAllObjects();
                inventoryScreen = new InventoryScreen();

                dataStore.lastLeft = player.topLeft;
                dataStore.lastTop = player.topTop;
            }
        }
    }

    this.draw = function() {
        var jiggler = 0;
        if (physics.mouseIsInside(inventoryButton)) {
            jiggler = 1;
        }
        graphics.drawSpriteZoomed(inventoryButton.spriteProps, 0, inventoryButton.topLeft + jiggler, inventoryButton.topTop + jiggler, 2);
        graphics.setFillStyle("black");
        graphics.setFont(30, "Arial");
        graphics.fillText("Gold: " + dataStore.gold, 10, 600);
        graphics.fillText("XP: " + dataStore.xp, 10, 630);
    }

    ai.addObject(this);
    graphics.addObject(this);
}