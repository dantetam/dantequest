/**
A class for defining rich dialogues between players and NPCs.
The conversation class instance is intended to correspond with one NPC,
and represents a graph collection of Dialogues and Nodes.

Dialogue represent single blocks of back and forth chat without user interaction.
Dialogues lead into nodes, which represent both potential choices and results of choices.
Dialogues can lead into ends of the whole conversation.
*/

define(function() {

    var Conversation = Class.extend({

        /**
        @param dialogues A dictionary of dialogues indexed by {id: object}
        @param nodes     A dictionary of nodes indexed by {id: object}


        @param actors          A dictionary linking the actor name indices in _text_ to the actual actor objects in the world
        */
        init: function(dialogues, nodes, startingDialogueId, startingNodeId, actors) {
    	    var self = this;

            this.dialogues = dialogues;
            this.nodes = nodes;
            this.startingDialogueId = startingDialogueId;
            this.startingNodeId = startingNodeId;
            this.actors = actors;
    	},



    });

    return Conversation;
});
