
var Utils = require("./utils");

var Formulas = {};

//Temporary normal generator, until an efficient algorithm can be found
Formulas.normalGen = function(mean, stddev) {
    return mean + this.randn_bm() * Math.sqrt(stddev)
};

// Citing: https://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve
// Standard Normal variate using Box-Muller transform.
Formulas.randn_bm() {
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}

Formulas.dmg = function(weaponData, armorData, attackType) {
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

    return rawDamage - rawDefence;
};

Formulas.playerHp = function(armorData, characterSkills) {
    /*var hp = 80 + ((armorLevel - 1) * 30);
    return hp;
    */
};

Formulas.npcHp = function(npcData) {

};

if(!(typeof exports === 'undefined')) {
    module.exports = Formulas;
}
