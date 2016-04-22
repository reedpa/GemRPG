//var colors = ["blue", "green", "red", "purple", "yellow", "pink"];


var sword = {
    spriteProps: {
        sheetName: "items",
        leftIndex: 14,
        topIndex: 107,
        spriteSize: 16,
        frames: 1
    },
    type: "melee"
}

var axe = {
    spriteProps: {
        sheetName: "items",
        leftIndex: 15,
        topIndex: 92,
        spriteSize: 16,
        frames: 1
    },
    type: "melee"
}

var dagger = {
    spriteProps: {
        sheetName: "items",
        leftIndex: 4,
        topIndex: 97,
        spriteSize: 16,
        frames: 1
    },
    type: "thrown"
}

var staff = {
    spriteProps: {
        sheetName: "items",
        leftIndex: 7,
        topIndex: 104,
        spriteSize: 16,
        frames: 1
    },
    ammoProps: {
        spriteProps: {
            sheetName: "items",
            leftIndex: 4,
            topIndex: 73,
            spriteSize: 16,
            frames: 1
        }
    },
    type: "shooter"
}

var bow = {
    spriteProps: {
        sheetName: "items",
        leftIndex: 12,
        topIndex: 93,
        spriteSize: 16,
        frames: 1
    },
    ammoProps: {
        spriteProps: {
            sheetName: "items",
            leftIndex: 1,
            topIndex: 90,
            spriteSize: 16,
            frames: 1
        }
    },
    type: "shooter"
}



var starterParty = {
    characters: [
        {
            gemAffinity: "blue",
            weapon: dagger,
            spriteProps: {
                sheetName: "characters",
                leftIndex: 0,
                topIndex: 0,
                spriteSize: 32,
                frames: 4
            },
            health: 1000,
            index: 0,
            actionMax: 30,
            actionDamage: 100,
            damageMultiplier: 1
        },
        {
            gemAffinity: "green",
            weapon: sword,
            spriteProps: {
                sheetName: "characters",
                leftIndex: 1,
                topIndex: 0,
                spriteSize: 32,
                frames: 4
            },
            health: 1000,
            index: 1,
            actionMax: 60,
            actionDamage: 200,
            damageMultiplier: 1
        },
        {
            gemAffinity: "red",
            weapon: bow,
            spriteProps: {
                sheetName: "characters",
                leftIndex: 2,
                topIndex: 0,
                spriteSize: 32,
                frames: 4
            },
            health: 1000,
            index: 2,
            actionMax: 120,
            actionDamage: 500,
            damageMultiplier: 1
        },
        {
            gemAffinity: "pink",
            weapon: sword,
            spriteProps: {
                sheetName: "characters",
                leftIndex: 3,
                topIndex: 0,
                spriteSize: 32,
                frames: 4
            },
            health: 1000,
            index: 3,
            actionMax: 150,
            actionDamage: 750,
            damageMultiplier: 1
        },
        {
            gemAffinity: "yellow",
            weapon: axe,
            spriteProps: {
                sheetName: "characters",
                leftIndex: 4,
                topIndex: 0,
                spriteSize: 32,
                frames: 4
            },
            health: 1000,
            index: 4,
            actionMax: 180,
            actionDamage: 1000,
            damageMultiplier: 1
        },
        {
            gemAffinity: "purple",
            weapon: staff,
            spriteProps: {
                sheetName: "characters",
                leftIndex: 0,
                topIndex: 5,
                spriteSize: 32,
                frames: 4
            },
            health: 1000,
            index: 5,
            actionMax: 210,
            actionDamage: 2500,
            damageMultiplier: 1
        }
    ]
}