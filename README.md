

DanteQuest
============
A full medieval fantasy adventure game, based entirely in the browser with a full node.js/socket.io stack.

This is a fork of github.com/nenuadrian/browserquest, which is in turn, a fork of the popular BrowserQuest HTML5/node.js adventure game and proof of concept. 

  * NPC dialogues and speech options
  * Quest progression and JSON data
  * Fix map editor export code and add custom tileset
  * Custom combat formulas
  * Basic trainable skills, which affect combat
  * An inventory system with equippable weapons and armor
  * Beautifully written dialogue, inspired by the Witcher book series, Warhammer, Monty Python, and more.
  

Attributions & nenuadrian's Changes
============
  * Updated backend and frontend to use Socket.IO server and Client
  * Main changes were made to ws.js and gameclient.js.
  * Updated dependencies such as requirejs and jQuery to their latest versions
  * Fixed build script
  * Created a mini-dispatcher on the server side that provides the IP and Port in the configs as the ones for the game server.
  * ~~Added a demo to http://browserquest.codevolution.com~~
  * A few minor edits to server side handling

HOW TO RUN
============

```
npm install
node /server/js/main.js
(open or host) /client/index.html
```

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
