![](https://github.com/TzurS11/NoodleScript/blob/main/Images/unknown.png)

## Before you start
 - It is important to know javascript and to read the [Noodle Extension documentation](https://github.com/Aeroluna/Heck/wiki).

### Useful tools(you might wanna use them)
- [Visual Studio Code](https://code.visualstudio.com/Download)

- [Chromapper](https://github.com/Caeden117/ChroMapper)

- [Beat Saber](https://beatsaber.com/)

- [Scuffed Walls](https://github.com/thelightdesigner/ScuffedWalls)


# How to use it
1. Download [Script.js](./Script.js) to your map folder

2. Change the INPUT and OUTPUT difficulties

3. Start coding

4. Run the script through Node.js




# Useful functions


### Random Number generator
```js
function Random(min, max, round) {
  if (round == false || round == undefined) return Number((Math.random() * (max - min) + min).toFixed(3));
  if (round == true) return Math.round(Math.random() * (max - min) + min);
}

let randomNum = Random(3, 19,/*round(true,undefined/false(defaut))*/); //gives a random number between 3 to 19
```

### Lerp functions
Most of the easing functions can be found **[here](https://github.com/TzurS11/NoodleScript/blob/main/Examples/Easings.js)**.  
Go to **[easings.net](https://easings.net/)** to find more easings


# Examples
### My maps:
[`Reassurance`](https://github.com/TzurS11/NoodleScript/blob/main/Examples/Scripts/Reassurace.js) - [`Drown`](https://github.com/TzurS11/NoodleScript/blob/main/Examples/Scripts/Drown.js) - [`La Lune`](https://github.com/TzurS11/NoodleScript/blob/main/Examples/Scripts/La_Lune.js) - [`Neverless`](https://github.com/TzurS11/NoodleScript/blob/main/Examples/Scripts/Neverless.js) - [`Butterflies`](https://github.com/TzurS11/NoodleScript/blob/main/Examples/Scripts/Butterflies.js) - [`Nothing Else`](https://github.com/TzurS11/NoodleScript/blob/main/Examples/Scripts/Nothing_Else.js) - [`Interlace`](https://github.com/TzurS11/NoodleScript/blob/main/Examples/Scripts/interlace_wip.zip)
### Other sources:
[`totally balloon`](https://github.com/Infinit3/le-monke-maps) - [`Swifter's ReMapper`](https://github.com/Swifter1243/ReMapper) - [`Nootils`](https://github.com/StormPacer/nootils) - [`Skybox`](https://gist.github.com/cal117/de1e618587e0e5b1bc290435dd4c009f)
### Fonts([TextToWall](https://github.com/thelightdesigner/ScuffedWalls/blob/main/TextToWall.md))
[`font1.dae`](https://github.com/TzurS11/NoodleScript/blob/main/Examples/Fonts/font1.dae) - [`font2.dae`](https://github.com/TzurS11/NoodleScript/blob/main/Examples/Fonts/font2.dae) - [`font3.dae`](https://github.com/TzurS11/NoodleScript/blob/main/Examples/Fonts/font3.dae)

My fonts are not falling under the Apache 2.0 license but if you use my fonts you don't have to but it would be appreciated if you give me credit or just give some feedback on discord :pray:
<br/><br/>
<h3><strong>Got any questions? Discord: TzurS11#1111</strong></h3>
