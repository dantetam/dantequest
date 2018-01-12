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

        */
        init: function(dialogues, nodes, startingDialogueId, startingNodeId) {
    	    var self = this;

            this.dialogues = dialogues;
            this.nodes = nodes;
            this.startingDialogueId = startingDialogueId;
            this.startingNodeId = startingNodeId;

            this.convoActive = false;

            this.dialoguePointer = null; //Current dialogue object
            this.dialogueIndexPointer = null; //Current line of text within dialogue object
            this.nodeResult = null; //Future planned node to go to at end of dialogue
            this.nodePointer = null; //Current node location
            //Note that nodeResult <-implies-> dialoguePointer <-implies-> dialogueIndexPointer,
            //dialoguePointer <-/-> nodePointer
    	},

        /**
        @param actors          A dictionary linking the actor name indices in _text_ to the actual actor objects in the world
        */
        startConvo: function(actorObjs) {
            this.convoActive = true;
            this.dialoguePointer = this.startingDialogueId;
            this.dialogueIndexPointer = 0;
            this.nodeResult = this.startingNodeId;
            this.nodePointer = null;
        },

        endConvo: function(actorObjs) {
            this.convoActive = false;
            this.dialoguePointer = null;
            this.dialogueIndexPointer = null;
            this.nodeResult = null;
            this.nodePointer = null;
        },

        /**
        Advance the conversation one step, returning one of these options:
        i) part of a dialogue, and possibly an action with the dialogue;
        ii) a series of choices, given to the user;
        iii) an object signaling the end of the conversation.
        */
        advanceConvo: function(choice=null) {
            if (this.convoActive) {
                if (choice === null) { //Just advancing a conversation, not picking an option
                    var curDialogue = this.dialogues[this.dialoguePointer];
                    if (this.dialogueIndexPointer < curDialogue.getLength()) {
                        this.dialogueIndexPointer += 1;

                        var dialogueAction = curDialogue["dialogueActions"][this.dialogueIndexPointer];
                        //Do something with the dialogue action

                        return curDialogue.text[this.dialogueIndexPointer - 1]; //Get the current one
                    }
                    else { //Done with the short dialogue
                        this.nodePointer = this.dialogueResult;
                        this.nodeResult = null;

                        this.dialoguePointer = null;
                        this.dialogueIndexPointer = null;

                        var curNode = this.nodes[this.nodePointer];
                        return curNode.choices;
                    }
                }
                else { //Pick a choice
                    this.nodePointer = null;
                    this.nodeResult = choice["resultNodeId"];

                    this.dialoguePointer = choice["dialogue"];
                    this.dialogueIndexPointer = 0;

                    var curDialogue = this.dialogues[this.dialoguePointer];

                    var dialogueAction = curDialogue["dialogueActions"][this.dialogueIndexPointer];
                    //Do something with the dialogue action

                    return curDialogue.text[this.dialogueIndexPointer - 1]; //Get the current one
                }
            }
        }

    });

    return Conversation;
});