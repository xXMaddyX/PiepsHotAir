const tileWidth = 1920
const calcTilePosX = (actualTilePos) => {
    return actualTilePos + 960;
};

const World1Config = {
    calcTilePosX,
    tileWidth,
    backgroundPositions: [
        {x: calcTilePosX(0), y: -1024},
        {x: calcTilePosX(tileWidth), y: -1024},
        {x: calcTilePosX(tileWidth * 2), y: -1024},
    ],
    GroundPositions: [
        {x: calcTilePosX(0), y: -20},
        {x: calcTilePosX(tileWidth), y: -20},
        {x: calcTilePosX(tileWidth * 2), y: -20},
    ],
    PlantsPositions : [
        {x: calcTilePosX(0), y: -40},
        {x: calcTilePosX(tileWidth), y: -40},
        {x: calcTilePosX(tileWidth * 2), y: -40},
    ],
    CloudsPosistions: [
        {x: calcTilePosX(0), y: -1324},
        {x: calcTilePosX(tileWidth), y: -1324},
        {x: calcTilePosX(tileWidth * 2), y: -1324},
        {x: calcTilePosX(tileWidth * 3), y: -1324},
    ],
    Berge: [
        {x: 300, y: -450},
        {x: 700, y: -150},
        {x: 1100, y: -450},
        {x: 1690, y: -250},

    ],
    HochausPosition: [
        {x: 2400, y: -350}
    ],
    SmallHousePositions: [
        {x: 0, y:0},
    ],
    WindFields: [
        {posx: calcTilePosX(0), posY: -550, width: 1920, height: 200, direction: "RIGHT", speed: 30},
        {posx: calcTilePosX(0), posY: -1100, width: 1520, height: 200, direction: "LEFT", speed: -30},
        {posx: calcTilePosX(1920) - 100, posY: -1100, width: 1920, height: 200, direction: "RIGHT", speed: 30},
    ],
    PlanePositions: [
        {x: 6000, y: -700},
        //{x: 5000, y: -900}
    ],
    ThunderCloudePositions: [
        {x: 2000, y: -500},
        {x: 4000, y: -1000},
        {x: 6000, y: -800},
    ],
};

export default World1Config;