const fs = require("fs");
const INPUT = "ExpertPlusStandard.dat";
const OUTPUT = "ExpertPlusStandard.dat";
let difficulty = JSON.parse(fs.readFileSync(INPUT));

difficulty._customData = { _pointDefinitions: [], _customEvents: [], _environment: [] };

const _customData = difficulty._customData;
const _obstacles = difficulty._obstacles;
const _notes = difficulty._notes;
const _customEvents = _customData._customEvents;
const _pointDefinitions = _customData._pointDefinitions;
const _environment = _customData._environment;
var halfJumpDuration = 3;


function Random(min, max) {
    max++;
    return Math.random() * (max - min) + min;
};

function Duration(dura) {
    return (dura / 2) - halfJumpDuration;
};

//Notes
var randomif5 = 0, randomNoteX1 = 0, randomNoteZ1 = 0;
for (let loopNote1 = 0; loopNote1 < 50; loopNote1++) {
    randomNoteX1 = Random(-50, 50)
    if (randomNoteX1 > -5 && randomNoteX1 < 5) {
        randomif5 = Math.floor(Random(0, 1))
        if (randomif5 = 1) {
            randomNoteX1 = randomNoteX1 + Random(5, 10);
        } else
            if (randomif5 = 0) {
                randomNoteX1 = randomNoteX1 + Random(-10, -15);
            }
    }
    randomNoteZ1 = Random(0, 100);
    for (let loopNote2 = 0; loopNote2 < 10; loopNote2++) {
        _notes.push(
            {
                "_time": 170 + (loopNote1 / 2),
                "_lineIndex": 2,
                "_lineLayer": 0,
                "_type": 1,
                "_cutDirection": 1,
                "_customData": {
                    _fake: true,
                    _track: ["checkingpath1"],
                    _interactable: false,
                    _noteJumpStartBeatOffset: Duration(loopNote2 * 2),
                    _localRotation: [0, loopNote2 * 36, 0],
                    _position: [randomNoteX1, -15, 0],
                    _animation: {
                        _dissolve: [[0, 0], [0.3, 0.1], [0, 0.7]],
                        _dissolveArrow: [[0, 0], [0, 1]],
                        _color: [[1, 200 / 255, 0, 0, 0], [0.5, 0.5, 0.5, 0, 1]],
                        _scale: [[5, 5, 5, 0], [15, 15, 15, 0.7]],
                        _definitePosition: [[randomNoteX1, -15, randomNoteZ1, 0], [randomNoteX1, Random(40, 60), randomNoteZ1, 1]]
                    }
                }
            }
        );
    }
}


//Walls



var randomWall1_2 = 0;
var randomWall1 = 0;
for (let loopwall1 = 0; loopwall1 < 190; loopwall1++) {
    randomWall1 = Random(-50, 50);
    randomWall1_2 = Random(10, 200);
    _obstacles.push(
        {
            "_time": (67 + (loopwall1 / 4)),
            "_lineIndex": 0,
            "_type": 1,
            "_duration": 20,
            "_width": 0,
            "_customData": {
                _track: ["beginingwall"],
                _color: [255, 200, 0, 0],
                _fake: true,
                _scale: [1, 0.1, 1],
                _rotation: [0, 0, Random(0, 360)],
                _animation: {
                    _definitePosition: [[randomWall1, 7, randomWall1_2, 0], [randomWall1, 7, randomWall1_2 - 200, 1]],
                    _color: [[1, 200 / 255, 0, 0, 0], [0.5, 0.5, 0.5, 0, 0.5]],
                    _dissolve: [[0, 0], [1, Random(0.2, 0.7)], [0, 1]],
                    _localRotation: [[Random(0, 360), Random(0, 360), Random(0, 360), 0], [Random(0, 360), Random(0, 360), Random(0, 360), 1]]
                }
            }
        }
    );
}

