
define(function() {

    var Quest = Class.extend({
        init: function(name, stages, startingStage, listEndingStages) {
    	    var self = this;

            this.name = name;
            this.stages = stages;
            this.startingStage = 0;
            this.listEndingStages = listEndingStages;

            this.currentStagePointer = null;
    	},

        startQuest: function() {
            this.currentStagePointer = this.startingStage;
        }


    });

    return Quest;
});
