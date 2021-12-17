const fs = require("fs");
const math = require("mathjs");
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
const _events = difficulty._events;
const halfJumpDuration = 1.7

function Random(min, max, round) {
    max++;
    if (round == false || round == undefined) {
        return Math.random() * (max - min) + min;
    } else
        if (round == true) {
            return Math.round(Math.random() * (max - min) + min);
        }
}
function assignTrackNote(start, end, track, type) {
    if (type == undefined) {
        _notes.forEach(x => {
            if (x._time >= start && x._time <= end) {
                if (!x._customData) x._customData = {}
                x._customData._track = track
            }
        })
    } else
        _notes.forEach(x => {
            if (x._time >= start && x._time <= end && x._type == type) {
                if (!x._customData) x._customData = {}
                x._customData._track = track
            }
        })
}

function wallColorLoop(beat, pre) {
    for (let wallEvent1 = 0; wallEvent1 < 450; wallEvent1++) {
        _customEvents.push(
            {
                "_time": beat + wallEvent1 / pre,
                "_type": "AnimateTrack",
                "_data": {
                    "_track": `spiral2${wallEvent1}`,
                    "_duration": 1,
                    "_color": [[1, 1, 1, 1, 0], [10, 10, 10, 1, 0.1, "easeOutExpo"], [1, 1, 1, 1, 1, "easeInOutCubic"]],
                }
            }
        )
    }
}

for (let wallLoop1 = 0; wallLoop1 < 450; wallLoop1++) {
    _obstacles.push(
        {
            "_time": 36 + wallLoop1 / 16,
            "_lineIndex": 0,
            "_type": 1,
            "_duration": 55,
            "_width": 0,
            "_customData": {
                _scale: [7, 7, 7],
                _color: [1, 1, 1, 1],
                _rotation: [0, 0, wallLoop1 * 10],
                _localRotation: [Random(0, 360), Random(0, 360), Random(0, 360)],
                _track: ["spiral1", `spiral2${wallLoop1}`],
                _animation: {
                    _definitePosition: [[0, 20, wallLoop1, 0]],
                    _dissolve: [[0, 0], [1, 0.2], [1, 0.8], [0, 1]]
                }
            }
        }
    )
}

for (let i = 0; i < 150; i++) {
    _obstacles.push(
        {
            "_time": 324 + i / 32,
            "_lineIndex": 0,
            "_type": 1,
            "_duration": 25,
            "_width": 0,
            "_customData": {
                _scale: [7, 7, 10],
                _color: [0.5, 0.5, 0.5, 1],
                // _localRotation: [Random(0, 360), Random(0, 360), Random(0, 360)],
                // _track: ["spiral1", `spiral2${wallLoop1}`],
                _animation: {
                    _definitePosition: [[Random(-40, 40), -10 - i / 10, Random(-10, 200), 0]],
                    _position: [[0, 0, 0, 0], [0, 0, -200, 1]],
                    _dissolve: [[0, 0], [1, 0.2], [1, 0.8], [0, 1]]
                }
            }
        }
    )
}

for (let i = 0; i < 200; i++) {
    let scale = Random(1, 10);
    _obstacles.push(
        {
            "_time": 100 + i / 64,
            "_lineIndex": 0,
            "_type": 1,
            "_duration": 25,
            "_width": 0,
            "_customData": {
                _scale: [scale, scale, scale],
                _color: [Random(0, 1), Random(0, 1), Random(0, 1), 1],
                _localRotation: [Random(0, 360), Random(0, 360), Random(0, 360)],
                // _track: ["spiral1", `spiral2${wallLoop1}`],
                _rotation: [0, 0, Random(0, 360)],
                _animation: {
                    _definitePosition: [[0, Random(20, 70), Random(-10, 200), 0]],
                    _position: [[0, 0, 0, 0], [0, 0, -200, 1]],
                    _dissolve: [[0, 0], [1, 0.2], [1, 0.8], [0, 1]]
                }
            }
        }
    )
}
for (let i = 0; i < 1000; i++) {
    let RandomX = Random(-30, 30);
    let RandomY = Random(-15, 30);
    _obstacles.push(
        {
            "_time": 132 + i / 32,
            "_lineIndex": 0,
            "_type": 1,
            "_duration": 1,
            "_width": 0,
            "_customData": {
                _scale: [0.3, 0.3, 10],
                _color: [Random(0, 1), Random(0, 1), Random(0, 1), 1],
                _animation: {
                    _definitePosition: [[RandomX, RandomY, Random(-10, 200), 0]],
                    _position: [[0, 0, 0, 0], [0, 0, -200, 1]],
                    _dissolve: [[0, 0], [1, 0.2], [1, 0.8], [0, 1]]
                }
            }
        }
    )
}

