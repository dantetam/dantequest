
Types = {
    Messages: {
        HELLO: 0,
        WELCOME: 1,
        SPAWN: 2,
        DESPAWN: 3,
        MOVE: 4,
        LOOTMOVE: 5,
        AGGRO: 6,
        ATTACK: 7,
        HIT: 8,
        HURT: 9,
        HEALTH: 10,
        CHAT: 11,
        LOOT: 12,
        EQUIP: 13,
        DROP: 14,
        TELEPORT: 15,
        DAMAGE: 16,
        POPULATION: 17,
        KILL: 18,
        LIST: 19,
        WHO: 20,
        ZONE: 21,
        DESTROY: 22,
        HP: 23,
        BLINK: 24,
        OPEN: 25,
        CHECK: 26,
        STATS_UPDATE: 27,
        LEVEL_UPDATE: 28,
        OPEN_SHOP: 29,
        BUY_ITEM_FROM_SHOP: 30,
        SHOP_TRANSACTION: 31,
        SELL_ITEM_TO_SHOP: 32,
        SKILL_POINTS_UPDATE: 33
    },

    Entities: {
        WARRIOR: 1,

        // Mobs
        RAT: 2,
        SKELETON: 3,
        GOBLIN: 4,
        OGRE: 5,
        SPECTRE: 6,
        CRAB: 7,
        BAT: 8,
        WIZARD: 9,
        EYE: 10,
        SNAKE: 11,
        SKELETON2: 12,
        BOSS: 13,
        DEATHKNIGHT: 14,
        EVIL_TREE: 15,

        // Objects
        FLASK: 35,
        BURGER: 36,
        CHEST: 37,
        FIREPOTION: 38,
        CAKE: 39,

        // Foods
        BREAD: 50,
        VEGGIE_SOUP: 51,
        EGG: 52,
        STEAK: 53,

        //Other consumables
        DEXTERITY_POTION: 80,
        STRENGTH_POTION: 81,
        BLOOD_POTION: 82,
        SPEED_POTION: 83,

        //Raw organic resources
        PINE_WOOD: 100,
        OAK_WOOD: 101,
        RED_WOOD: 102,
        MAPLE_WOOD: 103,
        ROSE_WOOD: 104,
        IRON_WOOD: 105,

        //Raw mineral/rock resources
        GLASS: 150,
        STONE: 151,
        SAND: 152,
        DARK_IRON: 153,
        ILLUSTRIAN: 154,
        BLOOD_STONE: 155,
        DANTEAN: 156,

        IRON_ORE: 170,
        COKE: 171,

        //Processed resources/intermediate products
        IRON_BAR: 172,
        STEEL_BAR: 173,
        SAND_STEEL_BAR: 174,
        BLACK_STEEL_BAR: 175,
        BRIGHT_STEEL_BAR: 176,
        RED_STEEL_BAR: 177,
        LEGENDARY_STEEL_BAR: 178,
        GOLD_BAR: 179,

        GOLD: 999,

        // NPCs
        GUARD: 1040,
        KING: 1041,
        OCTOCAT: 1042,
        VILLAGEGIRL: 1043,
        VILLAGER: 1044,
        PRIEST: 1045,
        SCIENTIST: 1046,
        AGENT: 1047,
        RICK: 1048,
        NYAN: 1049,
        SORCERER: 1050,
        BEACHNPC: 1051,
        FORESTNPC: 1052,
        DESERTNPC: 1053,
        LAVANPC: 1054,
        CODER: 1055,
        SORCERESS_BLACKHAIR: 1056,
        ANNOYING_KNIGHT: 1057,
        CHACHIE_THE_SUITOR: 1058,
        PRINCESS_PENELOPE: 1059,

        // Armors
        FIREFOX: 400,
        CLOTHARMOR: 401,
        LEATHERARMOR: 402,
        MAILARMOR: 403,
        PLATEARMOR: 404,
        REDARMOR: 405,
        GOLDENARMOR: 406,

        // Weapons
        SWORD1: 500,
        SWORD2: 501,
        REDSWORD: 502,
        GOLDENSWORD: 503,
        MORNINGSTAR: 504,
        AXE: 505,
        BLUESWORD: 506
    },

    Orientations: {
        UP: 1,
        DOWN: 2,
        LEFT: 3,
        RIGHT: 4
    },

    EnemyData: {
        dummy: {
            drops: {
            },
            hp: 80,
            level: 1,
            expOnKill: 10,
            respawnTime: 8000,
            defenseStats: {
                quickAtkDef: 0,
                strongAtkDef: 0,
                humanMagicDef: 0,
                ancientMagicDef: 0
            },
            offenseStats: {
                quickDmgBase: 0,
                quickDmgVar: 0,
                strongDmgBase: 0,
                strongDmgVar: 0,
            }
        },

        rat: {
            drops: {
                flask: 40,
                burger: 10,
                firepotion: 5,
                gold: [20, 5] //percentage, amount
            },
            hp: 25,
            level: 1,
            expOnKill: 10,
            defenseStats: {
                quickAtkDef: 5,
                strongAtkDef: 2,
                humanMagicDef: 1,
                ancientMagicDef: 1
            },
            offenseStats: {
                quickDmgBase: 4,
                quickDmgVar: 2,
                strongDmgBase: 4,
                strongDmgVar: 4,
            }
        },

        skeleton: {
            drops: {
                flask: 40,
                mailarmor: 10,
                axe: 20,
                firepotion: 5
            },
            hp: 110,
            level: 2,
            expOnKill: 21,
            defenseStats: { //Multiply these stats by ceil(level / 10)
                quickAtkDef: 5,
                strongAtkDef: 2,
                humanMagicDef: 1,
                ancientMagicDef: 1
            },
            offenseStats: {
                quickDmgBase: 4,
                quickDmgVar: 2,
                strongDmgBase: 4,
                strongDmgVar: 4,
            }
        },

        goblin: {
            drops: {
                flask: 50,
                leatherarmor: 20,
                axe: 10,
                firepotion: 5
            },
            hp: 90,
            level: 3,
            expOnKill: 33,
            defenseStats: { //Multiply these stats by ceil(level / 10)
                quickAtkDef: 5,
                strongAtkDef: 2,
                humanMagicDef: 1,
                ancientMagicDef: 1
            },
            offenseStats: {
                quickDmgBase: 4,
                quickDmgVar: 2,
                strongDmgBase: 4,
                strongDmgVar: 4,
            }
        },

        ogre: {
            drops: {
                burger: 10,
                flask: 50,
                platearmor: 20,
                morningstar: 20,
                firepotion: 5
            },
            hp: 200,
            level: 8,
            expOnKill: 150,
            defenseStats: { //Multiply these stats by ceil(level / 10)
                quickAtkDef: 5,
                strongAtkDef: 2,
                humanMagicDef: 1,
                ancientMagicDef: 1
            },
            offenseStats: {
                quickDmgBase: 4,
                quickDmgVar: 2,
                strongDmgBase: 4,
                strongDmgVar: 4,
            }
        },

        spectre: {
            drops: {
                flask: 30,
                redarmor: 40,
                redsword: 30,
                firepotion: 5
            },
            hp: 250,
            level: 15,
            expOnKill: 400,
            defenseStats: { //Multiply these stats by ceil(level / 10)
                quickAtkDef: 5,
                strongAtkDef: 2,
                humanMagicDef: 1,
                ancientMagicDef: 1
            },
            offenseStats: {
                quickDmgBase: 4,
                quickDmgVar: 2,
                strongDmgBase: 4,
                strongDmgVar: 4,
            }
        },

        deathknight: {
            drops: {
                burger: 95,
                firepotion: 5
            },
            hp: 250,
            level: 12,
            expOnKill: 300,
            defenseStats: { //Multiply these stats by ceil(level / 10)
                quickAtkDef: 5,
                strongAtkDef: 2,
                humanMagicDef: 1,
                ancientMagicDef: 1
            },
            offenseStats: {
                quickDmgBase: 4,
                quickDmgVar: 2,
                strongDmgBase: 4,
                strongDmgVar: 4,
            }
        },

        crab: {
            drops: {
                flask: 50,
                axe: 20,
                leatherarmor: 10,
                firepotion: 5
            },
            hp: 60,
            level: 4,
            expOnKill: 50,
            defenseStats: { //Multiply these stats by ceil(level / 10)
                quickAtkDef: 5,
                strongAtkDef: 2,
                humanMagicDef: 1,
                ancientMagicDef: 1
            },
            offenseStats: {
                quickDmgBase: 4,
                quickDmgVar: 2,
                strongDmgBase: 4,
                strongDmgVar: 4,
            }
        },

        snake: {
            drops: {
                flask: 50,
                mailarmor: 10,
                morningstar: 10,
                firepotion: 5
            },
            hp: 150,
            level: 8,
            expOnKill: 120,
            defenseStats: { //Multiply these stats by ceil(level / 10)
                quickAtkDef: 5,
                strongAtkDef: 2,
                humanMagicDef: 1,
                ancientMagicDef: 1
            },
            offenseStats: {
                quickDmgBase: 4,
                quickDmgVar: 2,
                strongDmgBase: 4,
                strongDmgVar: 4,
            }
        },

        skeleton2: {
            drops: {
                flask: 60,
                platearmor: 15,
                bluesword: 15,
                firepotion: 5
            },
            hp: 200,
            level: 7,
            expOnKill: 80,
            defenseStats: { //Multiply these stats by ceil(level / 10)
                quickAtkDef: 5,
                strongAtkDef: 2,
                humanMagicDef: 1,
                ancientMagicDef: 1
            },
            offenseStats: {
                quickDmgBase: 4,
                quickDmgVar: 2,
                strongDmgBase: 4,
                strongDmgVar: 4,
            }
        },

        eviltree: {
            drops: {
                flask: 20,
                gold: [20, 5] //percentage, amount
            },
            hp: 250,
            level: 8,
            expOnKill: 150,
            defenseStats: {
                quickAtkDef: 3,
                strongAtkDef: 2,
                humanMagicDef: 4,
                ancientMagicDef: 4
            },
            offenseStats: {
                quickDmgBase: 2,
                quickDmgVar: 2,
                strongDmgBase: 4,
                strongDmgVar: 2,
            }
        },

        eye: {
            drops: {
                flask: 50,
                redarmor: 20,
                redsword: 10,
                firepotion: 5
            },
            hp: 200,
            level: 9,
            expOnKill: 175,
            defenseStats: { //Multiply these stats by ceil(level / 10)
                quickAtkDef: 5,
                strongAtkDef: 2,
                humanMagicDef: 1,
                ancientMagicDef: 1
            },
            offenseStats: {
                quickDmgBase: 4,
                quickDmgVar: 2,
                strongDmgBase: 4,
                strongDmgVar: 4,
            }
        },

        bat: {
            drops: {
                flask: 80,
                axe: 10,
                firepotion: 5
            },
            hp: 80,
            level: 2,
            expOnKill: 20,
            defenseStats: { //Multiply these stats by ceil(level / 10)
                quickAtkDef: 5,
                strongAtkDef: 2,
                humanMagicDef: 1,
                ancientMagicDef: 1
            },
            offenseStats: {
                quickDmgBase: 4,
                quickDmgVar: 2,
                strongDmgBase: 4,
                strongDmgVar: 4,
            }
        },

        wizard: {
            drops: {
                flask: 50,
                platearmor: 20,
                firepotion: 5
            },
            hp: 100,
            level: 8,
            expOnKill: 135,
            defenseStats: { //Multiply these stats by ceil(level / 10)
                quickAtkDef: 5,
                strongAtkDef: 2,
                humanMagicDef: 1,
                ancientMagicDef: 1
            },
            offenseStats: {
                quickDmgBase: 4,
                quickDmgVar: 2,
                strongDmgBase: 4,
                strongDmgVar: 4,
            }
        },

        boss: {
            drops: {
                goldensword: 100
            },
            hp: 700,
            level: 20,
            expOnKill: 1000,
            defenseStats: { //Multiply these stats by ceil(level / 10)
                quickAtkDef: 5,
                strongAtkDef: 2,
                humanMagicDef: 1,
                ancientMagicDef: 1
            },
            offenseStats: {
                quickDmgBase: 4,
                quickDmgVar: 2,
                strongDmgBase: 4,
                strongDmgVar: 4,
            }
        }
    },
    WeaponData: {
        sword1: {
            levelReq: 1,
            quickDmgBase: 8,
            quickDmgVar: 4,
            strongDmgBase: 10,
            strongDmgVar: 5,
            dexProp: 0.6,
            strProp: 0.2,
            vtyProp: 0.2
        },
        sword2: {
            levelReq: 2,
            quickDmgBase: 10,
            quickDmgVar: 4,
            strongDmgBase: 13,
            strongDmgVar: 8,
            dexProp: 0.4,
            strProp: 0.4,
            vtyProp: 0.2
        },
        axe: {
            levelReq: 2,
            quickDmgBase: 9,
            quickDmgVar: 8,
            strongDmgBase: 15,
            strongDmgVar: 8,
            dexProp: 0.2,
            strProp: 0.7,
            vtyProp: 0.1
        },
        morningstar: {
            levelReq: 3,
            quickDmgBase: 15,
            quickDmgVar: 12,
            strongDmgBase: 18,
            strongDmgVar: 8,
            dexProp: 0.4,
            strProp: 0.4,
            vtyProp: 0.2
        },
        bluesword: {
            levelReq: 5,
            quickDmgBase: 22,
            quickDmgVar: 6,
            strongDmgBase: 25,
            strongDmgVar: 5,
            dexProp: 0.6,
            strProp: 0.2,
            vtyProp: 0.2
        },
        redsword: {
            levelReq: 8,
            quickDmgBase: 30,
            quickDmgVar: 14,
            strongDmgBase: 40,
            strongDmgVar: 19,
            dexProp: 0.4,
            strProp: 0.4,
            vtyProp: 0.2
        },
        goldensword: {
            levelReq: 12,
            quickDmgBase: 50,
            quickDmgVar: 10,
            strongDmgBase: 80,
            strongDmgVar: 40,
            dexProp: 0.4,
            strProp: 0.4,
            vtyProp: 0.2
        }
    },
    ArmorData: {
        clotharmor: {
            levelReq: 1,
            quickAtkDef: 10,
            strongAtkDef: 8,
            humanMagicDef: 10,
            ancientMagicDef: 3,
            dexProp: 0.7,
            strProp: 0.1,
            vtyProp: 0.2
        },
        leatherarmor: {
            levelReq: 3,
            quickAtkDef: 12,
            strongAtkDef: 16,
            humanMagicDef: 7,
            ancientMagicDef: 7,
            dexProp: 0.6,
            strProp: 0.1,
            vtyProp: 0.3
        },
        mailarmor: {
            levelReq: 5,
            quickAtkDef: 21,
            strongAtkDef: 10,
            humanMagicDef: 18,
            ancientMagicDef: 18,
            dexProp: 0.1,
            strProp: 0.6,
            vtyProp: 0.3
        },
        platearmor: {
            levelReq: 8,
            quickAtkDef: 25,
            strongAtkDef: 20,
            humanMagicDef: 25,
            ancientMagicDef: 25,
            dexProp: 0.1,
            strProp: 0.6,
            vtyProp: 0.3
        },
        redarmor: {
            levelReq: 12,
            quickAtkDef: 28,
            strongAtkDef: 35,
            humanMagicDef: 30,
            ancientMagicDef: 30,
            dexProp: 0.7,
            strProp: 0.1,
            vtyProp: 0.2
        },
        goldenarmor: {
            levelReq: 15,
            quickAtkDef: 40,
            strongAtkDef: 40,
            humanMagicDef: 40,
            ancientMagicDef: 40,
            dexProp: 0.7,
            strProp: 0.1,
            vtyProp: 0.2
        }
    },
    ItemData: {
        // Foods
        "bread": {value: 5},
        "veggie_soup": {value: 10},
        "egg": {value: 25},
        "steak": {value: 55},

        //Other consumables
        "dexterity_potion": {value: 25},
        "strength_potion": {value: 25},
        "blood_potion": {value: 55},
        "speed_potion": {value: 20},

        //Raw organic resources
        "pine_wood": {value: 5},
        "oak_wood": {value: 10},
        "red_wood": {value: 18},
        "maple_wood": {value: 28},
        "rose_wood": {value: 60},
        "iron_wood": {value: 110},

        //Raw mineral/rock resources
        "glass": {value: 8},
        "stone": {value: 2},
        "sand": {value: 2},
        "dark_iron": {value: 20},
        "illustrian": {value: 50},
        "blood_stone": {value: 90},
        "dantean": {value: 350},

        "iron_ore": {value: 20},
        "gold_ore": {value: 45},
        "coke": {value: 15},

        //Processed resources/intermediate products
        "iron_bar": {value: 35}, //3 iron ore
        "steel_bar": {value: 65}, //2 iron ore + 3 coke
        "sand_steel_bar": {value: 100}, //1 steel + 3 coke + 3 sand
        "black_steel_bar": {value: 135}, //1 steel + 2 coke + 2 dark iron
        "bright_steel_bar": {value: 150}, //1 steel + 3 coke + 2 illustrian
        "red_steel_bar": {value: 280}, //2 steel + 5 coke + 3 blood stone
        "legendary_steel_bar": {value: 1180}, //2 steel + 8 coke + 4 dantean
        "gold_bar": {value: 100}, //3 gold ore

        "gold": {value: 1}
    },
    ExpLevelData: { //Indexed by level i: exp need to level from i -> i + 1
        1: 150,
        2: 325, //175
        3: 550, //225
        4: 850, //300
        5: 1250, //400
        6: 1800, //550
        7: 2500, //700
        8: 3400, //900
        9: 4600, //1200
        10: 6200, //1600
        11: 8200, //2000
        12: 11000, //2800
        13: 15000, //4000
        14: 20500, //5500
        15: 28000, //7500
        16: 37000, //9000
        17: 48500, //11500
        18: 63000, //14500
        19: 80000, //17000
        20: -1 //End
    }
};

