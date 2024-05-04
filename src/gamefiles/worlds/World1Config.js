const World1Config = {
    backgroundPositions: [
        {x: 960, y: -1024},
        {x: 2880, y: -1024},
        {x: 4800, y: -1024},
    ],
    GroundPositions: [
        {x: 960, y: -20},
        {x: 2880, y: -20},
        {x: 4800, y: -20},
    ],
    PlantsPositions : [
        {x: 960, y: -40},
        {x: 2880, y: -40},
        {x: 4800, y: -40},
    ],
    CloudsPosistions: [
        {x: 960, y: -1024},
        {x: 2880, y: -1024},
        {x: 4800, y: -1024},
    ],
    Berge: [
        {x: 300, y: -450},
        {x: 700, y: -150},
        {x: 1100, y: -450},
        {x: 1690, y: -250},

    ],
    WindFields: [
        {posx: 960, posY: -450, width: 1920, height: 200, direction: "RIGHT", speed: 30},
        {posx: 960, posY: -900, width: 1920, height: 200, direction: "LEFT", speed: -30},
    ]

};

export default World1Config;