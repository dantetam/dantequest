
define(['jquery', 'storage'], function($, Storage) {

    var App = Class.extend({
        init: function() {
            this.currentPage = 1;
            this.blinkInterval = null;
            this.previousState = null;
            this.isParchmentReady = true;
            this.ready = false;
            this.storage = new Storage();
            this.watchNameInputInterval = setInterval(this.toggleButton.bind(this), 100);
            this.$playButton = $('.play'),
            this.$playDiv = $('.play div');

            this.currentMenuMode = null; //For in-game menus (except for settings, credits, about)
            //Use a unified menu display function to create the menu and transition
        },

        setGame: function(game) {
            this.game = game;
            this.isMobile = this.game.renderer.mobile;
            this.isTablet = this.game.renderer.tablet;
            this.isDesktop = !(this.isMobile || this.isTablet);
            this.supportsWorkers = !!window.Worker;
            this.ready = true;
        },

        center: function() {
            window.scrollTo(0, 1);
        },

        canStartGame: function() {
            if(this.isDesktop) {
                return (this.game && this.game.map && this.game.map.isLoaded);
            } else {
                return this.game;
            }
        },

        tryStartingGame: function(username, starting_callback) {
            var self = this,
                $play = this.$playButton;

            if(username !== '') {
                if(!this.ready || !this.canStartGame()) {
                    if(!this.isMobile) {
                        // on desktop and tablets, add a spinner to the play button
                        $play.addClass('loading');
                    }
                    this.$playDiv.unbind('click');
                    var watchCanStart = setInterval(function() {
                        log.debug("waiting...");
                        if(self.canStartGame()) {
                            setTimeout(function() {
                                if(!self.isMobile) {
                                    $play.removeClass('loading');
                                }
                            }, 1500);
                            clearInterval(watchCanStart);
                            self.startGame(username, starting_callback);
                        }
                    }, 100);
                } else {
                    this.$playDiv.unbind('click');
                    this.startGame(username, starting_callback);
                }
            }
        },

        startGame: function(username, starting_callback) {
            var self = this;

            if(starting_callback) {
                starting_callback();
            }
            this.hideIntro(function() {
                if(!self.isDesktop) {
                    // On mobile and tablet we load the map after the player has clicked
                    // on the PLAY button instead of loading it in a web worker.
                    self.game.loadMap();
                }
                self.start(username);
            });
        },

        start: function(username) {
            var self = this,
                firstTimePlaying = !self.storage.hasAlreadyPlayed();

            if(username && !this.game.started) {
                var optionsSet = false,
                    config = this.config;

                //>>includeStart("devHost", pragmas.devHost);
                if(config.local) {
                    log.debug("Starting game with local dev config.");
                    this.game.setServerOptions(config.local.host, config.local.port, username);
                } else {
                    log.debug("Starting game with default dev config.");
                    this.game.setServerOptions(config.dev.host, config.dev.port, username);
                }
                optionsSet = true;
                //>>includeEnd("devHost");

                //>>includeStart("prodHost", pragmas.prodHost);
                if(!optionsSet) {
                    log.debug("Starting game with build config.");
                    this.game.setServerOptions(config.build.host, config.build.port, username);
                }
                //>>includeEnd("prodHost");

                this.center();
                this.game.run(function() {
                    $('body').addClass('started');
                	if(firstTimePlaying) {
                	    self.toggleInstructions();
                	}
            	});
            }
        },

        setMouseCoordinates: function(event) {
            var gamePos = $('#container').offset(),
                scale = this.game.renderer.getScaleFactor(),
                width = this.game.renderer.getWidth(),
                height = this.game.renderer.getHeight(),
                mouse = this.game.mouse;

            mouse.x = event.pageX - gamePos.left - (this.isMobile ? 0 : 5 * scale);
        	mouse.y = event.pageY - gamePos.top - (this.isMobile ? 0 : 7 * scale);

        	if(mouse.x <= 0) {
        	    mouse.x = 0;
        	} else if(mouse.x >= width) {
        	    mouse.x = width - 1;
        	}

        	if(mouse.y <= 0) {
        	    mouse.y = 0;
        	} else if(mouse.y >= height) {
        	    mouse.y = height - 1;
        	}
        },

        initHealthBar: function() {
            var scale = this.game.renderer.getScaleFactor(),
                healthMaxWidth = $("#healthbar").width() - (12 * scale);

        	this.game.onPlayerHealthChange(function(hp, maxHp) {
        	    var barWidth = Math.round((healthMaxWidth / maxHp) * (hp > 0 ? hp : 0));
        	    $("#hitpoints").css('width', barWidth + "px");
        	});

        	this.game.onPlayerHurt(this.blinkHealthBar.bind(this));
        },

        blinkHealthBar: function() {
            var $hitpoints = $('#hitpoints');

            $hitpoints.addClass('white');
            setTimeout(function() {
                $hitpoints.removeClass('white');
            }, 500)
        },

        toggleButton: function() {
            var name = $('#parchment input').val(),
                $play = $('#createcharacter .play');

            if(name && name.length > 0) {
                $play.removeClass('disabled');
                $('#character').removeClass('disabled');
            } else {
                $play.addClass('disabled');
                $('#character').addClass('disabled');
            }
        },

        hideIntro: function(hidden_callback) {
            clearInterval(this.watchNameInputInterval);
            $('body').removeClass('intro');
            setTimeout(function() {
                $('body').addClass('game');
                hidden_callback();
            }, 1000);
        },

        showChat: function() {
            if(this.game.started) {
                $('#chatbox').addClass('active');
                $('#chatinput').focus();
                $('#chatbutton').addClass('active');
            }
        },

        hideChat: function() {
            if(this.game.started) {
                $('#chatbox').removeClass('active');
                $('#chatinput').blur();
                $('#chatbutton').removeClass('active');
            }
        },

        toggleInstructions: function() {
            if($('#achievements').hasClass('active')) {
        	    this.toggleAchievements();
        	    $('#achievementsbutton').removeClass('active');
        	}
            $('#instructions').toggleClass('active');
        },

        toggleAchievements: function() {
        	if($('#instructions').hasClass('active')) {
        	    this.toggleInstructions();
        	    $('#helpbutton').removeClass('active');
        	}
            this.resetPage();
            $('#achievements').toggleClass('active');
        },

        resetPage: function() {
            var self = this,
                $achievements = $('#achievements');

            if($achievements.hasClass('active')) {
                $achievements.bind(TRANSITIONEND, function() {
                    $achievements.removeClass('page' + self.currentPage).addClass('page1');
                    self.currentPage = 1;
                    $achievements.unbind(TRANSITIONEND);
                });
            }
        },

        initEquipmentIcons: function() {
            var scale = this.game.renderer.getScaleFactor();
            var getIconPath = function(spriteName) {
                    return 'img/'+ scale +'/item-' + spriteName + '.png';
                };

                /*,
                weapon = this.game.player.getWeaponName(),
                armor = this.game.player.getSpriteName(),
                weaponPath = getIconPath(weapon),
                armorPath = getIconPath(armor);
                */

            //Instead of showing the weapon and armor, show an inventory icon
            /*
            $('#weapon').css('background-image', 'url("' + weaponPath + '")');
            if(armor !== 'firefox') {
                $('#armor').css('background-image', 'url("' + armorPath + '")');
            }
            */
            var inventoryImgPath = "img/" + scale + "/loot.png";
            $('#inventory').css('background-image', 'url("' + inventoryImgPath + '")');
            //$('#armor').css('background-image', 'url("' + inventoryImgPath + '")');

            var questsImgPath = "img/" + scale + "/talk.png";
            $('#quests').css('background-image', 'url("' + questsImgPath + '")');

            var skillsImgPath = "img/" + scale + "/book.png";
            $('#skills').css('background-image', 'url("' + skillsImgPath + '")');

            var craftImgPath = "img/" + scale + "/dark_iron.png";
            $('#crafting').css('background-image', 'url("' + craftImgPath + '")');
        },

        hideWindows: function() {
            if($('#achievements').hasClass('active')) {
        	    this.toggleAchievements();
        	    $('#achievementsbutton').removeClass('active');
        	}
        	if($('#instructions').hasClass('active')) {
        	    this.toggleInstructions();
        	    $('#helpbutton').removeClass('active');
        	}
        	if($('body').hasClass('credits')) {
        	    this.closeInGameCredits();
        	}
        	if($('body').hasClass('about')) {
        	    this.closeInGameAbout();
        	}
          if($('body').hasClass('settings')) {
        	    this.closeInGameSettings();
        	}
        },

        showAchievementNotification: function(id, name) {
            var $notif = $('#achievement-notification'),
                $name = $notif.find('.name'),
                $button = $('#achievementsbutton');

            $notif.removeClass().addClass('active achievement' + id);
            $name.text(name);
            if(this.game.storage.getAchievementCount() === 1) {
                this.blinkInterval = setInterval(function() {
                    $button.toggleClass('blink');
                }, 500);
            }
            setTimeout(function() {
                $notif.removeClass('active');
                $button.removeClass('blink');
            }, 5000);
        },

        displayUnlockedAchievement: function(id) {
            var $achievement = $('#achievements li.achievement' + id);

            var achievement = this.game.getAchievementById(id);
            if(achievement && achievement.hidden) {
                this.setAchievementData($achievement, achievement.name, achievement.desc);
            }
            $achievement.addClass('unlocked');
        },

        unlockAchievement: function(id, name) {
            this.showAchievementNotification(id, name);
            this.displayUnlockedAchievement(id);

            var nb = parseInt($('#unlocked-achievements').text());
            $('#unlocked-achievements').text(nb + 1);
        },

        initAchievementList: function(achievements) {
            var self = this,
                $lists = $('#lists'),
                $page = $('#page-tmpl'),
                $achievement = $('#achievement-tmpl'),
                page = 0,
                count = 0,
                $p = null;

            _.each(achievements, function(achievement) {
                count++;

                var $a = $achievement.clone();
                $a.removeAttr('id');
                $a.addClass('achievement'+count);
                if(!achievement.hidden) {
                    self.setAchievementData($a, achievement.name, achievement.desc);
                }
                $a.find('.twitter').attr('href', 'http://twitter.com/share?url=http%3A%2F%2Fbrowserquest.mozilla.org&text=I%20unlocked%20the%20%27'+ achievement.name +'%27%20achievement%20on%20Mozilla%27s%20%23BrowserQuest%21&related=glecollinet:Creators%20of%20BrowserQuest%2Cwhatthefranck');
                $a.show();
                $a.find('a').click(function() {
                     var url = $(this).attr('href');

                    self.openPopup('twitter', url);
                    return false;
                });

                if((count - 1) % 4 === 0) {
                    page++;
                    $p = $page.clone();
                    $p.attr('id', 'page'+page);
                    $p.show();
                    $lists.append($p);
                }
                $p.append($a);
            });

            $('#total-achievements').text($('#achievements').find('li').length);
        },

        initUnlockedAchievements: function(ids) {
            var self = this;

            _.each(ids, function(id) {
                self.displayUnlockedAchievement(id);
            });
            $('#unlocked-achievements').text(ids.length);
        },

        setAchievementData: function($el, name, desc) {
            $el.find('.achievement-name').html(name);
            $el.find('.achievement-description').html(desc);
        },

        toggleCredits: function() {
            var currentState = $('#parchment').attr('class');

            if(this.game.started) {
                $('#parchment').removeClass().addClass('credits');

                $('body').toggleClass('credits');

                if(!this.game.player) {
                    $('body').toggleClass('death');
                }
                if($('body').hasClass('about')) {
                    this.closeInGameAbout();
                    this.closeInGameSettings();
                    $('#helpbutton').removeClass('active');
                }
            } else {
                if(currentState !== 'animate') {
                    if(currentState === 'credits') {
                        this.animateParchment(currentState, this.previousState);
                    } else {
            	        this.animateParchment(currentState, 'credits');
            	        this.previousState = currentState;
            	    }
                }
            }
        },

        toggleAbout: function() {
            var currentState = $('#parchment').attr('class');

            if(this.game.started) {
                $('#parchment').removeClass().addClass('about');
                $('body').toggleClass('about');
                if(!this.game.player) {
                    $('body').toggleClass('death');
                }
                if($('body').hasClass('credits')) {
                    this.closeInGameCredits();
                }
                if($('body').hasClass('settings')) {
                    this.closeInGameSettings();
                }
            } else {
                if(currentState !== 'animate') {
                    if(currentState === 'about') {
                        if(localStorage && localStorage.data) {
                            this.animateParchment(currentState, 'loadcharacter');
                        } else {
                            this.animateParchment(currentState, 'createcharacter');
                        }
                    } else {
            	        this.animateParchment(currentState, 'about');
            	        this.previousState = currentState;
            	    }
                }
            }
        },

        toggleSettings: function() {
            var currentState = $('#parchment').attr('class');

            if(this.game.started) {
                $('#parchment').removeClass().addClass('settings');
                $('body').toggleClass('settings');
                if(!this.game.player) {
                    $('body').toggleClass('death');
                }
                //Close other parchments?
                if($('body').hasClass('credits')) {
                    this.closeInGameCredits();
                }
                if($('body').hasClass('about')) {
                    this.closeInGameAbout();
                }
            } else {
                if(currentState !== 'animate') {
                    if(currentState === 'settings') {
                        if(localStorage && localStorage.data) {
                            this.animateParchment(currentState, 'loadcharacter');
                        } else {
                            this.animateParchment(currentState, 'createcharacter');
                        }
                    } else {
            	        this.animateParchment(currentState, 'settings');
            	        this.previousState = currentState;
            	    }
                }
            }
        },

        closeInGameCredits: function() {
            $('body').removeClass('credits');
            $('#parchment').removeClass('credits');
            if(!this.game.player) {
                $('body').addClass('death');
            }
        },

        closeInGameAbout: function() {
            $('body').removeClass('about');
            $('#parchment').removeClass('about');
            if(!this.game.player) {
                $('body').addClass('death');
            }
            $('#helpbutton').removeClass('active');
        },

        closeInGameSettings: function() {
            $('body').removeClass('settings');
            $('#parchment').removeClass('settings');
            if(!this.game.player) {
                $('body').addClass('death');
            }
        },

        togglePopulationInfo: function() {
            $('#population').toggleClass('visible');
        },

        openPopup: function(type, url) {
            var h = $(window).height(),
                w = $(window).width(),
                popupHeight,
                popupWidth,
                top,
                left;

            switch(type) {
                case 'twitter':
                    popupHeight = 450;
                    popupWidth = 550;
                    break;
                case 'facebook':
                    popupHeight = 400;
                    popupWidth = 580;
                    break;
            }

            top = (h / 2) - (popupHeight / 2);
            left = (w / 2) - (popupWidth / 2);

        	newwindow = window.open(url,'name','height=' + popupHeight + ',width=' + popupWidth + ',top=' + top + ',left=' + left);
        	if (window.focus) {newwindow.focus()}
        },

        hideGameMenu: function() {
            var menu = $('#gameMenu');
            menu.html("");
            this.currentMenuMode = null;
            menu.css("opacity", "0");
            menu.unbind(); //Allow the user to click on the screen again
        },

        /**
        @param menuType The menu command, a string, which defines the UI type to bring up
        @param actionData An optional dictionary of data to be passed to the UI
        */
        showGameMenu: function(menuType, actionData) {
            actionData = actionData != null ? actionData : {};
            //Close the menu if it is already open, else open it up
            var menu = $('#gameMenu');
            if (this.currentMenuMode === menuType || !this.game.player) { //Hide the menu if closed or the player is dead
                this.hideGameMenu();
                //menu.html("<p>Loading menu...</p>");
            }
            else {
                this.currentMenuMode = menuType;
                menu.css("opacity", "1");
                menu.css("background-color", "rgba(255,255,255,0.4)");
                menu.css("padding", "20px");
                menu.css("line-height", "100%");

                if (menuType === "inventory") {
                    this.displayInventoryMenu(menu);
                }
                else if (menuType === "dialogue") {
                    this.displayDialogue(menu, actionData); //Pass in the person that the user is talking to
                }
                else if (menuType === "quests") {
                    this.displayQuests(menu);
                }
                else if (menuType === "skills") {
                    menu.css("line-height", "50%");
                    this.displaySkills(menu);
                }
                else if (menuType === "chatlog") {
                    menu.css("line-height", "50%");
                    this.displayChatlog(menu);
                }
                else if (menuType === "shop") {
                    this.displayShop(menu, actionData);
                }
                else if (menuType === "crafting") {
                    this.displayRecipes(menu, actionData);
                }
                menu.click(function(event) {
                    event.stopPropagation(); //Stop the user from moving when clicking a button on the screen
                });
            }
        },

        /**
        @param menu The menu div/DOM object UI being modified
        */
        displayRecipes: function(menu, actionData) {
            var app = this;
            var player = app.game.player;

            //General purpose method for creating a path for a sprite at scale factor
            var scale = 2; //this.game.renderer.getScaleFactor();
            var getIconPath = function(spriteName) {
                    return 'img/'+ scale +'/item-' + spriteName + '.png';
                };

            var menuHtmlString = "";
            menuHtmlString += "<h1>Crafting</h1>";
            menuHtmlString += "<div id='leftGameMenu' style='float:left; display: inline-block; width: 40%; height: 100%;'></div>";
            menuHtmlString += "<div id='rightGameMenu' style='float:left; display: inline-block; width: 30%; height: 100%;'></div>";
            menuHtmlString += "<div id='tooltipInventory' style='float:left; display: inline-block; width: 30%; height: 100%;'></div>";
            menu.html(menuHtmlString);

            var rightGameMenu = $("#rightGameMenu"), leftGameMenu = $("#leftGameMenu");

            var recipeSet = actionData["recipe-set"];
            var recipes = app.game.recipes[recipeSet];
            var index = 0;
            for (var recipeId in recipes) {
                var recipe = recipes[recipeId];
                var tpl = _.template('<div id="<%= domId %>" recipe-set="<%= recipeSet %>" recipe-id="<%= recipeId %>"><p><%= displayText %></p></div>');
                var tplString = tpl({
                    displayText: recipe.displayText,
                    recipeSet: recipeSet,
                    recipeId: recipe.id,
                    domId: "craftButton" + index
                });
                rightGameMenu.html(rightGameMenu.html() + tplString);
                index++;
            }

            index = 0;
            for (var recipeId in recipes) {
                var recipe = recipes[recipeId];
                $("#craftButton" + index).click(function(event) {
                    var chosenRecipeSet = this.attributes["recipe-set"].value;
                    var chosenRecipeId = this.attributes["recipe-id"].value;
                    var chosenRecipe = app.game.recipes[chosenRecipeSet][chosenRecipeId];
                    //Execute the recipe if possible, taking away items if successful
                    if (player.canUseRecipe(chosenRecipe)) {
                        var result = player.useRecipe(chosenRecipe);
                        //Clone every item in the recipe's output to the player's inventory
                        app.game.awardPlayerItems(player, result);
                        app.displayRecipes(menu, actionData);
                    }
                    else {

                    }
                });
                index++;
            }

            //Render the left side: all the items currently in inventory
            var inventoryGridWidth = 8;
            var iconPixelWidth = 32;
            var inventory = this.game.player.inventory;
            for (var i = 0; i < inventory.length; i++) {
                var itemName = inventory[i].itemKind;
                var xPos = (i % inventoryGridWidth) * iconPixelWidth;
                var yPos = Math.floor(i / inventoryGridWidth) * iconPixelWidth;
                var inventoryImgPath = getIconPath(itemName);
                var tpl = _.template('<div id="<%= divId %>" inventory-index="<%= inventoryIndex %>" style="display: inline-block; width: <%= width %>; height: <%= height %>; background-image: <%= path %>"></div>');
                var tplString = tpl({
                    path: "url(" + inventoryImgPath + ")",
                    width: iconPixelWidth + "px",
                    height: iconPixelWidth + "px", //,
                    divId: "inventoryCraftItem" + i,
                    inventoryIndex: i
                });
                leftGameMenu.html(leftGameMenu.html() + tplString);
                if (i % inventoryGridWidth == inventoryGridWidth - 1) { //end of the row i.e. last column
                    leftGameMenu.html(leftGameMenu.html() + "<br>");
                }
            }
        },

        /**
        @param menu The menu div/DOM object UI being modified
        */
        displayShop: function(menu, actionData) {
            var app = this;

            //General purpose method for creating a path for a sprite at scale factor
            var scale = 2; //this.game.renderer.getScaleFactor();
            var getIconPath = function(spriteName) {
                    return 'img/'+ scale +'/item-' + spriteName + '.png';
                };

            var shop = actionData["shop"];
            //console.log(shop);

            var menuHtmlString = "";
            menuHtmlString += "<h1>Shop</h1>";
            menuHtmlString += "<h4>Merchant Gold: " + shop.gold + "</h4><br>";
            menuHtmlString += "<h4>" + app.game.player.name + "'s Gold: " + app.game.player.gold + "</h4><br>";
            menuHtmlString += "<div id='leftGameMenu' style='float:left; display: inline-block; width: 40%; height: 100%;'></div>";
            menuHtmlString += "<div id='rightGameMenu' style='float:left; display: inline-block; width: 30%; height: 100%;'></div>";
            menuHtmlString += "<div id='tooltipInventory' style='float:left; display: inline-block; width: 30%; height: 100%;'></div>";
            menu.html(menuHtmlString);

            var rightGameMenu = $("#rightGameMenu");
            var tooltipMenu = $("#tooltipInventory");

            menuHtmlString = "";
            for (var i = 0; i < shop.items.length; i++) {
                var item = shop.items[i];

                var tpl = _.template('<div id="<%= domId %>" item-index="<%= shopIndex %>"><p><%= itemName %> (<%= itemCount %>)</p></div>');
                var tplString = tpl({
                    itemName: item.itemDisplayName,
                    itemCount: item.count,
                    shopIndex: i,
                    domId: "shopButton" + i
                    //left: xPos + "px",
                    //top: yPos + "px"
                });
                menuHtmlString += tplString;
            }
            rightGameMenu.html(menuHtmlString);

            for (var i = 0; i < shop.items.length; i++) {
                $("#shopButton" + i).click(function(event) {
                    var attr = this.attributes["item-index"];
                    if (attr != null) {
                        var index = attr.value;
                        app.game.client.sendShopBuy(app.game.player, shop.name, +index, 1, app.game.player.gold);
                    }
                });
                //Render tooltip for store items purchase options
                $("#shopButton" + i).mouseover(function(event) {
                    if (app.game.player) {
                        var attr = this.attributes["item-index"];
                        if (attr != null) {
                            var index = +(this.attributes["item-index"].value);
                            var item = shop.items[index];
                            var itemDesc = Types.getItemTooltip(item);
                            tooltipMenu.html(itemDesc);
                        }
                    }
                });
            }

            var leftGameMenu = $("#leftGameMenu");
            //Render the left side: all the items currently in inventory
            var inventoryGridWidth = 8;
            var iconPixelWidth = 32;
            var inventory = this.game.player.inventory;
            for (var i = 0; i < inventory.length; i++) {

                var itemName = inventory[i].itemKind;

                var xPos = (i % inventoryGridWidth) * iconPixelWidth;
                var yPos = Math.floor(i / inventoryGridWidth) * iconPixelWidth;
                var inventoryImgPath = getIconPath(itemName);

                //var tpl = _.template('<img src="<%= path %>">');
                //var tplString = tpl({path: inventoryImgPath});

                //$('#inventory').css('background-image', 'url("' + inventoryImgPath + '")');

                //var tpl = _.template('<div style="display: inline-block; width: <%= width %>; height: <%= height %>; top: <%= top %>; left: <%= left %>; background-image: <%= path %>"></div>');
                var tpl = _.template('<div id="<%= divId %>" inventory-index="<%= inventoryIndex %>" style="display: inline-block; width: <%= width %>; height: <%= height %>; background-image: <%= path %>"></div>');
                var tplString = tpl({
                    path: "url(" + inventoryImgPath + ")",
                    width: iconPixelWidth + "px",
                    height: iconPixelWidth + "px", //,
                    divId: "inventorySellButton" + i,
                    inventoryIndex: i
                    //left: xPos + "px",
                    //top: yPos + "px"
                });

                leftGameMenu.html(leftGameMenu.html() + tplString);

                if (i % inventoryGridWidth == inventoryGridWidth - 1) { //end of the row i.e. last column
                    leftGameMenu.html(leftGameMenu.html() + "<br>");
                }
            }

            for (var i = 0; i < inventory.length; i++) {
                $("#inventorySellButton" + i).click(function(event) {
                    var attr = this.attributes["inventory-index"];
                    if (attr != null) {
                        var index = +attr.value;
                        var itemName = app.game.player.inventory[index].itemKind;
                        app.game.client.sendShopSell(app.game.player, shop.name, itemName, 1, app.game.player.gold);
                    }
                });
                //Render tooltip for player's own inventory offered to shop
                $("#inventorySellButton" + i).mouseover(function(event) {
                    if (app.game.player) {
                        var attr = this.attributes["inventory-index"];
                        if (attr != null) {
                            var index = +(this.attributes["inventory-index"].value);
                            var item = app.game.player.inventory[index];
                            var itemDesc = Types.getItemTooltip(item);
                            tooltipMenu.html(itemDesc);
                        }
                    }
                });
            }
        },

        /**
        @param menu The menu div/DOM object UI being modified
        */
        displayChatlog: function(menu) {
            menu.css("opacity", "1");
            menu.css("background-color", "rgba(255,255,255,1.0)");
            menu.css("padding", "20px");
            /*
            self.chatClientHistory.append({id: entityId, message: message});
            if (self.chatClientHistory.length > this.chatHistoryLimit) {
                self.chatClientHistory.splice(0, 1);
            }
            */
            var chatLog = this.game.chatClientHistory;

            menu.html("");
            var menuHtmlString = "";
            menuHtmlString += "<h1>Chat</h1><br>";

            for (var i = 0; i < chatLog.length; i++) {
                var chat = chatLog[i];

                var speaker = this.game.getEntityById(chat.id);
                var speakerName = speaker != null ? speaker.name : null;

                var tpl = _.template('<div id="<%= divId %>"><p><%= chatId %>: <%= message %></p></div>');
                var tplString = tpl({
                    chatId: speakerName,
                    message: chat.message,
                    divId: "chatLog"
                    //left: xPos + "px",
                    //top: yPos + "px"
                });

                menuHtmlString += tplString;
            }

            menu.html(menuHtmlString);
        },

        /**
        @param menu The menu div/DOM object UI being modified
        */
        displaySkills: function(menu) {
            var app = this;
            var player = this.game.player; //Preserve the scope of the larger app

            menu.html("");
            var menuHtmlString = "";
            menuHtmlString += "<h1>Skills</h1><br>";
            menu.html(menuHtmlString);

            var rawSkillNames = {
                //"level": "Level",
                //"exp": "Experience",
                "availableSkillPoints": "Free Skill Points",
                "dexterity": "Dexterity",
                "strength": "Strength",
                "vitality": "Vitality",
                "ancientMagic": "Ancient Magic",
                "humanMagic": "Human Magic",
                "bowsRanged": "Archery",
                "machineRanged": "Machinery"
            }

            var level = player.characterSkills["level"];

            menu.html(menu.html() + "<p>Level " + level + "</p><br>");

            var curExp = player.characterSkills["exp"];
            var neededExp = Types.ExpLevelData[player.characterSkills["level"]];

            menu.html(menu.html() + "<p>Experience " + curExp + "/" + neededExp + "</p><br>");

            for (var skill in rawSkillNames) {
                if (rawSkillNames.hasOwnProperty(skill)) {
                    var skillDisplayName = rawSkillNames[skill];
                    var playerLevel = player.characterSkills[skill];

                    var tpl = _.template('<div id="<%= divId %>" style="display: inline-block;"><p><%= skillDisplayName %>&emsp;<%= playerLevel %>&emsp;<button id="<%= buttonId %>" skill-name="<%= skill %>">+</button></p></div><br>');
                    var tplString = tpl({
                        skillDisplayName: skillDisplayName,
                        playerLevel: playerLevel,
                        divId: "skillDisplay" + skill,
                        buttonId: "buttonId" + skill,
                        skill: skill
                        //left: xPos + "px",
                        //top: yPos + "px"
                    });

                    menu.html(menu.html() + tplString);
                }
            }

            if (player.characterSkills.availableSkillPoints > 0) {
                for (var skill in rawSkillNames) {
                    if (skill !== "availableSkillPoints") {
                        if (rawSkillNames.hasOwnProperty(skill)) {
                            var buttonId = "#buttonId" + skill;
                            $(buttonId).click(function(event) {
                                var skillName = this.attributes["skill-name"].value;
                                var changeAmount = 1;
                                app.game.client.sendSkillPointChange(skillName, changeAmount);
                            });
                        }
                    }
                }
            }

            //app.game.client.sendSkillPointChange

            //var pointsString = "<p>Skill Points: " + player.getAvailableSkillPoints() + "</p><br>";
            //menu.html(menu.html() + pointsString);
        },

        displayQuests: function(menu) {
            menu.html("");
            var menuHtmlString = "";
            menuHtmlString += "<h1>Quests</h1>";

            if (this.game.player) {
                var completedQuests = this.game.player.getCompletedQuests();
                var inProgressQuests = this.game.player.getInProgressQuests();

                for (var i = 0; i < completedQuests.length; i++) {
                    var quest = completedQuests[i];
                    menuHtmlString += "<div style='color: black;'>" + quest.name + "</div>";
                }
                for (var i = 0; i < inProgressQuests.length; i++) {
                    var quest = inProgressQuests[i];
                    menuHtmlString += "<div style='color: steelblue;'>" + quest.name + "</div>";
                }
            }

            menu.html(menuHtmlString);
        },

        displayDialogue: function(menu, actionData) {
            var app = this; //Keep app in scope
            var mainNpc = actionData["mainNpc"];

            //Display the menu programmatically
            menu.html("");
            var menuHtmlString = "";
            menuHtmlString += "<h1>" + mainNpc.displayName + "</h1>";

            var conve = mainNpc.conversation;

            //TODO: Encapsulate the user-npc interaction within the player class

            if (conve === undefined) { //This NPC just has a "minor" dialogue, displayed in the world
                this.hideGameMenu();
                return;
            }

            //mainNpc.conversation.startConvo(actionData);

            //How a conversation works — here, we "advance" the conversation,
            //which can return two results: text dialogue, or a series of choices.
            //Then give the user the appropriate options to advance the conversation:
            //continue (no input); or a list of choices for the user (input).

            if (!conve.convoActive) {
                conve.startConvo(null);
            }

            var result = null;
            if (actionData.hasOwnProperty("choice")) {
                var nodeId = actionData["choice"];
                result = conve.advanceConvo(nodeId);
                delete actionData["choice"];
            }
            else {
                result = conve.advanceConvo();
            }

            if (result === null) { //Result from the conversation object signaling end of conversation
                this.hideGameMenu();
                conve.endConvo(null);
                app.game.player.checkAllQuests("talk", mainNpc.id); //Update any quests that involve the player talking for a quest objective
                return;
            }
            else if (Array.isArray(result)) { //This represents a series of choices between given
                //Temporary jQuery templating; TODO: replace with a better templating stack
                for (var i = 0; i < result.length; i++) {
                    var choice = result[i];
                    if (choice.hasOwnProperty("quest-start")) {
                        menuHtmlString += "<button id='advanceThisConvo" + i + "' quest-start='" + choice["quest-start"] + "'>" + choice["choiceText"] + "</button><br>";
                    }
                    else {
                        menuHtmlString += "<button id='advanceThisConvo" + i + "'>" + choice["choiceText"] + "</button><br>";
                    }
                }
                menu.html(menuHtmlString);
                for (var i = 0; i < result.length; i++) {
                    var choice = result[i];
                    $("#advanceThisConvo" + i).click(function(event) {
                        //A much cleaner way of embedding data into buttons is using attributes,
                        //but this is non-standard and susceptible to namespace collision.
                        var questStart = this.attributes["quest-start"];
                        if (questStart != null) {
                            var questName = this.attributes["quest-start"].value
                            this.player.startQuest(questName);
                        }

                        //This hack simply preserves the digit at the end, since JS executes/interprets this code at click time -_-
                        actionData["choice"] = +(this.id.slice(this.id.length - 1));
                        app.displayDialogue(menu, actionData);
                        event.stopPropagation(); //Stop the user from moving when clicking a button on the screen
                    });
                }
            }
            else if (_.isObject(result)) {
                if (result.hasOwnProperty("shop")) {
                    var shopName = result["shop-id"];
                    app.game.client.sendShopBrowse(shopName);
                    return;
                }
            }
            else {
                menuHtmlString += "<p>" + result + "</p><br>";
                menuHtmlString += "<button id='advanceThisConvo'>Continue</button><br>";
                menu.html(menuHtmlString);
                $("#advanceThisConvo").click(function(event) {
                    app.displayDialogue(menu, actionData);
                    event.stopPropagation(); //Stop the user from moving when clicking a button on the screen
                });
            }

        },

        /*
        @param menu The menu div/DOM object UI being modified
        */
        displayInventoryMenu: function(menu) {
            var app = this; //Preserve the scope of the larger app

            //General purpose method for creating a path for a sprite at scale factor
            var scale = 2; //this.game.renderer.getScaleFactor();
            var getIconPath = function(spriteName) {
                    return 'img/'+ scale +'/item-' + spriteName + '.png';
                };

            //Display the menu programmatically
            //menu.html("<p>Loading menu...</p>");
            menu.html("");
            //TODO: In the future, use a templating HTML language on top of an established front-end framework
            var menuHtmlString = "";
            menuHtmlString += "<h1>Inventory</h1>";
            menuHtmlString += "<div id='leftGameMenu' style='float:left; display: inline-block; width: 40%; height: 100%;'></div>";
            menuHtmlString += "<div id='rightGameMenu' style='float:left; display: inline-block; width: 30%; height: 100%;'></div>";
            menuHtmlString += "<div id='tooltipInventory' style='float:left; display: inline-block; width: 30%; height: 100%;'></div>";
            menu.html(menuHtmlString);

            var leftGameMenu = $("#leftGameMenu"), rightGameMenu = $("#rightGameMenu");

            leftGameMenu.html("<p>Gold: " + this.game.player.gold + "</p>");
            rightGameMenu.html("<p>Equipment</p>");

            //Render the left side: all the items currently in inventory
            var inventoryGridWidth = 8;
            var iconPixelWidth = 32;
            var inventory = this.game.player.inventory;
            for (var i = 0; i < inventory.length; i++) {

                var itemName = inventory[i].itemKind;

                var xPos = (i % inventoryGridWidth) * iconPixelWidth;
                var yPos = Math.floor(i / inventoryGridWidth) * iconPixelWidth;
                var inventoryImgPath = getIconPath(itemName);

                //var tpl = _.template('<img src="<%= path %>">');
                //var tplString = tpl({path: inventoryImgPath});

                //$('#inventory').css('background-image', 'url("' + inventoryImgPath + '")');

                //var tpl = _.template('<div style="display: inline-block; width: <%= width %>; height: <%= height %>; top: <%= top %>; left: <%= left %>; background-image: <%= path %>"></div>');
                var tpl = _.template('<div id="<%= divId %>" inventory-index="<%= inventoryIndex %>" style="display: inline-block; width: <%= width %>; height: <%= height %>; background-image: <%= path %>"></div>');
                var tplString = tpl({
                    path: "url(" + inventoryImgPath + ")",
                    width: iconPixelWidth + "px",
                    height: iconPixelWidth + "px", //,
                    divId: "inventoryEquipButton" + i,
                    inventoryIndex: i
                    //left: xPos + "px",
                    //top: yPos + "px"
                });

                leftGameMenu.html(leftGameMenu.html() + tplString);

                if (i % inventoryGridWidth == inventoryGridWidth - 1) { //end of the row i.e. last column
                    leftGameMenu.html(leftGameMenu.html() + "<br>");
                }
            }

            var tooltipMenu = $("#tooltipInventory");

            for (var i = 0; i < inventory.length; i++) {
                $("#inventoryEquipButton" + i).click(function() {
                    if (app.game.player) {
                        var attr = this.attributes["inventory-index"];
                        if (attr != null) {
                            var index = +(this.attributes["inventory-index"].value);
                            app.game.player.equipItem(index);
                            app.displayInventoryMenu(menu);
                        }
                    }
                });
                $("#inventoryEquipButton" + i).mouseover(function() {
                    if (app.game.player) {
                        var attr = this.attributes["inventory-index"];
                        if (attr != null) {
                            var index = +(this.attributes["inventory-index"].value);
                            var item = app.game.player.inventory[index];
                            var itemDesc = Types.getItemTooltip(item);
                            tooltipMenu.html(itemDesc);
                        }
                    }
                });
            }

            //Render the right side: currently equipped items; expand later
            var weapon = this.game.player.getWeaponName(),
            armor = this.game.player.getSpriteName();

            //Check if either null or undefined
            if (weapon == null) {
                weapon = "sword1";
            }
            if (armor == null) {
                armor = "clotharmor";
            }
            weaponPath = getIconPath(weapon),
            armorPath = getIconPath(armor);

            var tpl = _.template(`
                    <div id="primaryWeaponSlot" item-name="<%= weaponName %>">Weapon <div style="display: inline-block; width: <%= width %>; height: <%= height %>; background-image: <%= weaponPath %>"></div></div><br>
                    <div id="primaryArmorSlot" item-name="<%= armorName %>">Armor <div style="display: inline-block; width: <%= width %>; height: <%= height %>; background-image: <%= armorPath %>"></div></div><br>
                `);
            var tplString = tpl({
                weaponPath: "url(" + weaponPath + ")",
                armorPath: "url(" + armorPath + ")",
                weaponName: weapon,
                armorName: armor,
                width: iconPixelWidth + "px",
                height: iconPixelWidth + "px"
            });

            rightGameMenu.html(rightGameMenu.html() + tplString);

            //Display tooltip when mouse enters into the equipment slots
            $("#primaryWeaponSlot").mouseover(function() {
                if (app.game.player) {
                    var attr = this.attributes["item-name"];
                    if (attr != null) {
                        var name = this.attributes["item-name"].value;
                        var itemDesc = Types.getItemTooltipFromName(name, "weapon", 1);
                        tooltipMenu.html(itemDesc);
                    }
                }
            });
            $("#primaryArmorSlot").mouseover(function() {
                if (app.game.player) {
                    var attr = this.attributes["item-name"];
                    if (attr != null) {
                        var name = this.attributes["item-name"].value;
                        var itemDesc = Types.getItemTooltipFromName(name, "armor", 1);
                        tooltipMenu.html(itemDesc);
                    }
                }
            });
        },

        animateParchment: function(origin, destination) {
            var self = this,
                $parchment = $('#parchment'),
                duration = 1;

            if(this.isMobile) {
                $parchment.removeClass(origin).addClass(destination);
            } else {
                if(this.isParchmentReady) {
                    if(this.isTablet) {
                        duration = 0;
                    }
                    this.isParchmentReady = !this.isParchmentReady;

                    $parchment.toggleClass('animate');
                    $parchment.removeClass(origin);

                    setTimeout(function() {
                        $('#parchment').toggleClass('animate');
                        $parchment.addClass(destination);
                    }, duration * 1000);

                    setTimeout(function() {
                        self.isParchmentReady = !self.isParchmentReady;
                    }, duration * 1000);
        	    }
            }
        },

        animateMessages: function() {
            var $messages = $('#notifications div');

            $messages.addClass('top');
        },

        resetMessagesPosition: function() {
            var message = $('#message2').text();

            $('#notifications div').removeClass('top');
            $('#message2').text('');
            $('#message1').text(message);
        },

        showMessage: function(message) {
            var $wrapper = $('#notifications div'),
                $message = $('#notifications #message2');

            this.animateMessages();
            $message.text(message);
            if(this.messageTimer) {
                this.resetMessageTimer();
            }

            this.messageTimer = setTimeout(function() {
                    $wrapper.addClass('top');
            }, 5000);
        },

        resetMessageTimer: function() {
            clearTimeout(this.messageTimer);
        },

        resizeUi: function() {
            if(this.game) {
                if(this.game.started) {
                    this.game.resize();
                    this.initHealthBar();
                    this.game.updateBars();
                } else {
                    var newScale = this.game.renderer.getScaleFactor();
                    this.game.renderer.rescale(newScale);
                }
            }
        }
    });

    return App;
});
