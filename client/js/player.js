
define(['character', 'exceptions', 'items'], function(Character, Exceptions, Items) {

    var Player = Character.extend({
        MAX_LEVEL: 10,

        init: function(id, name, kind) {
            this._super(id, kind);

            this.name = name;

            // Renderer
     		this.nameOffsetY = -10;

            // sprites
            this.spriteName = "clotharmor";
            this.weapon = new Items.GoldenSword(503);
            this.weaponName = "goldensword";
            this.inventory = [];
            this.inventoryLimit = 30;
            this.characterSkills = {
                level: 1,
                exp: 0,
                dexterity: 1, //Quick attacks, combos, and counter-attacks
                strength: 1, //Strong attacks and parry actions
                vitality: 1, //Health, defense
                ancientMagic: 1, //Mostly healing, bonuses, buffs, defenses, and shields
                humanMagic: 1, //Mostly attacks, attack strengthening, weaken and poison enemies
                bowsRanged: 1, //Normal bows, longbows, enchanted and natural weapons
                machineRanged: 1 //Compound bows, crossbow, siege machines, cannons, and other machines
            };
            this.gold = 0;

            // modes
            this.isLootMoving = false;
        },

        loot: function(item) {
            if(item) {
                var rank, currentRank, msg, currentArmorName;

                if(this.currentArmorSprite) {
                    currentArmorName = this.currentArmorSprite.name;
                } else {
                    currentArmorName = this.spriteName;
                }

                if(item.type === "armor") {
                    rank = Types.getArmorRank(item.kind);
                    currentRank = Types.getArmorRank(Types.getKindFromString(currentArmorName));
                } else if(item.type === "weapon") {
                    rank = Types.getWeaponRank(item.kind);
                    currentRank = Types.getWeaponRank(Types.getKindFromString(this.weaponName));
                }

                msg = "Inventory full, cannot pick up: " + item.kind;

                if (this.inventory.length >= this.inventoryLimit) {
                    throw new Exceptions.LootException(msg);
                }
                else {
                    log.info('Player '+this.id+' has looted '+item.id);
                    if(Types.isArmor(item.kind) && this.invincible) {
                        this.stopInvincibility();
                    }
                    item.onLoot(this);
                }


            }
        },

        /**
         * Returns true if the character is currently walking towards an item in order to loot it.
         */
        isMovingToLoot: function() {
            return this.isLootMoving;
        },

        getSpriteName: function() {
            return this.spriteName;
        },

        setSpriteName: function(name) {
            this.spriteName = name;
        },

        getArmorName: function() {
            var sprite = this.getArmorSprite();
            return sprite.id;
        },

        getArmorSprite: function() {
            if(this.invincible) {
                return this.currentArmorSprite;
            } else {
                return this.sprite;
            }
        },

        getWeaponName: function() {
            return this.weaponName;
        },

        setWeapon: function(weaponObj) {
            this.weapon = weaponObj;
            this.weaponName = weaponObj.itemKind;
        },

        getInventory: function() {
            return this.inventory;
        },

        setInventory: function(inventory) {
            this.inventory = inventory;
        },

        getCharacterSkills: function() {
            return this.characterSkills;
        },

        /*

        */
        setCharacterSkills: function(skills) {
            this.characterSkills = skills;
        },

        getGold: function() {
            return this.gold;
        },

        setGold: function(gold) {
            this.gold = gold;
        },

        hasWeapon: function() {
            return this.weaponName !== null;
        },

        equipWeapon: function(inventoryIndex) {
            //this.inventory.
            var item = this.inventory[inventoryIndex];
            if(item.type === "weapon") { //&& newWeaponName !== this.getWeaponName()) {
                //this.inventory = _.without(this.inventory, _.findWhere(this.inventory, {itemKind: newWeaponName}));
                this.inventory.splice(inventoryIndex, 1);

                if (this.getWeaponName() !== null) {
                    console.log(this.weapon);
                    this.inventory.push(this.weapon);
                }

                this.setWeapon(item);

                if(this.switch_callback) {
                    this.switch_callback();
                }
            }
        },

        switchArmor: function(newArmorSprite) {
            if(newArmorSprite && newArmorSprite.id !== this.getSpriteName()) {
                self.setSprite(newArmorSprite);
                self.setSpriteName(newArmorSprite.id);

                if(self.switch_callback) {
                    self.switch_callback();
                }
            }
        },

        onArmorLoot: function(callback) {
            this.armorloot_callback = callback;
        },

        onSwitchItem: function(callback) {
            this.switch_callback = callback;
        },

        onInvincible: function(callback) {
            this.invincible_callback = callback;
        },

        startInvincibility: function() {
            var self = this;

            if(!this.invincible) {
                this.currentArmorSprite = this.getSprite();
                this.invincible = true;
                this.invincible_callback();
            } else {
                // If the player already has invincibility, just reset its duration.
                if(this.invincibleTimeout) {
                    clearTimeout(this.invincibleTimeout);
                }
            }

            this.invincibleTimeout = setTimeout(function() {
                self.stopInvincibility();
                self.idle();
            }, 15000);
        },

        stopInvincibility: function() {
            this.invincible_callback();
            this.invincible = false;

            if(this.currentArmorSprite) {
                this.setSprite(this.currentArmorSprite);
                this.setSpriteName(this.currentArmorSprite.id);
                this.currentArmorSprite = null;
            }
            if(this.invincibleTimeout) {
                clearTimeout(this.invincibleTimeout);
            }
        }
    });

    return Player;
});
