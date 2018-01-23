var Utils = require('./utils'),
    Types = require("../../shared/js/gametypes");

module.exports = Shop = Item.extend({
    init: function(id, x, y) {
        this.items = [];
        this.gold = 0;
    },

    setShopItems: function(items, gold) {
        this.items = items;
        this.gold = gold;
        this.setPrices();
    },

    setPrices: function() {
        this.prices = {};
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            var name = Types.getKindAsString(item);
            this.prices[name] = Types.getValueOfItem(item);
        }
    },

    sellItemToPlayer: function(itemIndex, count) {
        var shopItem = this.items[itemIndex];
        if (count > item.count) count = item.count;

        var name = Types.getKindAsString(item);
        var value = this.prices[name] * count;
        if (player.gold >= value) {
            player.gold -= value;
            var product = item.clone();
            product.count = count;
            player.loot(shopItem.clone());

            if (count === shopItem.count) {
                this.splice(itemIndex, 1);
            }
            else {
                shopItem.count -= count;
            }
        }
    },

});
