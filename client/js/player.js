
define(['character', 'exceptions', 'items', 'quests'], function(Character, Exceptions, Items, Quests) {

    var Player = Character.extend({
        MAX_LEVEL: 10,

        init: function(id, name, kind) {
            this._super(id, kind);

            this.name = name;

            // Renderer
     		this.nameOffsetY = -10;

            // sprites
            this.armor = new Items.MailArmor(23);
            this.armorName = "mailarmor";

            this.weapon = new Items.GoldenSword(503);
            this.weaponName = "goldensword";

            this.inventory = [new Items.RedArmor(25), new Items.Sword2(501), new Items.BlueSword(506)];
            this.inventoryLimit = 30;
            this.completedQuestNames = [];
            this.inProgressQuestObjs = [];
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

        getArmorSprite: function() {
            if(this.invincible) {
                return this.currentArmorSprite;
            } else {
                return this.sprite;
            }
        },

        getSpriteName: function() {return this.armorName;},

        getArmor: function() {return this.armor;},

        setArmor: function(armor) {
            this.armor = armor;
            this.armorName = armor.itemKind;
        },

        switchArmorSprite: function(sprite) {
            this.sprite = sprite;
        },

        getWeaponName: function() {return this.weaponName;},

        getWeapon: function() {return this.weapon;},

        setWeapon: function(weaponObj) {
            this.weapon = weaponObj;
            this.weaponName = weaponObj.itemKind;
        },

        getInventory: function() {return this.inventory;},

        setInventory: function(inventory) {this.inventory = inventory;},

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

        getCompletedQuests: function() {
            return this.completedQuestNames;
        },

        setCompletedQuests: function(names) {
            this.completedQuestNames = names;
        },

        getInProgressQuests: function() {
            return this.inProgressQuestObjs;
        },

        setInProgressQuests: function(inProgressQuestObjs) {
            this.inProgressQuestObjs = inProgressQuestObjs;
        },

        startQuest: function(questName) {
            var questObj = Quests[questName];
            var questClone = new Quest(questObj.name, questObj.stages, questObj.startingStage, questObj.endingStages);
            this.inProgressQuestObjs.push(questClone);
            questClone.startQuest(this);
        },

        completeQuest: function(questName) {
            for (var i = 0; i < this.inProgressQuestObjs.length; i++) {
                var quest = this.inProgressQuestObjs[i];
                if (quest.name === questName) {
                    this.inProgressQuestObjs.splice(i, 1);
                    completedQuestNames.push(questName);
                    return;
                }
            }
            log.error("Could not find quest name to complete: " + questName);
        },

        hasWeapon: function() {
            return this.weaponName !== null;
        },

        equipItem: function(inventoryIndex) {
            console.log(inventoryIndex);
            var item = this.inventory[inventoryIndex];
            if(item.type === "weapon") { //&& newWeaponName !== this.getWeaponName()) {
                this.inventory.splice(inventoryIndex, 1);

                if (this.getWeaponName() !== null) {
                    this.inventory.push(this.weapon);
                }

                this.setWeapon(item);

                if(this.switch_callback) {
                    this.switch_callback();
                }
            }
            else if (item.type === "armor") {
                this.inventory.splice(inventoryIndex, 1);

                if (this.getSpriteName() !== null) {
                    this.inventory.push(this.armor);
                }

                this.setArmor(item);

                if(this.switch_callback) {
                    this.switch_callback();
                }
            }
        },

        onSwitchItem: function(callback) {
            this.switch_callback = callback;
        },

        onInvincible: function(callback) {
            this.invincible_callback = callback;
        }

        /* startInvincibility: function() {
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
        } */
    });

    return Player;
});
