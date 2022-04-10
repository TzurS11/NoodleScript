const fs = require("fs");
const {
  Wall,
  Note,
  Environment,
  CustomEvent,
  Event,
  Difficulty,
  WALL,
  rotatePoint,
} = require("swifter_remapper");//no i did not use remapper i dont know why i installed it even :/
const three = require("three");
const INPUT = "ExpertPlusStandard.dat";
const OUTPUT = "ExpertPlusStandard.dat";
const COUNT = "countRuns.dat";
let difficulty = JSON.parse(fs.readFileSync(INPUT));
let externalInfo = JSON.parse(fs.readFileSync(COUNT));
const halfJumpDuration = 2;
difficulty._customData = {
  _customEvents: [],
  _environment: [],
};
const _customData = difficulty._customData;
const _obstacles = difficulty._obstacles;
const _notes = difficulty._notes;
const _customEvents = _customData._customEvents;
const _environment = _customData._environment;
const _events = difficulty._events;
const FirstSceneZ = 50;
const leftColor = [1, 0.536, 0.187, 1];
const rightColor = [0.212, 0.509, 1, 1];
const pillarToNoodleUnits = 0.1495;
const spaceBetweenNotes = 1.1;
const trackNameArr = [
  EnvArrLengthByTrack("nothingElseLogo"),
  EnvArrLengthByTrack("beginningMountain"),
  EnvArrLengthByTrack("vallyWithWater"),
  EnvArrLengthByTrack("mountainAfterDrop"),
  EnvArrLengthByTrack("caveAfterMountain"),
  EnvArrLengthByTrack("complexGeometry"),
  EnvArrLengthByTrack("OceanBeach"),
  EnvArrLengthByTrack("temple"),
  EnvArrLengthByTrack("endOcean"),
];
var envDups = trackNameArr[0];
for (let i = 0; i < trackNameArr.length; i++) {
  if (envDups < trackNameArr[i]) {
    envDups = trackNameArr[i];
  }
}
function CalcTime(start, end, time) {
  return Number(((time - start) / (end - start)).toFixed(3));
}

function Random(min, max, round) {
  if (round == false || round == undefined)
    return Number((Math.random() * (max - min) + min).toFixed(3));
  if (round == true) return Math.round(Math.random() * (max - min) + min);
}

function NumArray(start, end) {
  let arr = [];
  for (let i = start; i <= end; i++) {
    arr.push(i);
  }
  return arr;
}
function OnCirc(RADIUS, ANGLE, X, Y, MULTIPLIER) {
  let x = Number(
    (MULTIPLIER[0] * RADIUS * Math.cos(ANGLE / (180 / Math.PI))).toFixed(3)
  );
  let y = Number(
    (MULTIPLIER[1] * RADIUS * Math.sin(ANGLE / (180 / Math.PI))).toFixed(3)
  );
  return [x + X, y + Y];
}

function EnvArrLengthByTrack(track) {
  let length = 0;
  _notes.forEach((x) => {
    if (x._customData && x._customData._track === track) {
      length++;
    }
  });
  return length;
}

function circleGen(beat, duration, Xc, Yc, Z, radius, amount, track, l, h) {
  for (let i = 0; i < amount; i++) {
    let angle = (Math.PI * 2) / amount;
    let rot = (360 / amount) * i;
    let radians = angle * i;
    let w = 2 * radius * Math.tan(Math.PI / amount);
    let X = Xc + Math.cos(radians) * radius - w / 2;
    let Y = Yc + Math.sin(radians) * radius - h / 2;
    _obstacles.push({
      _time: beat,
      _duration: duration,
      _lineIndex: 0,
      _type: 0,
      _width: 0,
      _customData: {
        _interactable: false,
        _track: track,
        _rotation: [0, 0, 0],
        _scale: [w, h, l],
        _localRotation: [0, 0, 90 + rot],
        _position: [X, Y, 0],
        _color: [1, 1, 1, 1, 0],
        _animation: {
          _definitePosition: [
            [0, 0, Z, 0],
            [0, 0, Z, 1],
          ],
        },
      },
    });
  }
}

var newRotation = [];
var oldRotation = [0, 0];
// let oldRotation =[Random(0,-30),Random(-70,70)];
function RandomNoteRotation(BEAT, DURATION, EASING) {
  newRotation = [Random(0, -8), Random(-25, 25, true)];
  _customEvents.push({
    _time: BEAT,
    _type: "AnimateTrack",
    _data: {
      _track: "playerNotes",
      _duration: DURATION,
      _rotation: [
        [oldRotation[0], oldRotation[1], 0, 0],
        [newRotation[0], newRotation[1], 0, 1, EASING],
      ],
    },
  });
  oldRotation = newRotation;
}
for (let i = 0; i < 10; i++)
  RandomNoteRotation(539 + i * 7, 7, "easeInOutCubic");