for (let i = 0; i < 1000; i++) {
    let RandomX = Random(-30, 30);
    let RandomY = Random(-15, 30);
    _obstacles.push(
        {
            "_time": 229 + i / 16,
            "_lineIndex": 0,
            "_type": 1,
            "_duration": 1,
            "_width": 0,
            "_customData": {
                _scale: [0.7, 0.7, 30],
                _color: [Random(0, 1) * 100, Random(0, 1) * 100, Random(0, 1) * 100, 100],
                _track: "dropWalls2",
                _rotation: [Random(0, 360), 0, Random(0, 360)],
                _animation: {
                    _definitePosition: [[RandomX, RandomY, Random(-10, -30), 0]],
                    _position: [[0, 0, 0, 0], [0, 0, 200, 1]],
                    _dissolve: [[0, 0], [1, 0.2], [1, 0.8], [0, 1]]
                }
            }
        }
    )
}

for (let i = 0; i < 1000; i++) {
    let RandomX = Random(-30, 30);
    let RandomY = Random(-15, 30);
    _obstacles.push(
        {
            "_time": 389 + i / 16,
            "_lineIndex": 0,
            "_type": 1,
            "_duration": 1,
            "_width": 0,
            "_customData": {
                _scale: [0.7, 0.7, 30],
                _color: [Random(0, 1) * 100, Random(0, 1) * 100, Random(0, 1) * 100, 100],
                _track: ["dropWalls3", "dissolveEnd"],
                _rotation: [Random(0, 360), 0, Random(0, 360)],
                _animation: {
                    _definitePosition: [[RandomX, RandomY, Random(-10, -30), 0]],
                    _position: [[0, 0, 0, 0], [0, 0, 200, 1]],
                    _dissolve: [[0, 0], [1, 0.2], [1, 0.8], [0, 1]]
                }
            }
        }
    )
}

for (let i = 0; i < 450; i++) {
    _obstacles.push(
        {
            "_time": 389 + i / 8,
            "_lineIndex": 0,
            "_type": 1,
            "_duration": 0.5,
            "_width": 0,
            "_customData": {
                _scale: [10, 10, 50],
                _color: [0.5, 0.5, 0.5, -69],
                _track: ["dropWalls4", "dissolveEnd"],
                _rotation: [0, 0, Random(0, 360)],
                _animation: {
                    _definitePosition: [[0, 30, Random(-20, -40), 0]],
                    _position: [[0, 0, 0, 0], [0, 0, Random(120, 170), 1]],
                    _dissolve: [[0, 0], [1, 0.05], [1, 0.9], [0, 1]]
                }
            }
        }
    )
}

for (let i = 0; i < 570; i++) {
    _obstacles.push(
        {
            "_time": 196 + i / 16,
            "_lineIndex": 0,
            "_type": 1,
            "_duration": 10,
            "_width": 0,
            "_customData": {
                _scale: [1 / 12, 1 / 12, 1 / 12],
                _color: [1, 1, 1],
                _track: "cloudWalls1",
                _localRotation: [Random(0, 360), Random(0, 360), Random(0, 360)],
                _animation: {
                    _definitePosition: [[Random(-70, 70), Random(-40, -10), Random(-10, 150), 0]],
                    _position: [[0, 0, 0, 0], [0, 0, -155, 1]],
                    _dissolve: [[0, 0], [1, 0.2], [1, 0.8], [0, 1]],
                    _scale: [[50, 50, 50, 0]]
                }
            }
        },
        {
            "_time": 196 + i / 16,
            "_lineIndex": 0,
            "_type": 1,
            "_duration": 10,
            "_width": 0,
            "_customData": {
                _scale: [1 / 12, 1 / 12, 1 / 12],
                _color: [1, 1, 1],
                _track: "cloudWalls1",
                _localRotation: [Random(0, 360), Random(0, 360), Random(0, 360)],
                _animation: {
                    _definitePosition: [[Random(-70, 70), Random(40, 10), Random(-10, 90), 0]],
                    _position: [[0, 0, 0, 0], [0, 0, -95, 1]],
                    _dissolve: [[0, 0], [1, 0.2], [1, 0.8], [0, 1]],
                    _scale: [[50, 50, 50, 0]]
                }
            }
        }
    )
}

