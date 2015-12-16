$(document).ready(function(){

initialize();

});

function PC(characterClass) {
	this.characterClass = characterClass;
	this.hp = 12;
	this.ac = 10;
	this.weapon = 8;
	//rage? other special abilities?
};

var orcHP = 15;
var roll1 = 20;
var roll2 = 20;
var damage = 1;
var result = 'hits';
var pie;

function initialize(){
	btnPress1();
	$("#attack").click(function(){
		characterWeaponAttack();
	});
	$("#run").click(function(){
		runAway();
	});
	$("#reset").click(function(){
		reset();
	});
}

function btnPress1(){
	$(".firstBtn").click(function(){
		character = new PC($(this).attr('id'));
		getPCHP();
		getPCAC();
		getWeapon();
		if (character.characterClass === "ass"){
			backStab();
		} else if (character.characterClass === "wiz") {
			magicMissile();
		} else if (character.characterClass === "brd") {
			charm();
		} else if (character.characterClass === "rog") {
			steal();
		} else {
			characterWeaponAttack();
		}
		console.log(character);
		console.log(orcHP);
	});
};

function getPCHP(){
	if (character.characterClass === "brb") {
		character.hp = 15;
	} else if (character.characterClass === "ftr" || character.characterClass === "rng"){
		character.hp = 13;
	} else if (character.characterClass === "rog" || character.characterClass === "ass" || character.characterClass === "brd"){
		character.hp = 10;
	}  else {
		character.hp = 8;
	}
}

function getPCAC(){
	if (character.characterClass === "ftr") {
		character.ac = 18;
	} else {
		character.ac = 15;
	}
}

function getWeapon(){
	if (character.characterClass === "brb") {
		character.weapon = 12;
	} else if (character.characterClass === "wiz") {
		character.weapon = 4;
	} else {
		character.weapon = 8;
	}
}

function d(num){
	return Math.floor(Math.random() * num + 1);
}

function toHitOrc(){
	roll1 = d(20);
	if (roll1 + 5 >= 13){
		return true;
	} else {
		return false;
	}
};

function toHitOrcAdv(){
	toHitOrc();
	roll2 = d(20);
	if (roll2 > roll1){
		roll1 = roll2;
	}
	if (roll1 + 5 >= 13){
		return true;
	} else {
		return false;
	}
}

function toHitOrcDis(){
	toHitOrc();
	roll2 = d(20);
	if (roll2 < roll1){
		roll1 = roll2;
	}
}

function toHitPC(){
	roll1 = d(20);
	if (roll1 + 5 >= character.ac){
		return true;
	} else {
		return false;
	}
};

function weaponDamage(){
	damage = (d(character.weapon) + 3);
	return damage;
};

function backStab(){
	if (d(20) + 5 >= 10){
		$('#pTxt').html('You succeed at sneaking up on the orc, ');
		if (toHitOrcAdv()){
			damage = weaponDamage() + d(6);
			orcHP -= damage;
			$('#pTxt').append('and you roll a ' + roll1 + ' and hit the orc for ' + damage + ' damage. ');
		} else {
			$('#pTxt').append('but you roll a ' + roll1 + ' and miss the orc. ');
		}
		if (orcHP <= 0){
			$('#pTxt').append('You have defeated the orc.  You can now help yourself to the pie.  I hope you like ' + flavor() + '.<br>' + youAre());
			$('div#btnDiv').empty();
		} else {
			$('#pTxt').append('The orc is still alive. It looks really mad.  It swings a greataxe at your face.');
			if (attackPC()){
				$('#pTxt').append('<br>The orc rolls a ' + roll1 + ' and hits you for ' + damage + ' damage! You have ' + character.hp + ' hit points left.');
			} else {
				$('#pTxt').append('<br>The orc rolls a ' + roll1 + ' and misses you.');
			}
			if (isDead()){
				$('#pTxt').append('<br>You have perished.  The orc enjoys its ' + flavor() + ' pie over your mutilated corpse.');
				$('div#btnDiv').empty();
			} else {
				$('div#btnDiv').empty();
				$('div#btnDiv').append('<button id="attack">Stab at the orc again!</button><button id="run">Run away!</button>');
			}
		}
	} else {
		$('#pTxt').html('You fail at sneaking up on the orc, but since you\'re already right behind it, you try to stab it anyway. <br>');
		(characterWeaponAttack())
	}
};

