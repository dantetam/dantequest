
define(['item'], function(Item) {

    var Items = {

        Sword2: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.SWORD2, "weapon");
                this.lootMessage = "You pick up a steel sword.";
            },
        }),

        Axe: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.AXE, "weapon");
                this.lootMessage = "You pick up an axe.";
            },
        }),

        RedSword: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.REDSWORD, "weapon");
                this.lootMessage = "You pick up a blazing sword.";
            },
        }),

        BlueSword: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.BLUESWORD, "weapon");
                this.lootMessage = "You pick up a magic sword.";
            },
        }),

        GoldenSword: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.GOLDENSWORD, "weapon");
                this.lootMessage = "You pick up the ultimate sword.";
            },
        }),

        MorningStar: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.MORNINGSTAR, "weapon");
                this.lootMessage = "You pick up a morning star.";
            },
        }),

        LeatherArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.LEATHERARMOR, "armor");
                this.lootMessage = "You pick up a set of leather armor.";
            },
        }),

        MailArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.MAILARMOR, "armor");
                this.lootMessage = "You pick up a set of mail armor.";
            },
        }),

        PlateArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.PLATEARMOR, "armor");
                this.lootMessage = "You pick up a set of plate armor.";
            },
        }),

        RedArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.REDARMOR, "armor");
                this.lootMessage = "You pick up a set of ruby armor.";
            },
        }),

        GoldenArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.GOLDENARMOR, "armor");
                this.lootMessage = "You pick up a set of golden armor.";
            },
        }),

        Flask: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.FLASK, "object");
                this.lootMessage = "You loot a health potion.";
            },
        }),

        Cake: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.CAKE, "object");
                this.lootMessage = "You pick up a cake.";
            },
        }),

        Burger: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.BURGER, "object");
                this.lootMessage = "You find a burger.";
            },
        }),

        FirePotion: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.FIREPOTION, "object");
                this.lootMessage = "You feel the power of Firefox!";
            },

            onLoot: function(player) {
                player.startInvincibility();
            },
        }),
    };

    return Items;
});
