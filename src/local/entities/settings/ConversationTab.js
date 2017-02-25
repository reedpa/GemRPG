function ConversationTab() {
    this.topLeft = 0;
    this.topTop = 50;
    this.zindex = 10;
    this.order = 10;

    this.draw = function() {
        if (!this.active) {
            return;
        }

        graphics.setStrokeStyle("gold");
        graphics.strokeRect(this.topLeft, this.topTop, graphics.getRightBound() - this.topLeft, graphics.getBottomBound() - this.topTop);
    }

    this.doActions = function() {
        if (!this.active) {
            return;
        }
    }

    ai.addObject(this);
    graphics.addObject(this);
}