
define(['character', 'exceptions', 'items', 'quests', "../../shared/js/gametypes"], function(Character, Exceptions, Items, Quests) {

    var Player = Character.extend({
        MAX_LEVEL: 10,

        init: function(id, name, kind) {
            this._super(id, kind);

            this.name = name;

            // Renderer
     		this.nameOffsetY = -10;

            // sprites
            this.setArmor(new Items.MailArmor(9999910, 1));
            //this.armorName = "mailarmor";

            this.setWeapon(new Items.GoldenSword(999999, 1));
            //this.weaponName = "goldensword";
            //this.equipWeapon(new Items.GoldenSword(503));

            this.inventory = [
                new Items.RedArmor(9739654, 1),
                new Items.Sword2(9999999, 1),
                new Items.BlueSword(5060000, 1),
                new Items.Sword1(9999999, 1),
                new Items.Sword1(9999999, 1)
            ];
            this.inventoryLimit = 30;
            this.completedQuestNames = [];
            this.inProgressQuestObjs = [];
            this.characterSkills = {
                level: 1,
                exp: 0,
                availableSkillPoints: 3,
                dexterity: 1, //Quick attacks, combos, and counter-attacks
                strength: 1, //Strong attacks and parry actions
                vitality: 1, //Health, defense
                ancientMagic: 1, //Mostly healing, bonuses, buffs, defenses, and shields
                humanMagic: 1, //Mostly attacks, attack strengthening, weaken and poison enemies
                bowsRanged: 1, //Normal bows, longbows, enchanted and natural weapons
                machineRanged: 1 //Compound bows, crossbow, siege machines, cannons, and other machines
            };
            this.gold = 250;

            // modes
            this.isLootMoving = false;
        },

        loot: function(item) {
            if(item) {
                if (item.itemKind === "gold") {
                    this.gold += item.count;
                    return;
                }
                else if (item.stackable) {
                    for (var i = 0; i < this.inventory.length; i++) {
                        var existingItem = this.inventory[i];
                        //Both items, the new and the match, must be stackable
                        //There are cases of the same item being both stackable and not stackable
                        //e.g. a unique variant of an item that is not stackable.
                        if (existingItem.itemKind === item.itemKind || existingItem.stackable) {
                            existingItem.count += item.count; //Note that item.count can be negative
                            if (existingItem.count <= 0) {
                                this.inventory.splice(i, 1);
                            }
                            else {
                                item.onLoot(this);
                            }
                            return;
                        }
                    }
                }

                if (this.inventory.length >= this.inventoryLimit) {
                    var msg = "Inventory full, cannot pick up: " + item.kind;
                    throw new Exceptions.LootException(msg);
                }
                else {
                    if (item.count <= 0) {
                        while (item.count !== 0) {
                            for (var i = this.inventory.length - 1; i >= 0; i--) {
                                var existingItem = this.inventory[i];
                                if (existingItem.itemKind === item.itemKind) {
                                    this.inventory.splice(i, 1);
                                    item.count++;
                                    break;
                                }
                            }
                        }
                    }
                    else {
                        log.info('Player '+this.id+' has looted '+item.id);
                        this.inventory.push(item);
                        item.onLoot(this);
                    }
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
            //this.weaponData = Types.WeaponData[this.weaponName];
        },

        getInventory: function() {return this.inventory;},

        setInventory: function(inventory) {this.inventory = inventory;},

        /**
        Return if the player can go through a recipe i.e. has all the required ingredients
        Memotized so this O(inventory + recipe) time and memory,
        as opposed to O(inventory * recipe) time, with a brute force search.
        */
        canUseRecipe: function(recipe) {
            var requirements = {};
            for (var i = 0; i < recipe.input.length; i++) {
                var reqName = recipe.input[i][0], reqAmount = recipe.input[i][1];
                requirements[reqName] = reqAmount;
            }
            for (var i = 0; i < this.inventory.length; i++) {
                var itemName = this.inventory[i]["itemKind"];
                var itemAmount = this.inventory[i]["count"];
                if (requirements[itemName]) requirements[itemName] -= itemAmount;
            }
            console.log(requirements);
            for (var i = 0; i < recipe.input.length; i++) {
                var reqName = recipe.input[i][0];
                if (requirements[reqName] > 0) { //There is still an ingredient need to be met
                    return false;
                }
            }
            return true;
        },

        useRecipe: function(recipe) {
            var requirements = {};
            for (var i = 0; i < recipe.input.length; i++) {
                var reqName = recipe.input[i][0], reqAmount = recipe.input[i][1];
                requirements[reqName] = reqAmount;
            }
            for (var i = this.inventory.length - 1; i >= 0; i--) {
                var itemName = this.inventory[i]["itemKind"];
                var itemAmount = this.inventory[i]["count"];
                if (requirements[itemName]) {
                    if (requirements[itemName] > 0) {
                        if (requirements[itemName] >= itemAmount) {
                            this.inventory.splice(i, 1);
                        }
                        else {
                            this.inventory[i].count -= itemAmount;
                        }
                        requirements[itemName] -= itemAmount;
                    }
                }
            }
            for (var i = 0; i < recipe.input.length; i++) {
                var reqName = recipe.input[i][0];
                if (requirements[reqName] > 0) { //There is still an ingredient need to be met
                    log.error("Could not execute valid recipe with missing ingredients");
                    return null;
                }
            }
            //Recipe was successful, award the player the results of the recipe
            /*
            for (var i = 0; i < recipe.output.length; i++) {
                var outputName = recipe.output[i][0];
                var outputAmount = recipe.output[i][1];
                var kind = Types.getKindFromString(outputName);
                var newItem = EntityFactory.createEntity(kind, 999, null);
                newItem.count = outputAmount;
                this.loot(newItem);
            }
            */
            return recipe.output;
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

        hasArmor: function() {
            return this.armorName !== null;
        },

        equipItem: function(inventoryIndex) {
            var item = this.inventory[inventoryIndex];
            if(item.type === "weapon") { //&& newWeaponName !== this.getWeaponName()) {
                this.inventory.splice(inventoryIndex, 1);

                if (this.getWeaponName() !== null) {
                    this.inventory.splice(inventoryIndex, 0, this.weapon); //Insert the item into the correct indexed slot i.e. the one the user clicked on
                }

                this.setWeapon(item);

                if(this.switch_callback) {
                    this.switch_callback(item);
                }
            }
            else if (item.type === "armor") {
                this.inventory.splice(inventoryIndex, 1);

                if (this.getSpriteName() !== null) {
                    this.inventory.splice(inventoryIndex, 0, this.armor);
                }

                this.setArmor(item);

                if(this.switch_callback) {
                    this.switch_callback(item);
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