_obstacles.forEach(x => {
    if (x._customData._track == "title1") {
        if (!x._customData) x._customData = {}
        if (!x._customData._animation) x._customData._animation = {}
        x._customData._animation._dissolve = [[0, 0], [1, 0.6]]
    }
    if (x._customData._track == "DropLyrics1") {
        if (!x._customData) x._customData = {}
        if (!x._customData._animation) x._customData._animation = {}
        x._customData._animation._position = [[0, 0, 0, 0.7], [Random(-30, 30), Random(-20, 40), Random(-70, 70), 1, "easeOutExpo"]]
    }
})
_customEvents.push(
    {
        "_time": 35,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "title1",
            "_duration": 1,
            _dissolve: [[1, 0], [0, 1, "easeOutExpo"]]
        }
    },
    {
        "_time": 195,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "cloudWalls1",
            "_duration": 35,
            _rotation: [[0, 0, 0, 0], [0, 0, 10000, 1]]
        }
    },
    {
        "_time": 291,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "dropWalls2",
            "_duration": 0.1,
            _dissolve: [[1, 0], [0, 1, "easeInOutCubic"]]
        }
    },
    {
        "_time": 387,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "dropWalls4",
            "_duration": 60,
            _rotation: [[0, 0, 0, 0], [0, 0, 100000, 1]]
        }
    },
    {
        "_time": 444,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "dissolveEnd",
            "_duration": 0.1,
            _dissolve: [[1, 0], [0, 1, "easeInOutCubic"]]
        }
    },
    {
        "_time": 224,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "cloudWalls1",
            "_duration": 4,
            _position: [[0, 0, 0, 0], [0, 0, -200, 1, "easeInOutCubic"]]
        }
    }
)


for (let i = 0; i < 17; i++) {
    wallColorLoop(35 + i * 4, 64 * 4)
}

_customEvents.push(
    {
        "_time": 34,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "spiral1",
            "_duration": 120,
            "_position": [[0, 0, 0, 0], [0, 0, -400, 1]],
        }
    },
    {
        "_time": 99,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "spiral1",
            "_duration": 3,
            "_dissolve": [[1, 0], [0, 1, "easeOutExpo"]]
        }
    }
)




let count = 0;
var ringRGB = 2;
_events.forEach(x => {
    if (x._type == 4 && x._time < 36.5) { } else
        if (x._type <= 4 && x._value != 0 && x._customData._color != undefined) {
            x._customData._color = [
                x._customData._color[0] * ringRGB,
                x._customData._color[1] * ringRGB,
                x._customData._color[2] * ringRGB,
                x._customData._color[3] * 1
            ]
            count++
        }
})
console.log(`Lights multiplied: ${count}`)



