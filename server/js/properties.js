
var Types = require("../../shared/js/gametypes");

var Properties = {
    EnemyData: {
        rat: {
            drops: {
                flask: 40,
                burger: 10,
                firepotion: 5
            },
            hp: 25,
            level: 1,
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

        eye: {
            drops: {
                flask: 50,
                redarmor: 20,
                redsword: 10,
                firepotion: 5
            },
            hp: 200,
            level: 8,
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
                flask: 50,
                axe: 10,
                firepotion: 5
            },
            hp: 80,
            level: 2,
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
            quickDmgBase: 5,
            quickDmgVar: 3,
            strongDmgBase: 10,
            strongDmgVar: 5,
            dexProp: 0.6,
            strProp: 0.2,
            vtyProp: 0.2
        },
        sword2: {
            levelReq: 2,
            quickDmgBase: 7,
            quickDmgVar: 4,
            strongDmgBase: 13,
            strongDmgVar: 7.5,
            dexProp: 0.4,
            strProp: 0.4,
            vtyProp: 0.2
        },
        axe: {
            levelReq: 2,
            quickDmgBase: 3,
            quickDmgVar: 5,
            strongDmgBase: 15,
            strongDmgVar: 8,
            dexProp: 0.2,
            strProp: 0.7,
            vtyProp: 0.1
        },
        morningstar: {
            levelReq: 3,
            quickDmgBase: 10,
            quickDmgVar: 8,
            strongDmgBase: 18,
            strongDmgVar: 8,
            dexProp: 0.4,
            strProp: 0.4,
            vtyProp: 0.2
        },
        bluesword: {
            levelReq: 5,
            quickDmgBase: 18,
            quickDmgVar: 5,
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
    PotionData: {

    }
};

for (var enemyName in Properties.EnemyData) {
    if (Properties.EnemyData.hasOwnProperty(enemyName)) {
        var enemyData = Properties.EnemyData[enemyName];
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

Properties.getArmorData = function(kind) {
    try {
        if(Types.isMob(kind)) {
            return Properties.EnemyData[Types.getKindAsString(kind)].defenseStats;
        }
        else if (_.isNumber(kind)) {
            //log.error("Kind should be a name, in armor properties lookup");
            //return null;
            return Properties.ArmorData[Types.getKindAsString(kind)];
        }
        else {
            return Properties.ArmorData[kind];
        }
    } catch(e) {
        log.error("No combat data found for armor: "+Types.getKindAsString(kind));
    }
};

Properties.getWeaponData = function(kind) {
    try {
        if(Types.isMob(kind)) {
            return Properties.EnemyData[Types.getKindAsString(kind)].offenseStats;
        }
        else if (_.isNumber(kind)) {
            //log.error("Kind should be a name, in weapon properties lookup");
            //return null;
            return Properties.WeaponData[Types.getKindAsString(kind)];
        }
        else {
            return Properties.WeaponData[kind];
        }
    } catch(e) {
        log.error("No combat data found for weapon: "+Types.getKindAsString(kind));
    }
};

Properties.getHitPoints = function(kind) {
    return Properties.EnemyData[Types.getKindAsString(kind)].hp;
};

module.exports = Properties;