var kinds = {
    warrior: [Types.Entities.WARRIOR, "player"],

    rat: [Types.Entities.RAT, "mob"],
    skeleton: [Types.Entities.SKELETON , "mob"],
    goblin: [Types.Entities.GOBLIN, "mob"],
    ogre: [Types.Entities.OGRE, "mob"],
    spectre: [Types.Entities.SPECTRE, "mob"],
    deathknight: [Types.Entities.DEATHKNIGHT, "mob"],
    crab: [Types.Entities.CRAB, "mob"],
    snake: [Types.Entities.SNAKE, "mob"],
    bat: [Types.Entities.BAT, "mob"],
    wizard: [Types.Entities.WIZARD, "mob"],
    eye: [Types.Entities.EYE, "mob"],
    skeleton2: [Types.Entities.SKELETON2, "mob"],
    boss: [Types.Entities.BOSS, "mob"],

    sword1: [Types.Entities.SWORD1, "weapon"],
    sword2: [Types.Entities.SWORD2, "weapon"],
    axe: [Types.Entities.AXE, "weapon"],
    redsword: [Types.Entities.REDSWORD, "weapon"],
    bluesword: [Types.Entities.BLUESWORD, "weapon"],
    goldensword: [Types.Entities.GOLDENSWORD, "weapon"],
    morningstar: [Types.Entities.MORNINGSTAR, "weapon"],

    firefox: [Types.Entities.FIREFOX, "armor"],
    clotharmor: [Types.Entities.CLOTHARMOR, "armor"],
    leatherarmor: [Types.Entities.LEATHERARMOR, "armor"],
    mailarmor: [Types.Entities.MAILARMOR, "armor"],
    platearmor: [Types.Entities.PLATEARMOR, "armor"],
    redarmor: [Types.Entities.REDARMOR, "armor"],
    goldenarmor: [Types.Entities.GOLDENARMOR, "armor"],

    flask: [Types.Entities.FLASK, "object"],
    cake: [Types.Entities.CAKE, "object"],
    burger: [Types.Entities.BURGER, "object"],
    chest: [Types.Entities.CHEST, "object"],
    firepotion: [Types.Entities.FIREPOTION, "object"],
    gold: [Types.Entities.GOLD, "object"],

    guard: [Types.Entities.GUARD, "npc"],
    villagegirl: [Types.Entities.VILLAGEGIRL, "npc"],
    villager: [Types.Entities.VILLAGER, "npc"],
    coder: [Types.Entities.CODER, "npc"],
    scientist: [Types.Entities.SCIENTIST, "npc"],
    priest: [Types.Entities.PRIEST, "npc"],
    king: [Types.Entities.KING, "npc"],
    rick: [Types.Entities.RICK, "npc"],
    nyan: [Types.Entities.NYAN, "npc"],
    sorcerer: [Types.Entities.SORCERER, "npc"],
    agent: [Types.Entities.AGENT, "npc"],
    octocat: [Types.Entities.OCTOCAT, "npc"],
    beachnpc: [Types.Entities.BEACHNPC, "npc"],
    forestnpc: [Types.Entities.FORESTNPC, "npc"],
    desertnpc: [Types.Entities.DESERTNPC, "npc"],
    lavanpc: [Types.Entities.LAVANPC, "npc"],
    "sorceress-blackhair": [Types.Entities.SORCERESS_BLACKHAIR, "npc"],
    "chachie-the-suitor": [Types.Entities.CHACHIE_THE_SUITOR, "npc"],
    "annoying-knight": [Types.Entities.ANNOYING_KNIGHT, "npc"],
    "princess-penelope": [Types.Entities.PRINCESS_PENELOPE, "npc"],

    getType: function(kind) {
        return kinds[Types.getKindAsString(kind)][1];
    }
};

