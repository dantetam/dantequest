
define(['entity'], function(Entity) {

    var Item = Entity.extend({
        init: function(id, kind, type, stackable, count) {
            //Kind refers to the actual name; type is the much larger subclass
            //itemKind is a nice display string of the item's kind, the unique identifier
            this._super(id, kind);

            this.itemKind = Types.getKindAsString(kind);
    	    this.type = type;
    	    this.wasDropped = false;
            this.stackable = stackable;
            this.count = count;
        },

        clone: function() {
            return new Item(this.id, this.kind, this.type, this.stackable, this.count);
        },

        hasShadow: function() {
            return true;
        },

        //Original behavior: player loots weapon, wields best
        //Now: simply add the item to the player's inventory,
        //and do not check for conditions
        onLoot: function(player) {
            // @see player(client).loot()
            //console.log(player.inventory);
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