_notes.forEach(x => {
    if (x._time >= 227.75 && x._time <= 283.75) {
        if (!x._customData) x._customData = {}
        if (!x._customData._animation) x._customData._animation = {}
        x._customData._disableNoteGravity = true
        x._customData._disableNoteLook = true
        x._customData._noteJumpStartBeatOffset = 1.5
        x._customData._noteJumpMovementSpeed = 16
        x._customData._animation._dissolve = [[0, 0], [1, 0.01]]
        x._customData._animation._dissolveArrow = [[0, 0], [1, 0.01]]
        x._customData._animation._rotation = [[Random(-20, 20, true), Random(-30, 30, true), Random(-90, 90, true), 0], [0, 0, 0, 0.3, "easeOutBack"]]
        // x._customData._animation._localRotation = [[Random(0, 360, true), Random(0, 360, true), Random(0, 360, true), 0], [0, 0, 0, 0.15, "easeInOutCubic"]]
    }
    if (x._time >= 323.2 && x._time <= 355.75 && x._type == 1) {
        if (!x._customData) x._customData = {}
        if (!x._customData._animation) x._customData._animation = {}

        x._customData._disableNoteGravity = true
        x._customData._disableNoteLook = true
        x._customData._noteJumpStartBeatOffset = 1.5
        x._customData._noteJumpMovementSpeed = 16
        x._customData._animation._dissolve = [[0, 0], [1, 0.1]]
        x._customData._animation._dissolveArrow = [[0, 0], [1, 0.1]]
        x._customData._animation._position = [[6 - x._lineIndex, (1 - x._lineLayer) * -1, 0, 0], [0, 0, 0, 0.3, "easeInOutCubic"]]
        x._customData._animation._rotation = [[0, 0, Random(-45, 45, true), 0], [0, 0, 0, 0.25]]
    }
    if (x._time >= 323.2 && x._time <= 355.75 && x._type == 0) {
        if (!x._customData) x._customData = {}
        if (!x._customData._animation) x._customData._animation = {}
        x._customData._disableNoteGravity = true
        x._customData._disableNoteLook = true
        x._customData._noteJumpStartBeatOffset = 1.5
        x._customData._noteJumpMovementSpeed = 16
        x._customData._animation._dissolve = [[0, 0], [1, 0.1]]
        x._customData._animation._dissolveArrow = [[0, 0], [1, 0.2]]
        x._customData._animation._position = [[(6 - x._lineIndex) * -1, (1 - x._lineLayer) * -1, 0, 0], [0, 0, 0, 0.3, "easeInOutCubic"]]
        x._customData._animation._rotation = [[0, 0, Random(-45, 45, true), 0], [0, 0, 0, 0.25]]
    }
    if (x._time >= 423.5 && x._time <= 445) {
        if (!x._customData) x._customData = {}
        if (!x._customData._animation) x._customData._animation = {}
        x._customData._disableNoteGravity = true
        x._customData._disableNoteLook = true
        x._customData._noteJumpStartBeatOffset = 1.5
        // x._customData._noteJumpMovementSpeed = 16
        x._customData._animation._dissolve = [[0, 0], [1, 0.01]]
        x._customData._animation._dissolveArrow = [[0, 0], [1, 0.01]]
        x._customData._animation._position = [[Random(-5, 5, true), Random(0, 7, true), 0, 0], [0, 0, 0, 0.1, "easeOutCubic"]]
        x._customData._animation._localRotation = [[Random(0, 360, true), Random(0, 360, true), Random(0, 360, true), 0], [0, 0, 0, 0.15, "easeInOutCubic"]]
    }
    if (x._time >= 131.75 && x._time <= 162 && x._type == 0) {
        if (!x._customData) x._customData = {}
        if (!x._customData._animation) x._customData._animation = {}
        x._customData._flip = [3, 1]
        x._customData._noteJumpStartBeatOffset = 1.5
    }//first drop notes
    if (x._time >= 131.75 && x._time <= 162 && x._type == 1) {
        if (!x._customData) x._customData = {}
        if (!x._customData._animation) x._customData._animation = {}
        x._customData._flip = [-3, 1]
        x._customData._noteJumpStartBeatOffset = 1.5
    }//first drop notes
    if (x._time >= 387.5 && x._time <= 395.5) {
        if (!x._customData) x._customData = {}
        if (!x._customData._animation) x._customData._animation = {}
        x._customData._flip = [2, 1]
        x._customData._noteJumpStartBeatOffset = 1.5
    }
    if (x._time >= 395.75 && x._time <= 403.5) {
        if (!x._customData) x._customData = {}
        if (!x._customData._animation) x._customData._animation = {}
        x._customData._flip = [-2, 1]
        x._customData._noteJumpStartBeatOffset = 1.5
    }
    if (x._time >= 403.75 && x._time <= 411.75) {
        if (!x._customData) x._customData = {}
        if (!x._customData._animation) x._customData._animation = {}
        x._customData._flip = [2, 1]
        x._customData._noteJumpStartBeatOffset = 1.5
    }
    if (x._time >= 411.75 && x._time <= 419.5) {
        if (!x._customData) x._customData = {}
        if (!x._customData._animation) x._customData._animation = {}
        x._customData._flip = [-2, 1]
        x._customData._noteJumpStartBeatOffset = 1.5
    }
    if (x._time >= 451.75 && x._time <= 516 && x._type == 0) {
        if (!x._customData) x._customData = {}
        if (!x._customData._animation) x._customData._animation = {}
        x._customData._disableNoteGravity = true
        x._customData._disableNoteLook = true
        x._customData._noteJumpStartBeatOffset = 1.5
        x._customData._noteJumpMovementSpeed = 16
        x._customData._animation._dissolve = [[0, 0], [1, 0.1]]
        x._customData._animation._dissolveArrow = [[0, 0], [1, 0.2]]
        x._customData._animation._position = [[(6 - x._lineIndex) * -1, (1 - x._lineLayer) * -1, 0, 0], [0, 0, 0, 0.3, "easeInOutCubic"]]
        x._customData._animation._rotation = [[0, 0, Random(-45, 45, true), 0], [0, 0, 0, 0.25]]
    }
    if (x._time >= 451.75 && x._time <= 516 && x._type == 1) {
        if (!x._customData) x._customData = {}
        if (!x._customData._animation) x._customData._animation = {}
        x._customData._disableNoteGravity = true
        x._customData._disableNoteLook = true
        x._customData._noteJumpStartBeatOffset = 1.5
        x._customData._noteJumpMovementSpeed = 16
        x._customData._animation._dissolve = [[0, 0], [1, 0.1]]
        x._customData._animation._dissolveArrow = [[0, 0], [1, 0.1]]
        x._customData._animation._position = [[6 - x._lineIndex, (1 - x._lineLayer) * -1, 0, 0], [0, 0, 0, 0.3, "easeInOutCubic"]]
        x._customData._animation._rotation = [[0, 0, Random(-45, 45, true), 0], [0, 0, 0, 0.25]]
    }

})