/*
Types.rankedWeapons = [
    Types.Entities.SWORD1,
    Types.Entities.SWORD2,
    Types.Entities.AXE,
    Types.Entities.MORNINGSTAR,
    Types.Entities.BLUESWORD,
    Types.Entities.REDSWORD,
    Types.Entities.GOLDENSWORD
];

Types.rankedArmors = [
    Types.Entities.CLOTHARMOR,
    Types.Entities.LEATHERARMOR,
    Types.Entities.MAILARMOR,
    Types.Entities.PLATEARMOR,
    Types.Entities.REDARMOR,
    Types.Entities.GOLDENARMOR
];
*/

Types.isPlayer = function(kind) {
    return kinds.getType(kind) === "player";
};

Types.isMob = function(kind) {
    return kinds.getType(kind) === "mob";
};

Types.isNpc = function(kind) {
    return kinds.getType(kind) === "npc";
};

Types.isCharacter = function(kind) {
    return Types.isMob(kind) || Types.isNpc(kind) || Types.isPlayer(kind);
};

Types.isArmor = function(kind) {
    return kinds.getType(kind) === "armor";
};

Types.isWeapon = function(kind) {
    return kinds.getType(kind) === "weapon";
};

Types.isObject = function(kind) {
    return kinds.getType(kind) === "object";
};

