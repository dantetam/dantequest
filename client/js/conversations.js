
//Why does this have to be hardcoded?
define(['conversation',
        'text!../conversations/sorceress-blackhair.json'
        //'text!../conversations/sparks.json'], function() {
        ], function(Conversation) {

    //More of a convenience utility to format JSON properly
    var convertConvJsonToObj = function(convJson) {
        var dialogues = convJson["dialogues"];
        var nodes = convJson["nodes"];
        var startingDialogueId = convJson["startingDialogue"];
        var startingNodeId = convJson["startingNode"];
        var convObj = new Conversation(dialogues, nodes, startingDialogueId, startingNodeId);
        return convObj;
    };

    var Conversations = {};

    var doNotParseFirst = false;

    _.each(arguments, function(conversationJson) {
        if (!doNotParseFirst) {
            doNotParseFirst = true;
            return;
        }
        var conversation = JSON.parse(conversationJson); //Get raw JSON from file
        var convObj = convertConvJsonToObj(conversation); //Organize it into the _Conversation_ object
        Conversations[conversation.id] = convObj; //Set the conversation into a global table, indexed by npc-id
    });

    return Conversations;
});
