function ResetAllObjects() {
    graphics.graphicsObjects = null;
    ai.aiObjects = null;
    physics.physObjects = null;
    
    graphics = null;
    ai = null;
    physics = null;

    graphics = new Graphics();
    ai = new AI();
    physics = new Physics();
    interaction = new Interaction();
}