Types.isChest = function(kind) {
    return kind === Types.Entities.CHEST;
};

Types.isItem = function(kind) {
    return Types.isWeapon(kind)
        || Types.isArmor(kind)
        || (Types.isObject(kind) && !Types.isChest(kind));
};

Types.isHealingItem = function(kind) {
    return kind === Types.Entities.FLASK
        || kind === Types.Entities.BURGER;
};

Types.isExpendableItem = function(kind) {
    return Types.isHealingItem(kind)
        || kind === Types.Entities.FIREPOTION
        || kind === Types.Entities.CAKE;
};

Types.getKindFromString = function(kind) {
    if(kind in kinds) {
        return kinds[kind][0];
    }
};

Types.getKindAsString = function(kind) {
    for(var k in kinds) {
        if(kinds[k][0] === kind) {
            return k;
        }
    }
};

Types.forEachKind = function(callback) {
    for(var k in kinds) {
        callback(kinds[k][0], k);
    }
};

Types.forEachArmor = function(callback) {
    Types.forEachKind(function(kind, kindName) {
        if(Types.isArmor(kind)) {
            callback(kind, kindName);
        }
    });
};

Types.forEachMobOrNpcKind = function(callback) {
    Types.forEachKind(function(kind, kindName) {
        if(Types.isMob(kind) || Types.isNpc(kind)) {
            callback(kind, kindName);
        }
    });
};

