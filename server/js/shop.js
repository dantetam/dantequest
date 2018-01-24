var Utils = require('./utils'),
    Types = require("../../shared/js/gametypes");

module.exports = Shop = Class.extend({
    init: function() {
        this.items = [];
        this.gold = 0;
    },

    setShopItems: function(items, gold) {
        this.items = items;
        this.gold = gold;
        this.setPrices();
    },

    addShopItem: function(item) {
        if (item.itemKind === "gold") {
            this.gold += item.count;
        }
        else if (item.stackable) {
            for (var i = 0; i < this.items.length; i++) {
                var existingItem = this.items[i];
                if (existingItem.itemKind === item.itemKind || existingItem.stackable) {
                    existingItem.count += item.count;
                    return;
                }
            }
        }
        else {
            this.items.push(item);
        }
    },

    setPrices: function() {
        this.prices = {};
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            var name = Types.getKindAsString(item);
            this.prices[name] = Types.getValueOfItem(item);
        }
    },

    sellItemToPlayer: function(player, itemIndex, count) {
        var shopItem = this.items[itemIndex];
        if (count > item.count) count = item.count;

        var name = Types.getKindAsString(item);
        var value = this.prices[name] * count;
        if (player.gold >= value) {
            player.gold -= value;
            var product = shopItem.clone();
            product.count = count;
            player.loot(product);

            if (count === shopItem.count) {
                this.splice(itemIndex, 1);
            }
            else {
                shopItem.count -= count;
            }
        }
    },

    purchaseItemFromPlayer: function(player, inventoryIndex, count) {
        var playerItem = player.inventory[inventoryIndex];
        if (count > item.count) count = item.count;

        var name = Types.getKindAsString(item);
        var value = this.prices[name] * count;
        if (this.gold >= value) {
            this.gold -= value;
            var product = playerItem.clone();
            product.count = count;
            this.addShopItem(product);

            if (count === playerItem.count) {
                player.inventory.splice(itemIndex, 1);
            }
            else {
                playerItem.count -= count;
            }
        }
    }

});
