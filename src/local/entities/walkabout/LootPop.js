function LootPop(lootProps) {
    this.zindex = lootPopZindex;
    this.topTop = lootProps.topTop;
    this.topLeft = lootProps.topLeft;
    this.loot = lootProps.loot;

    this.id = "lootPop_" + GetGuid();

    this.duration = 33;
    this.ticksAlive = 0;

    this.upwardSpeed = -155;

    this.doActions = function() {
        this.ticksAlive++;

        this.topTop += (this.upwardSpeed / 33);

        this.upwardSpeed += 8;

        if (this.ticksAlive > this.duration) {
            ai.removeObject(this);
            graphics.removeObject(this);
        }
    };

    this.draw = function() {
        graphics.drawSprite(this.loot.spriteProps, 0, adjustXForWalkabout(this.topLeft), adjustYForWalkabout(this.topTop));
        if (lootProps.gold) {
            graphics.setFillStyle("gold");
            graphics.setFont(30, "Arial");
            graphics.fillText(lootProps.gold.toString(), adjustXForWalkabout(this.topLeft + 16), adjustYForWalkabout(this.topTop));
        }
    };

    if (lootProps.gold) {
        dataStore.gold += lootProps.gold;
    } else {
        dataStore.inventory.items.push(this.loot);
    }
    

    ai.addObject(this);
    graphics.addObject(this);
}