Types.forEachArmorKind = function(callback) {
    Types.forEachKind(function(kind, kindName) {
        if(Types.isArmor(kind)) {
            callback(kind, kindName);
        }
    });
};

Types.getOrientationAsString = function(orientation) {
    switch(orientation) {
        case Types.Orientations.LEFT: return "left"; break;
        case Types.Orientations.RIGHT: return "right"; break;
        case Types.Orientations.UP: return "up"; break;
        case Types.Orientations.DOWN: return "down"; break;
    }
};

Types.getRandomItemKind = function(item) {
    var all = _.union(this.rankedWeapons, this.rankedArmors),
        forbidden = [Types.Entities.SWORD1, Types.Entities.CLOTHARMOR],
        itemKinds = _.difference(all, forbidden),
        i = Math.floor(Math.random() * _.size(itemKinds));

    return itemKinds[i];
};

Types.getMessageTypeAsString = function(type) {
    var typeName;
    _.each(Types.Messages, function(value, name) {
        if(value === type) {
            typeName = name;
        }
    });
    if(!typeName) {
        typeName = "UNKNOWN";
    }
    return typeName;
};

for (var enemyName in Types.EnemyData) {
    if (Types.EnemyData.hasOwnProperty(enemyName)) {
        var enemyData = Types.EnemyData[enemyName];
        for (var stat in enemyData.defenseStats) {
            if (enemyData.defenseStats.hasOwnProperty(stat)) {
                enemyData.defenseStats[stat] *= enemyData.level;
            }
        }
        for (var stat in enemyData.offenseStats) {
            if (enemyData.offenseStats.hasOwnProperty(stat)) {
                enemyData.offenseStats[stat] *= enemyData.level;
            }
        }
    }
}