function characterWeaponAttack(){
	if (toHitOrc()) {
		orcHP -= weaponDamage();
		$('#pTxt').html('You roll a ' + roll1 + ' and hit the orc for ' + damage + ' damage. ');
	} else {
		$('#pTxt').append('You roll a ' + roll1 + ' and miss the orc. ');
	}
	if (orcHP <= 0){
		$('#pTxt').append('You have defeated the orc.  You can now help yourself to the pie.  I hope you like ' + flavor() + '.<br>' + youAre());
		$('div#btnDiv').empty();
	} else {
		$('#pTxt').append('The orc is still alive. It looks really mad.  It swings a greataxe at your face.');
		if (attackPC()){
			$('#pTxt').append('<br>The orc rolls a ' + roll1 + ' and hits you for ' + damage + ' damage! You have ' + character.hp + ' hit points left.');
		} else {
			$('#pTxt').append('<br>The orc rolls a ' + roll1 + ' and misses you.');
		}
		if (isDead()){
			$('#pTxt').append('<br>You have perished.  The orc enjoys its ' + flavor() + ' pie over your mutilated corpse.');
			$('div#btnDiv').empty();
		} else {
			$('div#btnDiv').empty();
			$('div#btnDiv').append('<button id="attack">Attack the orc again!</button><button id="run">Run away!</button>');
		}
	}
};

function magicMissile(){
	damage = d(4) + d(4) + d(4) + 3;
	orcHP -= damage;
	$('#pTxt').html('Three magic missiles fly at the orc and hit the it for ' + damage + ' damage. ');
	if (orcHP <= 0){
		$('#pTxt').append('You have defeated the orc.  You can now help yourself to the pie.  I hope you like ' + flavor() + '.<br>');
		$('div#btnDiv').empty();
	} else {
		$('#pTxt').append('The orc is injured, but alive. It looks really mad.  It swings a greataxe at your face.');
		if (attackPC()){
			$('#pTxt').append('<br>The orc rolls a ' + roll1 + ' and hits you for ' + damage + ' damage! You have ' + character.hp + ' hit points left.');
		} else {
			$('#pTxt').append('<br>The orc rolls a ' + roll1 + ' and misses you.');
		}
		if (isDead()){
			$('#pTxt').append('<br>You have perished.  The orc enjoys its ' + flavor() + ' pie over your mutilated corpse.');
			$('div#btnDiv').empty();
		} else {
			$('div#btnDiv').empty();
			$('div#btnDiv').append('<button id="attack">Try to electrocute the orc with a shocking grasp spell.</button id="run"><button>Run away!</button>');
		}
	}
};

function charm(){
	if(d(20) + 5 >= 20){
		$('#pTxt').html('Your kind words somehow charm the orc. Now you will both have pie!  I hope you like ' + flavor() + '.<br>' + youAre());
		$('div#btnDiv').empty();
	} else {
		$('#pTxt').text('You fail to sweet talk the orc.  First it looks comfused, then it looks really mad, then it swings a greataxe at your face.');
		if (attackPC()){
			$('#pTxt').append('<br>The orc rolls a ' + roll1 + ' and hits you for ' + damage + ' damage! You have ' + character.hp + ' hit points left.');
		} else {
			$('#pTxt').append('<br>The orc rolls a ' + roll1 + ' and misses you.');
		}
		if (isDead()){
			$('#pTxt').append('<br>You have perished.  The orc enjoys its ' + flavor() + ' pie over your mutilated corpse.');
			$('div#btnDiv').empty();
		} else {
			$('div#btnDiv').empty();
			$('div#btnDiv').append('<button id="attack">Draw a sword and stab the orc.</button><button id="run">Run away!</button>');
		}
	}
};

