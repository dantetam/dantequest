
define(['character', 'items'], function(Character, Items) {

    var Quest = Class.extend({
        init: function(name, stages, startingStage, listEndingStages) {
    	    var self = this;

            this.name = name;
            this.stages = stages;
            this.startingStage = 0;
            this.listEndingStages = listEndingStages;

            this.currentStagePointer = null;
            this.curObjectiveCallback = null;
    	},

        startQuest: function(player) {
            this.currentStagePointer = this.startingStage;
            this.player = player;
        },

        objectiveCallback: function(stage) {
            //TODO: Create a callback that activates upon completing the objective,
            //executes the stageEnter/stageExit events,
            //and moves to the correct next stage.
        }

    });

    return Quest;

});
