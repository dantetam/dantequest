
function convertConvJsonToObj(convObj) {

}

//Why does this have to be hardcoded?
define(['text!../conversations/sorceress-blackhair.json'
        //'text!../conversations/sparks.json'], function() {
        ], function() {

    var Conversations = {};

    _.each(arguments, function(conversationJson) {
        var conversation = JSON.parse(conversationJson);

        Conversations[conversation.id] = conversation;
    });

    return Conversations;
});
