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

    /**
    Attempt to sell an item to the player, server side.
    If the player has enough money on the server, complete the transaction

    @param player    The server player object
    @param itemIndex The index of the item within the shop's inventory, that the player wants
    @param count     The desired amount the player wants to purchase

    @return Whether or not the transaction is valid (implies also that the transaction has started server side)
    */
    sellItemToPlayer: function(player, itemIndex, count) {
        var shopItem = this.items[itemIndex];
        if (count > shopItem.count) count = shopItem.count;

        var name = shopItem.itemDisplayName; //Types.getKindAsString(shopItem);
        var value = this.prices[name] * count;
        if (player.gold >= value) {
            player.gold -= value; //handle it server side
            this.gold += value;
            //var product = shopItem.clone();
            //product.count = count;
            //player.loot(product);

            if (count === shopItem.count) {
                this.items.splice(itemIndex, 1);
            }
            else {
                shopItem.count -= count;
            }
            return true;
        }
    },

    purchaseItemFromPlayer: function(player, inventoryIndex, count) {
        var playerItem = player.inventory[inventoryIndex];
        if (count > playerItem.count) count = playerItem.count;

        var name = playerItem.itemDisplayName;
        var value = this.prices[name] * count;
        if (this.gold >= value) {
            this.gold -= value;
            player.gold += value; //handle it server side
            //var product = playerItem.clone();
            //product.count = count;
            //this.addItemToShopInventory(product);

            if (count === playerItem.count) {
                player.inventory.splice(inventoryIndex, 1);
            }
            else {
                playerItem.count -= count;
            }
        }
    }

});
