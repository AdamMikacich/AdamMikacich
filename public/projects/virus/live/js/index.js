// JavaScript Document

// Capitalizes first letter
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

// Returns true or false if string contains another substring
String.prototype.contains = function(it) {
	return this.indexOf(it) != -1;
};

// Returns a random number
function randomNumber() {
	return Math.floor(Math.random() * 100);
}

$(document).ready(function() {
	
	var settings = {
		maxAudio: 0.2,
		volume: 1,
	};
	
	setTimeout(function() {
		$('body').animate({'opacity': 1}, 1000);
		setTimeout(function() {
			$('body').addClass('windowsBackground');
		}, 1000);
	}, 1000);
	
	/*
  _____  _       _             
 |  __ \(_)     | |            
 | |  | |_  __ _| | ___   __ _ 
 | |  | | |/ _` | |/ _ \ / _` |
 | |__| | | (_| | | (_) | (_| |
 |_____/|_|\__,_|_|\___/ \__, |
                          __/ |
                         |___/ 
						 
	Dialog
	*/
	
	// Store messages here so the storyMode function doesn't get spammed with text
	var storyModeMessages = [
		"This is an important message!",
		"Your computer might be infected with a virus!",
		"For a totaly legit (not a scam) free virus remover program, go to <u>RemoveMyVirus.com</u>",
	];
	var storyModeCharacter = 'Unknown';
	
	// This is ran when the desktop loads when the game starts
	function storyMode() {
		setTimeout(function() {
			addMessage(storyModeCharacter, storyModeMessages[0]);
			notification('New Message', 'Open the Messenger App to view your new message');
		}, 3000);
	}

	//storyMode();
	
	/*
	
  _____  _             
 |  __ \| |            
 | |__) | | __ _ _   _ 
 |  ___/| |/ _` | | | |
 | |    | | (_| | |_| |
 |_|    |_|\__,_|\__, |
                  __/ |
                 |___/ 
	Play
	*/
	
	// Only allows the start button to be clicked once
	var started = false;
	
    // Function that is ran when power button is clicked
    $('.startGame').click(function() {
        if (started === false) {
            started = true;

            $('.startFade').animate({
                "opacity": 0
            }, 2000);
            setTimeout(function() {
           	// Stop all webkit animation for extremely reduced lag
            var playState = '-webkit-animation-play-state';
            $('.animated').css(playState, function(i, v) {
                return v === 'paused' ? 'running' : 'paused';
            });
            $('body').toggleClass('paused', $('body').css(playState) === 'paused');

                $('.startFade').hide();
                $('.start').animate({
                    "background-color": "black"
                }, 2000);
                setTimeout(function() {
                    $('.start').animate({
                        "opacity": 0
                    }, 1000);
                    setTimeout(function() {
                        $('.start').hide();
						storyMode();
                    }, 1000);
                }, 3000);
            }, 2000);
        }
    });
	
	/*
  _____           _        _ _ 
 |_   _|         | |      | | |
   | |  _ __  ___| |_ __ _| | |
   | | | '_ \/ __| __/ _` | | |
  _| |_| | | \__ \ || (_| | | |
 |_____|_| |_|___/\__\__,_|_|_|
                               
    Install            
	*/
	
	var hasDownloadedAntivirus = false;
	
	// Antivirus download function
	$('#antivirusDownload').click(function() {
		if (hasDownloadedAntivirus === false) {
			hasDownloadedAntivirus = true;
			$('#antivirusDownload').html('<i class="fa fa-circle-o-notch fa-spin fa-2x"></i>');
			setTimeout(function() {
				$('.taskbarLeft').append('<i class="icon fa fa-shield" aria-hidden="false" data-icon="Antivirus"></i>');
				$('#antivirusDownload').html('<i class="fa fa-check fa-2x"></i>');
				setTimeout(function() {
					addMessage(storyModeCharacter, storyModeMessages[4]);
					notification('New Message', 'Open the Messenger App to view your new message');
				}, 2000);
			}, 2000);
		}
	});
	
	var hasDownloadedVirus = false;
	
	// Ran when download virus is clicked
	$('#downloadVirus').click(function() {
		if (hasDownloadedVirus === false) {
			hasDownloadedVirus = true;
			clearNotifications();
			appWindow.close($('.programBrowser'));
			effects.alerts();
			effects.alertSound();

			setTimeout(function() {
				effects.strobe();
			}, 5000);
		}
	});

    /*
   ____   _____ 
  / __ \ / ____|
 | |  | | (___  
 | |  | |\___ \ 
 | |__| |____) |
  \____/|_____/ 
                
    Operating System  
	*/

    // Makes programs draggable and resizable
    $('.program:not(.programVirus)').draggable({
        containment: ".programContainer",
        handle: ".menuIcons"
    }).resizable({
        containment: ".programContainer",
        handles: "se",
        minWidth: 300,
        minHeight: 250
    });

	// Valid programs that can be opened
    var programs = ['Browser', 'Messenger', 'Virus'];

    $('.program').mousedown(function() {
        programs.forEach(function(windowName) {
            $(".program" + windowName).css({
                "z-index": "2"
            });
        });
        $(this).css({
            "z-index": "3"
        });
    });
	
	/*
                           
     /\                    
    /  \   _ __  _ __  ___ 
   / /\ \ | '_ \| '_ \/ __|
  / ____ \| |_) | |_) \__ \
 /_/    \_\ .__/| .__/|___/
          | |   | |        
          |_|   |_|        
	Applications
	*/

    // Object for small underline under active apps
    var isActive = {
        "Browser": false,
        "Messenger": false
    };

    // Object keeps track of which windows are maximized
    var isMaximized = {
        "Browser": false,
        "Messenger": false
    };
	
	// Object for general window functions: maximize, minimize, close, and open
	var appWindow = {
		maximize: function(element) {
			var windowName = element.attr('data-window');
			isMaximized[windowName] = !isMaximized[windowName]; // Short hand for toggling boolean
			if (isMaximized[windowName] === true) {
				element.css({
					"width": "100%",
					"height": "100%",
					"left": "0",
					"top": "0"
				});
			} else {
				if (windowName !== 'Virus') { // Virus window is larger and thus has larger 'unmaximize' value
					element.css({
						"width": "350px",
						"height": "200px",
						"left": "calc(50% - 150px)",
						"top": "calc(50% - 100px)"
					});
				} else {
					element.css({
						"width": "750px",
						"height": "250px",
						"left": "calc(50% - 375px)",
						"top": "calc(50% - 125px)"
					});
				}
			}
		},
		minimize: function(element) {
			var windowName = element.attr('data-window');
			if (windowName !== 'Virus') { // Prevents virus window from being minimized by user
	        	$('.program' + windowName).hide();
        	} else {
        		notification('Denied', 'Unable to Minimize the Virus');
        	}
		},
		close: function(element) {
			var windowName = element.attr('data-window');
			if (windowName !== 'Virus') { // Prevents virus window from being closed by user
				$(".program" + windowName).hide();
				$('.icon[data-icon="' + windowName + '"]').removeClass('iconActive');
				isActive[windowName] = false;
			} else {
				notification('Denied', 'Unable to Close the Virus');
			}
		},
		open: function(element) {
			var windowName = element.attr('data-icon');

			//This checks that the icon clicked was actually an application and not an icon for show (doesn't actually work like the windows icon in the corner)
			if (programs.indexOf(windowName) > -1) {

				// This z-index moves all the windows behind the first window which is then moved in front in the enxt line
				programs.forEach(function(windowName) {
					$(".program" + windowName).css({
						"z-index": "2"
					});
				});

				// This z-index line moves the current window the the front
				$('.program' + windowName).css({
					"z-index": "3"
				});

				element.addClass('iconActive');
				$(".program" + windowName).show();
			}
			isActive[windowName] = true;

			// This will continue the story mode after the messages app has been opened for the FIRST time
			if ((windowName === 'Messenger') && (hasOpenedMessages === false)) {
				hasOpenedMessages = true;
				setTimeout(function() {
					addMessage(storyModeCharacter, storyModeMessages[1]);
					setTimeout(function() {
						addMessage(storyModeCharacter, storyModeMessages[2]);
					}, 3000);
				}, 4000);
			}
		}
	};
	
    $(".fa-window-maximize").click(function() {
		// The :eq(2) selects the 3rd parent of the element which is the program container that is used to be resized
		appWindow.maximize($(this).parents(':eq(2)'));
    });
	

    $(".fa-window-minimize").click(function() {
		// The :eq(2) selects the 3rd parent of the element which is the program container that is used to be resized
        appWindow.minimize($(this).parents(':eq(2)'));
    });
	
    $(".fa-close").click(function() {
        appWindow.close($(this).parents(':eq(2)'));
    });
	
	// Icon clicked inside of taskbar - This starts applications
    $(document).on("click", ".icon",function() { // This looks different because this one binds to dynamically added content (programs that are added later such as the virus program)
        appWindow.open($(this));
    });

    function closeAllPrograms() {
    	$('.program').hide();
    	$.each(programs, function(index, value) {
		    $('.icon[data-icon="' + value + '"]').removeClass('iconActive');
		    isActive[value] = false;
		});
    }

    closeAllPrograms();
	
	// This is used to know when to continue the dialog AFTER the messeges app has been opened - This variable keeps track to make it happen only the first time
	var hasOpenedMessages = false;
	
	/*
  ______  __  __          _       
 |  ____|/ _|/ _|        | |      
 | |__  | |_| |_ ___  ___| |_ ___ 
 |  __| |  _|  _/ _ \/ __| __/ __|
 | |____| | | ||  __/ (__| |_\__ \
 |______|_| |_| \___|\___|\__|___/
                                  
    Page Effects / Transition Screens                        
	*/
	
	$('.alertDuplicate').hide();
	$('.restarting').hide();
	// This gets the alertDuplicate HTML
	var alertDuplicate = $('.alertDuplicate').html();
	
	var beepSound = new Audio('./../sounds/beep.wav'); 
	$(beepSound).animate({volume: 1 * settings.volume * settings.maxAudio}, 0);
	
	// Desktop effects including alerts, sounds, and strobes.
	var effects = {
		alertsVar: 0,
		alerts: function() {
			if (effects.alertsVar < 100) {
				effects.alertsVar++;
				var randomTop = Math.floor((Math.random() * 110) - 20);
				var randomLeft = Math.floor((Math.random() * 110) - 20);
				var alertDiv = $('<div>').html(alertDuplicate);
				alertDiv.find('.alert').attr('style', 'margin-top: ' + randomTop + 'vw;margin-left: ' + randomLeft + 'vw;');
				$('.alerts').append(alertDiv.html());
				setTimeout(function() {
					effects.alerts();
				}, 10);
			} else {
				effects.alertsVar = 0;
			}
		},
		alertSoundVar: 0,
		alertSound: function() {
			if (effects.alertSoundVar < 15) {
				effects.alertSoundVar++;
				beepSound.currentTime = 0;
				beepSound.play();
				setTimeout(function() {
					effects.alertSound();
				}, 150);
			} else {
				effects.alertSoundVar = 0;
			}
		},
		strobeVar: 0,
		strobe: function() {
			if (effects.strobeVar < 50) {
				effects.strobeVar++;
				var waitTime = randomNumber() * 1;
				$('body').css({'filter': 'opacity(' + randomNumber() + '%)', 'background': 'rgb(' + randomNumber() + ', 0, 0)'});
				setTimeout(function() {
					effects.strobe();
				}, (waitTime + 10));
			} else {
				effects.strobeVar = 0;
				effects.restart();
			}
		},
		strobeBackgroundVar: 0,
		strobeBackground: function() {
			if (effects.strobeBackgroundVar < 10) {
				effects.strobeBackgroundVar++;
				console.log(Math.floor(Math.random(1) * 2));
				if (Math.floor(Math.random(1) * 2) === 1) {
					$('body').css({'filter': 'opacity(100%)', 'background': "url('../_images/windows10.jpg') center right no-repeat", 'background-size': "cover"});
				} else {
					$('body').css({'filter': 'opacity(100%)', 'background': "url('../_images/glitch.gif') center repeat", 'background-size': "cover"});
				}
				var waitTime = randomNumber() * 3;
				setTimeout(function() {
					effects.strobeBackground();
				}, (waitTime + 10));
			} else {
				effects.strobeBackgroundVar = 0;
				$('body').css({'filter': 'opacity(100%)', 'background': "url('../_images/windows10.jpg') center right no-repeat", 'background-size': "cover"});
			}
		},
		restart: function() {
			$(backgroundAudio).animate({volume: 0}, 1000);
			var suspenseSound = new Audio('../sounds/suspense.wav'); 
			$(suspenseSound).animate({volume: 1 * settings.volume}, 0);
			suspenseSound.play();
			$('body').css({'filter': 'opacity(100%)', 'background': 'rgb(0, 0, 0)'});
			$('.screen').css({'filter': 'opacity(100%)', 'background': 'rgb(0, 0, 0)'});
			$('.screen').animate({'opacity': 0}, 2000);
			setTimeout(function() {
				$('.alerts').html('');
				$('.restarting').show();
				$('.restarting').animate({'opacity': '1'}, 2000);
				$(backgroundAudio).animate({volume: 1 * settings.maxAudio * settings.volume}, 5000);
				setTimeout(function() {
					effects.start();
					closeAllPrograms();
				}, 4000)
			}, 4000);
		},
		start: function() {
			$('.restarting').animate({'opacity': '0'}, 2000);
			$('.screen').css({'filter': 'opacity(100%)', 'background': 'transparent'});
			$('.screen').animate({'opacity': 1}, 2000);
			setTimeout(function() {
				$('.restarting').hide();
				$('body').css({'filter': 'opacity(100%)', 'background-size': "cover"});
				effects.strobeBackground();
				startRound();
			}, 2000)
		}
	};
	
	/*
  _   _       _   _  __       
 | \ | |     | | (_)/ _|      
 |  \| | ___ | |_ _| |_ _   _ 
 | . ` |/ _ \| __| |  _| | | |
 | |\  | (_) | |_| | | | |_| |
 |_| \_|\___/ \__|_|_|  \__, |
                         __/ |
                        |___/ 
						
	Notify
	*/

	function clearNotifications() {
		$('.notifications').html('');
	}
	
	// Function used for pushing desktop notificiations
	function notification(title, subtitle) {
		// If statement defines the icon located next to message
		if (title === 'New Message') {
			$('.notifications').prepend('<li><i class="fa fa-skype" aria-hidden="true"></i>' + title + '<span>' + subtitle + '</span></li>');
		} else if (title === 'Antivirus') {
			$('.notifications').prepend('<li><i class="fa fa-shield" aria-hidden="true"></i>' + title + '<span>' + subtitle + '</span></li>');
		} else {
			// Make icon a circle if unknown notification type
			$('.notifications').prepend('<li><i class="fa fa-exclamation-triangle" aria-hidden="true"></i>' + title + '<span>' + subtitle + '</span></li>');
		}
	}
	
	$(".notifications").on("click", "li", function(){
		$(this).remove();
		if ((($(this).html()).toString()).contains('New Message')) {
			appWindow.open($('i[data-icon="Messenger"]'));
		}
	});
	
	/*
  __  __                                          
 |  \/  |                                         
 | \  / | ___  ___ ___  ___ _ __   __ _  ___ _ __ 
 | |\/| |/ _ \/ __/ __|/ _ \ '_ \ / _` |/ _ \ '__|
 | |  | |  __/\__ \__ \  __/ | | | (_| |  __/ |   
 |_|  |_|\___||___/___/\___|_| |_|\__, |\___|_|   
                                   __/ |          
                                  |___/           
	Messenger
	*/

	// Add message to messenger
    function addMessage(user, message) {
		if (user === 'You') {
			$(".messages").append('<li style="margin-left: 50px;"><span>' + user + ':</span> ' + message + '</li>');
		} else {
    		$(".messages").append('<li style="margin-right: 50px;"><span>' + user + ':</span> ' + message + '</li>');
		}
		var messages = document.getElementsByClassName('messages')[0];
  		messages.scrollTop = messages.scrollHeight;
    }

	// Add message when enter is pressed inside of messenger
    $('.messengerInput').on('keyup', function (e) {
	    if (e.keyCode === 13) {
	        addMessage('You', $(this).val());
	        $(this).val('');
	    }
	});
	
	/*
 __          __  _         _ _            
 \ \        / / | |       (_) |           
  \ \  /\  / /__| |__  ___ _| |_ ___  ___ 
   \ \/  \/ / _ \ '_ \/ __| | __/ _ \/ __|
    \  /\  /  __/ |_) \__ \ | ||  __/\__ \
     \/  \/ \___|_.__/|___/_|\__\___||___/
                                          
    Websites
	*/

	// Array of valid websites
	var websites = ['removemyvirus'];
	var accessAnyWebsite = false; // Whether or not the web browser can access any website on the web (iframe)
	
	// Hide all websites on page load
	$('.website').hide();

	// Change website in browser
	function gotoWebsite(website) {
		$('.website').hide();
		var found = 'notfound';
		var lastitem = websites[websites.length - 1];

		var ctr = 0;
		websites.forEach(function(element, index, array){
			if (website.toLowerCase().includes(element)) {
				found = element;
			}
		    ctr++; 
		    if (ctr === array.length) {
		    	if (found != 'notfound') {
			    	var thisWebsite = $('.website' + found.capitalize());
					thisWebsite.css({'height': 0});
					thisWebsite.show();
					thisWebsite.stop().animate({'height': '100%'}, 2000);
				} else {
					if (accessAnyWebsite === true) {
						var thisWebsite = $('.anyWebsite');
						$('.anyWebsite iframe').attr('src', website);
						thisWebsite.css({'height': 0});
						thisWebsite.show();
						thisWebsite.stop().animate({'height': '100%'}, 2000);
					} else {
						var thisWebsite = $('.websiteNotfound');
						thisWebsite.css({'height': 0});
						thisWebsite.show();
						thisWebsite.stop().animate({'height': '100%'}, 2000);
					}
				}
			}
		});
	}
	
	// Search when enter is pressed in searchbar
	$('.searchbar input').on('keyup', function (e) {
	    if (e.keyCode === 13) {
	        gotoWebsite($(this).val());
	    }
	});
	
	// Refresh page on refresh icon click
	$('.searchbar i').click(function() {
		gotoWebsite($('.searchbar input').val());
	});
	
	/*
  __  __           _      
 |  \/  |         (_)     
 | \  / |_   _ ___ _  ___ 
 | |\/| | | | / __| |/ __|
 | |  | | |_| \__ \ | (__ 
 |_|  |_|\__,_|___/_|\___|
                          
    Music
	*/
	
	// SPoOky background music - Yes I made it!
    var backgroundAudio = new Audio('./../sounds/spacyyy.wav'); 
    backgroundAudio.addEventListener('ended', function() {
    	this.currentTime = 0;
    	this.play();
	}, false);
	var interacted = false;
	window.addEventListener('click', () => {
		if (interacted) return null;
		interacted = true;
		
		backgroundAudio.play();
		$(backgroundAudio).animate({volume: 0}, 0);
		// Fade in background audio from 0 to 100% in 10 seconds
		$(backgroundAudio).animate({volume: 0.5 * settings.maxAudio * settings.volume}, 10000);
	});

    /*
   _____                      
  / ____|                     
 | |  __  __ _ _ __ ___   ___ 
 | | |_ |/ _` | '_ ` _ \ / _ \
 | |__| | (_| | | | | | |  __/
  \_____|\__,_|_| |_| |_|\___|
                              
    Game
    */

	// Makes programs draggable
    $('.programVirus').draggable({
        containment: ".programContainer",
        handle: ".menuIcons"
    }).resizable({
        containment: ".programContainer",
        handles: "se",
        minWidth: 750,
        minHeight: 250
    });

	// Contains player traits
    var hero = {
	    health: 100, // Amount of health hero has 0 - 100
	    chargeAmount: 0, // Current amount of charge the hero has for the shield
	    chargeRegenSpeed: 10, // Amount of charge added to amount per second - once at 100 the shield is ready for use
	    dead: false, // If the hero is dead
	    class: null, // Hero's class
	    abilities: {
	    	shieldDuration: 1, // How long the shield lasts until it disinigrates
	    	chargeRegenMultiplier: 1, // Regen multiplier for the GREEN class
	    	pauseTime: 1 // 1 = Pausing time is disabled, 2 = Time is enabled but has not been paused yet, 3 = Time is currently paused, 4 = Time has been used once and can be used one more time, 5 = Time has been used twice and can no longer be used
	    },
	    level: 1,
	    coins: 0,
	    items: {
	    	battery: 0,
	    	calculator: 0
	    }
	};

	// Contains enemy traits
	var bit = {
		movementSpeed: 50, // Amount of drag of bits
		creationSpeed: 10, // The amount of bits created per second
		continueCreation: false, // Wether or not bits should be currently created -- Stops during transition scenes
	    0: {
	      	damage: 1
	    },
	    1: {
	      	damage: 5
	    }
	};

	// How many times to update stats per second
	var updateSpeed = 4;

	// Regenerate charge
	setInterval(function() {
	    if ((hero.chargeAmount + ((hero.chargeRegenSpeed * hero.abilities.chargeRegenMultiplier)/updateSpeed)) < 100) {
	      	hero.chargeAmount = hero.chargeAmount + ((hero.chargeRegenSpeed * hero.abilities.chargeRegenMultiplier)/updateSpeed);
	      	$('.charge div').stop().animate({'width': hero.chargeAmount + '%'}, 1000/updateSpeed, 'linear');
	    } else {
	      	hero.chargeAmount = 100;
	      	$('.charge div').stop().animate({'width': hero.chargeAmount + '%'}, 1000/updateSpeed, 'linear');
	  	}
	}, 1000/updateSpeed);

	var $mouseX = parseInt($(document).width()) / 2
	var $mouseY = parseInt($(document).height()) / 2;
	var lastX = {}; // X locations of bits
	var lastY = {}; // Y locations of bits

	$(document).mousemove(function(e) {
	    $mouseX = e.pageX;
	    $mouseY = e.pageY;
	});

	var bitID = 0;
	var gameTime = 0;

	// Update the player's level
	function updateLevel() {
	    hero.level = Math.ceil((gameTime/1000)/20);
	    $('.level div').html(hero.level);
	    hero.chargeRegenSpeed = 10 + (hero.level * 5);
	}

	// Update the health when the player has a battery item
	setInterval(function() {
		if (((hero.health < 100) && (hero.items.battery === 1)) && (bit.continueCreation === true)) {
			hero.health++;
			updateBattery(hero.health);
			$('.health div').html(hero.health + '%');
		}
	}, 5000);

	// Create each bit
	function createBit() {
		lastX[bitID] = (parseInt(Math.random() * $(document).width()));
	    lastY[bitID] = (parseInt(Math.random() * $(document).height()));
	    $('.bits').append('<div class="bit" id="' + bitID + '">' + Math.floor(Math.random() * 2) + '</div>');
	    bitID++;
	    gameTime = gameTime + 1000/bit.creationSpeed; // Add milliseconds to how long the game has been running
	    updateLevel();
	    if (bit.continueCreation === true) {
	    	setTimeout(function() {
				createBit();
		    }, 1000/bit.creationSpeed);
	    }
	}

	// Update the battery icons
	function updateBattery(percent) {
	    percent = Math.ceil(percent/25)*25;
	    if (percent == 0) {
	      	$('.updateBattery').html('<i class="fa fa-battery-empty"></i>');
	    } else if (percent == 25) {
	      	$('.updateBattery').html('<i class="fa fa-battery-quarter"></i>');
	    } else if (percent == 50) {
	      	$('.updateBattery').html('<i class="fa fa-battery-half"></i>');
	    } else if (percent == 75) {
	      	$('.updateBattery').html('<i class="fa fa-battery-three-quarters"></i>');
	    } else {
	      	$('.updateBattery').html('<i class="fa fa-battery"></i>');
	    }
	}

	// Run when user dies
	function death() {
		if (hero.dead === false) {
			hero.dead = true;
			bit.continueCreation = false;
		    $('.bits').html('');
		    $('.bitGame').animate({'opacity': 0}, 1000);
		    setTimeout(function() {
		    	$('.bitGame').hide();
		    	effects.restart();
		    });
		}
	}

	// Add coins to hero and display on overlay
	function addCoins(coinsAmount) {
		hero.coins = hero.coins + coinsAmount;
		$('.coins div').html(hero.coins);
	}

	// Damage the orb based on the type of bit (1 or 0)
	function damageOrb(damageType) {
	    hero.health = hero.health - bit[damageType].damage;
	    if (hero.health > 0) {
	      	$('.health div').html(hero.health + '%');
	    } else {
	      	hero.health = 0;
	      	$('.health div').html(hero.health + '%');
	      	death();
	    }
	    
	    updateBattery(hero.health);
	}

	var moveBitsID; // Used to stop requestAnimationFrame

	// Animation function
	function moveBits() {
		var movementSpeed = bit.movementSpeed;
	    $('#orb').css({'left': $mouseX - 40, 'top': $mouseY - 40});
	    
	    $.each( $('.bits'), function(i, bit) {
	      	$('.bit', bit).each(function(index, value) {
	        	var thisBit = $(this);
	        	var thisBitID = thisBit.attr('id');
	        	
	        	if (hero.abilities.pauseTime !== 3) {
		        	lastX[thisBitID] += (($mouseX - lastX[thisBitID])/movementSpeed); // Drags the bits closer to mouse
		        	lastY[thisBitID] += (($mouseY - lastY[thisBitID])/movementSpeed);// Drags the bits closer to mouse
	        	}
	        	thisBit.css({left: (lastX[thisBitID] - 25)+'px', top: (lastY[thisBitID] - 25) +'px'}); // Centers bit to hit box
	        	if ((Math.abs((lastX[thisBitID]) - $mouseX) < 50) && (Math.abs((lastY[thisBitID]) - $mouseY) < 50)) {
	          		delete lastX[thisBitID];
	          		delete lastY[thisBitID];
	          		thisBit.remove();
	          
	          		damageOrb(parseInt(thisBit.html()));
	          
	          		console.log('DAMAGED BY ' + thisBitID);
	        	}
	        	$.each(shieldX, function(shieldXIndex, shieldXValue) { // Check if touching a shield
	          		if (Math.abs(lastX[thisBitID] - parseInt(shieldXValue) - 25) < 150) {
	            		if (Math.abs(lastY[thisBitID] - parseInt(shieldY[shieldXIndex]) - 25) < 150) {
	              			delete lastX[thisBitID];
	              			delete lastY[thisBitID];
	              			thisBit.remove();

	              			addCoins(1);
	              
	              			console.log('DESTROYED ' + thisBitID);
	            		}
	          		}
	        	});
	      }).promise().done(function() {
	        moveBitsID = requestAnimationFrame(moveBits);
	      });
	    });
	};

	var shieldX = {}; // List of all shield x coordinates
	var shieldY = {}; // List of all shield y coordinates
	var shieldID = 0;
	// When key is lifted
	$(document).keyup(function(e) {
	    if (e.which === 32) { // Space bar - Creates Shield
	      	if (hero.chargeAmount == 100) {
	       		hero.chargeAmount = 0;
	       		$('.charge div').stop().animate({'width': hero.chargeAmount + '%'}, 1000/updateSpeed, 'linear');
	       		shieldID++;
	       		var thisSheildID = shieldID;
	       		$('.shields').append('<div class="shield" id="shield' + thisSheildID + '" style="left: ' + ($mouseX - 25) + 'px;top: ' + ($mouseY - 25) + 'px;animation-duration:' + hero.abilities.shieldDuration + 's"></div>');
	       		shieldX[thisSheildID] = $('#shield' + thisSheildID).css('left');
	       		shieldY[thisSheildID] = $('#shield' + thisSheildID).css('top');
	       		setTimeout(function() {
	     			$('#shield' + thisSheildID).remove();
	          		delete shieldX[thisSheildID];
	          		delete shieldY[thisSheildID];
	        	}, (hero.abilities.shieldDuration * 1000));
	      	}
	    } else if (e.which === 70) { // F key - Pauses time
	    	if (hero.abilities.pauseTime === 2) {
	    		hero.abilities.pauseTime = 3;
	    		setTimeout(function() {
	    			hero.abilities.pauseTime = 4;
	    		}, 5000);
	    	} else if (hero.abilities.pauseTime === 4) {
	    		hero.abilities.pauseTime = 3;
	    		setTimeout(function() {
	    			hero.abilities.pauseTime = 5;
	    		}, 5000);
	    	}
	    }
	});

	// Hide elements that are to be shown later
	$('.lost').hide();
	$('.bitGame').hide();
	$('.pageTwo').hide();
	$('.pageThree').hide();

	// Designates current round
	var round = 0;

	// Display the game rules to the user before the round starts
	function showRules() {
		$('.virusUpdate').animate({'opacity': 0}, 250);
		setTimeout(function() {
			$('.pageOne').hide();
			$('.pageTwo').show();
			$('.virusUpdate').animate({'opacity': 1}, 250);
		}, 250);
	}

	// Set up hero's perks based on orb chosen
	function chooseOrb(thisOrb) {
		hero.class = thisOrb.attr('data-class');
		$('#orb').addClass('class' + (hero.class).capitalize());

		if (hero.class == 'purple') {
			hero.abilities.chargeRegenMultiplier = 2;
		} else if (hero.class == 'white') {
			hero.abilities.pauseTime = 2;
		} else {
			hero.abilities.shieldDuration = 3;
			$('.shield').css({'animation-duration': '3s'});
		}

		showRules();
	}

	// When one of the display orbs is chosen
	$('.orbs .orb').click(function() {
		chooseOrb($(this));
	});

	// Initiate the first round
	$('.startBitGame').click(function() {
		$('.programVirus').animate({'opacity': 0}, 1000); // Animate out virus program
		moveBitsID = requestAnimationFrame(moveBits);
		$('#orb').css({'transform': 'none'}); // Reset centering because the animation frame accounts for the centering

		setTimeout(function() {
			$('.icon[data-icon="Virus"]').remove(); // Hide the program in order for game play to commense
			$('.programVirus').hide(); // Remove from DOM
			bit.creationSpeed = 4;
			bit.movementSpeed = 150;
			setTimeout(function() {
				createBit(); // Start the creation of enemies
				$('.itemsContainer').show();
			}, 2000);
		}, 1000)
	});

	// Initiate the round
	function startRound() {
		round++;
		$('.bitGame').show().animate({'opacity': 1}, 1000)

		// Next 6 lines resets hero for next round
		bit.continueCreation = true;
		hero.dead = false;
		hero.health = 100;
		hero.abilities.pauseTime = 0;
		$('.health div').html(hero.health + '%');
		updateBattery(hero.health);
		if (round === 1) {
			$('.round h4').html('ROUND 1');

			programs = ['Virus']; // This prevents other programs from being opened except for the virus program
			$('.taskbarLeft').append('<i class="icon fa fa-exclamation-triangle" aria-hidden="false" data-icon="Virus"></i>');
			appWindow.open($('.icon[data-icon="Virus"]'));
		} else if (round === 2) {
			$('.round h4').html('ROUND 2');
			bit.creationSpeed = 4;
			bit.movementSpeed = 100;
			setTimeout(function() {
				createBit();
			}, 2000);
		} else if (round === 3) {
			$('.round h4').html('ROUND 3');
			bit.creationSpeed = 10;
			bit.movementSpeed = 100;
			setTimeout(function() {
				createBit();
			}, 2000);
		} else if (round === 4) { // FINAL ROUND
			$('.round h4').html('FINAL ROUND');
			bit.creationSpeed = 15;
			bit.movementSpeed = 50;
			setTimeout(function() {
				createBit();
			}, 2000);
		} else {
			if (hero.coins >= 250) { // Player won with greater than or equal to 250 coins
				$('.bitGame').animate({'opacity': 0}, 1000);
				$('.pageOne').hide(); // Hide other pages
				$('.pageTwo').hide(); // Hide other pages
				$('.pageThree').show(); // Show won screen
				accessAnyWebsite = true; // Allow the web browser to access any website
				setTimeout(function() {
					$('.bitGame').hide();
					$('.programVirus').show().animate({'opacity': 1}, 1000);
					$('.taskbarLeft').append('<i class="icon fa fa-exclamation-triangle" aria-hidden="false" data-icon="Virus"></i>');
					appWindow.open($('.icon[data-icon="Virus"]'));
				}, 1000);
			} else { // Player lost
				$('.bitGame').animate({'opacity': 0}, 1000);
				setTimeout(function() {
					$('.bitGame').hide();
					$('.screen').animate({'opacity': 0}, 2000)
					setTimeout(function() {
						$('.lost').show().animate({'opacity': 1}, 5000);
					}, 2000);
				}, 1000);
			}
		}
	}

	// User won the game and thus can close the virus by clicking this button
	$('.okay').click(function() {
		$('.programVirus').hide();
		$('.icon[data-icon="Virus"]').remove();
		programs = ['Browser', 'Messenger', 'Virus']; // Reset usable programs
	});

	var isMenuOpen = false;
	$('.itemsContainer').hide(); // Hide from DOM until game starts so it doesn't overlay other elements

	// Open purchase items menu
	$('.openItems').click(function() {
		if (isMenuOpen === false) {
			isMenuOpen = true;
			$('.itemsContainer').animate({'height': 320}, 1000);
			$('.openItems').html('Items').css({'background-color': 'rgba(255, 255, 255, 0.3)', 'font-size': '24px'});
			bit.continueCreation = false;
			cancelAnimationFrame(moveBitsID);
			$('#orb').hide();
		}
	});

	// Close purchase items menu
	$('.closeItems').click(function() {
		if (isMenuOpen === true) {
			isMenuOpen = false;
			$('.itemsContainer').animate({'height': 40}, 1000);
			$('.openItems').html('Click to Purchase Items').css({'background-color': 'rgba(255, 255, 255, 0)', 'font-size': '18px'});
			bit.continueCreation = true;
			createBit();
			moveBitsID = requestAnimationFrame(moveBits);
			$('#orb').show();
		}
	});

	// Purchase battery item
	$('.items .fa-battery').click(function() {
		if ((hero.items.battery === 0) && (hero.coins >= 100)) { // Only able to purchase one
			hero.items.battery = 1;
			hero.coins = hero.coins - 100;
			$(this).css({'color': '#666', 'cursor': 'default'});
		}
	});

	// Purchase calculator item
	$('.items .fa-calculator').click(function() {
		if ((hero.items.calculator === 0) && (hero.coins >= 300)) { // Only able to purchase one
			hero.items.calculator = 1;
			hero.coins = hero.coins - 300;
			$(this).css({'color': '#666', 'cursor': 'default'});
			hero.abilites.chargeRegenMultiplier = hero.abilites.chargeRegenMultiplier * 1.25;
		}
	});
});