const fs = require("fs");
const three = require("three");
const INPUT = "ExpertPlusStandard.dat";
const OUTPUT = "ExpertPlusStandard.dat";
let difficulty = JSON.parse(fs.readFileSync(INPUT));
const pillarToNoodleUnits = 0.1495;


difficulty._customData = { _pointDefinitions: [], _customEvents: [], _environment: [] };

const _customData = difficulty._customData;
const _obstacles = difficulty._obstacles;
const _notes = difficulty._notes;
const _customEvents = _customData._customEvents;
const _pointDefinitions = _customData._pointDefinitions;
const _environment = _customData._environment;
const _events = difficulty._events;

function Random(min, max, round) {
    max++;

    if (round == false || round == undefined) {
        return Math.random() * (max - min) + min;
    } else
        return Math.round(Math.random() * (max - min) + min);

}

const lazerRotationDown = 10
const shiftLazersZ = 3;
var shiftLazersZ2 = 20;
const shiftInterval = 0.5;
shiftLazersZ2 *= shiftInterval;
const rotationMasterLazers = 10

_environment.push(
    {
        _id: "PillarPair\\.\\[\\d*\\]PillarL$",
        _lookupMethod: "Regex",
        _position: [-7, 10, 130],
        _localRotation: [-15 - lazerRotationDown, -25, 0],
        _track: "rotationBaseL1"
    },
    {
        _id: "PillarPair\\.\\[\\d*\\]PillarR$",
        _lookupMethod: "Regex",
        _position: [7, 10, 130],
        _localRotation: [-15 - lazerRotationDown, 25, 0],
        _track: "rotationBaseR1"
    },
    {
        _id: "SmallPillarPair\\.\\[\\d*\\]PillarL$",
        _lookupMethod: "Regex",
        _position: [-7, 15, 132],
        _localRotation: [-12 - lazerRotationDown, -27, 0],
        _track: "rotationBaseL2"
    },
    {
        _id: "SmallPillarPair\\.\\[\\d*\\]PillarR$",
        _lookupMethod: "Regex",
        _position: [7, 15, 132],
        _localRotation: [-12 - lazerRotationDown, 27, 0],
        _track: "rotationBaseR2"
    },
    {
        _id: "PillarPair \\(1\\)\\.\\[\\d*\\]PillarL$",
        _lookupMethod: "Regex",
        _position: [-7, 20, 134],
        _localRotation: [-9 - lazerRotationDown, -30, 0],
        _track: "rotationBaseL3"
    },
    {
        _id: "PillarPair \\(1\\)\\.\\[\\d*\\]PillarR$",
        _lookupMethod: "Regex",
        _position: [7, 20, 134],
        _localRotation: [-9 - lazerRotationDown, 30, 0],
        _track: "rotationBaseR3"
    },
    {
        _id: "SmallPillarPair \\(1\\)\\.\\[\\d*\\]PillarL$",
        _lookupMethod: "Regex",
        _position: [-7, 25, 139],
        _localRotation: [-6 - lazerRotationDown, -33, 0],
        _track: "rotationBaseL4"
    },
    {
        _id: "SmallPillarPair \\(1\\)\\.\\[\\d*\\]PillarR$",
        _lookupMethod: "Regex",
        _position: [7, 25, 139],
        _localRotation: [-6 - lazerRotationDown, 33, 0],
        _track: "rotationBaseR4"
    },
    {
        _id: "PillarPair \\(2\\)\\.\\[\\d*\\]PillarL$",
        _lookupMethod: "Regex",
        _position: [-7, 30, 141.5],
        _localRotation: [-3 - lazerRotationDown, -36, 0],
        _track: "rotationBaseL5"
    },
    {
        _id: "PillarPair \\(2\\)\\.\\[\\d*\\]PillarR$",
        _lookupMethod: "Regex",
        _position: [7, 30, 141.5],
        _localRotation: [-3 - lazerRotationDown, 36, 0],
        _track: "rotationBaseR5"
    },
    {
        _id: "SmallPillarPair \\(2\\)\\.\\[\\d*\\]PillarL$",
        _lookupMethod: "Regex",
        _position: [-7, 35, 144.5],
        _localRotation: [0 - lazerRotationDown, -39, 0],
        _track: "rotationBaseL6"
    },
    {
        _id: "SmallPillarPair \\(2\\)\\.\\[\\d*\\]PillarR$",
        _lookupMethod: "Regex",
        _position: [7, 35, 144.5],
        _localRotation: [0 - lazerRotationDown, 39, 0],
        _track: "rotationBaseR6"
    },
    {
        _id: "PillarPair \\(3\\)\\.\\[\\d*\\]PillarL$",
        _lookupMethod: "Regex",
        _position: [-7, 40, 146],
        _localRotation: [3 - lazerRotationDown, -42, 0],
        _track: "rotationBaseL7"
    },
    {
        _id: "PillarPair \\(3\\)\\.\\[\\d*\\]PillarR$",
        _lookupMethod: "Regex",
        _position: [7, 40, 146],
        _localRotation: [3 - lazerRotationDown, 42, 0],
        _track: "rotationBaseR7"

    },
    {
        _id: "SmallPillarPair \\(3\\)\\.\\[\\d*\\]PillarL$",
        _lookupMethod: "Regex",
        _position: [-7, 45, 147.5],
        _localRotation: [6 - lazerRotationDown, -45, 0],
        _track: "rotationBaseL8"
    },
    {
        _id: "SmallPillarPair \\(3\\)\\.\\[\\d*\\]PillarR$",
        _lookupMethod: "Regex",
        _position: [7, 45, 147.5],
        _localRotation: [6 - lazerRotationDown, 45, 0],
        _track: "rotationBaseR8"

    },
    {
        _id: "PillarPair \\(4\\)\\.\\[\\d*\\]PillarL$",
        _lookupMethod: "Regex",
        _position: [-7, 50, 149],
        _localRotation: [9 - lazerRotationDown, -48, 0],
        _track: "rotationBaseL9"
    },
    {
        _id: "PillarPair \\(4\\)\\.\\[\\d*\\]PillarR$",
        _lookupMethod: "Regex",
        _position: [7, 50, 149],
        _localRotation: [9 - lazerRotationDown, 48, 0],
        _track: "rotationBaseR9"
    }
)
_environment.push(
    {
        _id: "Pillar(L|R)\\.\\[\\d*\\]Pillar",
        _lookupMethod: "Regex",
        _position: [0, 0, -100000]
    },
    {
        _id: "PillarPair\\.\\[\\d*\\]PillarL\\.\\[\\d*\\]LaserL$",
        _lookupMethod: "Regex",
        _position: [-11, -10, 30 + shiftLazersZ2],
        _localRotation: [0, 0, (30 + rotationMasterLazers) * 1]
    },
    {
        _id: "PillarPair\\.\\[\\d*\\]PillarR\\.\\[\\d*\\]LaserR$",
        _lookupMethod: "Regex",
        _position: [11, -10, 30 + shiftLazersZ2],
        _localRotation: [0, 0, (30 + rotationMasterLazers) * -1]
    },
    {
        _id: "PillarPair \\(1\\)\\.\\[\\d*\\]PillarL\\.\\[\\d*\\]LaserL$",
        _lookupMethod: "Regex",
        _position: [-9, -10, 45 + shiftLazersZ2],
        _localRotation: [0, 0, (20 + rotationMasterLazers) * 1]
    },
    {
        _id: "PillarPair \\(1\\)\\.\\[\\d*\\]PillarR\\.\\[\\d*\\]LaserR$",
        _lookupMethod: "Regex",
        _position: [9, -10, 45 + shiftLazersZ2],
        _localRotation: [0, 0, (20 + rotationMasterLazers) * -1]
    },
    {
        _id: "PillarPair \\(2\\)\\.\\[\\d*\\]PillarL\\.\\[\\d*\\]LaserL$",
        _lookupMethod: "Regex",
        _position: [-7, -10, 60 + shiftLazersZ2],
        _localRotation: [0, 0, (10 + rotationMasterLazers) * 1]
    },
    {
        _id: "PillarPair \\(2\\)\\.\\[\\d*\\]PillarR\\.\\[\\d*\\]LaserR$",
        _lookupMethod: "Regex",
        _position: [7, -10, 60 + shiftLazersZ2],
        _localRotation: [0, 0, (10 + rotationMasterLazers) * -1]
    },
    {
        _id: "PillarPair \\(3\\)\\.\\[\\d*\\]PillarL\\.\\[\\d*\\]LaserL$",
        _lookupMethod: "Regex",
        _position: [-3, -10, 75 + shiftLazersZ2],
        _localRotation: [0, 0, (0 + rotationMasterLazers) * 1]
    },
    {
        _id: "PillarPair \\(3\\)\\.\\[\\d*\\]PillarR\\.\\[\\d*\\]LaserR$",
        _lookupMethod: "Regex",
        _position: [3, -10, 75 + shiftLazersZ2],
        _localRotation: [0, 0, (0 + rotationMasterLazers) * -1]
    },
    {
        _id: "BottomGlow",
        _lookupMethod: "Regex",
        _position: [0, 0, 150]
    },
    {
        _id: "BottomGlow",
        _lookupMethod: "Regex",
        _duplicate: 50,
        _position: [0, 0, 150]
    },
    {
        _id: "Reflector$",
        _lookupMethod: "Regex",
        _active: false
    },
    {
        _id: "\\]GlowLineC",
        _lookupMethod: "Regex",
        _duplicate: 1,
        _lightID: 10,
        _position: [0, -8, 9 + shiftLazersZ],
        _rotation: [90, 90, 90],
        _scale: [1, 2.5, 0, 0.01],
    },
    {
        _id: "\\]GlowLineC",
        _lookupMethod: "Regex",
        _duplicate: 1,
        _lightID: 11,
        _position: [0, -8, 20 + shiftLazersZ],
        _rotation: [90, 90, 90],
        _scale: [1, 2.5, 0, 0.01]
    },
    {
        _id: "\\]GlowLineC",
        _lookupMethod: "Regex",
        _duplicate: 1,
        _lightID: 12,
        _position: [0, -8, 31 + shiftLazersZ],
        _rotation: [90, 90, 90],
        _scale: [1, 2.5, 0, 0.01]
    },
    {
        _id: "\\]GlowLineC",
        _lookupMethod: "Regex",
        _duplicate: 1,
        _lightID: 13,
        _position: [0, -8, 42 + shiftLazersZ],
        _rotation: [90, 90, 90],
        _scale: [1, 2.5, 0, 0.01]
    },
    {
        _id: "\\]GlowLineC",
        _lookupMethod: "Regex",
        _duplicate: 1,
        _lightID: 14,
        _position: [0, -8, 53 + shiftLazersZ],
        _rotation: [90, 90, 90],
        _scale: [1, 2.5, 0, 0.01]
    },
    // {
    //     _id: "\\]GlowLineC",
    //     _lookupMethod: "Regex",
    //     _duplicate: 1,
    //     _lightID: 10
    // },
    // {
    //     _id: "\\]GlowLineC\\(Clone\\)",
    //     _lookupMethod: "Regex",
    //     _duplicate: 1,
    //     _lightID: 11
    // },
    // {
    //     _id: "\\]GlowLineC\\(Clone\\)\\(Clone\\)",
    //     _lookupMethod: "Regex",
    //     _duplicate: 1,
    //     _lightID: 12
    // },
    // {
    //     _id: "\\]GlowLineC\\(Clone\\)\\(Clone\\)\\(Clone\\)",
    //     _lookupMethod: "Regex",
    //     _duplicate: 1,
    //     _lightID: 13
    // },
    // {
    //     _id: "\\]GlowLineC\\(Clone\\)\\(Clone\\)\\(Clone\\)\\(Clone\\)",
    //     _lookupMethod: "Regex",
    //     _duplicate: 1,
    //     _lightID: 14
    // },
    // {
    //     _id: "\\]GlowLineC\\(Clone\\)$",
    //     _lookupMethod: "Regex",
    //     _position: [0, -8, 9 + shiftLazersZ],
    //     _rotation: [90, 90, 90],
    //     _scale: [1, 2.5, 0, 0.01],
    // },
    // {
    //     _id: "\\]GlowLineC\\(Clone\\)\\(Clone\\)$",
    //     _lookupMethod: "Regex",
    //     _position: [0, -8, 20 + shiftLazersZ],
    //     _rotation: [90, 90, 90],
    //     _scale: [1, 2.5, 0, 0.01]
    // },
    // {
    //     _id: "\\]GlowLineC\\(Clone\\)\\(Clone\\)\\(Clone\\)$",
    //     _lookupMethod: "Regex",
    //     _position: [0, -8, 31 + shiftLazersZ],
    //     _rotation: [90, 90, 90],
    //     _scale: [1, 2.5, 0, 0.01]
    // },
    // {
    //     _id: "\\]GlowLineC\\(Clone\\)\\(Clone\\)\\(Clone\\)\\(Clone\\)$",
    //     _lookupMethod: "Regex",
    //     _position: [0, -8, 42 + shiftLazersZ],
    //     _rotation: [90, 90, 90],
    //     _scale: [1, 2.5, 0, 0.01]
    // },
    // {
    //     _id: "\\]GlowLineC\\(Clone\\)\\(Clone\\)\\(Clone\\)\\(Clone\\)\\(Clone\\)$",
    //     _lookupMethod: "Regex",
    //     _position: [0, -8, 53 + shiftLazersZ],
    //     _rotation: [90, 90, 90],
    //     _scale: [1, 2.5, 0, 0.01]
    // },
    {
        _id: "GlowLineL$",
        _lookupMethod: "Regex",
        _position: [-1, -0.1, 0]
    },
    {
        _id: "GlowLineR$",
        _lookupMethod: "Regex",
        _position: [1, -0.1, 0]
    },
    {
        _id: "GlowLineC\\.\\[\\d*\\]BoxLight",
        _lookupMethod: "Regex",
        _active: false
    },
    {
        _id: "MagicDoorSprite",
        _lookupMethod: "Regex",
        _active: false
    },
    // {
    //     _id: "MagicDoorSprite\\.\\[\\d*\\]BloomL$",
    //     _lookupMethod: "Regex",
    //     _position: [0, 10, 100]
    // },
    // {
    //     _id: "MagicDoorSprite\\.\\[\\d*\\]BloomR",
    //     _lookupMethod: "Regex",
    //     _active: false
    // },
    {
        _id: "PillarTrackLaneRingsR(\\s\\(\\d*\\))?$",
        _lookupMethod: "Regex",
        _active: false
    },
    {
        _id: "LowCloudsGenerator$",
        _lookupMethod: "Regex",
        _localPosition: [0, -4, 0],
        _track: "lowClouds"
    },
    {
        _id: "HighCloudsGenerator$",
        _lookupMethod: "Regex",
        _position: [0, -30, 0],
        _scale: [8, 12.5, 1.5],
    },
    {
        _id: "Environment\\.\\[\\d*\\]Construction$",
        _lookupMethod: "Regex",
        _active: false
    },
    {
        _id: "TrackMirror$",
        _lookupMethod: "Regex",
        _active: false
    }
)

