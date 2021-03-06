
var cls = require("./lib/class"),
    _ = require("underscore"),
    Utils = require("./utils"),
    Types = require("../../shared/js/gametypes");

var Messages = {};
module.exports = Messages;

var Message = cls.Class.extend({
});

Messages.Spawn = Message.extend({
    init: function(entity) {
        this.entity = entity;
    },
    serialize: function() {
        var spawn = [Types.Messages.SPAWN];
        return spawn.concat(this.entity.getState());
    }
});

Messages.Despawn = Message.extend({
    init: function(entityId) {
        this.entityId = entityId;
    },
    serialize: function() {
        return [Types.Messages.DESPAWN, this.entityId];
    }
});

Messages.Move = Message.extend({
    init: function(entity) {
        this.entity = entity;
    },
    serialize: function() {
        return [Types.Messages.MOVE,
                this.entity.id,
                this.entity.x,
                this.entity.y];
    }
});

Messages.LootMove = Message.extend({
    init: function(entity, item, count) {
        this.entity = entity;
        this.item = item;
        this.count = count;
    },
    serialize: function() {
        return [Types.Messages.LOOTMOVE,
                this.entity.id,
                this.item.id,
                this.count];
    }
});

Messages.Attack = Message.extend({
    init: function(attackerId, targetId) {
        this.attackerId = attackerId;
        this.targetId = targetId;
    },
    serialize: function() {
        return [Types.Messages.ATTACK,
                this.attackerId,
                this.targetId];
    }
});

Messages.Health = Message.extend({
    init: function(points, isRegen) {
        this.points = points;
        this.isRegen = isRegen;
    },
    serialize: function() {
        var health = [Types.Messages.HEALTH,
                      this.points];

        if(this.isRegen) {
            health.push(1);
        }
        return health;
    }
});

Messages.HitPoints = Message.extend({
    init: function(maxHitPoints) {
        this.maxHitPoints = maxHitPoints;
    },
    serialize: function() {
        return [Types.Messages.HP,
                this.maxHitPoints];
    }
});

Messages.EquipItem = Message.extend({
    init: function(player, item) {
        this.playerId = player.id;
        this.item = item;
    },
    serialize: function() {
        return [Types.Messages.EQUIP,
                this.playerId,
                this.item];
    }
});

Messages.Drop = Message.extend({
    init: function(mob, item) {
        this.mob = mob;
        this.item = item;
    },
    serialize: function() {
        var drop = [Types.Messages.DROP,
                    this.mob.id,
                    this.item.id,
                    this.item.kind,
                    _.pluck(this.mob.hatelist, "id")];

        return drop;
    }
});

Messages.Chat = Message.extend({
    init: function(player, message) {
        this.playerId = player.id;
        this.message = message;
    },
    serialize: function() {
        return [Types.Messages.CHAT,
                this.playerId,
                this.message];
    }
});

Messages.Teleport = Message.extend({
    init: function(entity) {
        this.entity = entity;
    },
    serialize: function() {
        return [Types.Messages.TELEPORT,
                this.entity.id,
                this.entity.x,
                this.entity.y];
    }
});

Messages.Damage = Message.extend({
    init: function(entity, points) {
        this.entity = entity;
        this.points = points;
    },
    serialize: function() {
        return [Types.Messages.DAMAGE,
                this.entity.id,
                this.points];
    }
});

Messages.Population = Message.extend({
    init: function(world, total) {
        this.world = world;
        this.total = total;
    },
    serialize: function() {
        return [Types.Messages.POPULATION,
                this.world,
                this.total];
    }
});

Messages.Kill = Message.extend({
    init: function(mob) {
        this.mob = mob;
    },
    serialize: function() {
        return [Types.Messages.KILL,
                this.mob.kind];
    }
});

Messages.List = Message.extend({
    init: function(ids) {
        this.ids = ids;
    },
    serialize: function() {
        var list = this.ids;

        list.unshift(Types.Messages.LIST);
        return list;
    }
});

Messages.Destroy = Message.extend({
    init: function(entity) {
        this.entity = entity;
    },
    serialize: function() {
        return [Types.Messages.DESTROY,
                this.entity.id];
    }
});

Messages.Blink = Message.extend({
    init: function(item) {
        this.item = item;
    },
    serialize: function() {
        return [Types.Messages.BLINK,
                this.item.id];
    }
});

Messages.StatsUpdate = Message.extend({
    init: function(playerId, skillsObj) {
        this.playerId = playerId;
        this.skillsObj = skillsObj;
    },
    serialize: function() {
        return [Types.Messages.STATS_UPDATE,
                this.playerId,
                this.skillsObj];
    }
});

Messages.LevelUpdate = Message.extend({
    init: function(playerId, skillsObj) {
        this.playerId = playerId;
        this.skillsObj = skillsObj;
    },
    serialize: function() {
        return [Types.Messages.LEVEL_UPDATE,
                this.playerId,
                this.skillsObj];
    }
});

Messages.OpenShop = Message.extend({
    init: function(playerId, shop) {
        this.playerId = playerId;
        this.shop = shop;
    },
    serialize: function() {
        return [Types.Messages.OPEN_SHOP,
                this.playerId,
                this.shop];
    }
});

Messages.ShopTransactionComplete = Message.extend({
    init: function(playerId, shop, playerGold, itemKindBought, buyCount) {
        this.playerId = playerId;
        this.shop = shop;
        this.playerGold = playerGold;
        this.itemKindBought = itemKindBought;
        this.buyCount = buyCount;
    },
    serialize: function() {
        return [Types.Messages.SHOP_TRANSACTION,
                this.playerId,
                this.shop,
                this.playerGold,
                this.itemKindBought,
                this.buyCount
                ];
    }
});
