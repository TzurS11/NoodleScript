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

function Random(min, max) {
    max++;
    return Math.random() * (max - min) + min;
}
var heightMasterBig = 2;
var heightMasterSmall = 0;
var playerDistance = 30;
var onetwothree = 0;
var threetwoone = 10
for (let loopEnvironment1 = 16; loopEnvironment1 <= 24; loopEnvironment1++) {
    _environment.push(
        {
            _id: ".*\\[" + loopEnvironment1 + "\\]PillarPair(\\s\\(\\d*\\))?\\.\\[\\d*\\]PillarL$",
            _lookupMethod: "Regex",
            _localPosition: [((loopEnvironment1 * onetwothree / 2) + 30) - onetwothree * 1.5, (onetwothree / 4 * (loopEnvironment1 - 15)) - heightMasterBig,/* (30 + (loopEnvironment1 * -1)) - playerDistance*/loopEnvironment1 * onetwothree / 2 - playerDistance],
            _rotation: [loopEnvironment1 * 2, loopEnvironment1 * onetwothree * 0.5, loopEnvironment1 * -2],
            _scale: [1, 1, 1],
            _track: "emotionalEnding"
        },
        {
            _id: ".*\\[" + loopEnvironment1 + "\\]PillarPair(\\s\\(\\d*\\))?\\.\\[\\d*\\]PillarR$",
            _lookupMethod: "Regex",
            _localPosition: [((loopEnvironment1 * onetwothree / -2) - 30) + onetwothree * 1.5, (onetwothree / 4 * (loopEnvironment1 - 15)) - heightMasterBig,/* (30 + (loopEnvironment1 * -1)) - playerDistance*/loopEnvironment1 * onetwothree / 2 - playerDistance],
            _rotation: [loopEnvironment1 * 2, loopEnvironment1 * -onetwothree * 0.5, loopEnvironment1 * 2],
            _scale: [1, 1, 1],
            _track: "emotionalEnding"
        }
    )
    threetwoone--;
    loopEnvironment1++;
    _environment.push(
        {
            _id: ".*\\[" + loopEnvironment1 + "\\]SmallPillarPair(\\s\\(\\d*\\))?\\.\\[\\d*\\]PillarL$",
            _lookupMethod: "Regex",
            _localPosition: [(loopEnvironment1 * onetwothree / 2) + 15, ((onetwothree / 2 * (loopEnvironment1 - 20)) + 5) - heightMasterSmall, (60 + (loopEnvironment1 * -1)) - playerDistance],
            _rotation: [(loopEnvironment1 * -2) * 4, loopEnvironment1 * onetwothree * 4, loopEnvironment1 * -4],
            _track: "emotionalEnding"
            // _localRotation: [loopEnvironment1 * -2,0,0],
            // _scale: [1, 4 + onetwothree * 2, 1]
        },
        {
            _id: ".*\\[" + loopEnvironment1 + "\\]SmallPillarPair(\\s\\(\\d*\\))?\\.\\[\\d*\\]PillarR$",
            _lookupMethod: "Regex",
            _localPosition: [((loopEnvironment1 * onetwothree / 2) * -1) - 15, ((onetwothree / 2 * (loopEnvironment1 - 20)) + 5) - heightMasterSmall, (60 + (loopEnvironment1 * -1)) - playerDistance],
            _rotation: [(loopEnvironment1 * -2) * 4, loopEnvironment1 * -onetwothree * 4, loopEnvironment1 * 4],
            _track: "emotionalEnding"
            // _localRotation: [loopEnvironment1 * -2,0,0],
            // _scale: [1, 4 + onetwothree * 2, 1]
        }
    )
    onetwothree++;
}
var countEvents = 0;
for (let loopEnvironment2 = 0; loopEnvironment2 <= 29; loopEnvironment2++) {
    _environment.push(
        {
            _id: ".*\\[13\\]PillarTrackLaneRingsR.\\[" + loopEnvironment2 + "\\]PillarTrackLaneRing\\(Clone\\)$",
            _lookupMethod: "Regex",
            _position: [Random(-60, -500), 365, Random(-5, 500)],
            _scale: [0.1, 0.1, 100],
            _localRotation: [Random(-20, 20) * -1, Random(-20, 20), Random(-20, 20) * -1],
            _track: "PillarTrackLaneRingsR1" + loopEnvironment2
        }
    )
    _environment.push(
        {
            _id: ".*\\[14\\]PillarTrackLaneRingsR \\(\\d*\\).\\[" + loopEnvironment2 + "\\]PillarTrackLaneRing\\(Clone\\)$",
            _lookupMethod: "Regex",
            _position: [Random(60, 500), 365, Random(-5, 500)],
            _scale: [0.1, 0.1, 100],
            _localRotation: [Random(-20, 20), Random(-20, 20) * -1, Random(-20, 20)],
            _track: "PillarTrackLaneRingsR2" + loopEnvironment2
        }
    )
    _customEvents.push(
        {
            "_time": 681,
            "_type": "AnimateTrack",
            "_data": {
                "_track": "PillarTrackLaneRingsR1" + loopEnvironment2,
                "_duration": 0.125,
                _localPosition: [[0, 0, 0, 0], [0, 0, -10000, 1]]
            }
        },
        {
            "_time": 681,
            "_type": "AnimateTrack",
            "_data": {
                "_track": "PillarTrackLaneRingsR2" + loopEnvironment2,
                "_duration": 0.125,
                _localPosition: [[0, 0, 0, 0], [0, 0, -10000, 1]]
            }
        },
    )
    for (let loopEnvironmentRotation = 0; loopEnvironmentRotation <= 172; loopEnvironmentRotation++) {
        _customEvents.push(
            {
                "_time": 412.125 + loopEnvironmentRotation / 4,
                "_type": "AnimateTrack",
                "_data": {
                    "_track": "PillarTrackLaneRingsR1" + loopEnvironment2,
                    "_duration": 0.125,
                    _localRotation: [[Random(-20, 20) * -1, Random(-20, 20), Random(-20, 20) * -1, 0]]
                }
            },
            {
                "_time": 412.125 + loopEnvironmentRotation / 4,
                "_type": "AnimateTrack",
                "_data": {
                    "_track": "PillarTrackLaneRingsR2" + loopEnvironment2,
                    "_duration": 0.125,
                    _localRotation: [[Random(-20, 20), Random(-20, 20) * -1, Random(-20, 20), 0]]
                }
            },

        )
        countEvents += 2;
    }
}

