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

    var conversationButton = {
        spriteProps: {
            sheetName: "items",
            leftIndex: 0,
            topIndex: 52,
            spriteSize: 16,
            frames: 1
        },
        topLeft: 50, 
        topTop: 540, 
        height: 32, 
        width: 32
    };


    this.doActions = function() {
        this.ticksAlive++;
        if (mouseCameDown) {
            if (physics.mouseIsInside(inventoryButton)) {
                ResetAllObjects();
                inventoryScreen = new InventoryScreen();

                dataStore.lastLeft = player.topLeft;
                dataStore.lastTop = player.topTop;
            } else if (physics.mouseIsInside(conversationButton)) {
                ResetAllObjects();
                conversationLog = new ConversationLog();

                dataStore.lastLeft = player.topLeft;
                dataStore.lastTop = player.topTop;
            }
        }
    }

    this.draw = function() {
        var inventoryJiggler = 0;
        if (physics.mouseIsInside(inventoryButton)) {
            inventoryJiggler = 1;
        }
        var conversationJiggler = 0;
        if (physics.mouseIsInside(conversationButton)) {
            conversationJiggler = 1;
        }
        graphics.drawSpriteZoomed(inventoryButton.spriteProps, 0, inventoryButton.topLeft + inventoryJiggler, inventoryButton.topTop + inventoryJiggler, 2);
        graphics.drawSpriteZoomed(conversationButton.spriteProps, 0, conversationButton.topLeft + conversationJiggler, conversationButton.topTop + conversationJiggler, 2);
        //graphics.drawImage(conversationButton.image, conversationButton.topLeft + conversationJiggler, conversationButton.topTop + conversationJiggler, conversationButton.width, conversationButton.height);
        graphics.setFillStyle("black");
        graphics.setFont(30, "Arial");
        graphics.fillText("Gold: " + dataStore.gold, 10, 600);
        graphics.fillText("XP: " + dataStore.xp, 10, 630);
    }

    ai.addObject(this);
    graphics.addObject(this);
}