_notes.forEach((x) => {
  if (x._time >= 2) {
    if (!x._customData) x._customData = {};
    if (!x._customData._animation) x._customData._animation = {};
    if (!x._customData._track) x._customData._track = [];
    if (typeof x._customData._track == "string")
      x._customData._track = [x._customData._track];
    if (typeof x._customData._track == "object")
      x._customData._track.push("playerNotes");
  }
  if (x._time >= 231 && x._time <= 264) {
    if (!x._customData) x._customData = {};
    if (!x._customData._animation) x._customData._animation = {};
    x._customData._noteJumpMovementSpeed = 16;
    x._customData._noteJumpStartBeatOffset = 1;
    x._customData._disableNoteGravity = true;
    x._customData._animation._dissolve = [
      [0, 0],
      [1, 0.1],
    ];
    x._customData._animation._dissolveArrow = [
      [0, 0],
      [1, 0.1],
    ];
    x._customData._animation._localRotation = [
      [-180, 0, 0, 0.0],
      [0, 0, 0, 0.45, "easeInOutCubic"],
    ];
  }
  if (x._time >= 2 && x._time <= 134) {
    if (!x._customData) x._customData = {};
    if (!x._customData._animation) x._customData._animation = {};
    x._customData._noteJumpMovementSpeed = 12;
    x._customData._noteJumpStartBeatOffset = 4;
    if (x._type === 0)
      x._customData._animation._rotation = [
        [Random(0, -3), Random(0, -10), 90, 0],
        [0, 0, 0, 0.35, "easeOutCubic"],
      ];
    if (x._type === 1)
      x._customData._animation._rotation = [
        [Random(0, -3), Random(0, 10), -90, 0],
        [0, 0, 0, 0.35, "easeOutCubic"],
      ];
    x._customData._animation._dissolve = [
      [0, 0],
      [1, 0.3],
    ];
    x._customData._animation._dissolveArrow = [
      [0, 0],
      [1, 0.25],
    ];
    x._customData._animation._localRotation = [
      [-180, 0, 0, 0.0],
      [0, 0, 0, 0.45, "easeInOutCubic"],
    ];
    if (x._type === 0)
      x._customData._animation._color = [
        [0.4, 0.4, 0.4, 1, 0.15],
        [...leftColor, 0.7],
      ];
    if (x._type === 1)
      x._customData._animation._color = [
        [0.4, 0.4, 0.4, 1, 0.15],
        [...rightColor, 0.7],
      ];
  }
  if (x._time >= 135 && x._time < 171) {
    if (!x._customData) x._customData = {};
    if (!x._customData._animation) x._customData._animation = {};
    if (x._customData._fake == true) {
      if (typeof x._customData._track == "string")
        x._customData._track = [x._customData._track];
      x._customData._track.splice(0, 1);
      if (typeof x._customData._track == "object")
        x._customData._track.push("playerNotes", "DissolveSurprizeNotes");
      x._customData._animation._dissolve = [[0.4, 0]];
      x._customData._animation._dissolveArrow = [[1, 0]];
    }
    if (!x._customData._fake) {
      x._customData._noteJumpMovementSpeed = 16;
      x._customData._noteJumpStartBeatOffset = 15;
      // if (x._type === 0) x._customData._animation._rotation = [[Random(0, -3), Random(0, -10), 90, 0], [0, 0, 0, 0.35, "easeOutCubic"]]
      // if (x._type === 1) x._customData._animation._rotation = [[Random(0, -3), Random(0, 10), -90, 0], [0, 0, 0, 0.35, "easeOutCubic"]]
      x._customData._animation._position = [
        [Random(-10, 10), x._lineLayer * -1 - 0.35, 0, 0.4],
        [0, 0, 0, 0.5, "easeInOutExpo"],
      ];
      if (x._time >= 135 && x._time < 167) {
        x._customData._track == "riverNotes";
        if (typeof x._customData._track == "string")
          x._customData._track = "riverNotes";
        if (typeof x._customData._track == "object") {
          x._customData._track.splice(0, 1);
          x._customData._track.push("riverNotes");
        }
      }
      x._customData._animation._dissolve = [
        [0, 0.2],
        [1, 0.3],
      ];
      x._customData._animation._dissolveArrow = [
        [0, 0.2],
        [1, 0.3],
      ];
      x._customData._animation._localRotation = [
        [Random(0, 360), Random(0, 360), Random(0, 360), 0.3],
        [0, 0, 0, 0.5, "easeInOutExpo"],
      ];
      // if (x._type === 0) x._customData._animation._color = [[0.4, 0.4, 0.4, 1, 0.15], [...leftColor, 0.7]];
      // if (x._type === 1) x._customData._animation._color = [[0.4, 0.4, 0.4, 1, 0.15], [...rightColor, 0.7]];
    }
  }
  if (x._time >= 199 && x._time <= 230.5) {
    if (!x._customData) x._customData = {};
    if (!x._customData._animation) x._customData._animation = {};
    x._customData._noteJumpMovementSpeed = 12;
    x._customData._noteJumpStartBeatOffset = 4;
    if (x._type === 0)
      x._customData._animation._rotation = [
        [Random(-10, 10), Random(-10, 10), 0, 0],
        [0, 0, 0, 0.3, "easeInOutCubic"],
      ];
    if (x._type === 1)
      x._customData._animation._rotation = [
        [Random(-10, 10), Random(-10, 10), 0, 0],
        [0, 0, 0, 0.3, "easeInOutCubic"],
      ];
    x._customData._animation._dissolve = [
      [0, 0],
      [1, 0.3],
    ];
    x._customData._animation._dissolveArrow = [
      [0, 0.259],
      [1, 0.3, "easeInOutCubic"],
    ];
    x._customData._animation._scale = [
      [0.05, 7, 0.05, 0.2],
      [1, 1, 1, 0.3, "easeInOutCubic"],
    ];
    if (x._type === 0)
      x._customData._animation._color = [
        [1, 1, 1, 1, 0.25],
        [...leftColor, 0.3],
      ];
    if (x._type === 1)
      x._customData._animation._color = [
        [1, 1, 1, 1, 0.25],
        [...rightColor, 0.3],
      ];
  }
  if (x._time >= 265 && x._time < 298) {
    if (!x._customData) x._customData = {};
    if (!x._customData._animation) x._customData._animation = {};
    x._customData._noteJumpMovementSpeed = 16;
    x._customData._noteJumpStartBeatOffset = 1;
    x._customData._disableNoteGravity = true;
    x._customData._animation._localRotation = [
      [Random(0, 360), Random(0, 360), Random(0, 360), 0.1],
      [0, 0, 0, 0.4, "easeInOutExpo"],
    ];
    if (x._type === 0)
      x._customData._animation._rotation = [
        [Random(-40, 40), Random(-40, 40), 0, 0],
        [0, 0, 0, 0.3, "easeInOutExpo"],
      ];
    if (x._type === 1)
      x._customData._animation._rotation = [
        [Random(-40, 40), Random(-40, 40), 0, 0],
        [0, 0, 0, 0.3, "easeInOutExpo"],
      ];
    x._customData._animation._dissolve = [
      [0, 0],
      [1, 0.01],
    ];
    x._customData._animation._dissolveArrow = [
      [0, 0],
      [1, 0.01],
    ];
    for (let i = 0; i <= 0.5; i += 0.1) {
      if (x._type == 0)
        _notes.push({
          _time: x._time + i / spaceBetweenNotes + 0.1 / spaceBetweenNotes,
          _lineIndex: x._lineIndex,
          _lineLayer: x._lineLayer,
          _type: x._type,
          _cutDirection: x._cutDirection,
          _customData: {
            _noteJumpMovementSpeed: 16,
            _noteJumpStartBeatOffset: 1,
            _fake: true,
            _disableNoteGravity: true,
            _interactable: false,
            _track: ["playerNotes", `caveNotes:${x._time}`],
            _animation: {
              _dissolve: [
                [0, 0],
                [0.2, 0.01],
                [0.2, 0.2],
                [0, 0.25 + 0.1 - i / 10],
              ],
              _dissolveArrow: [[0, 0]],
              // _rotation: x._customData._animation._rotation,
              _rotation: [
                [
                  x._customData._animation._rotation[0][0],
                  x._customData._animation._rotation[0][1],
                  x._customData._animation._rotation[0][2] + i * 100,
                  x._customData._animation._rotation[0][3],
                ],
                [
                  x._customData._animation._rotation[1][0],
                  x._customData._animation._rotation[1][1],
                  x._customData._animation._rotation[1][2],
                  x._customData._animation._rotation[1][3],
                  x._customData._animation._rotation[1][4],
                ],
              ],
              _localRotation: x._customData._animation._localRotation,
            },
          },
        });
      if (x._type == 1)
        _notes.push({
          _time: x._time + i / 4 + 0.1 / 4,
          _lineIndex: x._lineIndex,
          _lineLayer: x._lineLayer,
          _type: x._type,
          _cutDirection: x._cutDirection,
          _customData: {
            _noteJumpMovementSpeed: 16,
            _noteJumpStartBeatOffset: 1,
            _fake: true,
            _disableNoteGravity: true,
            _interactable: false,
            _track: ["playerNotes", `caveNotes:${x._time}`],
            _animation: {
              _dissolve: [
                [0, 0],
                [0.2, 0.01],
                [0.2, 0.2],
                [0, 0.25 + 0.1 - i / 10],
              ],
              _dissolveArrow: [[0, 0]],
              // _rotation: x._customData._animation._rotation,
              _rotation: [
                [
                  x._customData._animation._rotation[0][0],
                  x._customData._animation._rotation[0][1],
                  x._customData._animation._rotation[0][2] + i * -100,
                  x._customData._animation._rotation[0][3],
                ],
                [
                  x._customData._animation._rotation[1][0],
                  x._customData._animation._rotation[1][1],
                  x._customData._animation._rotation[1][2],
                  x._customData._animation._rotation[1][3],
                  x._customData._animation._rotation[1][4],
                ],
              ],
              _localRotation: x._customData._animation._localRotation,
            },
          },
        });
    }
    _customEvents.push({
      _time: x._time + 1 / 4,
      _type: "AnimateTrack",
      _data: {
        _track: `caveNotes:${x._time}`,
        _duration: 0.1,
        _dissolve: [[0, 0]],
      },
    });
  }
  if (x._time >= 298 && x._time < 327) {
    if (!x._customData) x._customData = {};
    if (!x._customData._animation) x._customData._animation = {};
    x._customData._noteJumpMovementSpeed = 16;
    x._customData._noteJumpStartBeatOffset = 1;
    // if (x._type === 0) x._customData._animation._rotation = [[Random(-20, 20), Random(-20, 20), 0, 0], [0, 0, 0, 0.3, "easeInOutExpo"]]
    // if (x._type === 1) x._customData._animation._rotation = [[Random(-20, 20), Random(-20, 20), 0, 0], [0, 0, 0, 0.3, "easeInOutExpo"]]
    x._customData._animation._dissolve = [
      [0, 0],
      [1, 0.01],
    ];
    x._customData._animation._dissolveArrow = [
      [0, 0],
      [1, 0.01],
    ];
    // x._customData._animation._scale = [[0.05, 7, 0.05, 0.2], [1, 1, 1, 0.3, "easeInOutCubic"]]
    // if (x._type === 0)
    //   x._customData._animation._color = [
    //     [1, 1, 1, 1, 0],
    //     [...leftColor, 0.15],
    //   ];
    // if (x._type === 1)
    //   x._customData._animation._color = [
    //     [1, 1, 1, 1, 0],
    //     [...rightColor, 0.15],
    //   ];
    let randomRotation = Random(1, 4, true);
    switch (randomRotation) {
      case 1:
        x._customData._animation._localRotation = [
          [0, 90, 0, 0.1],
          [0, 0, 0, 0.4, "easeInOutExpo"],
        ];
        x._customData._animation._rotation = [
          [0, 90, 0, 0],
          [0, 0, 0, 0.35, "easeInOutExpo"],
        ];
        break;
      case 2:
        x._customData._animation._localRotation = [
          [0, -90, 0, 0.1],
          [0, 0, 0, 0.4, "easeInOutExpo"],
        ];
        x._customData._animation._rotation = [
          [0, -90, 0, 0],
          [0, 0, 0, 0.35, "easeInOutExpo"],
        ];
        break;
      case 3:
        x._customData._animation._localRotation = [
          [90, 0, 0, 0.1],
          [0, 0, 0, 0.4, "easeInOutExpo"],
        ];
        x._customData._animation._rotation = [
          [90, 0, 0, 0],
          [0, 0, 0, 0.35, "easeInOutExpo"],
        ];
        break;
      case 4:
        x._customData._animation._localRotation = [
          [-90, 0, 0, 0.1],
          [0, 0, 0, 0.4, "easeInOutExpo"],
        ];
        x._customData._animation._rotation = [
          [-90, 0, 0, 0],
          [0, 0, 0, 0.35, "easeInOutExpo"],
        ];
        break;
    }
  }
  if (x._time >= 330 && x._time < 460) {
    if (!x._customData) x._customData = {};
    if (!x._customData._animation) x._customData._animation = {};
    if (x._time <= 423) {
      x._customData._noteJumpMovementSpeed = 10;
      x._customData._noteJumpStartBeatOffset = 15;
    }
    if (x._time >= 423 && x._time <= 443) {
      x._customData._noteJumpMovementSpeed = 12.75;
      x._customData._noteJumpStartBeatOffset = 10;
    }
    if (x._time >= 443 && x._time <= 453) {
      x._customData._noteJumpMovementSpeed = 14;
      x._customData._noteJumpStartBeatOffset = 7;
    }
    if (x._time >= 453 && x._time <= 463) {
      x._customData._noteJumpMovementSpeed = 15;
      x._customData._noteJumpStartBeatOffset = 4;
    }
    // if (x._type === 0) x._customData._animation._rotation = [[Random(0, -3), Random(0, -10), 90, 0], [0, 0, 0, 0.35, "easeOutCubic"]]
    if (x._type === 0) {
      x._customData._animation._rotation = [
        [0, Random(-10, -20), 0, 0.125],
        [0, -7, 0, 0.45, "easeInOutCubic"],
      ];
      x._customData._animation._position = [
        [Random(-20, -30), x._lineLayer * -1, 0, 0.125],
        [0, 0, 0, 0.375, "easeInOutCubic"],
      ];
    }
    if (x._type === 1) {
      x._customData._animation._rotation = [
        [0, Random(10, 20), 0, 0.125],
        [0, 7, 0, 0.45, "easeInOutCubic"],
      ];
      x._customData._animation._position = [
        [Random(20, 30), 0, x._lineLayer * -1, 0.125],
        [0, 0, 0, 0.375, "easeInOutCubic"],
      ];
    }

    x._customData._track == "playerNotes";
    x._customData._animation._dissolve = [
      [0, 0.15],
      [1, 0.23],
    ];
    x._customData._animation._dissolveArrow = [
      [0, 0.15],
      [1, 0.23],
    ];
    x._customData._animation._localRotation = [
      [-180, 0, 0, 0.2],
      [0, 0, 0, 0.4, "easeInOutCubic"],
    ];
    // if (x._type === 0) x._customData._animation._color = [[0.4, 0.4, 0.4, 1, 0.15], [...leftColor, 0.7]];
    // if (x._type === 1) x._customData._animation._color = [[0.4, 0.4, 0.4, 1, 0.15], [...rightColor, 0.7]];
    for (let i = 0; i <= 0.4; i += 0.1)
      _notes.push({
        _time: x._time + i / spaceBetweenNotes + 0.1 / spaceBetweenNotes,
        _lineIndex: x._lineIndex,
        _lineLayer: x._lineLayer,
        _type: x._type,
        _cutDirection: x._cutDirection,
        _customData: {
          _noteJumpMovementSpeed: x._customData._noteJumpMovementSpeed,
          _noteJumpStartBeatOffset: x._customData._noteJumpStartBeatOffset,
          _fake: true,
          _disableNoteGravity: true,
          _interactable: false,
          _track: ["playerNotes"],
          _animation: {
            _dissolve: [
              [0, 0.15],
              [0.35, 0.23],
              [0, 0.4 + 0.2 - i / 10],
            ],
            _dissolveArrow: [[0, 0]],
            _rotation: x._customData._animation._rotation,
            _position: x._customData._animation._position,
            _localRotation: x._customData._animation._localRotation,
          },
        },
      });
  }
  //end ocean
  if (x._time >= 523 && x._time <= 588) {
    if (!x._customData) x._customData = {};
    if (!x._customData._animation) x._customData._animation = {};
    x._customData._noteJumpMovementSpeed = 12;
    x._customData._noteJumpStartBeatOffset = 4;
    x._customData._animation._rotation = [
      [Random(0, -30), Random(-70, 70), 0, 0],
      [0, 0, 0, 0.6, "easeOutCubic"],
    ];
    x._customData._animation._dissolve = [
      [0, 0],
      [1, 0.05],
    ];
    x._customData._animation._dissolveArrow = [
      [0, 0],
      [1, 0.05],
    ];
    x._customData._animation._localRotation = [
      [-180, 0, 0, 0.0],
      [0, 0, 0, 0.45, "easeInOutCubic"],
    ];
    if (x._type === 0)
      x._customData._animation._color = [
        [0.4, 0.4, 0.4, 1, 0.15],
        [...leftColor, 0.7],
      ];
    if (x._type === 1)
      x._customData._animation._color = [
        [0.4, 0.4, 0.4, 1, 0.15],
        [...rightColor, 0.7],
      ];
  }
  if (x._time >= 460 && x._time <= 490) {
    if (!x._customData) x._customData = {};
    if (!x._customData._animation) x._customData._animation = {};
    x._customData._noteJumpMovementSpeed = 16;
    x._customData._noteJumpStartBeatOffset = 3;
    x._customData._animation._rotation = [
      [-20, Random(-10, 10), 0, 0],
      [0, 0, 0, 0.4, "easeInOutQuad"],
    ];
    x._customData._animation._dissolve = [
      [0, 0],
      [1, 0.1],
    ];
    x._customData._animation._dissolveArrow = [
      [0, 0],
      [1, 0.1],
    ];
  }

  if (x._time >= 171 && x._time <= 196) {
    if (!x._customData) x._customData = {};
    if (!x._customData._animation) x._customData._animation = {};
    x._customData._noteJumpMovementSpeed = 16;
    x._customData._noteJumpStartBeatOffset = 3;
    x._customData._disableNoteGravity = true;
    x._customData._animation._dissolve = [
      [0, 0],
      [1, 0.2, "easeInOutQuad"],
    ];
    x._customData._animation._dissolveArrow = [
      [0, 0],
      [1, 0.2, "easeInOutQuad"],
    ];
    // x._customData._animation._localRotation = [
    //   [-180, 0, 0, 0.0],
    //   [0, 0, 0, 0.45, "easeInOutCubic"],
    // ];
    if (x._type == 0)
      x._customData._animation._rotation = [
        [-10, 0, -70, 0],
        [0, -3, 0, 0.4, "easeInOutQuad"],
      ];
    if (x._type == 1)
      x._customData._animation._rotation = [
        [10, 0, -70 - 90, 0],
        [0, 3, 0, 0.4, "easeInOutQuad"],
      ];
  }
  if (x._time > 490 && x._time <= 518) {
    if (!x._customData) x._customData = {};
    if (!x._customData._animation) x._customData._animation = {};
    x._customData._noteJumpMovementSpeed = 16;
    x._customData._noteJumpStartBeatOffset = 3;
    x._customData._disableNoteGravity = true;
    x._customData._track.push("WeirdNotesTwistedWalls");
    x._customData._animation._dissolve = [
      [0, 0],
      [1, 0.2, "easeInOutQuad"],
    ];
    x._customData._animation._dissolveArrow = [
      [0, 0],
      [1, 0.2, "easeInOutQuad"],
    ];
    // x._customData._animation._localRotation = [
    //   [-180, 0, 0, 0.0],
    //   [0, 0, 0, 0.45, "easeInOutCubic"],
    // ];
    if (x._type == 0)
      x._customData._animation._rotation = [
        [-10, 0, -70, 0],
        [0, -3, 0, 0.4, "easeInOutQuad"],
      ];
    if (x._type == 1)
      x._customData._animation._rotation = [
        [10, 0, -70 - 90, 0],
        [0, 3, 0, 0.4, "easeInOutQuad"],
      ];
  }
  if (x._time == 519) {
    if (!x._customData) x._customData = {};
    if (!x._customData._animation) x._customData._animation = {};
    x._customData._noteJumpMovementSpeed = 16;
    x._customData._noteJumpStartBeatOffset = 3;
    x._customData._animation._dissolve = [
      [0, 0],
      [1, 0.2, "easeInOutQuad"],
    ];
    x._customData._animation._dissolveArrow = [
      [0, 0],
      [1, 0.2, "easeInOutQuad"],
    ];
  }
  if (x._time >= 445 && x._time <= 490) {
    if (!x._customData) x._customData = {};
    x._customData._track.push("WeirdNotesTemple");
  }
  if (x._time >= 445 && x._time <= 490) {
    if (!x._customData) x._customData = {};
    x._customData._track.push("OceanNotes");
  }
  if (x._time >= 71 && x._time < 134) {
    if (!x._customData) x._customData = {};
    if (!x._customData) x._customData = {};
    x._customData = {};
    x._customData._animation = {};
    x._customData._track = "playerNotes";
    x._customData._noteJumpMovementSpeed = 16;
    x._customData._noteJumpStartBeatOffset = 7;
    x._customData._animation._dissolve = [[0, 0], [1, 0.1]];
    x._customData._animation._dissolveArrow = [[0, 0], [1, 0.1]];
    x._customData._animation._scale = [[5, 5, 5, 0], [1, 1, 1, 0.4, "easeInOutCubic"]]
    if (x._type === 0) {
      x._customData._animation._position = [
        [-100, -10, 0, 0],
        [-30 / 2, 20, 0, 0.2, "easeInOutSine", "splineCatmullRom"],
        [0, 0, 0, 0.45, "easeInOutSine", "splineCatmullRom"],
      ];
    }
    if (x._type === 1) {
      x._customData._animation._position = [
        [100, -10, 0, 0],
        [30 / 2, 20, 0, 0.2, "easeInOutSine", "splineCatmullRom"],
        [0, 0, 0, 0.45, "easeInOutSine", "splineCatmullRom"],
      ];
    }
  }
});
_customEvents.push({
  _time: 455,
  _type: "AnimateTrack",
  _data: {
    _track: "WeirdNotesTemple",
    _duration: 490 - 455,
    _rotation: [
      [0, 0, 0, 0],
      [0, 5, 0, 0.3, "easeInOutExpo"],
      [0, -7, 0, 1, "easeInOutCubic"],
    ],
  },
});
_customEvents.push({
  _time: 486,
  _type: "AnimateTrack",
  _data: {
    _track: "WeirdNotesTwistedWalls",
    _duration: 520 - 486,
    _rotation: [
      [0, -7, 0, 0],
      [0, 13, 0, 1, "easeInOutCubic"],
    ],
  },
});

