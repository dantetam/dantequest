
define(function() {

    var Quest = Class.extend({
        init: function(id, name) {
    	    var self = this;

            this.name = name;
            this.startingStage = 0;
    	},

    	setName: function(name) {
    		this.name = name;
    	}

    });

    return Quest;
});