_customEvents.push(
    {
        "_time": 583,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "BlenderEnvironment",
            "_duration": 0.05,
            "_position": [[0, 0, -100000, 0]]
        }
    },
    {
        "_time": 583,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "lowClouds",
            "_duration": 0.05,
            "_position": [[0, -8, 0, 0]]
        }
    }
);




// for (let i = 0; i < 100; i++) {
//     // let X = 0 + (50 * Math.cos(i * 12 / (180 / Math.PI)));
//     // let Y = 20 + (50 * Math.sin(i * 12 / (180 / Math.PI)));
//     let s = i / 2.5;
//     let t = i / 25;
//     let X = 10 * Math.cos(s) * Math.sin(t)
//     let Z = 10 * Math.sin(s) * Math.sin(t)
//     let Y = 20 * Math.cos(t)

//     _environment.push(
//         {
//             _id: "\\]PillarPair \\(1\\)\\.\\[0\\]PillarL\\.\\[0\\]Pillar$",
//             _lookupMethod: "Regex",
//             _duplicate: 1,
//             _position: [X, Y + 20, Z + 40],
//             _scale: [0.15, 0.005, 0.15],
//         }
//         // {
//         //     "_time": 10,
//         //     "_lineIndex": 0,
//         //     "_type": 1,
//         //     "_duration": 10,
//         //     "_width": 0,
//         //     "_customData": {
//         //         _color: [],
//         //         // "_track": ["yourTrack1", "yourTrack2".....you can make one or more tracks],
//         //         "_scale": [2, 2, 2],
//         //         "_position": [X, Y, 40],
//         //         // "_rotation": [x, y, z]
//         //         // more customData here
//         //     }
//         // }
//     )
// }