_events.forEach((x) => {
  if (
    x._customData &&
    x._type == 1 &&
    x._customData._lightID == 100 &&
    x._time >= 295 &&
    x._time <= 326.938 &&
    x._customData._color[2] == 0
  ) {
    x._customData._color = [0.86, 2.124, 4, 40];
  }
  if (
    x._customData &&
    x._type == 1 &&
    x._customData._lightID == 100 &&
    x._time >= 295 &&
    x._time <= 326.938
  ) {
    x._customData._color[0] /= 1.5;
    x._customData._color[1] /= 1.5;
    x._customData._color[2] /= 1.5;
    x._customData._color[3] /= 1.5;
  }
  if (
    x._customData &&
    x._type == 1 &&
    x._customData._lightID == 20 &&
    x._time >= 295 &&
    x._time <= 326.938
  ) {
    // x._customData._color[0] /= 2
    // x._customData._color[1] /= 2
    // x._customData._color[2] /= 2
    // x._customData._color[3] /= 2
  }
  if (x._customData && x._type == 1 && x._customData._lightID == 20) {
    x._customData._lightID = 1010;
    x._customData._color[0] *= 3;
    x._customData._color[1] *= 3;
    x._customData._color[2] *= 3;
    x._customData._color[3] *= 1.5;
    if (x._time >= 487 && x._time <= 519) {
      x._customData._color[0] *= 2;
      x._customData._color[1] *= 2;
      x._customData._color[2] *= 2;
      x._customData._color[3] *= 2;
    }
  }
  if (x._customData && x._type == 0 && x._time >= 487 && x._time <= 520)
    x._customData._color[3] *= 2;
  if (
    x._customData & (x._value == 5) &&
    x._type === 1 &&
    x._customData._lightID === 100
  ) {
    x._customData._lightID = [100];
    if (x._time >= 167 && x._time <= 199) {
      x._customData._color[3] *= 1.5;
      x._customData._color[2] *= 1.5;
      x._customData._color[1] *= 1.5;
      x._customData._color[0] *= 1;
    }
    if (x._time >= 295 && x._time <= 327) {
      x._customData._color[3] *= 2;
      x._customData._color[2] *= 2;
      x._customData._color[1] *= 2;
      x._customData._color[0] *= 2;
    }
    for (let i = 1000; i < 1010; i++) {
      x._customData._lightID.push(i);
    }
  }
  if (x._time >= 295 && x._time <= 327 && x._type === 0) {
    x._customData._color[3] *= 20;
    x._customData._color[2] /= 4;
    x._customData._color[1] /= 4;
    x._customData._color[0] /= 4;
  }
  if (x._customData && x._type === 0) x._customData._color[3] *= 40;
  if (x._customData && x._type == 0 && x._time >= 135 && x._time <= 199)
    x._customData._color[3] *= 2;
  if (x._time >= 69 && x._time < 135 && x._customData && x._type === 2) {
    for (let i = 1, j = 200; i <= 25; i += 3, j++) {
      if (
        typeof x._customData._lightID == "object" &&
        x._customData._lightID[0] == i
      ) {
        x._customData._lightID = j;
        x._type = 1;
        x._customData._color[3] *= 5;
      }
      if (
        typeof x._customData._lightID == "number" &&
        x._customData._lightID === i
      ) {
        x._customData._lightID = j;
        x._type = 1;
        x._customData._color[3] *= 5;
      }
    }
  }
  if (x._time >= 69 && x._time < 135 && x._customData && x._type === 3) {
    for (let i = 1, j = 209; i <= 25; i += 3, j++) {
      if (
        typeof x._customData._lightID == "object" &&
        x._customData._lightID[0] === i
      ) {
        x._customData._lightID = j;
        x._type = 1;
        x._customData._color[3] *= 5;
      }
      if (
        typeof x._customData._lightID == "number" &&
        x._customData._lightID === i
      ) {
        x._customData._lightID = j;
        x._type = 1;
        x._customData._color[3] *= 5;
      }
    }
  }

  //sunrise or whatever it should be
  if (x._time >= 327 && x._time < 455 && x._customData && x._type === 2) {
    for (let i = 1, j = 5000; i <= 25; i += 3, j++) {
      if (
        typeof x._customData._lightID == "object" &&
        x._customData._lightID[0] == i
      ) {
        x._customData._lightID = j;
        x._type = 1;
        x._customData._color[3] *= 5;
      }
      if (
        typeof x._customData._lightID == "number" &&
        x._customData._lightID === i
      ) {
        x._customData._lightID = j;
        x._type = 1;
        x._customData._color[3] *= 5;
      }
    }
  }
  if (x._time >= 327 && x._time < 455 && x._customData && x._type === 3) {
    for (let i = 1, j = 5009; i <= 25; i += 3, j++) {
      if (
        typeof x._customData._lightID == "object" &&
        x._customData._lightID[0] === i
      ) {
        x._customData._lightID = j;
        x._type = 1;
        x._customData._color[3] *= 5;
      }
      if (
        typeof x._customData._lightID == "number" &&
        x._customData._lightID === i
      ) {
        x._customData._lightID = j;
        x._type = 1;
        x._customData._color[3] *= 5;
      }
    }
  }

  if (x._time >= 135 && x._time < 167 && x._customData && x._type === 3) {
    for (let i = 1, j = 11000; i <= 25; i += 3, j++) {
      if (
        typeof x._customData._lightID == "object" &&
        x._customData._lightID[0] == i
      ) {
        x._customData._lightID = j;
        x._type = 1;
        if (x._customData._color) x._customData._color[3] *= 10;
      }
      if (
        typeof x._customData._lightID == "number" &&
        x._customData._lightID === i
      ) {
        x._customData._lightID = j;
        x._type = 1;
        if (x._customData._color) x._customData._color[3] *= 10;
      }
    }
  }
  if (x._time >= 135 && x._time < 167 && x._customData && x._type === 2) {
    for (let i = 1, j = 11500; i <= 25; i += 3, j++) {
      if (
        typeof x._customData._lightID == "object" &&
        x._customData._lightID[0] === i
      ) {
        x._customData._lightID = j;
        x._type = 1;
        if (x._customData._color) x._customData._color[3] *= 10;
      }
      if (
        typeof x._customData._lightID == "number" &&
        x._customData._lightID === i
      ) {
        x._customData._lightID = j;
        x._type = 1;
        if (x._customData._color) x._customData._color[3] *= 10;
      }
    }
  }

  if (x._time >= 231 && x._time < 263 && x._customData && x._type === 2) {
    for (let i = 1, j = 250; i <= 25; i += 3, j++) {
      if (
        typeof x._customData._lightID == "object" &&
        x._customData._lightID[0] == i
      ) {
        x._customData._lightID = j;
        x._type = 1;
        x._customData._color[3] *= 10;
      }
      if (
        typeof x._customData._lightID == "number" &&
        x._customData._lightID === i
      ) {
        x._customData._lightID = j;
        x._type = 1;
        // x._customData._color[3] *= 10
      }
    }
  }
  if (x._time >= 231 && x._time < 263 && x._customData && x._type === 3) {
    for (let i = 1, j = 259; i <= 25; i += 3, j++) {
      if (
        typeof x._customData._lightID == "object" &&
        x._customData._lightID[0] === i
      ) {
        x._customData._lightID = j;
        x._type = 1;
        x._customData._color[3] *= 10;
      }
      if (
        typeof x._customData._lightID == "number" &&
        x._customData._lightID === i
      ) {
        x._customData._lightID = j;
        x._type = 1;
        // x._customData._color[3] *= 10
      }
    }
  }
});