Types.getArmorData = function(kind) {
    try {
        if(Types.isMob(kind)) {
            return Types.EnemyData[Types.getKindAsString(kind)].defenseStats;
        }
        else if (_.isNumber(kind)) {
            //log.error("Kind should be a name, in armor properties lookup");
            //return null;
            return Types.ArmorData[Types.getKindAsString(kind)];
        }
        else {
            return Types.ArmorData[kind];
        }
    } catch(e) {
        log.error("No combat data found for armor: "+Types.getKindAsString(kind));
    }
};

Types.getWeaponData = function(kind) {
    try {
        if(Types.isMob(kind)) {
            return Types.EnemyData[Types.getKindAsString(kind)].offenseStats;
        }
        else if (_.isNumber(kind)) {
            //log.error("Kind should be a name, in weapon properties lookup");
            //return null;
            return Types.WeaponData[Types.getKindAsString(kind)];
        }
        else {
            return Types.WeaponData[kind];
        }
    } catch(e) {
        log.error("No combat data found for weapon: "+Types.getKindAsString(kind));
    }
};

Types.getHitPoints = function(kind) {
    return Types.EnemyData[Types.getKindAsString(kind)].hp;
};

Types.getRespawnTime = function(kind) {
    var data = Types.EnemyData[Types.getKindAsString(kind)];
    if (data.hasOwnProperty("respawnTime")) {
        return data["respawnTime"];
    }
    return 30000;
};