function steal(){
	if((d(20) + 5 >= 10) && (d(20) + 5 >= 15)){
		$('#pTxt').html('You successfully sneak up behind the orc and steal the pie out from under his nose!  I hope you like ' + flavor() + '.<br>' + youAre());
		$('div#btnDiv').empty();
		//return true;
	} else {
		$('#pTxt').text('You fail to sneak up on the orc.  It looks really mad.  It swings a greataxe at your face.');
		if (attackPC()){
			$('#pTxt').append('<br>The orc rolls a ' + roll1 + ' and hits you for ' + damage + ' damage! You have ' + character.hp + ' hit points left.');
		} else {
			$('#pTxt').append('<br>The orc rolls a ' + roll1 + ' and misses you.');
		}
		if (isDead()){
			$('#pTxt').append('<br>You have perished.  The orc enjoys its ' + flavor() + ' pie over your mutilated corpse.');
			$('div#btnDiv').empty();
		} else {
			$('div#btnDiv').empty();
			$('div#btnDiv').append('<button id="attack">Draw a sword and stab the orc.</button><button id="run">Run away!</button>');
		}
		//return false;
	}
};

function attackPC(){
	if (toHitPC()){
		damage = d(12) + 3;
		character.hp -= damage;
		return true;
	} else {
		return false;
	}
}

function flavor(){
	var pieRoll = d(6);
	if (pieRoll === 1){
		return 'pumpkin';
	} else if (pieRoll === 2){
		pie = 'apple';
		return pie;
	} else if (pieRoll === 3){
		pie = 'blueberry';
		return pie;
	} else if (pieRoll === 4){
		pie = 'lemon meringue';
		return pie;
	} else if (pieRoll === 5){
		pie = 'banana cream';
		return pie;
	} else if (pieRoll === 6){
		pie = 'cherry';
		return pie;
	}
}

function isDead(){
	if (character.hp <= 0){
		return true;
	} else {
		return false;
	}
};

function youAre(){
	if (character.characterClass === 'ass') {
		return 'You are an <strong>Assassin</strong>! You defeat your enemies with stealth and treachery.';
	} else if (character.characterClass === 'rog') {
		return 'You are a <strong>Rogue</strong>! You\'re all sneaky and stuff.';
	} else if (character.characterClass === 'wiz') {
		return 'You are a <strong>Wizard</strong>! You are a master of the arcane arts.';
	} else if (character.characterClass === 'brd') {
		return 'You are a <strong>Bard</strong>! You try to solve your problems with your wits and force of personality.';
	} else if (character.characterClass === 'brb') {
		return 'You are a <strong>Barbarian</strong>! You defeat your foes with primal fury.';
	} else if (character.characterClass === 'ftr') {
		return 'You are a <strong>Bard</strong>! You defeat your foes with your strength and tactics.';
	} else if (character.characterClass === 'rng') {
		return 'You are a <strong>Bard</strong>! You defeat your favored enemies with cunning and skill.';
	}
};

function runAway(){

};

function reset(){
	orcHP = 15;
	$('#pTxt').html('You enter a room.  In the center of the room is a table with a delicious looking pie on it.  An orc looks like he\'s about to eat the pie.  What do you do?');
	$('div#btnDiv').empty();
	$('div#btnDiv').append('<button id="brb" class="firstBtn">Charge the orc, swinging a huge axe at its head.</button><button id="ftr" class="firstBtn">Approach the orc cautiously with sword and shield.</button><button id="rng" class="firstBtn">Shoot the orc with a bow from where you are.</button><button id="wiz" class="firstBtn">Cast a spell throwing magical bolts of energy at the orc.</button><button id="ass" class="firstBtn">Sneak up on the orc, and stab it in the back.</button><button id="rog" class="firstBtn">Sneak up on the orc, and try to steal the pie.</button><button id="brd" class="firstBtn">Kindly ask the orc if it would like to share its pie.</button>');
	btnPress1();
};

/* some useful strings
'You roll a num and hit the orc for num damage.'
'You roll a num and miss the orc.'
'The magic missiles hit the orc for num damage'
'You have defeated the orc.  You can now help yourself to the pie.  I hope you like flavor.'
'The orc attacks you!'
'The orc rolls a num and hits you for num damage! You have num hit points left.'
'You have perished.  The orc enjoys its pie over your mutilated corpse.'
'You successfully sneak up behind the orc and steal the pie out from under his nose!  I hope you like flavor.'
'You fail to sneak up on the orc.  It looks really mad.  It swings a greataxe at your face.'
'Your words somehow charm the orc. Now you both have pie!  I hope you like flavor.'
*/