_environment.push(
  {
    _id: "PlayersPlace$",
    _lookupMethod: "Regex",
    _active: false,
  },
  {
    _id: "SideLaser$",
    _lookupMethod: "Regex",
    _localRotation: [90, 90, 0],
    _position: [0, 1000, 150],
    // _scale: [0.001, 1, 0.001]
    _scale: [1, 1, 10000],
    _track: "horizonLazer",
  },
  {
    _id: "t\\.\\[\\d*\\]SideLaser\\.\\[\\d*\\]BoxLight$",
    _lookupMethod: "Regex",
    _active: false,
  },
  {
    _id: "(PillarPair|SmallPillarPair)( \\(\\d*\\))?\\.\\[\\d*\\]Pillar(L|R)\\.\\[\\d*\\]Pillar",
    _lookupMethod: "Regex",
    _position: [0, 0, -1000000],
  },
  {
    _id: "PillarTrackLaneRingsR",
    _lookupMethod: "Regex",
    _active: false,
  },
  {
    _id: "DirectionalLight",
    _lookupMethod: "Regex",
    _active: false,
  },
  {
    _id: "(Reflector|LaserLight0)",
    _lookupMethod: "Regex",
    _active: false,
  },
  {
    _id: "LowCloudsGenerator",
    _lookupMethod: "Regex",
    _position: [0, 0, -1000000],
  },
  {
    _id: "HighCloudsGenerator",
    _lookupMethod: "Regex",
    _position: [0, 0, -1000000],
    _track: "highClouds",
  },
  {
    _id: "MagicDoorSprite$",
    _lookupMethod: "Regex",
    _active: false,
  },
  {
    _id: "NarrowGameHUD$",
    _lookupMethod: "Regex",
    _active: false,
  },
  {
    _id: "t\\.\\[\\d*\\]Construction$",
    _lookupMethod: "Regex",
    _active: false,
  },
  {
    _id: "TrackMirror$",
    _lookupMethod: "Regex",
    _active: false,
  },
  {
    _id: "GlowLine",
    _lookupMethod: "Regex",
    _active: false,
  },
  {
    _id: "SmallPillarPair\\.\\[\\d*\\]PillarL\\.\\[\\d*\\]LaserL$",
    _lookupMethod: "Regex",
    _duplicate: 1,
    _track: "horizonLazerLong",
    _position: [2000, 2, 150],
    _rotation: [0, 0, 90],
    // _scale: [1, 0.05, 1],
    _lightID: 100,
  },
  {
    _id: "BottomGlow$",
    _lookupMethod: "Regex",
    _track: "horizonLazer",
    _position: [0, 2, 150],
  },
  {
    _id: "DirectionalLight$",
    _lookupMethod: "Regex",
    _track: "DirectionalLight",
  },
  {
    _id: "SmallPillarPair\\.\\[\\d*\\]PillarL\\.\\[\\d*\\]LaserL$",
    _lookupMethod: "Regex",
    _duplicate: 1,
    _position: [90, -500, 300 + FirstSceneZ],
    _localRotation: [Random(-5, 5), Random(-5, 5), Random(-5, 5)],
    _rotation: [0, 0, 0],
    _lightID: 101,
  },
  {
    _id: "SmallPillarPair\\.\\[\\d*\\]PillarL\\.\\[\\d*\\]LaserL$",
    _lookupMethod: "Regex",
    _duplicate: 1,
    _position: [-80, -500, 275 + FirstSceneZ],
    _localRotation: [Random(-5, 5), Random(-5, 5), Random(-5, 5)],
    _rotation: [0, 0, 0],
    _lightID: 102,
  },
  {
    _id: "SmallPillarPair\\.\\[\\d*\\]PillarL\\.\\[\\d*\\]LaserL$",
    _lookupMethod: "Regex",
    _duplicate: 1,
    _position: [70, -500, 350 + FirstSceneZ],
    _localRotation: [Random(-5, 5), Random(-5, 5), Random(-5, 5)],
    _rotation: [0, 0, 0],
    _lightID: 103,
  },
  {
    _id: "SmallPillarPair\\.\\[\\d*\\]PillarL\\.\\[\\d*\\]LaserL$",
    _lookupMethod: "Regex",
    _duplicate: 1,
    _position: [-90, -500, 400 + FirstSceneZ],
    _localRotation: [Random(-5, 5), Random(-5, 5), Random(-5, 5)],
    _rotation: [0, 0, 0],
    _lightID: 104,
  },
  {
    _id: "SmallPillarPair\\.\\[\\d*\\]PillarL\\.\\[\\d*\\]LaserL$",
    _lookupMethod: "Regex",
    _duplicate: 1,
    _position: [0, -5, -100],
    _rotation: [90, 0, 0],
    _lightID: 105,
    _track: "horizonLazerUnder",
  }
);
for (let i = 0; i < 10; i++) {
  _environment.push({
    _id: "SmallPillarPair\\.\\[\\d*\\]PillarL\\.\\[\\d*\\]LaserL$",
    _lookupMethod: "Regex",
    _duplicate: 1,
    _track: "horizonLazerLong",
    _position: [25 + i * 20, 2, 150],
    _rotation: [0, 0, 90],
    _scale: [1, 0.01 + i / 100, 1],
    _lightID: 1000 + i,
  });
}

for (let i = 0; i < 100; i += 7.2) {
  _environment.push({
    _id: "BottomGlow$",
    _lookupMethod: "Regex",
    _track: "horizonLazer",
    _duplicate: 1,
    _position: [0, 2, 150],
    _localRotation: [0, 0, i * 10],
  });
}

for (let i = 0; i < 9; i++) {
  _environment.push(
    {
      _id: "SmallPillarPair\\.\\[\\d*\\]PillarL\\.\\[\\d*\\]LaserL$",
      _lookupMethod: "Regex",
      _duplicate: 1,
      _position: [Random(-90, -30), -300, Random(130, 300)],
      _localRotation: [Random(-3, 3), Random(-3, 3), Random(-3, 3)],
      _rotation: [0, 0, 0],
      _lightID: 200 + i,
      // _track: "horizonLazer"
    },
    {
      _id: "SmallPillarPair\\.\\[\\d*\\]PillarL\\.\\[\\d*\\]LaserL$",
      _lookupMethod: "Regex",
      _duplicate: 1,
      _position: [Random(90, 30), -300, Random(130, 300)],
      _localRotation: [Random(-3, 3), Random(-3, 3), Random(-3, 3)],
      _rotation: [0, 0, 0],
      _lightID: 209 + i,
      // _track: "horizonLazer"
    },
    {
      _id: "SmallPillarPair \\(1\\)\\.\\[\\d*\\]PillarL\\.\\[\\d*\\]LaserL$",
      _lookupMethod: "Regex",
      _duplicate: 1,
      _position: [Random(-80, -30), -20, Random(1070, 1400)],
      _localRotation: [Random(-10, 10), Random(-10, 10), Random(-10, 10)],
      _rotation: [0, 0, 0],
      // _scale: [7, 100, 7],
      _lightID: 5000 + i,
      // _track: "horizonLazer"
    },
    {
      _id: "SmallPillarPair \\(1\\)\\.\\[\\d*\\]PillarL\\.\\[\\d*\\]LaserL$",
      _lookupMethod: "Regex",
      _duplicate: 1,
      _position: [Random(80, 30), -20, Random(1070, 1400)],
      _localRotation: [Random(-10, 10), Random(-10, 10), Random(-10, 10)],
      _rotation: [0, 0, 0],
      // _scale: [7, 100, 7],
      _lightID: 5009 + i,
      // _track: "horizonLazer"
    }
  );
}
//Mountain after drop
_environment.push(
  {
    _id: "SmallPillarPair \\(1\\)\\.\\[\\d*\\]PillarL\\.\\[\\d*\\]LaserL$",
    _lookupMethod: "Regex",
    _duplicate: 1,
    _position: [-11.702, -16, 1000 + 84.148],
    _rotation: [3.839, 29.689, 11.959],
    _lightID: 25000,
  },
  {
    _id: "SmallPillarPair \\(1\\)\\.\\[\\d*\\]PillarL\\.\\[\\d*\\]LaserL$",
    _lookupMethod: "Regex",
    _duplicate: 1,
    _position: [13.83, -16, 1000 + 89.287],
    _rotation: [4.69, 69.4, -2.01],
    _lightID: 25001,
  }
);

for (let i = 0; i < 9; i++) {
  _environment.push(
    {
      _id: "SmallPillarPair\\.\\[\\d*\\]PillarL\\.\\[\\d*\\]LaserL$",
      _lookupMethod: "Regex",
      _duplicate: 1,
      _position: [Random(-70, -30), -30, Random(1080, 1250)],
      _localRotation: [Random(-3, 3), Random(-3, 3), Random(-3, 3)],
      _rotation: [0, 0, 0],
      _lightID: 250 + i,
      // _track: "horizonLazer"
    },
    {
      _id: "SmallPillarPair\\.\\[\\d*\\]PillarL\\.\\[\\d*\\]LaserL$",
      _lookupMethod: "Regex",
      _duplicate: 1,
      _position: [Random(70, 30), -30, Random(1080, 1250)],
      _localRotation: [Random(-3, 3), Random(-3, 3), Random(-3, 3)],
      _rotation: [0, 0, 0],
      _lightID: 259 + i,
      // _track: "horizonLazer"
    }
  );
}
for (let i = 0; i < 10; i++) {
  _environment.push(
    {
      _id: "SmallPillarPair \\(1\\)\\.\\[\\d*\\]PillarL\\.\\[\\d*\\]LaserL$",
      _lookupMethod: "Regex",
      _duplicate: 1,
      _position: [100 + i * 10, -10 + i * 8, 2175 + i * 150],
      _rotation: [0, 0, i * 1.5],
      _lightID: 11000,
      // _track: "horizonLazer"
    },
    {
      _id: "SmallPillarPair \\(1\\)\\.\\[\\d*\\]PillarL\\.\\[\\d*\\]LaserL$",
      _lookupMethod: "Regex",
      _duplicate: 1,
      _position: [-100 - i * 10, -10 + i * 8, 2175 + i * 150],
      _rotation: [0, 0, i * -1.5],
      _lightID: 11500,
      // _track: "horizonLazer"
    }
  );
}
_environment.push({
  _id: "SmallPillarPair \\(1\\)\\.\\[\\d*\\]PillarL\\.\\[\\d*\\]LaserL$",
  _lookupMethod: "Regex",
  _duplicate: 1,
  _track: "horizonLazerLong",
  _position: [900000 / 2, 0, 300],
  _rotation: [0, 0, 90],
  _scale: [900000, 900000, 20],
  _lightID: 1010,
});

for (let i = 0; i < 16; i++) {
  _environment.push(
    {
      _id: "SmallPillarPair \\(1\\)\\.\\[\\d*\\]PillarL\\.\\[\\d*\\]LaserL$",
      _lookupMethod: "Regex",
      _duplicate: 1,
      _position: [7.525, 1, 2026.5 + i * 7],
      _rotation: [0, 0, i * 1.5],
      _scale: [0.2, 1, 0.2],
      _lightID: 15000 + i,
    },
    {
      _id: "SmallPillarPair \\(1\\)\\.\\[\\d*\\]PillarL\\.\\[\\d*\\]LaserL$",
      _lookupMethod: "Regex",
      _duplicate: 1,
      _position: [-7.525, 1, 2026.5 + i * 7],
      _rotation: [0, 0, i * -1.5],
      _scale: [0.2, 1, 0.2],
      _lightID: 15016 + i,
    }
  );
}

_environment.push(
  {
    _id: "SmallPillarPair \\(1\\)\\.\\[\\d*\\]PillarL\\.\\[\\d*\\]LaserL$",
    _lookupMethod: "Regex",
    _duplicate: 1,
    _position: [16.077, -12.879, 2000 + 154.193],
    _rotation: [0, 0, 28.7],
    _scale: [5, 1, 5],
    _lightID: 15500,
  },
  {
    _id: "SmallPillarPair \\(1\\)\\.\\[\\d*\\]PillarL\\.\\[\\d*\\]LaserL$",
    _lookupMethod: "Regex",
    _duplicate: 1,
    _position: [-16.077, -12.879, 2000 + 154.193],
    _rotation: [0, 0, -28.7],
    _scale: [5, 1, 5],
    _lightID: 15501,
  },
  {
    _id: "SmallPillarPair \\(1\\)\\.\\[\\d*\\]PillarL\\.\\[\\d*\\]LaserL$",
    _lookupMethod: "Regex",
    _duplicate: 1,
    _position: [16.309, -0.274, 2000 + 162.64],
    _rotation: [0, 0, 33.7],
    _scale: [5, 1, 5],
    _lightID: 15502,
  },
  {
    _id: "SmallPillarPair \\(1\\)\\.\\[\\d*\\]PillarL\\.\\[\\d*\\]LaserL$",
    _lookupMethod: "Regex",
    _duplicate: 1,
    _position: [-16.309, -0.274, 2000 + 162.64],
    _rotation: [0, 0, -33.7],
    _scale: [5, 1, 5],
    _lightID: 15503,
  },
  {
    _id: "SmallPillarPair \\(1\\)\\.\\[\\d*\\]PillarL\\.\\[\\d*\\]LaserL$",
    _lookupMethod: "Regex",
    _duplicate: 1,
    _position: [14.355, 7.244, 2000 + 173.29],
    _rotation: [0, 0, 22.5],
    _scale: [5, 1, 5],
    _lightID: 15504,
  },
  {
    _id: "SmallPillarPair \\(1\\)\\.\\[\\d*\\]PillarL\\.\\[\\d*\\]LaserL$",
    _lookupMethod: "Regex",
    _duplicate: 1,
    _position: [-14.355, 7.244, 2000 + 173.29],
    _rotation: [0, 0, -22.5],
    _scale: [5, 1, 5],
    _lightID: 15505,
  },
  {
    _id: "SmallPillarPair \\(1\\)\\.\\[\\d*\\]PillarL\\.\\[\\d*\\]LaserL$",
    _lookupMethod: "Regex",
    _duplicate: 1,
    _position: [10.075, 11.52, 2000 + 183.43],
    _rotation: [0, 0, 8],
    _scale: [5, 1, 5],
    _lightID: 15506,
  },
  {
    _id: "SmallPillarPair \\(1\\)\\.\\[\\d*\\]PillarL\\.\\[\\d*\\]LaserL$",
    _lookupMethod: "Regex",
    _duplicate: 1,
    _position: [-10.075, 11.52, 2000 + 183.43],
    _rotation: [0, 0, -8],
    _scale: [5, 1, 5],
    _lightID: 15507,
  }
);


_environment.push(
  {
    _id: "SmallPillarPair\\.\\[\\d*\\]PillarL\\.\\[\\d*\\]LaserL\\(Clone\\)\\.\\[\\d*\\]BoxLight",
    _lookupMethod: "Regex",
    _active: false,
  },
  {
    _id: "SmallPillarPair \\(1\\)\\.\\[\\d*\\]PillarL\\.\\[\\d*\\]LaserL\\(Clone\\)\\.\\[\\d*\\]BakedBloom",
    _lookupMethod: "Regex",
    _active: false,
  }
);


