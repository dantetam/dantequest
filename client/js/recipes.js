
//Why does this have to be hardcoded?
define(['recipe',
        'text!../recipes/player-crafting.json'
        //'text!../conversations/sparks.json'], function() {
        ], function(Recipe) {

    //More of a convenience utility to format JSON properly
    var convertRecipeJsonToObj = function(recipeData) {
        var id = recipeData["id"];
        var displayText = recipeData["displayText"];
        var input = recipeData["input"];
        var output = recipeData["output"];
        var recipe = new Recipe(id, displayText, input, output);
        return recipe;
    };

    var Recipes = {};

    var doNotParseFirst = false;

    _.each(arguments, function(recipeText) {
        if (!doNotParseFirst) {
            doNotParseFirst = true;
            return;
        }
        var recipeJson = JSON.parse(recipeText); //Get raw JSON from file
        var groupId = recipeJson["id"], recipes = recipeJson["recipes"]
        Recipes[groupId] = [];

        for (var i = 0; i < recipes.length; i++) {
            var recipe = recipes[i];
            var recipeObj = convertRecipeJsonToObj(recipe); //Organize it into the _Conversation_ object
            Recipes[groupId].push(recipeObj); //Set the conversation into a global table, indexed by npc-id
        }
    });

    console.log(Recipes);

    return Recipes;
});