var definitePositionX = 0;
var definitePositionY = 0;
var definitePositionZ = 0;
var wowimfuckinglazy = 0.5;
var wowimfuckinglazyv2 = 0.95;
for (let loopwall2 = 0; loopwall2 < 64; loopwall2++) {
    var definitePositionX = Random(-80, 80);
    var definitePositionY = Random(5, 50);
    var definitePositionZ = Random(-5, -100);

    if (definitePositionX < 20 && definitePositionX > -20 & definitePositionY < 20) {
        randomif5 = Math.round(Random(0, 1));
        if (randomif5 = 1) {
            definitePositionX += Random(25, 35);
        } else
            if (randomif5 = 0) {
                definitePositionX -= Random(25, 35)
            }
    }

    _obstacles.push(
        {
            "_time": 192 + loopwall2 / 2,
            "_lineIndex": 0,
            "_type": 1,
            "_duration": 20,
            "_width": 0,
            "_customData": {
                _scale: [10 / wowimfuckinglazyv2, 10 / wowimfuckinglazyv2, 10 / wowimfuckinglazyv2],
                _fake: true,
                _interactable: false,
                _color: [0.3, 0.3, 0.3, -69],
                _duration: 10,
                _track: "stars2" + loopwall2,
                _animation: {
                    _localRotation: [[Random(0, 360), Random(0, 360), Random(0, 360), 0], [Random(0, 360), Random(0, 360), Random(0, 360), 1]],
                    _definitePosition: [[definitePositionX, definitePositionY, definitePositionZ, 0], [definitePositionX, definitePositionY, definitePositionZ + 200, 1]],
                    _dissolve: [[0, 0], [wowimfuckinglazy, 0.1, "easeInOutCubic"], [wowimfuckinglazy, 0.9], [0, 1, "easeInOutCubic"]],
                    _scale: [[wowimfuckinglazyv2, wowimfuckinglazyv2, wowimfuckinglazyv2, 0]]
                }
            }
        }
    );
    for (let loopwall3 = 0; loopwall3 < 64; loopwall3++) {
        _customEvents.push(
            {
                "_time": 196 + (loopwall2 * 2) - 2.25,
                "_type": "AnimateTrack",
                "_data": {
                    "_color": [[0.3, 0.3, 0.3, 1, 0], [Random(0.8, 3), Random(0.8, 3), Random(0.8, 3), 1, 0.25, "easeOutExpo"], [0.3, 0.3, 0.3, 1, 1, "easeOutCubic"]],
                    "_dissolve": [[0.5, 0], [0.95, 0.25, "easeOutExpo"], [0.5, 1, "easeOutCubic"]],
                    "_duration": 2,
                    "_track": "stars2" + loopwall3
                }
            }
        )
    }
}
//Cusotom events

for (let customEventLoop1 = 0; customEventLoop1 < 15; customEventLoop1++) {
    _customEvents.push(
        {
            "_time": 131.75 + (customEventLoop1 * 2),
            "_type": "AnimateTrack",
            "_data": {
                "_color": [[1, 1, 1, -69, 0], [Random(0, 5), Random(0, 5), Random(0, 5), -69, 0.3, "easeInOutCubic"], [1, 1, 1, -69, 1, "easeInOutCubic"]],
                "_duration": 1.25,
                "_track": "stars"
            }
        }
    )
}

