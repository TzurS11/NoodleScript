const fs = require("fs");
const three = require("three");
const INPUT = "ExpertPlusStandard.dat";
const OUTPUT = "ExpertPlusStandard.dat";
const COUNT = "countRuns.dat";
let difficulty = JSON.parse(fs.readFileSync(INPUT));
let externalInfo = JSON.parse(fs.readFileSync(COUNT));

difficulty._customData = { _pointDefinitions: [], _customEvents: [], _environment: [] };
const _customData = difficulty._customData;
const _obstacles = difficulty._obstacles;
const _notes = difficulty._notes;
const _customEvents = _customData._customEvents;
const _pointDefinitions = _customData._pointDefinitions;
const _environment = _customData._environment;
const _events = difficulty._events;
const pillarToNoodleUnits = 0.1495;
let trackName1 = "butterfly";
let trackName2 = "environment";


function Random(min, max, round) {
    if (round == false || round == undefined) return Math.random() * (max + 1 - min) + min;
    if (round == true) return Math.round(Math.random() * (max + 1 - min) + min);
}



_events.forEach(x => {
    if (x._customData && x._value == 5) {
        if (x._value === 5) {
            for (let i = 0; i < x._customData._color.length; i++)
                x._customData._color[i] *= 1.5;
        }
        if (x._type === 2 || x._type === 3) {
            for (let i = 0; i < x._customData._color.length; i++)
                x._customData._color[i] *= 1.5;
        }
        if (x._customData._lightID === 1000 && x._type === 0) {
            x._customData._lightID = [1000]
            for (let i = 0; i < x._customData._color.length; i++)
                x._customData._color[i] *= 2.5;
            for (let i = 1001; i <= 1019; i++)
                x._customData._lightID.push(i)
        }
        if (x._type === 1 && x._customData._lightID === 20) {
            x._customData._lightID = [2000]
            for (let i = 2001; i <= 2004; i++)
                x._customData._lightID.push(i)
            for (let i = 0; i < x._customData._color.length; i++)
                x._customData._color[i] *= 0.75;
        }
        if (x._time >= 139 && x._time <= 165 && x._type === 1)
            for (let i = 0; i < x._customData._color.length; i++)
                x._customData._color[i] *= 2;
        if (x._type == 1 && x._time >= 394 && !(x._customData._lightID == 17 || x._customData._lightID == 18 || x._customData._lightID == 19 || x._customData._lightID == 20)) {
            for (let i = 0; i < x._customData._color.length; i++)
                if (i == 0 || i == 1 || i == 2) x._customData._color[i] /= 3.5;
                else x._customData._color[i] *= 10
        }
    }
})



_environment.push(
    {
        _id: "DirectionalLight",
        _lookupMethod: "Regex",
        _active: false
        // _rotation:[0,0,60]
    },
    {
        _id: "Reflector",
        _lookupMethod: "Regex",
        _active: false
    },
    // {
    //     _id: "e\\.\\[\\d*\\]Mirror",
    //     _lookupMethod: "Regex",
    //     _duplicate: 1,
    //     _scale: [200, 1, 200],
    //     _position: [0, -5, 50]
    // },
    {
        _id: "SideLaser$",
        _lookupMethod: "Regex",
        _localRotation: [0, 90, 0],
        _position: [0, 2050, 300],
        // _scale: [0.001, 1, 0.001]
        _scale: [1, 1, 10000]
    },
    {
        _id: "t\\.\\[\\d*\\]SideLaser\\.\\[\\d*\\]BoxLight$",
        _lookupMethod: "Regex",
        _active: false
    },
    // {
    //     _id: "SideLaser$",
    //     _lookupMethod: "Regex",
    //     _active: false
    // },
    {
        _id: "BottomGlow$",
        _lookupMethod: "Regex",
        _position: [0, 22, -100000],
        // _active: false
    },
    {
        _id: "MagicDoorSprite",
        _lookupMethod: "Regex",
        _active: false
    },
    {
        _id: "Pillar(L|R)\\.\\[\\d*\\]Pillar",
        _lookupMethod: "Regex",
        _position: [0, 0, -10000]
    },
    {
        _id: "HighCloudsGenerator$",
        _lookupMethod: "Regex",
        _position: [0, 22.5, 200],
        _rotation: [-90, 0, 0],
        _scale: [0.1, 0.1, 0.1],
        _track: "ButterflyClouds_StormPacer"
    },
    {
        _id: "LowCloudsGenerator$",
        _lookupMethod: "Regex",
        _active: false
    },
    {
        _id: "PillarTrackLaneRingsR",
        _lookupMethod: "Regex",
        _active: false
    },
    {
        _id: "BottomGlow$",
        _lookupMethod: "Regex",
        _duplicate: 20,
        _lightID: 1000,
        _track: "butterfly",
        _position: [0, 22.5, 200]
    },
    // {
    //     _id: "HighCloudsGenerator$",
    //     _lookupMethod: "Regex",
    //     _position: [0, 0, 200],
    //     _rotation: [-90, 0, 0],
    //     _scale: [1 / 2 * 2, 1 / 2 * 2, 1 / 2 * 2],
    //     _track: "ButterflyClouds_StormPacer",
    //     _duplicate: 1
    // },
    {
        _id: "HighCloudsGenerator$",
        _lookupMethod: "Regex",
        _position: [0, -270, 200],
        _rotation: [-90, 0, 0],
        // _localPosition:[0,0,-10],
        _scale: [1, 1, 2],
        _track: "ButterflyClouds_StormPacer"
    },
    {
        _id: "t\\.\\[\\d*\\]Laser(L|R)$",
        _lookupMethod: "Regex",
        _active: false
    },
)