let amountoflazer1 = 0;
for (let i = -10; i <= 10; i++) {
  for (let j = -5; j <= 50; j += 2) {
    if (Random(0, 3, true) == 1) {
      _environment.push(
        {
          _id: "SmallPillarPair\\.\\[\\d*\\]PillarL\\.\\[\\d*\\]LaserL$",
          _lookupMethod: "Regex",
          _duplicate: 1,
          // _track: "horizonLazerLong",
          _position: [i * 12, Random(-20, 60), 1000 + j * 20],
          _localRotation: [Random(0, 360), Random(0, 360), Random(0, 360)],
          _scale: [1, 0.001, 1],
          _lightID: 3270 + amountoflazer1,
        })
      amountoflazer1++;
    }
  }
}
for (let i = 0; i < 63; i += 2) {
  let ranID = []
  for (let j = 0; j < 60; j++) ranID.push(Random(3270, 3270 + amountoflazer1, true))
  for (let k = 0; k < 2; k += 1 / 16) {
    _events.push(
      {
        "_time": 327 + k + i,
        "_type": 1,
        "_value": 5,
        "_customData": {
          "_color": [
            0.13,
            0.13,
            0.3,
            (1 - k / 2) * 10 - 0.312
          ],
          _lightID: ranID
        }
      },
    )
  }
}




for (let i = 0; i < 32; i++) {
  _environment.push(
    {
      _id: "SmallPillarPair \\(1\\)\\.\\[\\d*\\]PillarL\\.\\[\\d*\\]LaserL$",
      _lookupMethod: "Regex",
      _duplicate: 1,
      // (360 / amount) * i
      _position: [...OnCirc(15, i * 11.25, 0, 0, [2, 1]), 2000],
      _rotation: [90 + Random(-5, 5), Random(-5, 5), Random(-5, 5)],
      _scale: [6, 1, 6],
      _lightID: 3000 + i,
    },
    {
      _id: "SmallPillarPair \\(1\\)\\.\\[\\d*\\]PillarL\\.\\[\\d*\\]LaserL$",
      _lookupMethod: "Regex",
      _duplicate: 1,
      // (360 / amount) * i
      _position: [...OnCirc(15, i * 11.25 + 180, 0, 0, [2, 1]), 2000],
      _rotation: [90 + Random(-5, 5), Random(-5, 5), Random(-5, 5)],
      _scale: [6, 1, 6],
      _lightID: 3100 + i,
    }
  );
  _events.push({
    _time: 263 + i,
    _type: 1,
    _value: 7,
    _customData: {
      _color: [255 / 255 / 4, 226 / 255 / 4, 110 / 255 / 4, 2.5],
      _lightID: [3000 + i, 3100 + i],
    },
  });
}
_events.push({
  _time: 295,
  _type: 1,
  _value: 5,
  _customData: {
    _color: [0, 0, 0, 0],
    _lightID: [...NumArray(3000, 3031), ...NumArray(3100, 3131)],
  },
});

_events.forEach((x) => {
  if (x._customData && x._type == 0 && x._time <= 69) {
    _customEvents.push({
      _time: x._time,
      _type: "AnimateTrack",
      _data: {
        _track: "constellation",
        _duration: 1,
        _color: [
          [
            x._customData._color[0] * 5,
            x._customData._color[1] * 5,
            x._customData._color[2] * 5,
            x._customData._color[3] * 5,
            0,
          ],
        ],
      },
    });
  }
});

_customEvents.push(
  {
    _time: 0,
    _type: "AssignTrackParent",
    _data: {
      _childrenTracks: ["bobShark"],
      _parentTrack: "bobSharkParent",
      _worldPositionStays: true,
    },
  },
  {
    _time: 522,
    _type: "AnimateTrack",
    _data: {
      _track: "bobSharkParent",
      _duration: 588 - 522,
      _position: [
        [-40, 0, 0, 0],
        [160, 0, 0, 1],
      ],
    },
  },
  {
    _time: 10,
    _type: "AnimateTrack",
    _data: {
      _track: "bobSharkParent",
      _duration: 1,
      _position: [[-100000, 0, 0, 0]],
    },
  }
);

_customEvents.push(
  {
    _time: 66,
    _type: "AnimateTrack",
    _data: {
      _track: "constellation",
      _duration: 71 - 66,
      _dissolve: [
        [1, 0],
        [0, 1, "easeInOutCubic"],
      ],
    },
  },
  {
    _time: 0,
    _type: "AssignTrackParent",
    _data: {
      _childrenTracks: ["DirectionalLight"],
      _parentTrack: "DirectionalLightParent",
      _worldPositionStays: true,
    },
  },
  {
    _time: 0,
    _type: "AssignTrackParent",
    _data: {
      _childrenTracks: ["horizonLazer", "horizonLazerLong"],
      _parentTrack: "horizonParent",
      _worldPositionStays: true,
    },
  },
  {
    _time: 0,
    _type: "AssignTrackParent",
    _data: {
      _childrenTracks: ["playerNotes"],
      _parentTrack: "player",
      // "_worldPositionStays": true
    },
  },
  {
    _time: 0,
    _type: "AssignTrackParent",
    _data: {
      _childrenTracks: ["riverNotes"],
      _parentTrack: "riverNotesParent",
      _worldPositionStays: true,
    },
  },
  {
    _time: 0,
    _type: "AssignTrackParent",
    _data: {
      _childrenTracks: ["horizonLazerUnder"],
      _parentTrack: "horizonLazerUnderParent",
      _worldPositionStays: true,
    },
  },
  {
    _time: 0,
    _type: "AssignPlayerToTrack",
    _data: {
      _track: "player",
    },
  },
  {
    _time: 1,
    _type: "AnimateTrack",
    _data: {
      _track: "player",
      _duration: 1,
      _position: [[0, 0, FirstSceneZ, 0]],
    },
  },
  {
    _time: 1,
    _type: "AnimateTrack",
    _data: {
      _track: "horizonParent",
      _duration: 1,
      _position: [[0, 0, FirstSceneZ, 0]],
    },
  },
  {
    _time: 103,
    _type: "AnimateTrack",
    _data: {
      _track: "player",
      _duration: 135 - 103,
      _position: [
        [0, 0, 0 + FirstSceneZ, 0],
        [0, 0, 450 + FirstSceneZ, 1, "easeInCubic"],
      ],
      _rotation: [[0, 0, 0, 0]],
    },
  },
  {
    _time: 70,
    _type: "AnimateTrack",
    _data: {
      _track: "horizonParent",
      _duration: 1,
      _position: [[0, 0, 1000, 1]],
    },
  },
  {
    _time: 103,
    _type: "AnimateTrack",
    _data: {
      _track: "horizonParent",
      _duration: 135 - 103,
      _position: [
        [0, 0, 1000 + FirstSceneZ, 0],
        [0, 0, 1450 + FirstSceneZ, 1, "easeInCubic"],
      ],
    },
  },
  {
    _time: 135,
    _type: "AnimateTrack",
    _data: {
      _track: "player",
      _duration: 167 - 135,
      _position: [
        [0, 30, 2000, 0],
        [0, 30, 2500, 1],
      ],
      _rotation: [[0, 0, 0, 0]],
    },
  },
  {
    _time: 135,
    _type: "AnimateTrack",
    _data: {
      _track: "horizonParent",
      _duration: 167 - 135,
      _position: [
        [0, 30, 2000, 0],
        [0, 30, 2500, 1],
      ],
      _rotation: [[0, 0, 0, 0]],
    },
  },
  {
    _time: 135,
    _type: "AnimateTrack",
    _data: {
      _track: "horizonLazerUnderParent",
      _duration: 167 - 135,
      _position: [
        [0, 30, 2000, 0],
        [0, 30, 2500, 1],
      ],
      _rotation: [[0, 0, 0, 0]],
    },
  },
  {
    _time: 1,
    _type: "AnimateTrack",
    _data: {
      _track: "riverNotesParent",
      _duration: 1,
      _position: [[0, 30, 2000, 0]],
      // _rotation: [[0, 0, 0, 0]]
    },
  },
  {
    _time: 135,
    _type: "AnimateTrack",
    _data: {
      _track: "riverNotesParent",
      _duration: 167 - 135,
      _position: [
        [0, 30, 2000, 0],
        [0, 30, 2500, 1],
      ],
      _rotation: [[0, 0, 0, 0]],
    },
  },
  {
    _time: 135,
    _type: "AnimateTrack",
    _data: {
      _track: "DissolveSurprizeNotes",
      _duration: 1,
      _dissolve: [[0, 0]],
    },
  },
  {
    _time: 167,
    _type: "AnimateTrack",
    _data: {
      _track: "player",
      _duration: 199 - 167,
      _position: [
        [0, 0, 4000, 0],
        [0, 0, 4200, 1],
      ],
    },
  },
  {
    _time: 167,
    _type: "AnimateTrack",
    _data: {
      _track: "horizonParent",
      _duration: 199 - 167,
      _position: [
        [0, 0, 4000, 0],
        [0, 0, 4200, 1],
      ],
    },
  },
  {
    _time: 199,
    _type: "AnimateTrack",
    _data: {
      _track: "player",
      _duration: 229 - 199,
      _position: [
        [0, 0, 2200, 0],
        [0, 0, 2050, 1, "easeOutCubic"],
      ],
    },
  },
  {
    _time: 199,
    _type: "AnimateTrack",
    _data: {
      _track: "horizonParent",
      _duration: 229 - 199,
      _position: [
        [0, 0, 2200, 0],
        [0, 0, 2050, 1, "easeOutCubic"],
      ],
    },
  },
  {
    _time: 231,
    _type: "AnimateTrack",
    _data: {
      _track: "player",
      _duration: 263 - 231,
      _position: [
        [0, 0, 1000, 0],
        [0, 0, 1050, 1],
      ],
    },
  },
  {
    _time: 231,
    _type: "AnimateTrack",
    _data: {
      _track: "horizonParent",
      _duration: 263 - 231,
      _position: [
        [0, 0, 1000, 0],
        [0, 0, 1050, 1],
      ],
    },
  },
  {
    _time: 263,
    _type: "AnimateTrack",
    _data: {
      _track: "player",
      _duration: 296 - 263,
      _position: [
        [0, 0, 2000, 0],
        [0, 0, 2100, 1],
      ],
    },
  },
  {
    _time: 263,
    _type: "AnimateTrack",
    _data: {
      _track: "horizonParent",
      _duration: 296 - 263,
      _position: [
        [0, 0, 2000, 0],
        [0, 0, 2100, 1],
      ],
    },
  },
  {
    _time: 295,
    _type: "AnimateTrack",
    _data: {
      _track: "player",
      _duration: 327 - 295,
      _position: [
        [0, 0, 2500 + 500, 0],
        [0, 0, 3700 + 500, 1],
      ],
    },
  },
  {
    _time: 295,
    _type: "AnimateTrack",
    _data: {
      _track: "horizonParent",
      _duration: 327 - 295,
      _position: [
        [0, 0, 3600 + 500, 0],
        [0, 0, 3800 + 500, 1],
      ],
    },
  },
  {
    _time: 327,
    _type: "AnimateTrack",
    _data: {
      _track: "player",
      _duration: 1,
      _position: [[0, 0, 1000, 0]],
    },
  },
  {
    _time: 327,
    _type: "AnimateTrack",
    _data: {
      _track: "horizonParent",
      _duration: 1,
      _position: [[0, 500, 2000, 0]],
    },
  },
  {
    _time: 327,
    _type: "AnimateTrack",
    _data: {
      _track: "horizonLazerUnderParent",
      _duration: 1,
      _position: [[0, 0, 1000, 0]],
    },
  },
  {
    _time: 388,
    _type: "AnimateTrack",
    _data: {
      _track: "highClouds",
      _duration: 10,
      _position: [
        [0, 400, 1050, 0],
        [0, 130, 1050, 1, "easeOutCubic"],
      ],
    },
  },
  {
    _time: 550,
    _type: "AnimateTrack",
    _data: {
      _track: "highClouds",
      _duration: 10,
      _scale: [[2, 2, 2, 0]],
      _position: [
        [0, 2000, 1050, 0],
        [0, 400, 1050, 1, "easeOutCubic"],
      ],
    },
  },
  {
    _time: 422,
    _type: "AnimateTrack",
    _data: {
      _track: "player",
      _duration: 455 - 422,
      _position: [
        [0, 0, 1000, 0],
        [0, 0, 1300, 1, "easeInCubic"],
      ],
    },
  },
  {
    _time: 422,
    _type: "AnimateTrack",
    _data: {
      _track: "horizonParent",
      _duration: 455 - 422,
      _position: [
        [0, 500, 2000, 0],
        [0, 500, 2150, 1, "easeInCubic"],
      ],
    },
  },
  {
    _time: 422,
    _type: "AnimateTrack",
    _data: {
      _track: "horizonLazerUnderParent",
      _duration: 455 - 422,
      _position: [
        [0, 0, 1000, 0],
        [0, 0, 1150, 1, "easeInCubic"],
      ],
    },
  },
  {
    _time: 487,
    _type: "AnimateTrack",
    _data: {
      _track: "player",
      _duration: 519 - 487,
      _position: [
        [0, 0, 4000, 0],
        [0, 0, 4050, 1],
      ],
      _rotation: [[0, 0, 0, 0]],
    },
  },
  {
    _time: 487,
    _type: "AnimateTrack",
    _data: {
      _track: "horizonParent",
      _duration: 519 - 487,
      _position: [
        [0, 0, 5000, 0],
        [0, 0, 5050, 1],
      ],
      _rotation: [[0, 0, 0, 0]],
    },
  },
  {
    _time: 487,
    _type: "AnimateTrack",
    _data: {
      _track: "horizonLazerUnderParent",
      _duration: 519 - 487,
      _position: [
        [0, 0, 5000, 0],
        [0, 0, 5050, 1],
      ],
      _rotation: [[0, 0, 0, 0]],
    },
  },
  {
    _time: 455,
    _type: "AnimateTrack",
    _data: {
      _track: "player",
      _duration: 487 - 455,
      _position: [
        [0, 0, 2000, 0],
        [0, 0, 2070, 1],
      ],
      _rotation: [[0, 0, 0, 0]],
    },
  },
  {
    _time: 455,
    _type: "AnimateTrack",
    _data: {
      _track: "horizonParent",
      _duration: 487 - 455,
      _position: [
        [0, 0, 3000, 0],
        [0, 0, 3070, 1],
      ],
      _rotation: [[0, 0, 0, 0]],
    },
  },
  {
    _time: 455,
    _type: "AnimateTrack",
    _data: {
      _track: "horizonLazerUnderParent",
      _duration: 487 - 455,
      _position: [
        [0, 0, 3000, 0],
        [0, 0, 3070, 1],
      ],
      _rotation: [[0, 0, 0, 0]],
    },
  },

  {
    _time: 519,
    _type: "AnimateTrack",
    _data: {
      _track: "player",
      _duration: 1,
      _position: [[0, 0, 3000, 0]],
      _rotation: [[0, 0, 0, 0]],
    },
  },
  //end ocean
  {
    _time: 523,
    _type: "AnimateTrack",
    _data: {
      _track: "player",
      _duration: 1,
      _position: [[0, 0, 1000, 0]],
      _rotation: [[0, 0, 0, 0]],
    },
  },
  {
    _time: 523,
    _type: "AnimateTrack",
    _data: {
      _track: "horizonParent",
      _duration: 1,
      _position: [[0, 100, 2000, 0]],
      _rotation: [[0, 0, 0, 0]],
    },
  },
  {
    _time: 523,
    _type: "AnimateTrack",
    _data: {
      _track: "horizonLazerUnderParent",
      _duration: 1,
      _position: [[0, 0, 1000, 0]],
      _rotation: [[0, 0, 0, 0]],
    },
  },
  {
    _time: 587.5,
    _type: "AnimateTrack",
    _data: {
      _track: "player",
      _duration: 1,
      _position: [[0, 0, 10000, 0]],
      _rotation: [[0, 0, 0, 0]],
    },
  },
  {
    _time: 135,
    _type: "AnimateTrack",
    _data: {
      _track: "water1",
      _duration: 1,
      _position: [[0, 0, -998000, 0]],
      _rotation: [[0, 0, 0, 0]],
    },
  },
  {
    _time: 167,
    _type: "AnimateTrack",
    _data: {
      _track: "water1",
      _duration: 1,
      _position: [[0, 0, -1000000, 0]],
      _rotation: [[0, 0, 0, 0]],
    },
  },
  {
    _time: 454,
    _type: "AnimateTrack",
    _data: {
      _track: "water2",
      _duration: 1,
      _position: [[0, 0, -1000000, 0]],
      _rotation: [[0, 0, 0, 0]],
    },
  },
  {
    _time: 587.375,
    _type: "AnimateTrack",
    _data: {
      _track: "water3",
      _duration: 1,
      _position: [[0, 0, -100000, 0]],
      _rotation: [[0, 0, 0, 0]],
    },
  },
  {
    _time: 514.5,
    _type: "AnimateTrack",
    _data: {
      _track: "dropwalls1",
      _duration: 519 - 514.5,
      // _dissolve: [[1, 0], [0, 1, "easeOutCubic"]],
      _position: [
        [0, 0, 0, 0],
        [0, 0, -1000, 1, "easeInOutCubic"],
      ],
    },
  },
  {
    _time: 514.5 + 4.5,
    _type: "AnimateTrack",
    _data: {
      _track: "dropwalls1",
      _duration: 1,
      // _dissolve: [[1, 0], [0, 1, "easeOutCubic"]],
      _position: [[0, 0, -10000000, 0]],
    },
  },
  {
    _time: 194.5,
    _type: "AnimateTrack",
    _data: {
      _track: "dropwalls2",
      _duration: 199 - 194.5,
      _dissolve: [
        [1, 0],
        [0, 1, "easeOutCubic"],
      ],
    },
  },
  {
    _time: 197,
    _type: "AnimateTrack",
    _data: {
      _track: "Clock1",
      _duration: 233 - 197,
      _rotation: [
        [0, 0, 0, 0],
        [0, 0, 180, 0.5],
        [0, 0, 360, 1],
      ],
    },
  },
  {
    _time: 197,
    _type: "AnimateTrack",
    _data: {
      _track: "ClockHand11",
      _duration: 233 - 197,
      _rotation: [
        [0, 0, 0, 0],
        [0, 0, 180, 0.5],
        [0, 0, 360, 1],
      ],
    },
  },
  {
    _time: 197,
    _type: "AnimateTrack",
    _data: {
      _track: "AroundClock1",
      _duration: 233 - 197,
      _rotation: [
        [0, 0, 0, 0],
        [0, 0, -180, 0.5],
        [0, 0, -360, 1],
      ],
    },
  },
  {
    _time: 0,
    _type: "AssignFogTrack",
    _data: {
      _track: "fog",
    },
  },
  {
    _time: 1,
    _type: "AnimateTrack",
    _data: {
      _track: "fog",
      _duration: 0.1,
      _startY: [[-100000, 0]],
    },
  },
  {
    _time: 70,
    _type: "AnimateTrack",
    _data: {
      _track: "fog",
      _duration: 0.1,
      _startY: [[-20 - 30, 0]],
    },
  },
  {
    _time: 167,
    _type: "AnimateTrack",
    _data: {
      _track: "fog",
      _duration: 0.1,
      _startY: [[-100000, 0]],
    },
  },
  {
    _time: 231,
    _type: "AnimateTrack",
    _data: {
      _track: "fog",
      _duration: 0.1,
      _startY: [[-10, 0]],
    },
  },
  {
    _time: 263,
    _type: "AnimateTrack",
    _data: {
      _track: "fog",
      _duration: 0.1,
      _startY: [[-100000, 0]],
    },
  },
  {
    _time: 327,
    _type: "AnimateTrack",
    _data: {
      _track: "fog",
      _duration: 0.1,
      _startY: [[-70, 0]],
    },
  },
  {
    _time: 455,
    _type: "AnimateTrack",
    _data: {
      _track: "fog",
      _duration: 0.1,
      _startY: [[-100000, 0]],
    },
  },
  {
    _time: 588,
    _type: "AnimateTrack",
    _data: {
      _track: "hideText",
      _duration: 1,
      _dissolve: [[0, 0]],
    },
  }
);

