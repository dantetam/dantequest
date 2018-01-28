var Utils = require('./utils'),
    Types = require("../../shared/js/gametypes");

module.exports = Shop = Class.extend({
    init: function(name) {
        this.name = name;
        this.items = [];
        this.gold = 0;
    },

    setShopItems: function(items, gold) {
        this.items = items;
        this.gold = gold;
        this.setPrices();
    },

    addItemToShopInventory: function(item) {
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
            var name = item.itemDisplayName;
            this.prices[name] = Types.getValueOfItem(item);
        }
    },

    determineValueFromIndex: function(itemIndex, count) {
        var shopItem = this.items[itemIndex];
        if (count > shopItem.count) count = shopItem.count;
        var name = shopItem.itemDisplayName; //Types.getKindAsString(shopItem);
        return this.determineValueFromName(name, count);
    },

    determineValueFromName: function(name, count) {
        if (!this.prices.hasOwnProperty(name)) {
            this.prices[name] = Types.getValueOfItem(Types.getKindFromString(name));
        }
        console.log(this.prices[name] + " " + name + " " + count);
        var value = this.prices[name] * count;
        return value;
    },

    /**
    Attempt to sell an item to the player, server side.
    If the player has enough money on the server, complete the transaction

    @param playerGold The amount of gold the player has on client
    @param itemIndex  The index of the item within the shop's inventory, that the player wants
    @param count      The desired amount the player wants to purchase

    @return Whether or not the transaction is valid (implies also that the transaction has started server side)
    */
    sellItemToPlayer: function(playerGold, itemIndex, count) {
        var value = this.determineValueFromIndex(itemIndex, count);
        var shopItem = this.items[itemIndex];
        if (playerGold >= value) {
            this.gold += value;
            if (count === shopItem.count) {
                this.items.splice(itemIndex, 1);
            }
            else {
                shopItem.count -= count;
            }
            return true;
        }
        return false;
    },

    /**
    Attempt to sell an item to the player, server side.
    If the player has enough money on the server, complete the transaction

    @param playerGold The amount of gold the player has on client
    @param itemIndex  The index of the item within the shop's inventory, that the player wants
    @param count      The desired amount the player wants to purchase

    @return Whether or not the transaction is valid (implies also that the transaction has started server side)
    */
    purchaseItemFromPlayer: function(itemName, count) {
        var value = this.determineValueFromName(itemName, count); //Complete the rest of the transaction client side (guaranteed to be valid)
        if (this.gold >= value) {
            this.gold -= value;
            return true;
        }
        return false;
    }

});
