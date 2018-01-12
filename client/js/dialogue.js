/**
Dialogue represent single blocks of back and forth chat without user interaction.
Dialogues do not contain any higher-level abstraction related to _Conversation_.
*/

define(function() {

    var Dialogue = Class.extend({
        /**
        @param text            An array of text, in the format [{actor: "player", text: "What day is it today?"}, {actor: "villagegirl", text: "Tuesday."}, ...]
        @param dialogueActions An optional dictionary indicating actions to be taken, indexed by step
                                i.e. dict={0: foo} means foo() after completing dialogue index 0, -1 meaning immediately before starting convo
        */
        init: function(text, dialogueActions={}) {
    	    var self = this;

            this.text = text;
            this.dialogueActions = dialogueActions;
    	}

    });

    return Dialogue;
});
