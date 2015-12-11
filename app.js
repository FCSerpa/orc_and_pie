$(document).ready(function(){

initialize();

})

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

function initialize(){
	btnPress1();
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
			// if (steal()){
			// 	$('#pTxt').text('You successfully sneak up behind the orc and steal the pie out from under his nose!  I hope you like ' + flavor() + '.');
			// 	$('div#btnDiv').empty();
			// } else {
			// 	$('#pTxt').text('You fail to sneak up on the orc.  It looks really mad.  It swings a greataxe at your face.');
			// 	if (attackPC()){
			// 		$('#pTxt').append('<br>The orc rolls a ' + roll1 + ' and hits you for ' + damage + ' damage! You have ' + character.hp + ' hit points left.');
			// 	} else {
			// 		$('#pTxt').append('<br>The orc rolls a ' + roll1 + ' and misses you.');
			// 	}
			// 	if (isDead()){
			// 		$('#pTxt').append('<br>You have perished.  The orc enjoys its pie over your mutilated corpse.');
			// 		$('div#btnDiv').empty();
			// 	} else {
			// 		$('div#btnDiv').empty();
			// 		$('div#btnDiv').append('<button id="attack">Draw a sword and stab the orc.</button id="run"><button>Run away!</button>');
			// 	}
			// }
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

function toHitPC(){
	roll1 = d(20);
	if (roll1 + 5 >= character.ac){
		return true;
	} else {
		return false;
	}
};

function weaponDamage(){
	return (d(character.weapon) + 3);
};

function backStab(){
	if (d(20) + 5 >= 10){
		if (toHitOrc() || toHitOrc()){
			orcHP -= weaponDamage() + d(6);
		}
	} else {
		characterWeaponAttack();
	}
};

function characterWeaponAttack(){
	if (toHitOrc()) {
		orcHP -= weaponDamage();
	}
};

function magicMissile(){
	orcHP -= d(4) + d(4) + d(4) + 3;
};

function charm(){
	if(d(20) + 5 >= 20){
		return true;
	} else {
		return false;
	}
};

function steal(){
	if((d(20) + 5 >= 10) && (d(20) + 5 >= 15)){
		$('#pTxt').text('You successfully sneak up behind the orc and steal the pie out from under his nose!  I hope you like ' + flavor() + '.');
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
			$('#pTxt').append('<br>You have perished.  The orc enjoys its pie over your mutilated corpse.');
			$('div#btnDiv').empty();
		} else {
			$('div#btnDiv').empty();
			$('div#btnDiv').append('<button id="attack">Draw a sword and stab the orc.</button id="run"><button>Run away!</button>');
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
		return 'apple';
	} else if (pieRoll === 3){
		return 'blueberry';
	} else if (pieRoll === 4){
		return 'lemon meringue';
	} else if (pieRoll === 5){
		return 'banana cream';
	} else if (pieRoll === 6){
		return 'cherry';
	}
}

function isDead(){
	if (character.hp <= 0){
		return true;
	} else {
		return false;
	}
}

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