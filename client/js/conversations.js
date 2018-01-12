
define(['npc'], function(Npc) {

    var Conversations = {

        SorceressBlackhair: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.SORCERESS_BLACKHAIR, 1);
            }
        })

    };

    return Conversations;
});
