const World1Config = {
    backgroundPositions: [
        {x: 960, y: -512},
        {x: 2880, y: -512},
        {x: 4800, y: -512},
    ],
    GroundPositions: [
        {x: 960, y: 1000},
        {x: 2880, y: 1000},
        {x: 4800, y: 1000},
    ],
    PlantsPositions : [
        {x: 960, y: 975},
        {x: 2880, y: 975},
        {x: 4800, y: 975},
    ],
    CloudsPosistions: [
        {x: 960, y: -512},
        {x: 2880, y: -512},
        {x: 4800, y: -512},
    ],
    WindFields: [
        {posx: 960, posY: 500, width: 1920, height: 200, direction: "RIGHT", speed: 20},
        {posx: 960, posY: 0, width: 1920, height: 200, direction: "LEFT", speed: -20},
    ]

};

export default World1Config;