/**
*/

define(["../../shared/js/gametypes"], function() {

    var Recipe = Class.extend({

        init: function(id, displayText, input, output) {
            console.log(Types);
            this.id = id;
            this.displayText = displayText;
            this.input = input;
            this.output = output;
    	}

    });

    return Recipe;
});