Types.getItemTooltip = function(item) {
    var itemName = Types.getKindAsString(item.kind);
    return Types.getItemTooltipFromName(itemName, item.type, item.count);
};
Types.getItemTooltipFromName = function(itemName, itemType, itemCount) {
    var itemData = Types.WeaponData[itemName] || Types.ArmorData[itemName] || Types.ItemData[itemName];

    html = "<h4>" + itemName + " (" + itemCount + ")</h4>";
    html += "<h5>" + itemType + "</h5>";

    if (itemData) {
        html += "<p>Required Level: " + itemData.levelReq + "</p>";

        if (itemType === "weapon") {
            var upperQuick = itemData.quickDmgBase + itemData.quickDmgVar,
                lowerQuick = itemData.quickDmgBase - itemData.quickDmgVar;
            html += "<p>Quick Attack: " + lowerQuick + "-" + upperQuick + " Damage</p>";
            var upperStrong = itemData.strongDmgBase + itemData.strongDmgVar,
                lowerStrong = itemData.strongDmgBase - itemData.strongDmgVar;
            html += "<p>Strong Attack: " + lowerStrong + "-" + upperStrong + " Damage</p>";
            html += "<p>Dexterity Focus: " + Math.floor(itemData.dexProp * 100) + "</p>";
            html += "<p>Strength Focus: " + Math.floor(itemData.strProp * 100) + "</p>";
            html += "<p>Vitality Focus: " + Math.floor(itemData.vtyProp * 100) + "</p>";
        }
        else if (itemType === "armor") {
            html += "<p>Quick Melee Def: " + itemData.quickAtkDef + " Armor</p>";
            html += "<p>Strong Melee Def: " + itemData.strongAtkDef + " Armor</p>";
            html += "<p>Human Magic Def: " + itemData.humanMagicDef + " Armor</p>";
            html += "<p>Ancient Magic Def: " + itemData.ancientMagicDef + " Armor</p>";
            html += "<p>Dexterity Focus: " + Math.floor(itemData.dexProp * 100) + "</p>";
            html += "<p>Strength Focus: " + Math.floor(itemData.strProp * 100) + "</p>";
            html += "<p>Vitality Focus: " + Math.floor(itemData.vtyProp * 100) + "</p>";
        }
    }
    return html;
};

Types.getValueOfItem = function(item) {
    var name = Types.getKindAsString(item);

    var data = Types.ItemData[name];
    if (data) return data["value"];

    data = Types.WeaponData[name] || Types.ArmorData[name];
    if (data) {
        return data["levelReq"] * 20;
    }
    else {
        return 25;
    }
};

if(!(typeof exports === 'undefined')) {
    module.exports = Types;
}
