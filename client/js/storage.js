
define(function() {

    var Storage = Class.extend({
        init: function() {
            if(this.hasLocalStorage() && localStorage.data) {
                this.data = JSON.parse(localStorage.data);
            } else {
                this.resetData();
            }
        },

        resetData: function() {
            this.data = {
                hasAlreadyPlayed: false,
                player: {
                    name: "",
                    weapon: "",
                    armor: "",
                    inventory: [],
                    characterSkills: {
                        level: 1,
                        exp: 0,
                        dexterity: 1, //Quick attacks, combos, and counter-attacks
                        strength: 1, //Strong attacks and parry actions
                        vitality: 1, //Health, defense
                        ancientMagic: 1, //Mostly healing, bonuses, buffs, defenses, and shields
                        humanMagic: 1, //Mostly attacks, attack strengthening, weaken and poison enemies
                        bowsRanged: 1, //Normal bows, longbows, enchanted and natural weapons
                        machineRanged: 1 //
                    },
                    image: ""
                },
                achievements: {
                    unlocked: [],
                    ratCount: 0,
                    skeletonCount: 0,
                    totalKills: 0,
                    totalDmg: 0,
                    totalRevives: 0
                }
            };
        },

        hasLocalStorage: function() {
            return Modernizr.localstorage;
        },

        save: function() {
            if(this.hasLocalStorage()) {
                localStorage.data = JSON.stringify(this.data);
            }
        },

        clear: function() {
            if(this.hasLocalStorage()) {
                localStorage.data = "";
                this.resetData();
            }
        },

        // Player

        hasAlreadyPlayed: function() {
            return this.data.hasAlreadyPlayed;
        },

        initPlayer: function(name) {
            this.data.hasAlreadyPlayed = true;
            this.setPlayerName(name);
        },

        setPlayerName: function(name) {
            this.data.player.name = name;
            this.save();
        },

        setPlayerImage: function(img) {
            this.data.player.image = img;
            this.save();
        },

        setPlayerArmor: function(armor) {
            this.data.player.armor = armor;
            this.save();
        },

        setPlayerWeapon: function(weapon) {
            this.data.player.weapon = weapon;
            this.save();
        },

        setPlayerInventory: function(inventory) {
            this.data.player.inventory = inventory;
            this.save();
        },

        setPlayerCharSkills: function(skills) {
            this.data.player.characterSkills = skills;
        },

        setPlayerGold: function(gold) {
            this.data.player.setGold(gold);
        },

        savePlayer: function(img, armor, weapon, inventory, skills, gold) {
            this.setPlayerImage(img);
            this.setPlayerArmor(armor);
            this.setPlayerWeapon(weapon);
            this.setPlayerInventory(inventory);
            this.setPlayerCharSkills(skills);
            this.setPlayerGold(gold);
        },

        // Achievements

        hasUnlockedAchievement: function(id) {
            return _.include(this.data.achievements.unlocked, id);
        },

        unlockAchievement: function(id) {
            if(!this.hasUnlockedAchievement(id)) {
                this.data.achievements.unlocked.push(id);
                this.save();
                return true;
            }
            return false;
        },

        getAchievementCount: function() {
            return _.size(this.data.achievements.unlocked);
        },

        // Angry rats
        getRatCount: function() {
            return this.data.achievements.ratCount;
        },

        incrementRatCount: function() {
            if(this.data.achievements.ratCount < 10) {
                this.data.achievements.ratCount++;
                this.save();
            }
        },

        // Skull Collector
        getSkeletonCount: function() {
            return this.data.achievements.skeletonCount;
        },

        incrementSkeletonCount: function() {
            if(this.data.achievements.skeletonCount < 10) {
                this.data.achievements.skeletonCount++;
                this.save();
            }
        },

        // Meatshield
        getTotalDamageTaken: function() {
            return this.data.achievements.totalDmg;
        },

        addDamage: function(damage) {
            if(this.data.achievements.totalDmg < 5000) {
                this.data.achievements.totalDmg += damage;
                this.save();
            }
        },

        // Hunter
        getTotalKills: function() {
            return this.data.achievements.totalKills;
        },

        incrementTotalKills: function() {
            if(this.data.achievements.totalKills < 50) {
                this.data.achievements.totalKills++;
                this.save();
            }
        },

        // Still Alive
        getTotalRevives: function() {
            return this.data.achievements.totalRevives;
        },

        incrementRevives: function() {
            if(this.data.achievements.totalRevives < 5) {
                this.data.achievements.totalRevives++;
                this.save();
            }
        },
    });

    return Storage;
});
