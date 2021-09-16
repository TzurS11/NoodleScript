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
```js
function Random(min, max) {
    max++;
    return Math.random() * (max - min) + min;
  }  
  
  var randomNum = Random(3,19) //gives a random number between 3 to 19
```
