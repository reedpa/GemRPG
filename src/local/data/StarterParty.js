//var colors = ["blue", "green", "red", "purple", "yellow", "pink"];
var basicDamage = 10;
var basicSpeed = 32;

var sword = {
    spriteProps: {
        sheetName: "items",
        leftIndex: 14,
        topIndex: 107,
        spriteSize: 16,
        frames: 1
    },
    sound: "sword_hit",
    damageModifier: 1,
    speedModifier: 1,
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
    sound: "axe_hit",
    damageModifier: 1.5,
    speedModifier: 1.5,
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
    sound: "dagger_hit",
    damageModifier: 0.8,
    speedModifier: 0.5,
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
    sound: "magic_hit",
    damageModifier: 1.4,
    speedModifier: 1.4, 
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
    sound: "bow_hit",
    damageModifier: 1.2,
    speedModifier: 1.2,
    type: "shooter"
}

var healing = {
    spriteProps: {
        sheetName: "items",
        leftIndex: 15,
        topIndex: 76,
        spriteSize: 16,
        frames: 1
    },
    sound: "heal",
    damageModifier: -1,
    speedModifier: 0.8,
    type: "thrown",
    subType: "healing"
}

var starterInventory = [
    sword,
    axe,
    bow,
    healing,
    dagger,
    staff,
    JSON.parse(JSON.stringify(sword)),
    JSON.parse(JSON.stringify(sword)),
    JSON.parse(JSON.stringify(sword)),
    JSON.parse(JSON.stringify(sword)),
    JSON.parse(JSON.stringify(sword)),
    JSON.parse(JSON.stringify(sword)),
    JSON.parse(JSON.stringify(sword)),
    JSON.parse(JSON.stringify(sword)),
    JSON.parse(JSON.stringify(sword)),
    JSON.parse(JSON.stringify(sword)),
    JSON.parse(JSON.stringify(sword)),
    JSON.parse(JSON.stringify(sword)),
    JSON.parse(JSON.stringify(sword)),
    JSON.parse(JSON.stringify(sword))
]

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
            damageMultiplier: 1
        },
        {
            gemAffinity: "pink",
            weapon: healing,
            spriteProps: {
                sheetName: "characters",
                leftIndex: 2,
                topIndex: 7,
                spriteSize: 32,
                frames: 4
            },
            health: 1000,
            index: 3,
            damageMultiplier: 1
        },
        {
            gemAffinity: "red",
            weapon: axe,
            spriteProps: {
                sheetName: "characters",
                leftIndex: 3,
                topIndex: 0,
                spriteSize: 32,
                frames: 4
            },
            health: 1000,
            index: 2,
            damageMultiplier: 1
        },
        {
            gemAffinity: "yellow",
            weapon: bow,
            spriteProps: {
                sheetName: "characters",
                leftIndex: 4,
                topIndex: 0,
                spriteSize: 32,
                frames: 4
            },
            health: 1000,
            index: 4,
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
            damageMultiplier: 1
        }
    ]
}