for (let i = 0; i < envDups; i++) {
  _environment.push({
    _id: "\\]PillarPair \\(1\\)\\.\\[0\\]PillarL\\.\\[0\\]Pillar$",
    _lookupMethod: "Regex",
    _duplicate: 1,
    _position: [0, 0, -1000000],
    _scale: [1, 1, 1],
    _rotation: [0, 0, 0],
    _track: "environment:" + i,
    _active: true,
  });
}

function vectorFromRotation(vectorRot, length) {
  const deg2rad = Math.PI / 180;
  var mathRot = copy(vectorRot);

  mathRot[0] *= deg2rad;
  mathRot[1] *= deg2rad;
  mathRot[2] *= deg2rad;

  var rotVector = new three.Vector3(0, length, 0).applyEuler(
    new three.Euler(...mathRot, "YXZ")
  );
  return [rotVector.x, rotVector.y, rotVector.z];
}

function copy(obj) {
  if (typeof obj != "object") return obj;

  var newObj = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    newObj[key] = copy(obj[key]);
  }
  return newObj;
}
let amountused = 0;
let lastEnv = "";
function switchEnvironment(TRACK, TIME, MIN, MAX, ZOFFSET, ROUNDING) {
  amountused = 0;
  let trackPlusOne = 0;
  console.log(`Switched ${lastEnv} to ${TRACK} at beat ${TIME}`);
  lastEnv = TRACK;
  trackPlusOne = 0;
  _notes.forEach((x) => {
    if (x._customData && x._customData._track == TRACK) {
      var y = copy(x);

      var pillarPos = y._customData._animation._definitePosition[0];
      var pillarRot = y._customData._animation._localRotation[0];
      var pillarScale = y._customData._animation._scale[0];

      pillarPos.pop();
      pillarRot.pop();
      pillarScale.pop();

      var offset = vectorFromRotation(pillarRot, (pillarScale[1] / 2) * 0.87);

      pillarScale[0] *= pillarToNoodleUnits;
      pillarScale[1] *= pillarToNoodleUnits / 32;
      pillarScale[2] *= pillarToNoodleUnits;

      pillarPos[1] += 0.09;
      pillarPos[2] += 0.65 * (1 / 0.6);

      pillarPos[0] += offset[0];
      pillarPos[1] += offset[1];
      pillarPos[2] += offset[2] + ZOFFSET;
      amountused++;
      _customEvents.push({
        _time: TIME + Random(MIN, MAX, ROUNDING),
        _type: "AnimateTrack",
        _data: {
          _track: "environment:" + trackPlusOne,
          _duration: 1,
          _position: [[...pillarPos, 0]],
          _rotation: [[...pillarRot, 0]],
          _scale: [[...pillarScale, 0]],
        },
      });
      trackPlusOne++;
    }
  });
  for (let i = trackPlusOne; i < envDups; i++) {
    _customEvents.push({
      _time: TIME + MAX + Random(1, 5),
      _type: "AnimateTrack",
      _data: {
        _track: "environment:" + i,
        _duration: 1,
        _position: [[0, 0, -1000000, 0]],
        _rotation: [[0, 0, 0, 0]],
        _scale: [[1, 1, 1, 0]],
      },
    });
  }
  difficulty._notes = difficulty._notes.filter(
    (x) => !x._customData || x._customData._track !== TRACK
  );
}
let something = 0;
function EmptyEnv(TIME, MIN, MAX) {
  something = 0;
  for (let i = 0; i < amountused; i++) {
    _customEvents.push({
      _time: TIME + Random(MIN, MAX),
      _type: "AnimateTrack",
      _data: {
        _track: "environment:" + i,
        _duration: 1,
        _position: [[0, 0, -1000000, 0]],
        _rotation: [[0, 0, 0, 0]],
        _scale: [[1, 1, 1, 0]],
      },
    });
    something++;
  }
  _customEvents.push({
    _time: TIME,
    _type: "AnimateTrack",
    _data: {
      _track: "highClouds",
      _duration: 1,
      _position: [[0, 0, -1000000, 0]],
    },
  });
  console.log(` Removed ${lastEnv} at beat ${TIME}`);
}

