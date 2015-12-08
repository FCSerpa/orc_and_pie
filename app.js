$(document).ready(function(){


})

function PC(characterClass) {
	this.characterClass = characterClass;
	this.hitPoints = 12;
	this.ac = 10;
	//rage? other special abilities?
};

var orcHitPoints = 15;

function d(num){
	return Math.floor(Math.random() * num + 1);
}

function toHitOrc(){
	if (d(20) + 5 >= 13){
		return true;
	} else {
		return false;
	}
};

function toHitPC(ac){
	if (d(20) + 5 >= ac){
		return true;
	} else {
		return false;
	}
};

function weaponDamage(die){
	return (d(die) + 3);
};


