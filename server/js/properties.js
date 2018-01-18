
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
            defenseStats: {
                quickAtkDef: 5,
                strongAtkDef: 2,
                humanMagicDef: 1,
                ancientMagicDef: 1
            }
            weapon: 1
        },

        skeleton: {
            drops: {
                flask: 40,
                mailarmor: 10,
                axe: 20,
                firepotion: 5
            },
            hp: 110,
            armor: 2,
            weapon: 2
        },

        goblin: {
            drops: {
                flask: 50,
                leatherarmor: 20,
                axe: 10,
                firepotion: 5
            },
            hp: 90,
            armor: 2,
            weapon: 1
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
            armor: 3,
            weapon: 2
        },

        spectre: {
            drops: {
                flask: 30,
                redarmor: 40,
                redsword: 30,
                firepotion: 5
            },
            hp: 250,
            armor: 2,
            weapon: 4
        },

        deathknight: {
            drops: {
                burger: 95,
                firepotion: 5
            },
            hp: 250,
            armor: 3,
            weapon: 3
        },

        crab: {
            drops: {
                flask: 50,
                axe: 20,
                leatherarmor: 10,
                firepotion: 5
            },
            hp: 60,
            armor: 2,
            weapon: 1
        },

        snake: {
            drops: {
                flask: 50,
                mailarmor: 10,
                morningstar: 10,
                firepotion: 5
            },
            hp: 150,
            armor: 3,
            weapon: 2
        },

        skeleton2: {
            drops: {
                flask: 60,
                platearmor: 15,
                bluesword: 15,
                firepotion: 5
            },
            hp: 200,
            armor: 3,
            weapon: 3
        },

        eye: {
            drops: {
                flask: 50,
                redarmor: 20,
                redsword: 10,
                firepotion: 5
            },
            hp: 200,
            armor: 3,
            weapon: 3
        },

        bat: {
            drops: {
                flask: 50,
                axe: 10,
                firepotion: 5
            },
            hp: 80,
            armor: 2,
            weapon: 1
        },

        wizard: {
            drops: {
                flask: 50,
                platearmor: 20,
                firepotion: 5
            },
            hp: 100,
            armor: 2,
            weapon: 6
        },

        boss: {
            drops: {
                goldensword: 100
            },
            hp: 700,
            armor: 6,
            weapon: 7
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
        }
    },
    PotionData: {

    }
};



Properties.getArmorLevel = function(kind) {
    try {
        if(Types.isMob(kind)) {
            return Properties.EnemyData[Types.getKindAsString(kind)].defenseStats;
        } else {
            return Properties.ArmorData[kind];
        }
    } catch(e) {
        log.error("No combat data found for armor: "+Types.getKindAsString(kind));
    }
};

Properties.getWeaponLevel = function(kind) {
    try {
        if(Types.isMob(kind)) {
            return Properties.EnemyData[Types.getKindAsString(kind)].offenseStats;
        } else {
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