if (!difficulty._customData._environment) difficulty._customData._environment = []

function vectorFromRotation(vectorRot, length) {
    const deg2rad = Math.PI / 180;
    var mathRot = copy(vectorRot);

    mathRot[0] *= deg2rad;
    mathRot[1] *= deg2rad;
    mathRot[2] *= deg2rad;

    var rotVector = new three.Vector3(0, length, 0).applyEuler(new three.Euler(...mathRot, "YXZ"));
    return [rotVector.x, rotVector.y, rotVector.z];
}

function copy(obj) {
    if (typeof obj != 'object') return obj;

    var newObj = Array.isArray(obj) ? [] : {};

    for (const key in obj) {
        newObj[key] = copy(obj[key]);
    }
    return newObj
}

difficulty._notes.forEach(x => {
    if (x._customData && x._customData._track == "BlenderEnvironment") {
        var y = copy(x);

        var pillarPos = y._customData._animation._definitePosition[0];
        var pillarRot = y._customData._animation._localRotation[0];
        var pillarScale = y._customData._animation._scale[0];

        pillarPos.pop();
        pillarRot.pop();
        pillarScale.pop();

        var offset = vectorFromRotation(pillarRot, pillarScale[1] / 2 * 0.87);

        pillarScale[0] *= pillarToNoodleUnits;
        pillarScale[1] *= pillarToNoodleUnits / 32;
        pillarScale[2] *= pillarToNoodleUnits;

        pillarPos[1] += 0.09;
        pillarPos[2] += 0.65 * (1 / 0.6);

        pillarPos[0] += offset[0];
        pillarPos[1] += offset[1];
        pillarPos[2] += offset[2];

        difficulty._customData._environment.push({
            _id: "\\]PillarPair \\(1\\)\\.\\[0\\]PillarL\\.\\[0\\]Pillar$",
            _lookupMethod: "Regex",
            _duplicate: 1,
            _position: pillarPos,
            _scale: pillarScale,
            _rotation: pillarRot,
            _track: "BlenderEnvironment",
            _active: true
        })
    }
});

