
define(['item'], function(Item) {

    var Items = {

        Sword1: Item.extend({
            init: function(id, count) {
                this._super(id, Types.Entities.SWORD1, "weapon", false, count);
                this.lootMessage = "You pick up an iron sword.";
            },
        }),

        Sword2: Item.extend({
            init: function(id, count) {
                this._super(id, Types.Entities.SWORD2, "weapon", false, count);
                this.lootMessage = "You pick up a steel sword.";
            },
        }),

        Axe: Item.extend({
            init: function(id, count) {
                this._super(id, Types.Entities.AXE, "weapon", false, count);
                this.lootMessage = "You pick up an axe.";
            },
        }),

        RedSword: Item.extend({
            init: function(id, count) {
                this._super(id, Types.Entities.REDSWORD, "weapon", false, count);
                this.lootMessage = "You pick up a blazing sword.";
            },
        }),

        BlueSword: Item.extend({
            init: function(id, count) {
                this._super(id, Types.Entities.BLUESWORD, "weapon", false, count);
                this.lootMessage = "You pick up a magic sword.";
            },
        }),

        GoldenSword: Item.extend({
            init: function(id, count) {
                this._super(id, Types.Entities.GOLDENSWORD, "weapon", false, count);
                this.lootMessage = "You pick up the ultimate sword.";
            },
        }),

        MorningStar: Item.extend({
            init: function(id, count) {
                this._super(id, Types.Entities.MORNINGSTAR, "weapon", false, count);
                this.lootMessage = "You pick up a morning star.";
            },
        }),

        LeatherArmor: Item.extend({
            init: function(id, count) {
                this._super(id, Types.Entities.LEATHERARMOR, "armor", false, count);
                this.lootMessage = "You pick up a set of leather armor.";
            },
        }),

        MailArmor: Item.extend({
            init: function(id, count) {
                this._super(id, Types.Entities.MAILARMOR, "armor", false, count);
                this.lootMessage = "You pick up a set of mail armor.";
            },
        }),

        PlateArmor: Item.extend({
            init: function(id, count) {
                this._super(id, Types.Entities.PLATEARMOR, "armor", false, count);
                this.lootMessage = "You pick up a set of plate armor.";
            },
        }),

        RedArmor: Item.extend({
            init: function(id, count) {
                this._super(id, Types.Entities.REDARMOR, "armor", false, count);
                this.lootMessage = "You pick up a set of ruby armor.";
            },
        }),

        GoldenArmor: Item.extend({
            init: function(id, count) {
                this._super(id, Types.Entities.GOLDENARMOR, "armor", false, count);
                this.lootMessage = "You pick up a set of golden armor.";
            },
        }),

        Flask: Item.extend({
            init: function(id, count) {
                this._super(id, Types.Entities.FLASK, "object", true, count);
                this.lootMessage = "You loot a health potion.";
            },
        }),

        Gold: Item.extend({
            init: function(id, count) {
                this._super(id, Types.Entities.GOLD, "object", true, count);
                this.lootMessage = "You loot " + count + " gold.";
            },
        }),

        Cake: Item.extend({
            init: function(id, count) {
                this._super(id, Types.Entities.CAKE, "object", false, count);
                this.lootMessage = "You pick up a cake.";
            },
        }),

        Burger: Item.extend({
            init: function(id, count) {
                this._super(id, Types.Entities.BURGER, "object", false, count);
                this.lootMessage = "You find a burger.";
            },
        }),

        FirePotion: Item.extend({
            init: function(id, count) {
                this._super(id, Types.Entities.FIREPOTION, "object", false, count);
                this.lootMessage = "REDACTED";
            },

            onLoot: function(player) {
                //player.startInvincibility();
            },
        }),
    };

    return Items;
});
