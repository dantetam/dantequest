
define(['entity'], function(Entity) {

    var Item = Entity.extend({
        init: function(id, kind, type) {
    	    this._super(id, kind);

            this.itemKind = Types.getKindAsString(kind);
    	    this.type = type;
    	    this.wasDropped = false;
        },

        hasShadow: function() {
            return true;
        },

        //Original behavior: player loots weapon, wields best
        //Now: simply add the item to the player's inventory,
        //and do not check for conditions
        onLoot: function(player) {
            /*
            if(this.type === "weapon") {
                //player.switchWeapon(this.itemKind);
            }
            else if(this.type === "armor") {
                //player.armorloot_callback(this.itemKind);
            }
            */
            player.inventory.push(this);
        },

        getSpriteName: function() {
            return "item-"+ this.itemKind;
        },

        getLootMessage: function() {
            return this.lootMessage;
        }
    });

    return Item;
});
