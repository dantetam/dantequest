/**
Nodes contain the possible choices that a player can make.
*/


define(function() {

    var ConversationNode = Class.extend({
        /**
        @param choices An array of choice dictionaries, as such
                    {
                        dialogue: An integer representing the index of the dialogue to go to,
                        resultNodeId: The final result i.e. the id of the node to go to. -1 signifies end of conversation.
                    }
        */
        init: function(nodeId, choices) {
    	    var self = this;

            this.id = nodeId;
            this.choices = choices;
    	}

    });

    return ConversationNode;
});
