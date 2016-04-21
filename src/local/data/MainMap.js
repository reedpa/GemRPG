
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
                        {
                            index: 0,
                            image: "pink",
                            actionMax: 90,
                            health: 10000
                        },
                        {
                            index: 1,
                            image: "green",
                            actionMax: 120,
                            health: 10000
                        }
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