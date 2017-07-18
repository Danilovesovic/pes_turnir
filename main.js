var tBody = document.getElementsByTagName('tbody')[0];
var gamesBody = document.getElementsByTagName('tbody')[1];
var modalHeader = document.getElementsByClassName('modal-title')[0];
var currentGame;
var player1;
var player2;
var db = [
{
	position : 0,
	name : "Danilo",
	dati_golovi : 0,
	primljeni_golovi : 0,
	bodovi : 0,
	razlika : 0
},{
	position : 0,
	name : "Uros",
	dati_golovi : 0,
	primljeni_golovi : 0,
	bodovi : 0,
	razlika : 0
},{
	position : 0,
	name : "Bates",
	dati_golovi : 0,
	primljeni_golovi : 0,
	bodovi : 0,
	razlika : 0
},{
	position : 0,
	name : "Cvejic",
	dati_golovi : 0,
	primljeni_golovi : 0,
	bodovi : 0,
	razlika : 0
},{
	position : 0,
	name : "Marko",
	dati_golovi : 0,
	primljeni_golovi : 0,
	bodovi : 0,
	razlika : 0
}
];
var allGames = [];
var randomGames = [];
displayTable();
displayGames();


function displayTable() {
	db.sort(function (a,b) {
		if (a.bodovi - b.bodovi === 0) {
			if (a.razlika > b.razlika) {
				return 1;
			}else if(a.razlika < b.razlika){
				return -1;
			}else{
				return 0;
			}
		}
		return a.bodovi - b.bodovi;
	})
	db.reverse()
	
	var text = ``;
	for (var i = 0; i < db.length; i++) {
		text += `
<tr>

<td>${db[i].name}</td>
<td>${db[i].dati_golovi}</td>
<td>${db[i].primljeni_golovi}</td>
<td>${db[i].razlika}</td>
<td>${db[i].bodovi}</td>
</tr>`;
	}
	tBody.innerHTML = text;
}

function displayGames() {
	
	for (var i = 0; i < db.length; i++) {
		var name = db[i].name;
		for (var y = 0; y < db.length; y++) {
			var text = "";
			if (name !== db[y].name) {
				text = `${name} vs ${db[y].name}`;
				allGames.push(text);
			}
		}
		}
		randomizeGames()

}

function randomizeGames() {
	for (var i = 0; i < 20; i++) {
		var rand = Math.floor(Math.random()*allGames.length);
		randomGames.push(allGames[rand]);
		allGames.splice(rand,1);
	}
	showAllGames();
}

function showAllGames() {
	var text = "";
	for (var i = 0; i < randomGames.length; i++) {
		var names = randomGames[i].split(" ");
		text += `
<tr>
<td>${names[0]}</td>
<td> VS </td>
<td>${names[2]}</td>

<td><button id="${i}" class="btn btn-sm btn-info" data-toggle="modal" data-target="#myModal" onclick="enterScore(this)">Play</button></td>
</tr>
`
	}
	gamesBody.innerHTML = text;
}

function enterScore(self) {
	currentGame = self.id;
	var names = randomGames[self.id].split(" ");
	modalHeader.innerHTML = names[0] + "  VS  "+names[2];
	player1 = names[0];
	player2 = names[2];
}

function finalConfirmFunc() {
	var score1 = document.getElementById('score1');
	var score2 = document.getElementById('score2');
	var currentBtn = document.getElementById(currentGame.toString());
	currentBtn.setAttribute('disabled','disabled');
	currentBtn.innerHTML = "Finished  " + score1.value + " : "+score2.value;
	currentBtn.className = "btn btn-sm btn-danger"
	var player1Obj = db.filter(function (e) {
		return e.name === player1;
	})[0];
	var player2Obj = db.filter(function (e) {
		return e.name === player2;
	})[0];
	player1Obj.dati_golovi += parseInt(score1.value);
	player1Obj.primljeni_golovi += parseInt(score2.value);
	player2Obj.dati_golovi += parseInt(score2.value);
	player2Obj.primljeni_golovi += parseInt(score1.value);

	if (score1.value > score2.value) {
		player1Obj.bodovi += 3;
	}else if(score1.value < score2.value){
		player2Obj.bodovi += 3;
	}else {
		player1Obj.bodovi++;
		player2Obj.bodovi++;
	}

	player1Obj.razlika = player1Obj.dati_golovi - player1Obj.primljeni_golovi;
	player2Obj.razlika = player2Obj.dati_golovi - player2Obj.primljeni_golovi;

	score1.value = "";
	score2.value = "";

	tBody.innerHTML = "";
	displayTable();

}