_customEvents.push(
    {
        "_time": 66,
        "_type": "AnimateTrack",
        "_data": {
            "_rotation": [[0, 0, 0, 0], [0, 100, 0, 1]],
            "_track": "beginingwall",
            "_duration": 90
        }
    },
    {
        "_time": 131.75,
        "_type": "AnimateTrack",
        "_data": {
            "_position": [[0, 0, 0, 0], [0, 0, -100, 0.9], [0, 0, -300, 1, "easeInOutCubic"]],
            "_dissolve": [[1, 0.9], [0, 1, "easeInOutCubic"]],
            "_duration": 32,
            "_track": "stars"
        }
    },
    {
        "_time": 155,
        "_type": "AnimateTrack",
        "_data": {
            "_position": [[0, 300, 0, 0], [0, 70, 0, 1, "easeInOutCubic"]],
            "_scale": [[1, 1, 1, 0.9], [1.5, 4, 1, 1]],
            "_duration": 8,
            "_track": "highclouds"
        }
    },
    {
        "_time": 164,
        "_type": "AnimateTrack",
        "_data": {
            "_color": [[0.5, 0.5, 0.5, -69, 0], [2, 2, 2, -69, 0.1], [0.5, 0.5, 0.5, -69, 1]],
            "_duration": 3,
            "_track": "floorcubes1"
        }
    },
    {
        "_time": 172,
        "_type": "AnimateTrack",
        "_data": {
            "_color": [[0.5, 0.5, 0.5, -69, 0], [2, 2, 2, -69, 0.1], [0.5, 0.5, 0.5, -69, 1]],
            "_duration": 3,
            "_track": "floorcubes1"
        }
    },
    {
        "_time": 176,
        "_type": "AnimateTrack",
        "_data": {
            "_color": [[0.5, 0.5, 0.5, -69, 0], [2, 2, 2, -69, 0.1], [0.5, 0.5, 0.5, -69, 1]],
            "_duration": 3,
            "_track": "floorcubes1"
        }
    },
    {
        "_time": 180,
        "_type": "AnimateTrack",
        "_data": {
            "_color": [[0.5, 0.5, 0.5, -69, 0], [2, 2, 2, -69, 0.1], [0.5, 0.5, 0.5, -69, 1]],
            "_duration": 3,
            "_track": "floorcubes1"
        }
    },
    {
        "_time": 188,
        "_type": "AnimateTrack",
        "_data": {
            "_color": [[0.5, 0.5, 0.5, -69, 0], [2, 2, 2, -69, 0.1], [0.5, 0.5, 0.5, -69, 1]],
            "_duration": 3,
            "_track": "floorcubes1"
        }
    },
    {
        "_time": 192,
        "_type": "AnimateTrack",
        "_data": {
            "_dissolve": [[1, 0.1], [0, 1, "easeInOutSine"]],
            "_color": [[0.5, 0.5, 0.5, -69, 0], [2, 2, 2, -69, 0.1], [0.5, 0.5, 0.5, -69, 1]],
            "_duration": 3,
            "_track": "floorcubes1"
        }
    },
    {
        "_time": 194,
        "_type": "AnimateTrack",
        "_data": {
            "_scale": [[1.5, 4, 1, 0], [1, 1, 1, 0.1]],
            "_duration": 0.1,
            "_track": "highclouds"
        }
    },
    {
        "_time": 195,
        "_type": "AnimateTrack",
        "_data": {
            "_position": [[0, 70, 0, 0], [0, 100, 0, 0.1, "easeInOutBack"], [0, 70, 0, 0.2, "easeInOutBack"], [0, 100, 0, 0.3, "easeInOutBack"], [0, 70, 0, 0.4, "easeInOutBack"], [0, 300, 0, 0.5, "easeInOutCubic"]],
            "_rotation": [[0, 0, 0, 0], [0, -2000, 0, 1]],
            "_duration": 73,
            "_track": "highclouds"
        }
    },
    {
        "_time": 195.5,
        "_type": "AnimateTrack",
        "_data": {
            "_position": [[0, -5, 0, 0], [0, -1, 0, 0.05, "easeInOutCirc"], [0, -1, 0, 0.95], [0, -10, 0, 1, "easeInOutCubic"]],
            "_rotation": [[0, 0, 0, 0], [0, 1000, 0, 1]],
            "_duration": 33,
            "_track": "lowclouds"
        }
    },
    {
        "_time": 228,
        "_type": "AnimateTrack",
        "_data": {
            "_dissolve": [[1, 0], [0, 1, "easeInOutCirc"]],
            "_duration": 4,
            "_track": "inmine"
        }
    },
    {
        "_time": 260,
        "_type": "AnimateTrack",
        "_data": {
            "_dissolve": [[1, 0], [0, 1]],
            "_duration": 7,
            "_track": "credits"
        }
    }
);

var SmallPillarPair1RotationX = 20;
var SmallPillarPair1RotationY = 0;
var SmallPillarPair1RotationZ = 0;
for (let SmallPillarPair1 = 16; SmallPillarPair1 <= 22; SmallPillarPair1++) {
    SmallPillarPair1RotationX = Random(10, 80);
    SmallPillarPair1RotationY = Random(50, 120);
    //SmallPillarPair1RotationZ = Random(10,60);
    _environment.push(
        {
            "_id": ".*\\[" + SmallPillarPair1 + "\\](PillarPair|SmallPillarPair)(\\s\\(\\d*\\))?\\.\\[\\d*\\]PillarL\\.\\[\\d*\\]RotationBaseL$",
            "_lookupMethod": "Regex",
            _position: [Random(30, 120), -10, Random(20, 80)],
            _rotation: [SmallPillarPair1RotationX, SmallPillarPair1RotationY, SmallPillarPair1RotationZ],
            _track: "rotatinglazerLeft" + SmallPillarPair1,
        }

    )
}


for (let SmallPillarPair1 = 16; SmallPillarPair1 <= 22; SmallPillarPair1++) {
    SmallPillarPair1RotationX = Random(10, 80);
    SmallPillarPair1RotationY = Random(-50, -120);
    //SmallPillarPair1RotationZ = Random(10,60);
    _environment.push(
        {
            "_id": ".*\\[" + SmallPillarPair1 + "\\](PillarPair|SmallPillarPair)(\\s\\(\\d*\\))?\\.\\[\\d*\\]PillarR\\.\\[\\d*\\]RotationBaseR$",
            "_lookupMethod": "Regex",
            _position: [Random(-30, -80), -10, Random(20, 120)],
            _rotation: [SmallPillarPair1RotationX, SmallPillarPair1RotationY, SmallPillarPair1RotationZ],
            _track: "rotatinglazerRight" + SmallPillarPair1,
        }
    )
}