trackPlusOne = 0;
let lazerCount = 0;
_notes.forEach((x) => {
  if (x._customData && x._customData._track == "beginningMountain") {
    var y = copy(x);

    var pillarPos = y._customData._animation._definitePosition[0];
    var pillarRot = y._customData._animation._localRotation[0];
    var pillarScale = y._customData._animation._scale[0];

    pillarPos.pop();
    pillarRot.pop();
    pillarScale.pop();

    var offset = vectorFromRotation(pillarRot, (pillarScale[1] / 2) * 0.87);

    pillarScale[0] *= pillarToNoodleUnits;
    pillarScale[1] *= pillarToNoodleUnits / 32;
    pillarScale[2] *= pillarToNoodleUnits;

    pillarPos[1] += 0.09;
    pillarPos[2] += 0.65 * (1 / 0.6);

    pillarPos[0] += offset[0];
    pillarPos[1] += offset[1];
    pillarPos[2] += offset[2];
    _customEvents.push({
      _time: 69 + Random(0, 10),
      _type: "AnimateTrack",
      _data: {
        _track: "environment:" + trackPlusOne,
        _duration: 14,
        _position: [
          [pillarPos[0], pillarPos[1] - 150, pillarPos[2] + FirstSceneZ, 0],
          [
            pillarPos[0],
            pillarPos[1] - 50,
            pillarPos[2] + FirstSceneZ,
            1,
            "easeOutBack",
          ],
        ],
        _rotation: [[...pillarRot, 0]],
        _scale: [[...pillarScale, 0]],
      },
    });
    if (Random(0, 18, true) == 2) {
      _environment.push({
        _id: "SmallPillarPair\\.\\[\\d*\\]PillarL\\.\\[\\d*\\]LaserL$",
        _lookupMethod: "Regex",
        _duplicate: 1,
        _position: [
          pillarPos[0],
          pillarPos[1] - 50,
          pillarPos[2] + FirstSceneZ,
        ],
        _rotation: [Random(0, 360), Random(0, 360), Random(0, 360)],
        // _rotation: pillarRot,
        _lightID: 500 + lazerCount,
      });
      lazerCount++;
    }
    trackPlusOne++;
  }
});
for (let i = trackPlusOne; i < envDups; i++) {
  _customEvents.push({
    _time: 69 + Random(1, 5),
    _type: "AnimateTrack",
    _data: {
      _track: "environment:" + i,
      _duration: 1,
      _position: [[0, 0, -1000000, 0]],
      _rotation: [[0, 0, 0, 0]],
      _scale: [[1, 1, 1, 0]],
    },
  });
}
difficulty._notes = difficulty._notes.filter(
  (x) => !x._customData || x._customData._track !== "beginningMountain"
);
console.log(lazerCount);
// for (let i = 0; i < 100; i++) {
//   _environment.push({
//     _id: "SmallPillarPair\\.\\[\\d*\\]PillarL\\.\\[\\d*\\]LaserL$",
//     _lookupMethod: "Regex",
//     _duplicate: 1,
//     _position: [Random(-2000, 2000), Random(-60, 1000), Random(-50, 990)],
//     // _localRotation: [0, 0, Random(0, 360)],
//     _rotation: [0, 0, Random(0, 360)],
//     _lightID: 500 + i,
//   });
// }
_events.forEach((x) => {
  if (
    x._time >= 71 &&
    x._time <= 134.75 &&
    x._type == 1 &&
    x._customData &&
    x._customData._lightID == 19
  ) {
    x._customData._lightID = [];
    for (let i = 0; i < lazerCount; i++) {
      x._customData._lightID.push(500 + i);
    }
    x._customData._color[0] /= 4;
    x._customData._color[1] /= 4;
    x._customData._color[2] /= 4;
    x._customData._color[3] *= 10;
  }
});

console.log(`\nEnvironment Dups: ${envDups}`);
switchEnvironment("nothingElseLogo", 5, 0, 0, 230, false);
EmptyEnv(68, 0, 0);
switchEnvironment("vallyWithWater", 135, -1, 2, 3000, false);
EmptyEnv(167, 0, 20);
switchEnvironment("mountainAfterDrop", 225, -5, 5, 1000, false);
switchEnvironment("caveAfterMountain", 263, 0, 8, 2000, false);
switchEnvironment("complexGeometry", 295, -1, 3, 3000 + 500, true);
switchEnvironment("OceanBeach", 327, 0, 3, 1000, false);
switchEnvironment("temple", 455, -1, 0, 2000, false);
EmptyEnv(487, 0, 20);
switchEnvironment("endOcean", 520, 0, 3, 1000, false);
let waterheight = -7;
_obstacles.push({
  _time: 134,
  _lineIndex: 0,
  _type: 1,
  _duration: 200,
  _width: 0,
  _customData: {
    _track: "water1",
    _scale: [1000, 2, 1000],
    // _localRotation: [0, 180, 0],
    _interactable: false,
    _fake: true,
    _color: [0, 1.5, 2, 10],
    _animation: {
      _definitePosition: [
        [-500, 17 - waterheight, 1000000, 0],
        [-500, 20 - waterheight, 1000000, 0.1, "easeInOutCubic"],
        [-500, 17 - waterheight, 1000000, 0.2, "easeInOutCubic"],
        [-500, 20 - waterheight, 1000000, 0.3, "easeInOutCubic"],
        [-500, 17 - waterheight, 1000000, 0.4, "easeInOutCubic"],
        [-500, 20 - waterheight, 1000000, 0.5, "easeInOutCubic"],
        [-500, 17 - waterheight, 1000000, 0.6, "easeInOutCubic"],
        [-500, 20 - waterheight, 1000000, 0.7, "easeInOutCubic"],
        [-500, 17 - waterheight, 1000000, 0.8, "easeInOutCubic"],
        [-500, 20 - waterheight, 1000000, 0.9, "easeInOutCubic"],
        [-500, 17 - waterheight, 1000000, 1, "easeInOutCubic"],
      ],
      _localRotation: [
        [0, 0, 2, 0],
        [0, 0, -2, 0.1, "easeInOutCubic"],
        [0, 0, 2, 0.2, "easeInOutCubic"],
        [0, 0, -2, 0.3, "easeInOutCubic"],
        [0, 0, 2, 0.4, "easeInOutCubic"],
        [0, 0, -2, 0.5, "easeInOutCubic"],
        [0, 0, 2, 0.6, "easeInOutCubic"],
        [0, 0, -2, 0.7, "easeInOutCubic"],
        [0, 0, 2, 0.8, "easeInOutCubic"],
        [0, 0, -2, 0.9, "easeInOutCubic"],
        [0, 0, 2, 1, "easeInOutCubic"],
      ],
      _dissolve: [
        [0, 0],
        [1, 0.01],
      ],
    },
  },
});

_obstacles.push({
  _time: 326,
  _lineIndex: 0,
  _type: 1,
  _duration: 200,
  _width: 0,
  _customData: {
    _track: "water2",
    _scale: [1000, 2, 1000],
    // _localRotation: [0, 180, 0],
    _interactable: false,
    _fake: true,
    _color: [0, 1.5 / 4, 2 / 4, 10 / 4],
    _animation: {
      _definitePosition: [[-500, -3.5, 900, 0]],
      _position: [
        [0, 0, 0, 0],
        [0, 0, -50, 1],
      ],
      _dissolve: [
        [0, 0],
        [1, 0.01],
      ],
    },
  },
});

_obstacles.push({
  _time: 522,
  _lineIndex: 0,
  _type: 1,
  _duration: 200,
  _width: 0,
  _customData: {
    _track: "water3",
    _scale: [5000, 2, 1500],
    // _localRotation: [0, 180, 0],
    _interactable: false,
    _fake: true,
    _color: [0, 1.5, 2, 10],
    _animation: {
      _definitePosition: [[-500, -3.5, 900, 0]],
      _position: [
        [0, 0, 0, 0],
        [0, 0, -50, 1],
      ],
      _dissolve: [
        [0, 0],
        [1, 0.01],
      ],
    },
  },
});

for (let i = 0; i < 550; i++) {
  let ranRot = Random(10, 300);
  let ranRot2 = Random(10, 300);
  _obstacles.push({
    _time: 165 + i / 16,
    _duration: 3,
    _lineIndex: 0,
    _type: 0,
    _width: 0,
    _customData: {
      _interactable: false,
      _fake: true,
      _track: "dropwalls2",
      // _rotation: [0, 0, Random(0, 360)],
      _scale: [0.1, 0.1, 1000],
      _color: [100, 100, 100, 10],
      _localRotation: [ranRot, ranRot, 0],
      _animation: {
        _localRotation: [
          [ranRot, ranRot, 0, 0],
          [ranRot2, ranRot2, 0, 1],
        ],
        _rotation: [
          [0, 0, Random(0, 360), 0],
          [0, 0, Random(0, 360), 1, "easeInOutCubic"],
        ],
        _dissolve: [
          [0, 0.1],
          [0.5, 0.4],
          [0, 1],
        ],
        _position: [
          [0, 0, 150, 0],
          [0, 0, -10, 1],
        ],
        _definitePosition: [
          [0, 0, 4000, 0],
          [0, ranRot, 4000, 0.7],
        ],
      },
    },
  });
}

for (let i = 0; i < 100; i++) {
  _obstacles.push({
    _time: 199 + i / 4,
    _duration: 5,
    _lineIndex: 0,
    _type: 0,
    _width: 0,
    _customData: {
      _interactable: false,
      _fake: true,
      _track: "ClockWalls1",
      _scale: [0.1, 10, 0.1],
      _color: [100, 100, 100, 10],
      _animation: {
        _dissolve: [
          [0, 0],
          [0.2, 0.1],
          [0.2, 0.9],
          [0, 1],
        ],
        _position: [
          [Random(-70, 70), Random(-40, 80), Random(-10, 100), 0],
          [
            Random(-70, 70),
            Random(-40, 80),
            Random(-10, 100),
            0.5,
            "splineCatmullRom",
          ],
          [
            Random(-70, 70),
            Random(-40, 80),
            Random(-10, 100),
            1,
            "splineCatmullRom",
          ],
        ],
        _definitePosition: [[0, 0, 2050, 0]],
      },
    },
  });
}

//circleGen(beat, duration, Xc, Yc, Z, radius, amount, track, l, h)






difficulty._obstacles.forEach((wall) => {
  var randomSpread = Math.random();
  var duration = wall._duration + halfJumpDuration * 2;
  var newDuration = wall._duration + halfJumpDuration * 2 + randomSpread;
  wall._time -= randomSpread;
  wall._duration += randomSpread;

  var timeOffset = (newDuration - duration) / newDuration;
  var timeMultiplier = 1 - timeOffset;

  if (wall._customData)
    if (wall._customData._animation) {
      for (const property in wall._customData._animation) {
        wall._customData._animation[property].forEach((element) => {
          var timeElement = element.length - 1;
          if (typeof element[timeElement] === "string") timeElement -= 1;

          element[timeElement] *= timeMultiplier;
          element[timeElement] += timeOffset;
        });
      }
    }
});

circleGen(198, 231 - 199, 0, 0, 2120, 25, 25, "Clock1", 2, 2);
for (let i = 0; i < 180; i += 20) {
  circleGen(
    198,
    231 - 199,
    0,
    0,
    2170 + i * 1.5,
    25 - i / 8,
    4,
    "AroundClock1",
    0.1,
    0.1
  );
}
_obstacles.forEach((x) => {
  if (
    x._customData._track == "Clock1" ||
    x._customData._track == "AroundClock1"
  ) {
    x._customData._animation._dissolve = [
      [0, 0.05],
      [1, 0.2],
      [1, 0.8],
      [0, 0.95],
    ];
    x._time += Random(0, 0.1);
    x._customData._animation._position = [
      [x._customData._position[0] * 2, x._customData._position[1] * 2, 0, 0],
      [
        x._customData._position[0],
        x._customData._position[1],
        0,
        0.1,
        "easeInOutCubic",
      ],
      [x._customData._position[0], x._customData._position[1], 0, 0.9],
      [
        x._customData._position[0] * 2,
        x._customData._position[1] * 2,
        -150,
        1,
        "easeInOutCubic",
      ],
    ];
    x._customData._animation._localRotation = [
      [Random(-360, 360), Random(-360, 360), Random(-360, 360), 0],
      [
        x._customData._localRotation[0],
        x._customData._localRotation[1],
        x._customData._localRotation[2],
        0.2,
        "easeInOutCubic",
      ],
      [
        x._customData._localRotation[0],
        x._customData._localRotation[1],
        x._customData._localRotation[2],
        0.85,
      ],
      [
        Random(-360, 360),
        Random(-360, 360),
        Random(-360, 360),
        1,
        "easeInOutCubic",
      ],
    ];
    delete x._customData._position;
    delete x._customData._localRotation;
    if (x._customData._track == "Clock1")
      x._customData._animation._color = [
        [1, 1, 1, 1, 0],
        [1 * 3, 0.682 * 3, 0.155 * 3, 10, 1],
      ];
    if (x._customData._track == "AroundClock1")
      x._customData._animation._color = [
        [1, 1, 1, 1, 0],
        [10, 10, 10, 10, 1],
      ];
    if (x._customData._track == "AroundClock1") x._customData._track = "Clock1";
  }
  x._customData._fake = true;
  x._customData._interactable = false;
});

