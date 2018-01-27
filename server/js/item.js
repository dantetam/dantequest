var Types = require("../../shared/js/gametypes");

module.exports = Item = Entity.extend({
    init: function(id, kind, x, y, count) {
        this._super(id, "item", kind, x, y);
        this.itemDisplayName = Types.getKindAsString(kind);
        this.isStatic = false;
        this.isFromChest = false;
        this.count = count || 1;
    },

    handleDespawn: function(params) {
        var self = this;

        this.blinkTimeout = setTimeout(function() {
            params.blinkCallback();
            self.despawnTimeout = setTimeout(params.despawnCallback, params.blinkingDuration);
        }, params.beforeBlinkDelay);
    },

    destroy: function() {
        if(this.blinkTimeout) {
            clearTimeout(this.blinkTimeout);
        }
        if(this.despawnTimeout) {
            clearTimeout(this.despawnTimeout);
        }

        if(this.isStatic) {
            this.scheduleRespawn(30000);
        }
    },

    scheduleRespawn: function(delay) {
        var self = this;
        setTimeout(function() {
            if(self.respawn_callback) {
                self.respawn_callback();
            }
        }, delay);
    },

    onRespawn: function(callback) {
        this.respawn_callback = callback;
    }
});