for (let SmallPillarPair1 = 16; SmallPillarPair1 <= 22; SmallPillarPair1++) {
    _customEvents.push(
        {
            "_time": 195,
            "_type": "AnimateTrack",
            "_data": {
                "_dissolve": [[1, 0], [0, 1]],
                "_duration": (228 - 195),
                _rotation: [[Random(10, 30), Random(30, 100), 0, 0], [Random(10, 30), Random(30, 100), 0, 0.25], [Random(10, 30), Random(30, 100), 0, 0.75], [Random(10, 30), Random(30, 100), 0, 1]],
                _track: "rotatinglazerLeft" + SmallPillarPair1
            }
        },
        {
            "_time": 195,
            "_type": "AnimateTrack",
            "_data": {
                "_dissolve": [[1, 0], [0, 1]],
                "_duration": (228 - 195),
                _rotation: [[Random(10, 30), Random(30, 100) * -1, 0, 0], [Random(10, 30), Random(30, 100) * -1, 0, 0.25], [Random(10, 30), Random(30, 100) * -1, 0, 0.5], [Random(10, 30), Random(30, 100) * -1, 0, 0.75], [Random(10, 30), Random(10, 100) * -1, 0, 1]],
                _track: "rotatinglazerRight" + SmallPillarPair1
            }
        }
    )
}

for (let sidelazer1 = 41; sidelazer1 <= 44; sidelazer1++) {
    _environment.push(
        {
            _id: ".*\\[" + sidelazer1 + "\\]SideLaser\\.\\[\\d*\\]BoxLight$",
            _lookupMethod: "Regex",
            _active: false
        },
        {
            _id: ".*\\[" + sidelazer1 + "\\]SideLaser",
            _lookupMethod: "Regex",
            _localPosition: [0, 0, 150]
        }
    );
}