for (let i = 0; i < 54; i++) {
  _obstacles.push(
    {
      _time: 487 + i / 32,
      _duration: 200 - 167,
      _lineIndex: 0,
      _type: 0,
      _width: 0,
      _customData: {
        _interactable: false,
        _fake: true,
        _color: [10, 10, 10, 100],
        _scale: [4, 1000, 100],
        _track: "dropwalls1",
        _animation: {
          _dissolve: [
            [0, 0],
            [1, 0.05],
          ],
          _definitePosition: [
            [-90, 30, 4030 + i * 15, 0],
            [45, 50, 4030 + i * 15, 0.5, "splineCatmullRom"],
            [0, 5, 4000 + i * 15, 1, "splineCatmullRom"],
          ],
          _rotation: [
            [0, 0, 20 * i + 180, 0],
            [0, 0, 10 * i + 180, 1, "easeInOutExpo", "splineCatmullRom"],
          ],
          _localRotation: [
            [0, 0, 50, 0],
            [2, 2, 80, 0.125, "easeInOutCubic", "splineCatmullRom"],
            [4, 4, -80, 0.25, "easeInOutCubic", "splineCatmullRom"],
            [6, 6, 50, 0.5],
            [8, 8, 80, 0.625, "easeInOutCubic", "splineCatmullRom"],
            [10, 10, -80, 0.75, "easeInOutCubic", "splineCatmullRom"],
            [12, 12, 50, 0.875, "easeInOutCubic", "splineCatmullRom"],
            [14, 14, 80, 1, "easeInOutCubic", "splineCatmullRom"],
          ],
        },
      },
    },
    {
      _time: 487 + i / 32,
      _duration: 200 - 167,
      _lineIndex: 0,
      _type: 0,
      _width: 0,
      _customData: {
        _interactable: false,
        _fake: true,
        _color: [10, 10, 10, 100],
        _scale: [4, 1000, 100],
        _track: "dropwalls1",
        _animation: {
          _dissolve: [
            [0, 0],
            [1, 0.05],
          ],
          _definitePosition: [
            [-90, 30, 4030 + i * 15, 0],
            [45, 50, 4030 + i * 15, 0.5, "splineCatmullRom"],
            [0, 5, 4000 + i * 15, 1, "splineCatmullRom"],
          ],
          _rotation: [
            [0, 0, 20 * i, 0],
            [0, 0, 10 * i, 1, "easeInOutExpo", "splineCatmullRom"],
          ],
          _localRotation: [
            [0, 0, 50, 0],
            [2, 2, 80, 0.125, "easeInOutCubic", "splineCatmullRom"],
            [4, 4, -80, 0.25, "easeInOutCubic", "splineCatmullRom"],
            [6, 6, 50, 0.5, "easeInOutCubic", "splineCatmullRom"],
            [8, 8, 80, 0.625, "easeInOutCubic", "splineCatmullRom"],
            [10, 10, -80, 0.75, "easeInOutCubic", "splineCatmullRom"],
            [12, 12, 50, 0.875, "easeInOutCubic", "splineCatmullRom"],
            [14, 14, 80, 1, "easeInOutCubic", "splineCatmullRom"],
          ],
        },
      },
    }
  );
}





for (let i = 0; i < 100; i++) {
  _obstacles.push(
    {
      _time: 292 + i / 32,
      _duration: 32,
      _lineIndex: 0,
      _type: 0,
      _width: 0,
      _customData: {
        _interactable: false,
        _fake: true,
        _color: [1, 1, 1, -1],
        _scale: [1 / 2, 1 / 2, 1 / 2],
        // _track: "dropwalls1",
        _animation: {
          _scale: [[10, 10000, 30, 0]],
          _position: [[0, 0, 100, 0], [0, 0, 1200, 1]],
          _dissolve: [
            [0, 0],
            [1, 0.05],
          ],
          _definitePosition: [
            [-90, 30, 2530 + i * 15, 0],
            [45, 50, 2530 + i * 15, 0.5, "splineCatmullRom"],
            [75, 70, 2500 + i * 15, 0.95, "splineCatmullRom"],
            [75, 500, 2500 + i * 15, 1, "splineCatmullRom"],
          ],
          _rotation: [
            [0, 0, 20 * i + 180, 0],
            [0, 0, 10 * i + 180, 1, "easeInOutExpo", "splineCatmullRom"],
          ],
          _localRotation: [
            [0, 90, 50, 0],
            [2, 90, 80, 0.125, "easeInOutCubic", "splineCatmullRom"],
            [4, 90, -80, 0.25, "easeInOutCubic", "splineCatmullRom"],
            [6, 90, 50, 0.5],
            [8, 90, 80, 0.625, "easeInOutCubic", "splineCatmullRom"],
            [10, 90, -80, 0.75, "easeInOutCubic", "splineCatmullRom"],
            [12, 90, 50, 0.875, "easeInOutCubic", "splineCatmullRom"],
            [14, 90, 80, 1, "easeInOutCubic", "splineCatmullRom"],
          ],
        },
      },
    },
    {
      _time: 292 + i / 32,
      _duration: 32,
      _lineIndex: 0,
      _type: 0,
      _width: 0,
      _customData: {
        _interactable: false,
        _fake: true,
        _color: [1, 1, 1, -1],
        _scale: [1 / 2, 1 / 2, 1 / 2],
        // _track: "dropwalls1",
        _animation: {
          _scale: [[10, 10000, 30, 0]],
          _position: [[0, 0, 100, 0], [0, 0, 1300, 1]],
          _dissolve: [
            [0, 0],
            [1, 0.05],
          ],
          _definitePosition: [
            [-90, 30, 2530 + i * 15, 0],
            [45, 50, 2530 + i * 15, 0.5, "splineCatmullRom"],
            [75, 70, 2500 + i * 15, 0.95, "splineCatmullRom"],
            [75, 500, 2500 + i * 15, 1, "splineCatmullRom"],
          ],
          _rotation: [
            [0, 0, 20 * i, 0],
            [0, 0, 10 * i, 1, "easeInOutExpo", "splineCatmullRom"],
          ],
          _localRotation: [
            [0, 90, 50, 0],
            [2, 90, 80, 0.125, "easeInOutCubic", "splineCatmullRom"],
            [4, 90, -80, 0.25, "easeInOutCubic", "splineCatmullRom"],
            [6, 90, 50, 0.5, "easeInOutCubic", "splineCatmullRom"],
            [8, 90, 80, 0.625, "easeInOutCubic", "splineCatmullRom"],
            [10, 90, -80, 0.75, "easeInOutCubic", "splineCatmullRom"],
            [12, 90, 50, 0.875, "easeInOutCubic", "splineCatmullRom"],
            [14, 90, 80, 1, "easeInOutCubic", "splineCatmullRom"],
          ],
        },
      },
    }
  );
}



_obstacles.push({
  _time: 198,
  _duration: 231 - 199,
  _lineIndex: 0,
  _type: 0,
  _width: 0,
  _customData: {
    _interactable: false,
    _fake: true,
    _track: "ClockHand11",
    _scale: [0.5, 19, 0.5],
    _color: [100, 100, 100, 10],
    _animation: {
      _dissolve: [
        [0, 0.05],
        [1, 0.2],
        [1, 0.7],
        [0, 0.9],
      ],
      _definitePosition: [[0, 0, 2120, 0]],
      _localRotation: [
        [0, 0, 0, 0],
        [0, 0, 180, 0.5],
        [0, 0, 360, 1],
      ],
    },
  },
});

for (let i = 0; i < 1000; i++) {
  let DisFrmCenter = Random(30, 300);
  let defPosZ = Random(-10, 600);
  let rotZ = Random(0, 360);
  _obstacles.push({
    _time: 8 + i / 16,
    _duration: 10,
    _lineIndex: 0,
    _type: 0,
    _width: 0,
    _customData: {
      _interactable: false,
      _fake: true,
      _scale: [0.5, 30 + Random(0, 50), 0.5],
      _color: [100, 100, 100, 100],
      _track: "constellation",
      _animation: {
        _rotation: [
          [0, 0, rotZ, 0],
          [0, 0, rotZ + 60, 0.5, "easeInOutCubic", "splineCatmullRom"],
          [0, 0, rotZ + 110, 1, "easeInOutQuad", "splineCatmullRom"],
        ],
        _dissolve: [
          [0, 0],
          [1, 0.1],
          [1, 0.33],
          [0, 0.46],
        ],
        _localRotation: [
          [Random(-10, 10), 0, Random(-20, 20), 0],
          [Random(-10, 10), 0, Random(-20, 20), 1],
        ],
        _definitePosition: [
          [0, DisFrmCenter, defPosZ, 0],
          [
            0,
            10 + Random(10, 50),
            defPosZ,
            0.5,
            "easeInOutCubic",
            "splineCatmullRom",
          ],
          [0, DisFrmCenter, defPosZ, 1, "easeInOutQuad", "splineCatmullRom"],
        ],
        _position: [
          [0, 0, 0 + FirstSceneZ, 0],
          [0, 0, -210 + FirstSceneZ, 1],
        ],
      },
    },
  });
}

// const sharkEnvLength = EnvArrLengthByTrack("bobShark");
_notes.forEach((x) => {
  if (x._customData && x._customData._track == "bobShark") {
    var y = copy(x);

    var pillarPos = y._customData._animation._definitePosition[0];
    var pillarRot = y._customData._animation._localRotation[0];
    var pillarScale = y._customData._animation._scale[0];

    pillarPos.pop();
    pillarRot.pop();
    pillarScale.pop();

    var offset = vectorFromRotation(pillarRot, (pillarScale[1] / 2) * 0.87);

    pillarScale[0] *= pillarToNoodleUnits;
    pillarScale[1] *= pillarToNoodleUnits / 32;
    pillarScale[2] *= pillarToNoodleUnits;

    pillarPos[1] += 0.09;
    pillarPos[2] += 0.65 * (1 / 0.6);

    pillarPos[0] += offset[0];
    pillarPos[1] += offset[1] + 0.65;
    pillarPos[2] += offset[2] + 1020;

    _environment.push({
      _id: "\\]PillarPair \\(1\\)\\.\\[0\\]PillarL\\.\\[0\\]Pillar$",
      _lookupMethod: "Regex",
      _duplicate: 1,
      _position: pillarPos,
      _scale: pillarScale,
      _rotation: pillarRot,
      _track: "bobShark",
      _active: true,
    });
  }
});

difficulty._notes = difficulty._notes.filter(
  (x) => !x._customData || x._customData._track !== "bobShark"
);

_notes.forEach((x) => {
  if (!x._customData) x._customData = {};
  x._customData._disableSpawnEffect = true;
  //force colors on notes
  if (x._type == 0 && !x._customData._color) x._customData._color = leftColor;
  if (x._type == 1 && !x._customData._color) x._customData._color = rightColor;
  //if there is color under customData and under animation it will remove not the animated one
  if (
    x._customData._animation &&
    x._customData._color &&
    x._customData._animation._color
  )
    delete x._customData._color;
});

function TwoRandomNumbers(n1, n2) {
  let ran = Math.round(Math.random());
  if (ran === 0) return n1;
  if (ran === 1) return n2;
}

_obstacles.forEach((x) => {
  if (x._customData._track == "hideText") {
    if (!x._customData) x._customData = {};
    if (!x._customData._animation) x._customData._animation = {};
    x._customData._animation._localRotation = [
      [Random(0, 360), Random(0, 360), Random(0, 360), 0],
      [
        x._customData._localRotation[0],
        x._customData._localRotation[1],
        x._customData._localRotation[2],
        0.05,
        "easeInOutQuart",
      ],
      [
        x._customData._localRotation[0],
        x._customData._localRotation[1],
        x._customData._localRotation[2],
        0.95,
      ],
      [Random(0, 360), Random(0, 360), Random(0, 360), 1, "easeInOutQuart"],
    ];
    delete x._customData._localRotation;
    x._customData._animation._position = [];
    for (let i = 0.025; i < 1 - 0.025; i += 0.025) {
      x._customData._animation._position.push(
        [
          TwoRandomNumbers(0.75, -0.75),
          TwoRandomNumbers(0.75, -0.75),
          TwoRandomNumbers(0.75, -0.75),
          i,
        ],
        [0, 0, 0, 0.4 + i + 0.024]
      );
    }
    x._customData._animation._position.push([
      0 - x._customData._position[0],
      0,
      100,
      1,
      "easeInOutQuart",
    ]);
  }
});



_obstacles.forEach(x => {
  if (!x._customData) x._customData = {};
  x._customData._fake = true;
  x._customData._interactable = false;
})


_events.sort(function (a, b) {
  return a._time - b._time;
});
externalInfo.runs += 1;
fs.writeFileSync(OUTPUT, JSON.stringify(difficulty, null, 0));
fs.writeFileSync(COUNT, JSON.stringify(externalInfo, null, 0));
