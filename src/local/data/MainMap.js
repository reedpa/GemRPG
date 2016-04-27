var deathSprite = {
    sheetName: "monsters",
    leftIndex: 4,
    topIndex: 9,
    spriteSize: 32,
    frames: 2
}

var targetSprite = {
    sheetName: "monsters",
    leftIndex: 4,
    topIndex: 10,
    spriteSize: 32,
    frames: 2
}

var mushroomWand = {
    spriteProps: {
        sheetName: "items",
        leftIndex: 12,
        topIndex: 111,
        spriteSize: 16,
        frames: 1
    },
    ammoProps: {
        spriteProps: {
            sheetName: "items",
            leftIndex: 1,
            topIndex: 86,
            spriteSize: 16,
            frames: 1
        }
    },
    sound: "magic_hit",
    damageModifier: 1.6,
    speedModifier: 0.8,
    id: 7,
    level: 2,
    gold: 0,
    type: "shooter"
}

var rebelMushroom = {
    gemAffinity: "green",
    weapon: copyJSONThing(mushroomWand),
    spriteProps: {
        sheetName: "rebel_monsters",
        leftIndex: 5,
        topIndex: 5,
        spriteSize: 32,
        frames: 2
    },
    health: 1400,
    index: 5,
    damageMultiplier: 1.4,
    level: 2,
    xp: 0,
    infusionType: "heal",
    id: 7
}

var mushroomShot = {
    ammoProps: {
        spriteProps: {
            sheetName: "items",
            leftIndex: 1,
            topIndex: 86,
            spriteSize: 16,
            frames: 1
        }
    },
    sound: "magic_hit",
    damageModifier: 1,
    speedModifier: 1.2,
    type: "magic ball"
}

var mushroomHeal = {
    ammoProps: {
        spriteProps: {
            sheetName: "items",
            leftIndex: 15,
            topIndex: 76,
            spriteSize: 16,
            frames: 1
        }
    },
    sound: "heal",
    damageModifier: -1,
    speedModifier: 1.2,
    type: "magic ball",
    subType: "healing"
}

var badMushroom = {
    gemAffinity: "green",
    weapon: mushroomShot,
    spriteProps: {
        sheetName: "monsters",
        leftIndex: 4,
        topIndex: 4,
        spriteSize: 32,
        frames: 2
    },
    health: 1000,
    index: 0,
    damageMultiplier: 1,
    goldDrop: 5,
    xpDrop: 2,
    loot: [
        {
            chanceInOneThousand: 10,
            characterProps: rebelMushroom
        },
        {
            chanceInOneThousand: 20,
            itemProps: mushroomWand
        }
    ]
}

var goodMushroom = {
    gemAffinity: "pink",
    weapon: mushroomHeal,
    spriteProps: {
        sheetName: "monsters",
        leftIndex: 4,
        topIndex: 3,
        spriteSize: 32,
        frames: 2
    },
    sound: "heal",
    health: 1000,
    index: 0,
    damageMultiplier: 1,
    goldDrop: 6,
    xpDrop: 8,
    loot: []
}

var mainMap = {
    image: "mainmap",
    startingLocation: [1140, 200],
    regions: [ 
        {
            name: "testRegion",
            image: null,
            topLeft: 1200,
            topTop: 250,
            width: 300,
            height: 300,
            color: "red",
            encounters: [
                {
                    weight: 1,
                    board: {
                        backDropImage: "background_green",
                        boardImage: "board_green"
                    },
                    enemies: [
                        badMushroom,
                        badMushroom,
                        goodMushroom,
                        badMushroom,
                        badMushroom,
                        badMushroom
                    ]
                },
                {
                    weight: 1,
                    board: {
                        backDropImage: "background_green",
                        boardImage: "board_green"
                    },
                    enemies: [
                        badMushroom,
                        badMushroom,
                        badMushroom
                    ]
                },
                {
                    weight: 1,
                    board: {
                        backDropImage: "background_green",
                        boardImage: "board_green"
                    },
                    enemies: [
                        badMushroom,
                        badMushroom,
                        badMushroom,
                        badMushroom,
                        badMushroom,
                        badMushroom,
                        badMushroom,
                        badMushroom,
                        badMushroom
                    ]
                }
            ]
        }, {
            name: "testBlockingRegion",
            image: null,
            topLeft: 1200,
            topTop: 0,
            width: 300,
            height: 200,
            color: "blue",
            isBlocker: true
        }
        
    ]
}