_environment.push(
    {
        "_id": ".*\\[\\d*\\]TrackMirror",
        "_lookupMethod": "Regex",
        _active: false
    },
    {
        "_id": ".*\\[\\d*\\]Construction$",
        "_lookupMethod": "Regex",
        _duplicate: 9
    },
    {
        "_id": ".*\\[49\\]Construction\\(Clone\\)",
        "_lookupMethod": "Regex",
        _localPosition: [-2.1, -2, -14],
        _localRotation: [0, 0, 90]
    },
    {
        "_id": ".*\\[50\\]Construction\\(Clone\\)",
        "_lookupMethod": "Regex",
        _localPosition: [2.1, -2, -14],
        _localRotation: [0, 0, -90]
    },
    {
        "_id": ".*\\[51\\]Construction\\(Clone\\)",
        "_lookupMethod": "Regex",
        _localPosition: [0, 0, -14]
    },
    {
        "_id": ".*\\[52\\]Construction\\(Clone\\)",
        "_lookupMethod": "Regex",
        _localPosition: [2.1, -6, -14],
        _localRotation: [0, 0, -90]
    },
    {
        "_id": ".*\\[53\\]Construction\\(Clone\\)",
        "_lookupMethod": "Regex",
        _localPosition: [-2.1, -6, -14],
        _localRotation: [0, 0, 90]
    },
    {
        "_id": ".*\\[54\\]Construction\\(Clone\\)",
        "_lookupMethod": "Regex",
        _localPosition: [2.1, -10, -14],
        _localRotation: [0, 0, -90]
    },
    {
        "_id": ".*\\[55\\]Construction\\(Clone\\)",
        "_lookupMethod": "Regex",
        _localPosition: [-2.1, -10, -14],
        _localRotation: [0, 0, 90]
    },
    {
        "_id": ".*\\[56\\]Construction\\(Clone\\)",
        "_lookupMethod": "Regex",
        _localPosition: [2.1, -14, -14],
        _localRotation: [0, 0, -90]
    },
    {
        "_id": ".*\\[57\\]Construction\\(Clone\\)",
        "_lookupMethod": "Regex",
        _localPosition: [-2.1, -14, -14],
        _localRotation: [0, 0, 90]
    },
    {
        _id: ".*\\[\\d*\\]GlowLineC$",
        _lookupMethod: "Regex",
        _active: false
    },
    {
        _id: ".*\\[\\d*\\]GlowLineL",
        _lookupMethod: "Regex",
        _position: [-1, -0.05, 0]
    },
    {
        _id: ".*\\[\\d*\\]GlowLineR",
        _lookupMethod: "Regex",
        _position: [1, -0.05, 0]
    },
    {
        "_id": "PillarPair.*\\.\\[[0-9]+\\]Pillar.\\.\\[[0-9]+\\]Pillar$",
        "_lookupMethod": "Regex",
        "_active": false
    },
    {
        "_id": "PillarPair.*\\.\\[[0-9]+\\]Pillar.\\.\\[[0-9]+\\]RotationBase.\\.\\[[0-9]+\\]Reflector$",
        "_lookupMethod": "Regex",
        "_active": false
    },
    {
        _id: ".*\\[\\d*\\]PillarTrackLaneRingsR\\.\\[\\d*\\]PillarTrackLaneRing\\(Clone\\)",
        _lookupMethod: "Regex",
        _active: false
    },
    {
        _id: ".*\\[\\d*\\]PillarTrackLaneRingsR \\(\\d*\\)\\.\\[\\d*\\]PillarTrackLaneRing\\(Clone\\)",
        _lookupMethod: "Regex",
        _active: false
    },
    {
        "_id": ".*\\[\\d*\\]NarrowGameHUD",
        "_lookupMethod": "Regex",
        "_active": false
    },
    {
        "_id": ".*\\[\\d*\\]PillarPair",
        "_lookupMethod": "Regex",
        "_active": false
    },
    {
        "_id": ".*\\[\\d*\\]SmallPillarPair\\s?(\\(\\d*\\))?\\.\\[\\d*\\]Pillar(L|R)\\.\\[\\d*\\]Pillar",
        "_lookupMethod": "Regex",
        "_active": false
    },
    {
        "_id": ".*\\[\\d*\\]SmallPillarPair\\s?(\\(\\d*\\))?\\.\\[\\d*\\]Pillar(L|R)\\.\\[\\d*\\]Laser(L|R)",
        "_lookupMethod": "Regex",
        "_localPosition": [0, -30, 0]
    },
    {
        "_id": ".*\\[\\d*\\]MagicDoorSprite",
        "_lookupMethod": "Regex",
        "_duplicate": 1,
        "_active": false
    },
    {
        "_id": ".*\\[\\d*\\]BottomGlow",
        "_lookupMethod": "Regex",
        "_active": false
    },
    {
        "_id": ".*\\[\\d*\\]Clouds\\.\\[\\d*\\]HighCloudsGenerator",
        "_track": "highclouds",
        "_lookupMethod": "Regex",
        "_localPosition": [0, 300, 0]
    },
    {
        "_id": ".*\\[\\d*\\]Clouds\\.\\[\\d*\\]LowCloudsGenerator",
        "_track": "lowclouds",
        "_lookupMethod": "Regex",
        "_localPosition": [0, -10, 0]
    },
    {
        "_id": ".*\\[\\d*\\]MagicDoorSprite$",
        "_lookupMethod": "Regex",
        "_localPosition": [0, -300, 0]
    },
    {
        "_id": ".*\\[\\d*\\]MagicDoorSprite\\.\\[\\d*\\]BloomL",
        "_lookupMethod": "Regex",
        "_position": [-0.5, 0, 500],
        "_rotation": [0, 0, 90]
    },
    {
        "_id": ".*\\[\\d*\\]MagicDoorSprite\\.\\[\\d*\\]BloomR",
        "_lookupMethod": "Regex",
        "_active": false
    }
);



difficulty._obstacles.forEach(wall => {
    var randomSpread = Math.random();
    var duration = wall._duration + (halfJumpDuration * 2);
    var newDuration = wall._duration + (halfJumpDuration * 2) + randomSpread;
    wall._time -= randomSpread;
    wall._duration += randomSpread;

    var timeOffset = (newDuration - duration) / newDuration;
    var timeMultiplier = 1 - timeOffset;

    if (wall._customData) if (wall._customData._animation) {
        for (const property in wall._customData._animation) {
            wall._customData._animation[property].forEach(element => {
                var timeElement = element.length - 1;
                if (typeof element[timeElement] === 'string') timeElement -= 1;

                element[timeElement] *= timeMultiplier;
                element[timeElement] += timeOffset;
            })
        }
    }
})

_environment.forEach(x => {

    if (x._duplicate != undefined) {
        console.log("ID: " + x._id + ", Method: " + x._lookupMethod + ", Duplicate: " + x._duplicate);
    } else
        console.log("ID: " + x._id + ", Method: " + x._lookupMethod);
});


_customEvents.forEach(x => {
    if (x._data.toBeat != undefined) {

        if (x._data.toBeat == true) {
            x._data._duration = x._data._duration - x._time;
            delete x._data.toBeat;
        } else
            delete x._data.toBeat;
    }
});


fs.writeFileSync(OUTPUT, JSON.stringify(difficulty, null, 0));
