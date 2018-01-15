
//Why does this have to be hardcoded?
define(['quest',
        'text!../quests/free-the-princess.json'
        //'text!../conversations/sparks.json'], function() {
        ], function(Quest) {

    //More of a convenience utility to format JSON properly
    var convertQuestJsonToObj = function(questJson) {
        var name = questJson["name"];
        var stages = questJson["stages"];
        var startingStage = questJson["startingStage"];
        var listEndingStages = questJson["endingStages"];
        var questObj = new Quest(name, stages, startingStage, listEndingStages);
        return questObj;
    };

    var Quests = {};

    var doNotParseFirst = false;

    _.each(arguments, function(questJson) {
        if (!doNotParseFirst) {
            doNotParseFirst = true;
            return;
        }
        var quest = JSON.parse(questJson); //Get raw JSON from file
        var questObj = convertQuestJsonToObj(quest); //Organize it into the _Quest_ object
        Quests[quest.id] = questObj; //Set the quest into a global table, indexed by quest-id
    });

    return Quests;
});
