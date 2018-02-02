
var Utils = require("./utils");

var Formulas = {};

//Temporary normal generator, until an efficient algorithm can be found
Formulas.normalGen = function(mean, stddev) {
    return mean + this.randn_bm() * Math.sqrt(stddev)
};

// Citing: https://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve
// Standard Normal variate using Box-Muller transform.
Formulas.randn_bm = function() {
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
};

Formulas.armorDefTradeOff = function(damage, defence) {
    if (damage < 0 || defence < 0) {
        log.error("Invalid damage value and defence value: " + damage + ", " + defence);
        return 0;
    }
    if (damage === 0) {
        return 0;
    }
    //Approximate a kind of "sigmoid". This is much less computationally expensive
    var ratio = defence / damage;
    if (ratio <= 0.4) return damage * 1.0;
    else if (ratio >= 1.5) return damage * 0.2;
    else {
        //Interpolate on a line between the points
        //ratio = 0.4, damage = raw * 1.0
        //ratio = 1.5, damage = raw * 0.2
        //var damageConst = 0.2 + (1.5 - ratio) / (1.5 - 0.4) * 0.8
        var damageConst = 1.291 - 0.727 * ratio;
        return damage * damageConst;
    }
};

Formulas.dmg = function(weaponData, armorData, attackType, attackerSkills, defenderSkills) {
    /*
    var dealt = weaponLevel * Utils.randomInt(5, 10),
        absorbed = armorLevel * Utils.randomInt(1, 3),
        dmg =  dealt - absorbed;

    //console.log("abs: "+absorbed+"   dealt: "+ dealt+"   dmg: "+ (dealt - absorbed));
    if(dmg <= 0) {
        return Utils.randomInt(0, 3);
    } else {
        return dmg;
    }
    */
    if (weaponData === undefined || armorData === undefined) {
        log.error("Invalid weapon or armor data for combat damage calculations");
        return 0;
    }

    //TODO: ALlow users to use weapon with higher reqs, by decrease mean and increase variance of damage
    var rawDamage = 0, rawDefence = 0;

    if (attackType === 'quick') {
        rawDamage = this.normalGen(weaponData["quickDmgBase"], weaponData["quickDmgVar"]);
        rawDefence = armorData["quickAtkDef"];
    }
    else if (attackType === 'strong') {
        rawDamage = this.normalGen(weaponData["strongDmgBase"], weaponData["strongDmgVar"]);
        rawDefence = armorData["strongAtkDef"];
    }
    else {
        //Default to quick attack
        log.error("Warning: No attack type specified for damage calculation");
        rawDamage = this.normalGen(weaponData["quickDmgBase"], weaponData["quickDmgVar"]);
        rawDefence = armorData["quickAtkDef"];
    }

    //PLayer skills damage/defence modifiers
    if (attackerSkills) {
        var linearComboSkills = weaponData["dexProp"] * attackerSkills["dexterity"] +
                                weaponData["strProp"] * attackerSkills["strength"] +
                                weaponData["vtyProp"] * attackerSkills["vitality"];
        var mod = (linearComboSkills / 3) / weaponData["levelReq"]; //Every player gets 3 skill points per level
        rawDamage *= mod;
    }
    if (defenderSkills) {
        var linearComboSkills = armorData["dexProp"] * defenderSkills["dexterity"] +
                                armorData["strProp"] * defenderSkills["strength"] +
                                armorData["vtyProp"] * defenderSkills["vitality"];
        var mod = (linearComboSkills / 3) / armorData["levelReq"]; //Every player gets 3 skill points per level
        rawDefence *= mod;
    }

    //var finalDamage = Math.max(0, rawDamage - rawDefence);
    var finalDamage = Math.floor(this.armorDefTradeOff(rawDamage, rawDefence));
    finalDamage = Math.max(0, finalDamage);
    log.info("Dealt damage: " + finalDamage);
    return finalDamage;
};

Formulas.playerHp = function(armorData, characterSkills) {
    /*var hp = 80 + ((armorLevel - 1) * 30);
    return hp;
    */
    return 60 + ((characterSkills.vitality - 1) * 10)
};

Formulas.npcHp = function(npcData) {

};

if(!(typeof exports === 'undefined')) {
    module.exports = Formulas;
}