_customEvents.push(
    {
        "_time": 0, // Time in beats.
        "_type": "AssignTrackParent",
        "_data": {
            "_childrenTracks": ["butterfly"],
            "_parentTrack": "butterflyParent",
            "_worldPositionStays": true
        }
    },
    {
        "_time": 0, // Time in beats.
        "_type": "AssignTrackParent",
        "_data": {
            "_childrenTracks": ["ButterflyClouds_StormPacer"], 
            "_parentTrack": "ButterflyClouds_StormPacerDad",
            "_worldPositionStays": true
        }
    },
)

for (let i = 0; i < 26; i++) {
    _customEvents.push(
        {
            "_time": 0 + i * 20,
            "_type": "AnimateTrack",
            "_data": {
                "_track": "butterflyParent",
                "_duration": 10,
                // "_localRotation": [[0, 0, 0, 0], [0, 0, 180, 0.5], [0, 0, 360, 1]],
                // "_easing":"easeInOutBack",
                _position: [[0, -4, 0, 0, "easeInOutQuad"], [0, 4, 0, 1, "easeInOutQuad"]]
            }
        },
        {
            "_time": 10 + i * 20,
            "_type": "AnimateTrack",
            "_data": {
                "_track": "butterflyParent",
                "_duration": 10,
                // "_localRotation": [[0, 0, 0, 0], [0, 0, 180, 0.5], [0, 0, 360, 1]],
                // "_easing":"easeInOutBack",
                _position: [[0, 4, 0, 0, "easeInOutQuad"], [0, -4, 0, 1, "easeInOutQuad"]]
            }
        }
    )
}
_customEvents.push(
    {
        "_time": 519,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "butterflyParent",
            "_duration": 4,
            // "_localRotation": [[0, 0, 0, 0], [0, 0, 180, 0.5], [0, 0, 360, 1]],
            // "_easing":"easeInOutBack",
            _position: [[0, -2, 0, 0], [80, -2, 0, 1, "easeInOutQuad"]]
        }
    }
)
var shiftLazersZ2 = 230;
var shiftLazersX = -0
var pillarPairMasterX = 20
const rotationMasterLazers = 10 //left right
const rotationMasterLazersX = 5 // up down
_environment.push(
    {
        _id: "\\]PillarPair\\.\\[\\d*\\]PillarR$",
        _lookupMethod: "Regex",
        _position: [40 - pillarPairMasterX, 0, 290],
        _rotation: [40, 70, 0]
    },
    {
        _id: "\\]SmallPillarPair\\.\\[\\d*\\]PillarR$",
        _lookupMethod: "Regex",
        _position: [50 - pillarPairMasterX, 0, 285],
        _rotation: [40, 70, 0]
    },
    {
        _id: "\\]PillarPair \\(1\\)\\.\\[\\d*\\]PillarR$",
        _lookupMethod: "Regex",
        _position: [60 - pillarPairMasterX, 0, 280],
        _rotation: [40, 70, 0]
    },
    {
        _id: "\\]SmallPillarPair \\(1\\)\\.\\[\\d*\\]PillarR$",
        _lookupMethod: "Regex",
        _position: [70 - pillarPairMasterX, 0, 275],
        _rotation: [40, 70, 0]
    },
    {
        _id: "\\]PillarPair \\(2\\)\\.\\[\\d*\\]PillarR$",
        _lookupMethod: "Regex",
        _position: [80 - pillarPairMasterX, 0, 270],
        _rotation: [40, 70, 0]
    },
    {
        _id: "\\]SmallPillarPair \\(2\\)\\.\\[\\d*\\]PillarR$",
        _lookupMethod: "Regex",
        _position: [90 - pillarPairMasterX, 0, 265],
        _rotation: [40, 70, 0]
    },
    {
        _id: "\\]PillarPair \\(3\\)\\.\\[\\d*\\]PillarR$",
        _lookupMethod: "Regex",
        _position: [100 - pillarPairMasterX, 0, 260],
        _rotation: [40, 70, 0]
    },
    {
        _id: "\\]SmallPillarPair \\(3\\)\\.\\[\\d*\\]PillarR$",
        _lookupMethod: "Regex",
        _position: [110 - pillarPairMasterX, 0, 255],
        _rotation: [40, 70, 0]
    },
    {
        _id: "\\]PillarPair \\(4\\)\\.\\[\\d*\\]PillarR$",
        _lookupMethod: "Regex",
        _position: [120 - pillarPairMasterX, 0, 250],
        _rotation: [40, 70, 0]
    },
    {
        _id: "\\]PillarPair\\.\\[\\d*\\]PillarL$",
        _lookupMethod: "Regex",
        _position: [-40 + pillarPairMasterX, 0, 290],
        _rotation: [40, -70, 0]
    },
    {
        _id: "\\]SmallPillarPair\\.\\[\\d*\\]PillarL$",
        _lookupMethod: "Regex",
        _position: [-50 + pillarPairMasterX, 0, 285],
        _rotation: [40, -70, 0]
    },
    {
        _id: "\\]PillarPair \\(1\\)\\.\\[\\d*\\]PillarL$",
        _lookupMethod: "Regex",
        _position: [-60 + pillarPairMasterX, 0, 280],
        _rotation: [40, -70, 0]
    },
    {
        _id: "\\]SmallPillarPair \\(1\\)\\.\\[\\d*\\]PillarL$",
        _lookupMethod: "Regex",
        _position: [-70 + pillarPairMasterX, 0, 275],
        _rotation: [40, -70, 0]
    },
    {
        _id: "\\]PillarPair \\(2\\)\\.\\[\\d*\\]PillarL$",
        _lookupMethod: "Regex",
        _position: [-80 + pillarPairMasterX, 0, 270],
        _rotation: [40, -70, 0]
    },
    {
        _id: "\\]SmallPillarPair \\(2\\)\\.\\[\\d*\\]PillarL$",
        _lookupMethod: "Regex",
        _position: [-90 + pillarPairMasterX, 0, 265],
        _rotation: [40, -70, 0]
    },
    {
        _id: "\\]PillarPair \\(3\\)\\.\\[\\d*\\]PillarL$",
        _lookupMethod: "Regex",
        _position: [-100 + pillarPairMasterX, 0, 260],
        _rotation: [40, -70, 0]
    },
    {
        _id: "\\]SmallPillarPair \\(3\\)\\.\\[\\d*\\]PillarL$",
        _lookupMethod: "Regex",
        _position: [-110 + pillarPairMasterX, 0, 255],
        _rotation: [40, -70, 0]
    },
    {
        _id: "\\]PillarPair \\(4\\)\\.\\[\\d*\\]PillarL$",
        _lookupMethod: "Regex",
        _position: [-120 + pillarPairMasterX, 0, 250],
        _rotation: [40, -70, 0]
    },
    {
        _id: "PillarPair\\.\\[\\d*\\]PillarL\\.\\[\\d*\\]LaserL$",
        _lookupMethod: "Regex",
        _position: [0 + shiftLazersX, -10, 0 + shiftLazersZ2],
        _rotation: [-60 - rotationMasterLazersX, 0, -30 - rotationMasterLazers]
    },
    {
        _id: "PillarPair\\.\\[\\d*\\]PillarR\\.\\[\\d*\\]LaserR$",
        _lookupMethod: "Regex",
        _position: [-0 - shiftLazersX, -10, 0 + shiftLazersZ2],
        _rotation: [-60 - rotationMasterLazersX, 0, 30 + rotationMasterLazers]
    },
    {
        _id: "PillarPair \\(1\\)\\.\\[\\d*\\]PillarL\\.\\[\\d*\\]LaserL$",
        _lookupMethod: "Regex",
        _position: [10 + shiftLazersX, -10, 0 + shiftLazersZ2],
        _rotation: [-50 - rotationMasterLazersX, 0, -20 - rotationMasterLazers]
    },
    {
        _id: "PillarPair \\(1\\)\\.\\[\\d*\\]PillarR\\.\\[\\d*\\]LaserR$",
        _lookupMethod: "Regex",
        _position: [-10 - shiftLazersX, -10, 0 + shiftLazersZ2],
        _rotation: [-50 - rotationMasterLazersX, 0, 20 + rotationMasterLazers]
    },
    {
        _id: "PillarPair \\(2\\)\\.\\[\\d*\\]PillarL\\.\\[\\d*\\]LaserL$",
        _lookupMethod: "Regex",
        _position: [20 + shiftLazersX, -10, 0 + shiftLazersZ2],
        _rotation: [-40 - rotationMasterLazersX, 0, -10 - rotationMasterLazers]
    },
    {
        _id: "PillarPair \\(2\\)\\.\\[\\d*\\]PillarR\\.\\[\\d*\\]LaserR$",
        _lookupMethod: "Regex",
        _position: [-20 - shiftLazersX, -10, 0 + shiftLazersZ2],
        _rotation: [-40 - rotationMasterLazersX, 0, 10 + rotationMasterLazers]
    },
    {
        _id: "PillarPair \\(3\\)\\.\\[\\d*\\]PillarL\\.\\[\\d*\\]LaserL$",
        _lookupMethod: "Regex",
        _position: [30 + shiftLazersX, -10, 0 + shiftLazersZ2],
        _rotation: [-30 - rotationMasterLazersX, 0, 0 - rotationMasterLazers]
    },
    {
        _id: "PillarPair \\(3\\)\\.\\[\\d*\\]PillarR\\.\\[\\d*\\]LaserR$",
        _lookupMethod: "Regex",
        _position: [-30 - shiftLazersX, -10, 0 + shiftLazersZ2],
        _rotation: [-30 - rotationMasterLazersX, 0, 0 + rotationMasterLazers]
    },

)

