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


_environment.forEach(x => {
    console.log("ID: " + x._id + ", Method: " + x._lookupMethod);
});
_obstacles.forEach(x => {
    console.log("Wall:\n Beat: "+x._time+"\n Track:"+x._track);
});

fs.writeFileSync(OUTPUT, JSON.stringify(difficulty, null, 0));
