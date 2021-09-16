const fs = require("fs");
const INPUT = "YourInputDifficulty.dat";
const OUTPUT = "YourOutputDifficulty.dat";
let difficulty = JSON.parse(fs.readFileSync(INPUT));


difficulty._customData = { _pointDefinitions: [], _customEvents: [], _environment: [] };

const _customData = difficulty._customData;
const _obstacles = difficulty._obstacles;
const _notes = difficulty._notes;
const _customEvents = _customData._customEvents;
const _pointDefinitions = _customData._pointDefinitions;
const _environment = _customData._environment;



//your code here....


//Template for Environment enhancement, Wall, Custom event:

//wall:
//_obstacles.push(
//    {
//        "_time": Beat,
//        "_lineIndex": 0,
//        "_type": 1,
//        "_duration": When animating in custom data,
//        "_width": 0,
//        "_customData": {
//            "_track": ["yourTrack1","yourTrack2"..... you can make one or more tracks],
//            "_scale": [x, y, z],
//            "_position": [x, y, z],
//            "_rotation":[x, y, z]
//            //more customData here
//        }
//    }
//);


//Environment:
//_environment.push(
//    {
//        "_id": "Find in Chroma logs",
//        "_lookupMethod": "Regex, Exact, Contains",
//        "_scale": [x, y, z],
//       "_position": [x, y, z],
//        "_rotation":[x, y, z]
//        //more customData here
//    }
//);


//custom event:
//_customEvents.push(
//    {
//        "_time" : 66,
//      "_type" : "AnimateTrack",
//        "_data" : {
//          "_rotation" : [[0,0,0,0],[0,50000,0,1]],
//          "_duration" : 100,
//          "_track" : "beginingwall"
//        }
//    }
//);


fs.writeFileSync(OUTPUT, JSON.stringify(difficulty, null, 0));
