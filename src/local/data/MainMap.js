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
    type: "magic ball"
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
    health: 10000,
    index: 0,
    actionMax: 90,
    actionDamage: 100,
    damageMultiplier: 1
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