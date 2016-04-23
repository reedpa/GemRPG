var deathSprite = {
    sheetName: "monsters",
    leftIndex: 4,
    topIndex: 9,
    spriteSize: 32,
    frames: 2
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
    xpDrop: 2
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
    xpDrop: 8
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