assignTrackNote(355.75, 384, "DopeDissolve", 0)
assignTrackNote(355.75, 384, "DopeDissolve", 1)
assignTrackNote(451.75, 516, "endingNoteDissolve", 0)
assignTrackNote(451.75, 516, "endingNoteDissolve", 1)
assignTrackNote(163.75, 195.75, "colorSwapRight", 1)
assignTrackNote(163.75, 195.75, "colorSwapLeft", 0)


_customEvents.push(
    {
        "_time": 452,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "endingNoteDissolve",
            "_duration": 61,
            "_dissolve": [[1, 0], [0, 1]],
            "_dissolveArrow": [[1, 0], [0.7, 1]],
        }
    }
)

//color swap events:
_customEvents.push(
    {
        "_time": 164,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapRight",
            "_duration": 0.05,
            _color: [0.658, 0.125, 0.125, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 165,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapRight",
            "_duration": 0.05,
            _color: [0.125, 0.392, 0.658, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 166,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapRight",
            "_duration": 0.05,
            _color: [0.658, 0.125, 0.125, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 166.75,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapRight",
            "_duration": 0.05,
            _color: [0.125, 0.392, 0.658, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 167.5,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapRight",
            "_duration": 0.05,
            _color: [0.658, 0.125, 0.125, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 168,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapRight",
            "_duration": 0.05,
            _color: [0.125, 0.392, 0.658, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 169,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapRight",
            "_duration": 0.05,
            _color: [0.658, 0.125, 0.125, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 170,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapRight",
            "_duration": 0.05,
            _color: [0.125, 0.392, 0.658, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 170.75,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapRight",
            "_duration": 0.05,
            _color: [0.658, 0.125, 0.125, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 171.5,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapRight",
            "_duration": 0.05,
            _color: [0.125, 0.392, 0.658, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 172,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapRight",
            "_duration": 0.05,
            _color: [0.658, 0.125, 0.125, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 173,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapRight",
            "_duration": 0.05,
            _color: [0.125, 0.392, 0.658, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 174,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapRight",
            "_duration": 0.05,
            _color: [0.658, 0.125, 0.125, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 174.75,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapRight",
            "_duration": 0.05,
            _color: [0.125, 0.392, 0.658, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 175.5,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapRight",
            "_duration": 0.05,
            _color: [0.658, 0.125, 0.125, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 176,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapRight",
            "_duration": 0.05,
            _color: [0.125, 0.392, 0.658, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 177,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapRight",
            "_duration": 0.05,
            _color: [0.658, 0.125, 0.125, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 178,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapRight",
            "_duration": 0.05,
            _color: [0.125, 0.392, 0.658, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 178.75,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapRight",
            "_duration": 0.05,
            _color: [0.658, 0.125, 0.125, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 179.5,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapRight",
            "_duration": 0.05,
            _color: [0.125, 0.392, 0.658, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 180,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapRight",
            "_duration": 0.05,
            _color: [0.658, 0.125, 0.125, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 181,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapRight",
            "_duration": 0.05,
            _color: [0.125, 0.392, 0.658, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 182,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapRight",
            "_duration": 0.05,
            _color: [0.658, 0.125, 0.125, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 182.75,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapRight",
            "_duration": 0.05,
            _color: [0.125, 0.392, 0.658, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 183.5,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapRight",
            "_duration": 0.05,
            _color: [0.658, 0.125, 0.125, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 184,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapRight",
            "_duration": 0.05,
            _color: [0.125, 0.392, 0.658, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 185,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapRight",
            "_duration": 0.05,
            _color: [0.658, 0.125, 0.125, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 186,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapRight",
            "_duration": 0.05,
            _color: [0.125, 0.392, 0.658, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 186.75,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapRight",
            "_duration": 0.05,
            _color: [0.658, 0.125, 0.125, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 187.5,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapRight",
            "_duration": 0.05,
            _color: [0.125, 0.392, 0.658, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 188,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapRight",
            "_duration": 0.05,
            _color: [0.658, 0.125, 0.125, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 189,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapRight",
            "_duration": 0.05,
            _color: [0.125, 0.392, 0.658, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 190,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapRight",
            "_duration": 0.05,
            _color: [0.658, 0.125, 0.125, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 190.75,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapRight",
            "_duration": 0.05,
            _color: [0.125, 0.392, 0.658, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 191.5,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapRight",
            "_duration": 0.05,
            _color: [0.658, 0.125, 0.125, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 192,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapRight",
            "_duration": 0.05,
            _color: [0.125, 0.392, 0.658, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 193,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapRight",
            "_duration": 0.05,
            _color: [0.658, 0.125, 0.125, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 194,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapRight",
            "_duration": 0.05,
            _color: [0.125, 0.392, 0.658, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 194.75,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapRight",
            "_duration": 0.05,
            _color: [0.658, 0.125, 0.125, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 195.5,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapRight",
            "_duration": 0.05,
            _color: [0.125, 0.392, 0.658, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 164,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapLeft",
            "_duration": 0.05,
            _color: [0.125, 0.392, 0.658, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 165,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapLeft",
            "_duration": 0.05,
            _color: [0.658, 0.125, 0.125, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 166,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapLeft",
            "_duration": 0.05,
            _color: [0.125, 0.392, 0.658, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 166.75,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapLeft",
            "_duration": 0.05,
            _color: [0.658, 0.125, 0.125, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 167.5,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapLeft",
            "_duration": 0.05,
            _color: [0.125, 0.392, 0.658, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 168,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapLeft",
            "_duration": 0.05,
            _color: [0.658, 0.125, 0.125, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 169,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapLeft",
            "_duration": 0.05,
            _color: [0.125, 0.392, 0.658, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 170,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapLeft",
            "_duration": 0.05,
            _color: [0.658, 0.125, 0.125, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 170.75,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapLeft",
            "_duration": 0.05,
            _color: [0.125, 0.392, 0.658, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 171.5,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapLeft",
            "_duration": 0.05,
            _color: [0.658, 0.125, 0.125, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 172,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapLeft",
            "_duration": 0.05,
            _color: [0.125, 0.392, 0.658, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 173,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapLeft",
            "_duration": 0.05,
            _color: [0.658, 0.125, 0.125, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 174,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapLeft",
            "_duration": 0.05,
            _color: [0.125, 0.392, 0.658, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 174.75,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapLeft",
            "_duration": 0.05,
            _color: [0.658, 0.125, 0.125, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 175.5,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapLeft",
            "_duration": 0.05,
            _color: [0.125, 0.392, 0.658, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 176,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapLeft",
            "_duration": 0.05,
            _color: [0.658, 0.125, 0.125, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 177,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapLeft",
            "_duration": 0.05,
            _color: [0.125, 0.392, 0.658, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 178,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapLeft",
            "_duration": 0.05,
            _color: [0.658, 0.125, 0.125, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 178.75,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapLeft",
            "_duration": 0.05,
            _color: [0.125, 0.392, 0.658, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 179.5,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapLeft",
            "_duration": 0.05,
            _color: [0.658, 0.125, 0.125, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 180,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapLeft",
            "_duration": 0.05,
            _color: [0.125, 0.392, 0.658, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 181,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapLeft",
            "_duration": 0.05,
            _color: [0.658, 0.125, 0.125, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 182,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapLeft",
            "_duration": 0.05,
            _color: [0.125, 0.392, 0.658, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 182.75,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapLeft",
            "_duration": 0.05,
            _color: [0.658, 0.125, 0.125, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 183.5,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapLeft",
            "_duration": 0.05,
            _color: [0.125, 0.392, 0.658, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 184,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapLeft",
            "_duration": 0.05,
            _color: [0.658, 0.125, 0.125, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 185,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapLeft",
            "_duration": 0.05,
            _color: [0.125, 0.392, 0.658, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 186,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapLeft",
            "_duration": 0.05,
            _color: [0.658, 0.125, 0.125, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 186.75,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapLeft",
            "_duration": 0.05,
            _color: [0.125, 0.392, 0.658, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 187.5,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapLeft",
            "_duration": 0.05,
            _color: [0.658, 0.125, 0.125, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 188,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapLeft",
            "_duration": 0.05,
            _color: [0.125, 0.392, 0.658, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 189,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapLeft",
            "_duration": 0.05,
            _color: [0.658, 0.125, 0.125, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 190,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapLeft",
            "_duration": 0.05,
            _color: [0.125, 0.392, 0.658, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 190.75,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapLeft",
            "_duration": 0.05,
            _color: [0.658, 0.125, 0.125, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 191.5,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapLeft",
            "_duration": 0.05,
            _color: [0.125, 0.392, 0.658, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 192,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapLeft",
            "_duration": 0.05,
            _color: [0.658, 0.125, 0.125, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 193,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapLeft",
            "_duration": 0.05,
            _color: [0.125, 0.392, 0.658, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 194,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapLeft",
            "_duration": 0.05,
            _color: [0.658, 0.125, 0.125, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 194.75,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapLeft",
            "_duration": 0.05,
            _color: [0.125, 0.392, 0.658, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
    {
        "_time": 195.5,
        "_type": "AnimateTrack",
        "_data": {
            "_track": "colorSwapLeft",
            "_duration": 0.05,
            _color: [0.658, 0.125, 0.125, 0],
            _dissolve: [[0.3, 0], [1, 1]],
            _scale: [[4, 1, 1, 0], [1, 1, 1, 1]]
        }
    },
)

for (let DopeDissolveLoop = 0; DopeDissolveLoop < 16; DopeDissolveLoop += 2) {
    _customEvents.push(
        {
            "_time": 356 + DopeDissolveLoop,
            "_type": "AnimateTrack",
            "_data": {
                "_track": "DopeDissolve",
                "_duration": 0.05,
                "_dissolve": [[0, 1]],
            }
        },
        {
            "_time": 356 + DopeDissolveLoop + 1,
            "_type": "AnimateTrack",
            "_data": {
                "_track": "DopeDissolve",
                "_duration": 0.05,
                "_dissolve": [[1, 1]],
            }
        }
    )
}
for (let DopeDissolveLoop = 0; DopeDissolveLoop < 9; DopeDissolveLoop += 1) {
    _customEvents.push(
        {
            "_time": 371.5 + DopeDissolveLoop,
            "_type": "AnimateTrack",
            "_data": {
                "_track": "DopeDissolve",
                "_duration": 0.05,
                "_dissolve": [[1, 1]],
            }
        },
        {
            "_time": 371.5 + DopeDissolveLoop + 0.5,
            "_type": "AnimateTrack",
            "_data": {
                "_track": "DopeDissolve",
                "_duration": 0.05,
                "_dissolve": [[0, 1]],
            }
        }
    )
}
for (let DopeDissolveLoop = 0; DopeDissolveLoop < 5; DopeDissolveLoop += 0.25) {
    _customEvents.push(
        {
            "_time": 379.5 + DopeDissolveLoop,
            "_type": "AnimateTrack",
            "_data": {
                "_track": "DopeDissolve",
                "_duration": 0.05,
                "_dissolve": [[0, 1]],
            }
        },
        {
            "_time": 379.5 + DopeDissolveLoop + 0.125,
            "_type": "AnimateTrack",
            "_data": {
                "_track": "DopeDissolve",
                "_duration": 0.05,
                "_dissolve": [[1, 1]],
            }
        }
    )
}
const lazerLocalPositionR = [30, -40, 30];
const lazerLocalPositionL = [-30, -40, 30];
_environment.push(
    {
        _id: "\\]PlayersPlace$",
        _lookupMethod: "Regex",
        _active: false
    },
    {
        _id: "\\]Spectrogram$",
        _lookupMethod: "Regex",
        _active: false
    },
    {
        _id: "Environment\\.\\[\\d*\\]Construction$",
        _lookupMethod: "Regex",
        _active: false
    },
    {
        _id: "TrackConstruction$",
        _lookupMethod: "Regex",
        _localPosition: [0, 0, -50]
    },
    {
        _id: "TrackMirror$",
        _lookupMethod: "Regex",
        _localPosition: [0.5, 0, -50]
    },
    {
        _id: "NarrowGameHUD",
        _lookupMethod: "Regex",
        _active: false
    },
    {
        _id: "FrontLights\\.\\[\\d*\\]NeonTube(\\s\\(\\d*\\))?\\.\\[\\d*\\]BoxLight",
        _lookupMethod: "Regex",
        _active: false
    },
    {
        _id: "RotatingLasersPair(\\s\\(\\d*\\))?\\.\\[\\d*\\]BaseL$",
        _lookupMethod: "Regex",
        _scale: [5, 5, 5],
        _localPosition: lazerLocalPositionL
    },
    {
        _id: "RotatingLasersPair(\\s\\(\\d*\\))?\\.\\[\\d*\\]BaseR$",
        _lookupMethod: "Regex",
        _scale: [5, 5, 5],
        _localPosition: lazerLocalPositionR
    },
    {
        _id: "FrontLights\\.\\[\\d*\\]NeonTube(\\s\\(\\d*\\))?\\.\\[\\d*\\]BoxLight$",
        _lookupMethod: "Regex",
        _scale: [9, 9, 9],
    },
    {
        _id: "\\]LightsTrackLaneRing\\(Clone\\)\\.\\[0\\]Laser(\\s\\(\\d*\\))?$",
        _lookupMethod: "Regex",
        _scale: [3, 100, 3],
    },
    {
        _id: "\\]LightsTrackLaneRing\\(Clone\\)\\.\\[1\\]Laser(\\s\\(\\d*\\))?$",
        _lookupMethod: "Regex",
        _scale: [3, 100, 3],
    },
    {
        _id: "\\]LightsTrackLaneRing\\(Clone\\)\\.\\[2\\]Laser(\\s\\(\\d*\\))?$",
        _lookupMethod: "Regex",
        _scale: [3, 100, 3],
    },
    {
        _id: "\\]LightsTrackLaneRing\\(Clone\\)\\.\\[3\\]Laser(\\s\\(\\d*\\))?$",
        _lookupMethod: "Regex",
        _scale: [3, 100, 3],
    }
)



_obstacles.forEach(x => {
    if (!x._customData) x._customData = {}
    if (!x._customData._animation) x._customData._animation = {}
    x._customData._fake = true;
    x._customData._interactable = false;

}
)

fs.writeFileSync(OUTPUT, JSON.stringify(difficulty, null, 0));