for (let i = 0; i < 5; i++) {
    _environment.push(
        {
            _id: "SmallPillarPair\\.\\[\\d*\\]PillarL\\.\\[\\d*\\]LaserL$",
            _lookupMethod: "Regex",
            _duplicate: 1,
            _position: [2000, i * 2, 250],
            _rotation: [0, 0, 90],
            // _scale: [1, 0.05, 1],
            _lightID: 2000 + i
        }
    )
}
_environment.push(
    {
        _id: "\\[[1-9][0-9]?\\]LaserL\\(Clone\\)\\.\\[\\d*\\]BoxLight",
        _lookupMethod: "Regex",
        _active: false
    }
)
let ringDup = [2, 17]
for (let i = ringDup[0]; i < ringDup[1] * 2; i++) {
    let X = 0 + (55 * Math.cos(i * 5 / (180 / Math.PI)));
    let Y = 0 + (90 * Math.sin(i * 5 / (180 / Math.PI)));
    _environment.push(
        {
            _id: `\\]PillarPair \\(1\\)\\.\\[0\\]PillarL\\.\\[0\\]Pillar$`,
            _lookupMethod: "Regex",
            _position: [X, Y, 200],
            _duplicate: 1,
            // _localRotation: [0, 0, i * 5],
            _scale: [1, 0.035, 1]
        },
        {
            _id: "BottomGlow$",
            _lookupMethod: "Regex",
            _duplicate: 1,
            _localRotation: [0, 90, 0],
            _position: [X, Y, 203]
        },
    )
}




//BlenderToEnvironment

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
    if (x._customData && (x._customData._track == trackName1 || x._customData._track == trackName2)) {
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
            // _id: "GlowLineC\\.\\[\\d*\\]BoxLight$",
            _lookupMethod: "Regex",
            _duplicate: 1,
            _position: pillarPos,
            _scale: pillarScale,
            _rotation: pillarRot,
            _track: x._customData._track,
            _active: true
        })
    }
});

difficulty._notes = difficulty._notes.filter(x => !x._customData || x._customData._track !== trackName1);
difficulty._notes = difficulty._notes.filter(x => !x._customData || x._customData._track !== trackName2);


externalInfo.runs += 1;
console.log(`\nRuns: ${externalInfo.runs}\nEvents: ${_events.length}`)
fs.writeFileSync(COUNT, JSON.stringify(externalInfo, null, 0));
fs.writeFileSync(OUTPUT, JSON.stringify(difficulty, null, 0));