_customEvents.push(
    {
        "_time": 681,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "emotionalEnding",
            "_duration": 0.125,
            _localPosition: [[0, 0, 0, 0], [0, 700, 0, 1]]
        }
    },
    {
        "_time": 681,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "highclouds",
            "_duration": 0.125,
            _position: [[0, 10000, 0, 0], [0, 100, 0, 1]]
        }
    },
    {
        "_time": 681,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "highclouds",
            "_duration": 181,
            _localRotation: [[0, 0, 0, 0], [0, 100000, 0, 1]]
        }
    },
    {
        "_time": 841,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "lowclouds1",
            "_duration": 0.125,
            _position: [[0, 100000, 0, 0], [0, 100000, 0, 1]]
        }
    },
    {
        "_time": 841,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "highclouds",
            "_duration": 0.125,
            _position: [[0, 100000, 0, 0], [0, 100000, 0, 1]]
        }
    }
)



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
        "_id": ".*\\[\\d*\\]Clouds\\.\\[\\d*\\]HighCloudsGenerator",
        "_track": "highclouds",
        "_lookupMethod": "Regex",
        "_position": [0, 10000, 0]
    },
    {
        "_id": ".*\\[11\\]Clouds\\.\\[0\\]LowCloudsGenerator",
        "_track": "lowclouds1",
        "_lookupMethod": "Regex",
        "_position": [0, -3, 0],
    },
    {
        "_id": ".*\\[\\d*\\]MagicDoorSprite$",
        "_lookupMethod": "Regex",
        "_localPosition": [0, -300, 0]
    },
    {
        "_id": ".*\\[\\d*\\]MagicDoorSprite\\.\\[\\d*\\]BloomL",
        "_lookupMethod": "Regex",
        "_position": [-0.5, 0, 200],
        "_rotation": [0, 90, 90]
    },
    {
        "_id": ".*\\[\\d*\\]MagicDoorSprite\\.\\[\\d*\\]BloomR",
        "_lookupMethod": "Regex",
        "_active": false
    }
)

_customEvents.push(
    {
        "_time": 412,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "lowclouds1",
            "_duration": 0.125,
            _position: [[0, -10, 0, 0], [0, -10, 0, 1]]
        }
    },
    {
        "_time": 455,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "lowclouds1",
            "_duration": 0.125,
            _position: [[0, -3, 0, 0], [0, -3, 0, 1]]
        }
    }
)

_environment.forEach(x => {
    if (x._duplicate == undefined) {
        console.log("ID: " + x._id + ", Method: " + x._lookupMethod);
    } else
        console.log("ID: " + x._id + ", Method: " + x._lookupMethod + ", Duplicates: " + x._duplicate);
});

console.log(countEvents)
fs.writeFileSync(OUTPUT, JSON.stringify(difficulty, null, 0));
