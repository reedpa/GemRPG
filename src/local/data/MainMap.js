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
    type: "shooter",
    name: "Mushroom Wand"
}

var spiderWebThrown = {
    spriteProps: {
        sheetName: "items",
        leftIndex: 7,
        topIndex: 74,
        spriteSize: 16,
        frames: 1
    },
    sound: "magic_hit",
    damageModifier: 1.5,
    speedModifier: 0.7,
    id: 8,
    level: 2,
    gold: 0,
    type: "thrown",
    name: "Spider Web"
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

var mouseBite = {
    type: "melee",
    spriteProps: {
        sheetName: "items",
        leftIndex: 14,
        topIndex: 12,
        spriteSize: 16,
        frames: 1
    },
    damageModifier: 0.8,
    speedModifier: 1.4,
    invisibleWhenHeld: true
}

var badMouse = {
    gemAffinity: "blue",
    weapon: mouseBite,
    spriteProps: {
        sheetName: "monsters",
        leftIndex: 1,
        topIndex: 0,
        spriteSize: 32,
        frames: 2
    },
    health: 500,
    index: 0,
    damageMultiplier: 1,
    goldDrop: 3,
    xpDrop: 3,
    loot: []
}

var spiderWeb = {
    type: "magic ball",
    ammoProps: {
        spriteProps: {
            sheetName: "items",
            leftIndex: 7,
            topIndex: 74,
            spriteSize: 16,
            frames: 1
        }
    },
    damageModifier: 1,
    speedModifier: 1
}

var badSpider = {
    gemAffinity: "purple",
    weapon: spiderWeb,
    spriteProps: {
        sheetName: "monsters",
        leftIndex: 0,
        topIndex: 0,
        spriteSize: 32,
        frames: 2
    },
    health: 1000,
    index: 0,
    damageMultiplier: 1,
    goldDrop: 6,
    xpDrop: 6,
    loot: [
            {
                chanceInOneThousand: 50,
                itemProps: spiderWebThrown
            }
        ]
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
    xpDrop: 5,
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
    health: 1200,
    index: 0,
    damageMultiplier: 1,
    goldDrop: 6,
    xpDrop: 8,
    loot: [
        {
            chanceInOneThousand: 50,
            characterProps: rebelMushroom
        },
        {
            chanceInOneThousand: 100,
            itemProps: mushroomWand
        }
    ]
}

var mainMap = {
    image: "mainmap",
    startingLocation: [820, 950],
    regions: [ 
        {
            name: "treeOverlay",
            image: "mainmap_trees",
            decorative: true,
            topLeft: 0,
            topTop: 0,
            width: 4000,
            height: 2000,
            zindex: 450
        }, {
            name: "mushroomRegion",
            image: null,
            topLeft: 2604,
            topTop: 0,
            width: 700,
            height: 2000,
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
            name: "easyRegion",
            image: null,
            topLeft: 1300,
            topTop: 250,
            width: 1200,
            height: 500,
            color: "red",
            encounters: [
                {
                    weight: 2,
                    board: {
                        backDropImage: "background_green",
                        boardImage: "board_green"
                    },
                    enemies: [
                        badMouse
                    ]
                },
                {
                    weight: 1,
                    board: {
                        backDropImage: "background_green",
                        boardImage: "board_green"
                    },
                    enemies: [
                        badMouse,
                        badMouse,
                        badMouse
                    ]
                }
            ]
        }, { 
            name: "leftRegion",
            image: null,
            topLeft: 300,
            topTop: 1100,
            width: 2400,
            height: 1000,
            color: "red",
            encounters: [
                {
                    weight: 2,
                    board: {
                        backDropImage: "background_green",
                        boardImage: "board_green"
                    },
                    enemies: [
                        badMouse,
                        badSpider
                    ]
                },
                {
                    weight: 2,
                    board: {
                        backDropImage: "background_green",
                        boardImage: "board_green"
                    },
                    enemies: [
                        badMouse,
                        badMouse,
                        badMouse,
                        badSpider
                    ]
                },
                {
                    weight: 1,
                    board: {
                        backDropImage: "background_green",
                        boardImage: "board_green"
                    },
                    enemies: [
                        badSpider,
                        badSpider,
                        badSpider,
                        badSpider
                    ]
                },
                {
                    weight: 1,
                    board: {
                        backDropImage: "background_green",
                        boardImage: "board_green"
                    },
                    enemies: [
                        badSpider,
                        badSpider,
                        badSpider,
                        badMouse,
                        badMouse,
                        badMouse
                    ]
                }
            ]
        }, {
            name: "treesTopBorder",
            image: null,
            topLeft: 0,
            topTop: 0,
            width: 4000,
            height: 350,
            color: "blue",
            isBlocker: true
        }, {
            name: "treesLeftBorder",
            image: null,
            topLeft: 0,
            topTop: 0,
            width: 350,
            height: 2000,
            color: "blue",
            isBlocker: true
        }, {
            name: "treesBottomBorder",
            image: null,
            topLeft: 0,
            topTop: 1650,
            width: 4000,
            height: 200,
            color: "blue",
            isBlocker: true
        }, {
            name: "treesRightBorder",
            image: null,
            topLeft: 3680,
            topTop: 0,
            width: 40,
            height: 2000,
            color: "blue",
            isBlocker: true
        }, {
            name: "ocean",
            image: null,
            topLeft: 0,
            topTop: 0,
            width: 800,
            height: 925,
            color: "blue",
            isBlocker: true
        }, {
            name: "beachTreesleft",
            image: null,
            topLeft: 0,
            topTop: 900,
            width: 370,
            height: 925,
            color: "blue",
            isBlocker: true
        }, {
            name: "beachTreesbottom",
            image: null,
            topLeft: 00,
            topTop: 1080,
            width: 1500,
            height: 50,
            color: "blue",
            isBlocker: true
        }, {
            name: "beachTreestop",
            image: null,
            topLeft: 700,
            topTop: 0,
            width: 500,
            height: 450,
            color: "blue",
            isBlocker: true
        }, {
            name: "beachTreesright",
            image: null,
            topLeft: 1190,
            topTop: 810,
            width: 280,
            height: 350,
            color: "blue",
            isBlocker: true
        }, {
            name: "beachTreesRightBump",
            image: null,
            topLeft: 1085,
            topTop: 845,
            width: 400,
            height: 90,
            color: "blue",
            isBlocker: true
        }, {
            name: "beachTreesrightright",
            image: null,
            topLeft: 1400,
            topTop: 710,
            width: 150,
            height: 160,
            color: "blue",
            isBlocker: true
        }, {
            name: "firstCorridorTreeBottom",
            image: null,
            topLeft: 1550,
            topTop: 730,
            width: 620,
            height: 80,
            color: "blue",
            isBlocker: true
        }, {
            name: "firstCorridorTreeBottomBottom",
            image: null,
            topLeft: 1915,
            topTop: 810,
            width: 290,
            height: 90,
            color: "blue",
            isBlocker: true
        }, {
            name: "firstCorridorTreeBottomBottomBump",
            image: null,
            topLeft: 2205,
            topTop: 850,
            width: 80,
            height: 70,
            color: "blue",
            isBlocker: true
        }, {
            name: "firstTreeCluster",
            image: null,
            topLeft: 1575,
            topTop: 510,
            width: 100,
            height: 100,
            color: "blue",
            isBlocker: true
        }, {
            name: "secondTreeCluster",
            image: null,
            topLeft: 1940,
            topTop: 470,
            width: 100,
            height: 100,
            color: "blue",
            isBlocker: true
        }, {
            name: "secretTreesLeft",
            image: null,
            topLeft: 2490,
            topTop: 0,
            width: 300,
            height: 830,
            color: "blue",
            isBlocker: true
        }, {
            name: "secretTreesLeftBump",
            image: null,
            topLeft: 2380,
            topTop: 640,
            width: 120,
            height: 70,
            color: "blue",
            isBlocker: true
        }, {
            name: "secretTreesLeftBottom",
            image: null,
            topLeft: 2515,
            topTop: 830,
            width: 100,
            height: 120,
            color: "blue",
            isBlocker: true
        }, {
            name: "secretTreesLeftBottomBottom",
            image: null,
            topLeft: 2585,
            topTop: 950,
            width: 100,
            height: 120,
            color: "blue",
            isBlocker: true
        }, {
            name: "thirdTreeCluster",
            image: null,
            topLeft: 2090,
            topTop: 1095,
            width: 410,
            height: 70,
            color: "blue",
            isBlocker: true
        }, {
            name: "thirdTreeClusterBump",
            image: null,
            topLeft: 2045,
            topTop: 1060,
            width: 70,
            height: 40,
            color: "blue",
            isBlocker: true
        }, {
            name: "thirdTreeClusterBottomBump",
            image: null,
            topLeft: 2090,
            topTop: 1160,
            width: 70,
            height: 40,
            color: "blue",
            isBlocker: true
        }, {
            name: "thirdTreeClusterBottomRightBump",
            image: null,
            topLeft: 2410,
            topTop: 1160,
            width: 80,
            height: 50,
            color: "blue",
            isBlocker: true
        }, {
            name: "treePeninsula",
            image: null,
            topLeft: 1720,
            topTop: 810,
            width: 100,
            height: 140,
            color: "blue",
            isBlocker: true
        }, {
            name: "treePeninsulaTwo",
            image: null,
            topLeft: 1780,
            topTop: 950,
            width: 80,
            height: 140,
            color: "blue",
            isBlocker: true
        }, {
            name: "treePeninsulaThree",
            image: null,
            topLeft: 1810,
            topTop: 1050,
            width: 80,
            height: 140,
            color: "blue",
            isBlocker: true
        }, {
            name: "rockTrees",
            image: null,
            topLeft: 1460,
            topTop: 970,
            width: 80,
            height: 190,
            color: "blue",
            isBlocker: true
        }, {
            name: "rockTreesTwo",
            image: null,
            topLeft: 1530,
            topTop: 1130,
            width: 120,
            height: 90,
            color: "blue",
            isBlocker: true
        }, {
            name: "rockTreesThree",
            image: null,
            topLeft: 1620,
            topTop: 1220,
            width: 80,
            height: 90,
            color: "blue",
            isBlocker: true
        }, {
            name: "rockTreesFour",
            image: null,
            topLeft: 1610,
            topTop: 1310,
            width: 80,
            height: 130,
            color: "blue",
            isBlocker: true
        }, {
            name: "treeMazeTwoBottom",
            image: null,
            topLeft: 1350,
            topTop: 1280,
            width: 60,
            height: 500,
            color: "blue",
            isBlocker: true
        }, {
            name: "treeMazeThreeTop",
            image: null,
            topLeft: 1040,
            topTop: 1120,
            width: 80,
            height: 200,
            color: "blue",
            isBlocker: true
        }, {
            name: "treeMazeThreeMiddle",
            image: null,
            topLeft: 1080,
            topTop: 1320,
            width: 80,
            height: 100,
            color: "blue",
            isBlocker: true
        }, {
            name: "treeMazeThreeBottom",
            image: null,
            topLeft: 1140,
            topTop: 1400,
            width: 80,
            height: 100,
            color: "blue",
            isBlocker: true
        }, {
            name: "treeMazeFourBottom",
            image: null,
            topLeft: 710,
            topTop: 1550,
            width: 300,
            height: 100,
            color: "blue",
            isBlocker: true
        }, {
            name: "treeMazeFourMiddle",
            image: null,
            topLeft: 650,
            topTop: 1350,
            width: 250,
            height: 200,
            color: "blue",
            isBlocker: true
        }, {
            name: "treeMazeFourTop",
            image: null,
            topLeft: 550,
            topTop: 1300,
            width: 100,
            height: 80,
            color: "blue",
            isBlocker: true
        }, {
            name: "orangeTreesBottom",
            image: null,
            topLeft: 2020,
            topTop: 1540,
            width: 80,
            height: 150,
            color: "blue",
            isBlocker: true
        }, {
            name: "orangeTreesMiddle",
            image: null,
            topLeft: 2120,
            topTop: 1390,
            width: 200,
            height: 80,
            color: "blue",
            isBlocker: true
        }, {
            name: "fairyTreesBottom",
            image: null,
            topLeft: 2440,
            topTop: 1490,
            width: 200,
            height: 180,
            color: "blue",
            isBlocker: true
        }, {
            name: "fairyTreesMiddle",
            image: null,
            topLeft: 2480,
            topTop: 1400,
            width: 225,
            height: 100,
            color: "blue",
            isBlocker: true
        }, {
            name: "fairyTreesMiddleBridge",
            image: null,
            topLeft: 2680,
            topTop: 1400,
            width: 100,
            height: 40,
            color: "blue",
            isBlocker: true
        }, {
            name: "fairyTreesMiddleTop",
            image: null,
            topLeft: 2740,
            topTop: 1340,
            width: 100,
            height: 80,
            color: "blue",
            isBlocker: true
        }, {
            name: "bigBottomTreesBottom",
            image: null,
            topLeft: 2975,
            topTop: 1480,
            width: 100,
            height: 200,
            color: "blue",
            isBlocker: true
        }, {
            name: "bigBottomTreesMiddle",
            image: null,
            topLeft: 3050,
            topTop: 1280,
            width: 100,
            height: 200,
            color: "blue",
            isBlocker: true
        }, {
            name: "bigBottomTreesMiddleHigh",
            image: null,
            topLeft: 3125,
            topTop: 1180,
            width: 150,
            height: 100,
            color: "blue",
            isBlocker: true
        }, {
            name: "bigBottomTreesHigh",
            image: null,
            topLeft: 3235,
            topTop: 1110,
            width: 50,
            height: 75,
            color: "blue",
            isBlocker: true
        }, {
            name: "bottomRightCorner",
            image: null,
            topLeft: 3500,
            topTop: 1500,
            width: 200,
            height: 200,
            color: "blue",
            isBlocker: true
        }, {
            name: "bottomRightBlockingArmBottom",
            image: null,
            topLeft: 3385,
            topTop: 1475,
            width: 200,
            height: 25,
            color: "blue",
            isBlocker: true
        }, {
            name: "bottomRightBlockingArmMiddle",
            image: null,
            topLeft: 3380,
            topTop: 1400,
            width: 50,
            height: 75,
            color: "blue",
            isBlocker: true
        }, {
            name: "bottomRightBlockingArmMiddleHigh",
            image: null,
            topLeft: 3410,
            topTop: 1325,
            width: 50,
            height: 75,
            color: "blue",
            isBlocker: true
        }, {
            name: "bottomRightBlockingArmHigh",
            image: null,
            topLeft: 3430,
            topTop: 1250,
            width: 50,
            height: 75,
            color: "blue",
            isBlocker: true
        }, {
            name: "mushroomsRightSide",
            image: null,
            topLeft: 3480,
            topTop: 1020,
            width: 250,
            height: 25,
            color: "blue",
            isBlocker: true
        }, {
            name: "bossTrees",
            image: null,
            topLeft: 2950,
            topTop: 350,
            width: 300,
            height: 500,
            color: "blue",
            isBlocker: true
        }, {
            name: "bossTreesMiddle",
            image: null,
            topLeft: 2950,
            topTop: 850,
            width: 200,
            height: 100,
            color: "blue",
            isBlocker: true
        }, {
            name: "bossTreesBottomMiddle",
            image: null,
            topLeft: 2950,
            topTop: 950,
            width: 20,
            height: 125,
            color: "blue",
            isBlocker: true
        }, {
            name: "bossTreesBottom",
            image: null,
            topLeft: 2900,
            topTop: 1050,
            width: 75,
            height: 50,
            color: "blue",
            isBlocker: true
        }, {
            name: "footStepsBeach",
            image: null,
            topLeft: 820,
            topTop: 675,
            width: 50,
            height: 50,
            color: "green",
            isBlocker: false,
            footstepsColor: "blue",
            footstepsDuration: 100
        }, {
            name: "footStepsBeach2",
            image: null,
            topLeft: 730,
            topTop: 950,
            width: 50,
            height: 50,
            color: "green",
            isBlocker: false,
            footstepsColor: "blue",
            footstepsDuration: 100
        }, {
            name: "footstepsBeachLeave",
            image: null,
            topLeft: 1200,
            topTop: 490,
            width: 50,
            height: 350,
            color: "green",
            isBlocker: false,
            footstepsColor: "yellow",
            footstepsDuration: 150
        }, {
            name: "footstepsPond",
            image: null,
            topLeft: 2200,
            topTop: 510,
            width: 80,
            height: 100,
            color: "green",
            isBlocker: false,
            footstepsColor: "blue",
            footstepsDuration: 100
        }, {
            name: "footstepsPondRight",
            image: null,
            topLeft: 2280,
            topTop: 550,
            width: 50,
            height: 60,
            color: "green",
            isBlocker: false,
            footstepsColor: "blue",
            footstepsDuration: 100
        }, {
            name: "footstepsPondLeft",
            image: null,
            topLeft: 2140,
            topTop: 450,
            width: 50,
            height: 65,
            color: "green",
            isBlocker: false,
            footstepsColor: "blue",
            footstepsDuration: 100
        }, {
            name: "footstepsPondLeftBottom",
            image: null,
            topLeft: 2140,
            topTop: 515,
            width: 50,
            height: 65,
            color: "green",
            isBlocker: false,
            footstepsColor: "blue",
            footstepsDuration: 100
        }, {
            name: "footstepsPondLeftRight",
            image: null,
            topLeft: 2200,
            topTop: 465,
            width: 50,
            height: 65,
            color: "green",
            isBlocker: false,
            footstepsColor: "blue",
            footstepsDuration: 100
        }, {
            name: "orangeOne",
            image: null,
            topLeft: 1910,
            topTop: 1345,
            width: 50,
            height: 50,
            color: "green",
            isBlocker: false,
            footstepsColor: "orange",
            footstepsDuration: 100
        }, {
            name: "orangeTwo",
            image: null,
            topLeft: 1925,
            topTop: 1400,
            width: 50,
            height: 50,
            color: "green",
            isBlocker: false,
            footstepsColor: "orange",
            footstepsDuration: 100
        }, {
            name: "orangeThree",
            image: null,
            topLeft: 1790,
            topTop: 1400,
            width: 50,
            height: 50,
            color: "green",
            isBlocker: false,
            footstepsColor: "orange",
            footstepsDuration: 100
        }, {
            name: "orangeFour",
            image: null,
            topLeft: 1890,
            topTop: 1460,
            width: 50,
            height: 50,
            color: "green",
            isBlocker: false,
            footstepsColor: "orange",
            footstepsDuration: 100
        }, {
            name: "orangeFive",
            image: null,
            topLeft: 1895,
            topTop: 1500,
            width: 50,
            height: 50,
            color: "green",
            isBlocker: false,
            footstepsColor: "orange",
            footstepsDuration: 100
        }, {
            name: "orangeSix",
            image: null,
            topLeft: 1855,
            topTop: 1485,
            width: 50,
            height: 50,
            color: "green",
            isBlocker: false,
            footstepsColor: "orange",
            footstepsDuration: 100
        }, {
            name: "orangeSeven",
            image: null,
            topLeft: 1815,
            topTop: 1485,
            width: 50,
            height: 50,
            color: "green",
            isBlocker: false,
            footstepsColor: "orange",
            footstepsDuration: 100
        }, {
            name: "orangeEight",
            image: null,
            topLeft: 1840,
            topTop: 1535,
            width: 50,
            height: 50,
            color: "green",
            isBlocker: false,
            footstepsColor: "orange",
            footstepsDuration: 100
        }, {
            name: "orangeNine",
            image: null,
            topLeft: 1760,
            topTop: 1550,
            width: 50,
            height: 50,
            color: "green",
            isBlocker: false,
            footstepsColor: "orange",
            footstepsDuration: 100
        }
    ]
}