

DanteQuest
============
Medieval fantasy adventure game, a full node.js/socket.io/HTML5 stack and browser based client.

This is a fork of [this repo](github.com/nenuadrian/browserquest), which is in turn, a fork of the popular [BrowserQuest](https://github.com/mozilla/BrowserQuest) HTML5/node.js adventure game and proof of concept.

New Features
============
  * NPC dialogues and speech options
  * A chat log for players
  * Quest progression and JSON data
  * Fix map editor export code and add custom tileset
  * Custom combat formulas
  * Levels and experience, which give points for trainable skills, which affect combat
  * An inventory system with equippable weapons and armor
  * Better client-server communication with these new features
  * Beautifully written dialogue, inspired by the Witcher book series, Warhammer lore, Monty Python, and more.

Starting a Server
-----------------

```
npm install
node /server/js/main.js
(open or host) /client/index.html
```

Creating the Map
----------------
The original BrowserQuest, and this fork, relies on .tmx files, which can be edited with the [Tiled Map Editor](http://www.mapeditor.org/). These .tmx files are exported into JSON
through a Python3 script, using the following commands:

```
cd tools/maps
python export.py client && python export.py server
```

See the original [BrowserQuest](https://github.com/mozilla/BrowserQuest) for the first Python2.7 exporter.
This project uses the original artwork by [@glecollinet](http://twitter.com/glecollinet), and the DawnLike tileset, by [DragonDePlatino](https://dragondeplatino.deviantart.com/).

Attributions & nenuadrian's Changes
-------------
  * Updated backend and frontend to use Socket.IO server-client communication
  * Main changes were made to ws.js and gameclient.js.
  * Updated dependencies such as requirejs and jQuery to their latest versions
  * ~~Fixed build script~~
  * Created a mini-dispatcher on the server side that provides the IP and Port in the configs as the ones for the game server.
  * ~~Added a demo to http://browserquest.codevolution.com~~
  * A few minor edits to server side handling

Original README
============
BrowserQuest is a HTML5/JavaScript multiplayer game experiment.


Documentation
-------------
Documentation is located in client and server directories.


License
-------
Original code is licensed under MPL 2.0.
See the LICENSE file for details.


Credits
-------
Created by [Little Workshop](http://www.littleworkshop.fr):

* Franck Lecollinet - [@whatthefranck](http://twitter.com/whatthefranck)
* Guillaume Lecollinet - [@glecollinet](http://twitter.com/glecollinet)
