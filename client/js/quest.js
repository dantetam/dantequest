
define(['player', 'items'], function(Player, Items) {

    var Quest = Class.extend({
        init: function(name, stages, startingStage, listEndingStages) {
    	    var self = this;

            this.name = name;
            this.stages = stages;
            this.startingStage = 0;
            this.listEndingStages = listEndingStages;

            this.currentStagePointer = null;
            this.curObjectives = null;
    	},

        startQuest: function(player) {
            this.currentStagePointer = this.startingStage;
            this.player = player;
            this.curObjectives = this._getCurrentObjectives();
        },

        /**
        Return the current set(s) of objectives, indexed by
        next stage id -> array of objectives, all of which must be completed within this stage.
        */
        _getCurrentObjectives: function() {
            if (this.currentStagePointer != null) {
                return this.stages[this.currentStagePointer]["stageTargets"];
            }
        },

        /**
        Find all the current sets of objectives,

        */
        checkActionToAdvanceQuest: function(actionType, actionData) {
            for (var questStageId in this.curObjectives) {
                var allObjectives = this.curObjectives[questStageId];
                for (var objective of allObjectives) {
                    if (objective["objType"] === actionType &&
                        objective["objData"] === actionData) {
                        objective["completed"] = true;
                    }
                }
            }
            for (var questStageId in this.curObjectives) {
                var allObjectives = this.curObjectives[questStageId];
                var thisStageCompleted = true;
                for (var objective of allObjectives) {
                    if (objective["completed"] === undefined) {
                        thisStageCompleted = false;
                        break;
                    }
                }
                //All objectives were completed
                if (thisStageCompleted) {
                    this.advanceToStageFromCur(questStageId);
                }
            }
        },

        /*objectiveCallback: function(objectiveJsonData, objCallback) {
            //TODO: Create a set of callbacks that activate upon completing the objective,
            //executes the stageEnter/stageExit events,
            //and moves to the correct next stage.
            return function() {

            };
        },*/

        /**
        The encapsulated method for advancing from the current stage (this.currentStagePointer)
        to another stage, ideally a stage target.

        This evaluates many possible callbacks:

        upon leaving stage t, call t::onStageEnd();
        //removed from quests JSON -> upon moving to stage t -> t+1, call t["target"]::uniqueStageEffect();
        upon moving into stage t+1 officially, call (t+1)::onStageStart().
        */
        advanceToStageFromCur: function(nextStage) {
            if (this.currentStagePointer != null) {
                var stage = this.stages[this.currentStagePointer];

                if (stage != null && stage.hasOwnProperty("onStageEnd")) {
                    var stageEndData = stage["onStageEnd"];
                    if (stageEndData !== "") {
                        var callback = parseActionEffect(stageEndData);
                        callback();
                    }
                }
            }

            this.currentStagePointer = "" + nextStage;
            this.curObjectives = this._getCurrentObjectives();

            var stage = this.stages[this.currentStagePointer];

            if (stage != null && stage.hasOwnProperty("onStageStart")) {
                var stageStart = stage["onStageStart"];
                if (stageEndData !== "") {
                    var callback = parseActionEffect(stageStart);
                    callback();
                }
            }
        },

        //Return callback for a jsonData action/effect intended to be used for stagestart/end
        parseActionEffect: function(jsonData) {
            if (jsonData === "") return null;
            var action = jsonData["action"];
            if (action === "teleport") {
                return function() {

                };
            }
            else if (action === "give") {
                return function() {

                };
            }
            else if (action === "message") {
                return function() {

                };
            }
            log.error("Invalid action in quests JSON: " + jsonData);
            return null;
        }

    });

    return Quest;

});
