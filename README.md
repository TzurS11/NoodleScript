## Before you start
 It is important to know javascript and to read the [Noodle Extension documentation](https://www.google.com/search?client=firefox-b-d&q=ducomentation).

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

# Example(s)

<p align="center">
  <img src="./Images/Example1.PNG" width="400">
  <img src="./Images/Example2.PNG" width="414">
  <img src="./Images/Example3.PNG" width="430">
</p>


# Useful functions


### Random Number
- To make it function the best and to preven errors put it under line 14
```js
function Random(min, max) {
    max++;
    return Math.random() * (max - min) + min;
  }  
  
  var randomNum = Random(3,19) //gives a random number between 3 to 19
```
### Log Environment Enhancement
- To make it function the best put it above the output line(which means you put it just beforet the end of the script)
```js
_environment.forEach(x => {
    console.log("ID: " + x._id + ", Method: " + x._lookupMethod);
});
```
### toBeat(works only on custom events)
- When using that function you **must** add toBeat: bool(will give you an error if you dont put it)
- To make it function the best put it above the output line(which means you put it just beforet the end of the script)

```js
_customEvents.forEach(x => {
    if (x._data.toBeat == true) {
        x._data._duration = x._data._duration - x._time;
        delete x._data.toBeat;
    }
});
```
