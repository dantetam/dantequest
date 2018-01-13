
define(['character', 'conversations'], function(Character, Conversations) {

    var NpcTalk = {
        "guard": [
            "Hail Aeterna.",
            "Peace and order.",
            "Long day, ain't it?",
            "Beautiful day to be just standing here."
        ],

        "king": [
            "REDACTED"
        ],

        "villagegirl": [
            "Hello, wanderer.",
            "This is the city square.",
            "It's the center of life in the Kingdom of Aeterna.",
            "Come here for quests and knowledge."
        ],

        "villager": [
            "Aeterna, a shining diamond of civilization in a sea of wildness,",
            "and a boring, calm town surrounded by adventure."
        ],

        "agent": [
            "REDACTED"
        ],

        "rick": [
            "REDACTED"
        ],

        "scientist": [
            "Good afternoon, adventurer.",
            "The discovery and channeling of magic led to the founding of Aeterna,",
            "but also its demise, and the creation of monsters,",
            "that roam our world in packs and nests."
        ],

        "nyan": [
            "REDACTED"
        ],

        "forestnpc": [
            "lorem ipsum dolor sit amet",
            "consectetur adipisicing elit, sed do eiusmod tempor"
        ],

        "desertnpc": [
            "lorem ipsum dolor sit amet",
            "consectetur adipisicing elit, sed do eiusmod tempor"
        ],

        "lavanpc": [
            "lorem ipsum dolor sit amet",
            "consectetur adipisicing elit, sed do eiusmod tempor"
        ],

        "priest": [
            "Ever since humans crossed the Forbidden Gate,",
            "they unleashed the greater evils of the world,",
            "but also revealed its once unknown and transcendent mysteries.",
            "Such mysteries were only once speculation of priests such as myself."
        ],

        "sorcerer": [
            "I have seen the future. Looks quite bleak.",
            "At least you are perpetually fine and adventurous."
        ],

        "octocat": [
            "Welcome to DanteQuest!",
            "I am a higher god, known for source control."
        ],

        "coder": [
            "REDACTED"
        ],

        "beachnpc": [
            "REDACTED"
        ],

        "desertnpc": [
            "REDACTED"
        ],

        "othernpc": [
            "lorem ipsum",
            "lorem ipsum"
        ],

        "sorceress-blackhair": [
            "REDACTED"
        ]
    };

    /*var NpcConversations = {
        "sorceress-blackhair":
    };*/

    var Npc = Character.extend({
        init: function(id, kind) {
            this._super(id, kind, 1);
            this.itemKind = Types.getKindAsString(this.kind);
            //this.talkCount = NpcTalk[this.itemKind].length;
            //this.talkIndex = 0;
            this.conversation = Conversations[this.itemKind];
            //Temporary display name
            this.displayName = this.itemKind.charAt(0).toUpperCase() + this.itemKind.slice(1);
        }

        /*
        talk: function() {
            console.log(this.conversation);

            var msg = null;

            if(this.talkIndex > this.talkCount) {
                this.talkIndex = 0;
            }
            if(this.talkIndex < this.talkCount) {
                msg = NpcTalk[this.itemKind][this.talkIndex];
            }
            this.talkIndex += 1;

            return msg;
        }
        */
    });

    return Npc;
});