// _environment.forEach(x => {
//     if (x._position != undefined) {
//         x._position = [x._position[0], x._position[1], x._position[2] + 50]
//     }
// })

const multiplyRBGValue = 4;
var countLazerEvents = 0;
_events.forEach(x => {
    if (x._value == 5 && x._customData != undefined) {
        if (x._type == 4 && x._customData._lightID == 10) {
            countLazerEvents++
            x._customData._color = [
                x._customData._color[0] * multiplyRBGValue,
                x._customData._color[1] * multiplyRBGValue,
                x._customData._color[2] * multiplyRBGValue,
                x._customData._color[3] * 1
            ]
        } else
            if (x._type == 4 && x._customData._lightID == 11) {
                countLazerEvents++
                x._customData._color = [
                    x._customData._color[0] * multiplyRBGValue,
                    x._customData._color[1] * multiplyRBGValue,
                    x._customData._color[2] * multiplyRBGValue,
                    x._customData._color[3] * 2
                ]
            } else
                if (x._type == 4 && x._customData._lightID == 12) {
                    countLazerEvents++
                    x._customData._color = [
                        x._customData._color[0] * multiplyRBGValue,
                        x._customData._color[1] * multiplyRBGValue,
                        x._customData._color[2] * multiplyRBGValue,
                        x._customData._color[3] * 3
                    ]
                } else
                    if (x._type == 4 && x._customData._lightID == 13) {
                        countLazerEvents++
                        x._customData._color = [
                            x._customData._color[0] * multiplyRBGValue,
                            x._customData._color[1] * multiplyRBGValue,
                            x._customData._color[2] * multiplyRBGValue,
                            x._customData._color[3] * 4
                        ]
                    } else
                        if (x._type == 4 && x._customData._lightID == 14) {
                            countLazerEvents++
                            x._customData._color = [
                                x._customData._color[0] * multiplyRBGValue,
                                x._customData._color[1] * multiplyRBGValue,
                                x._customData._color[2] * multiplyRBGValue,
                                x._customData._color[3] * 5
                            ]
                        }
    }

})

difficulty._notes = difficulty._notes.filter(x => !x._customData || (x._customData && !x._customData._track == "BlenderEnvironment"));
CountBlenderEnvironment = 0;
// _environment.forEach(x => {
//     if (x._track == "BlenderEnvironment") {
//         CountBlenderEnvironment++;
//     } else
//         if (x._duplicate != undefined) {
//             console.log("\n------------------------------------\nId: " + x._id + " Duplicates: " + x._duplicate + "\n------------------------------------")
//         }
// })
console.log("\n------------------------------------\nBlender To Environment: " + CountBlenderEnvironment + "\n------------------------------------")
console.log("\n------------------------------------\nDuplicated Lazer Events: " + countLazerEvents + "\n------------------------------------")




fs.writeFileSync(OUTPUT, JSON.stringify(difficulty, null, 0));
