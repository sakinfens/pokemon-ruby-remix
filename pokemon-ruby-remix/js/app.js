// things to do today
// create actual game logic
// 	userpoke and initial NPC poke has a set health 
// 	once user defeats NPC they can now chose from poke list which which poke
// 		user uses moves to fight
// 		each move has a set attack point 
// 		once user hits the NPC has a turn to hit
// 		first hit to win 
// 	they want to fight next
// 	user must defeat pokemon to move onto the next.
// 	after every battle users health goes up
//style
// match images with pokemon
// 






let index = 0;
let array = [];
let lazyArray =[];
let helpArray =[];
let leaderArray = [];
let legendArray = [];
let pokemon

/////////Fight game

const renderGame = () =>{
	const $btton = $('<button>').text('Close');
	$('.text-box').append($btton)
	$btton.on('click', function(){
		$('.modal').hide();
	})
	$('.modal').hide();
	const $button = $('<button>').text('FIGHT').attr('id', 'fight-button');
	$('.fighting').append($button);


	
}


const fight = () =>{
	$('#fight-button').hide();
	$('.info h1').text('A Gengar has appeared! Use your moves to fight him off!')
	console.log('stay')
}




$('.fighting').on('click','button', function(){
	fight();

});

const moves = (data) =>{
	$('.npc').hide();
	const move = $(event.target)[0].innerText;
	$('section h1').text(`You used ${move} Your hit landed, the Badoof has fainted!!!`);
	
}
/////////////






//answers correlating with the pokemon type




const pokeAnswers = {
	lazyAnswers : ['too much work','too much work','most likely','I love pinnaple'],
	helpfullAnswers : ['most likely', 'somewhat', 'likely', 'I guess I would eat it of someone ordered it'],
	leaderAnswers : ['likely', 'most likely', 'never', 'I am willing to try something new'],
	legendAnswers:['somewhat', 'likely', 'somewhat', 'Only pessants eat that such disgusting things'],
}
const pokeDexList = {
	list: ['slaking', 'snorlax', 'magikarp', 'chansey', 'audino', 'wigglytuff', 'pikachu', 'blaziken', 'squirtle', 'rayquaza'],
	images: ['images/slakingimg.png', 'images/snorlaximg.png', 'images/magikarpimg.png', 'images/chanseyimg.png', 'images/audinoimg.png', 'images/wigglytuffimg.png', 'images/pikachuimg.png', 'images/blazikenimg.png', 'images/squirtleimg.png', 'images/rayquazaimg.png']
}
const pokeDex = [
	{
		lazyPokemon : ['slaking', 'snorlax', 'magikarp'],
		images: ['images/slakingimg.png', '', '']
	},
	{
		helpFullPokemon : ['chansey', 'audino', 'wigglytuff'],
		images: ['', '', '']
	},
	{
		leaderPokemon : ['pikachu', 'blaziken', 'squirtle'],
		images: ['', '', '']
	},
	{
		legendPokemon : ['rayquaza'],
		images: ['', '', '']
	},
	{
		weirdPokemon: ['','',''],
		images: ['', '', '']
	}
];


const questions = [
		{
			question: 'I would go out of my way to help someone',
			yourAnswer: ['too much work', 'somewhat', 'likely', 'most likely']
		},
		{
			question: 'I am the life of the party',
			yourAnswer: ['too much work', 'somewhat','likely', 'most likely']
		},
		{
			question: 'I avoid takinge responsibility',
			yourAnswer: ['never', 'somewhat', 'likely', 'most likely']
		},
		{
			question: 'How likely are you to get pinnaple on your pizza',
			yourAnswer: ['I love pinnaple', 'I guess I would eat it of someone ordered it', 'I am willing to try something new', 'Only pessants eat that such disgusting things']
		}
	];

//rendering the pkemon picker

//chosing each answer and putting them into an array
const choseAnswers = (event) =>{
	const answer = $(event.currentTarget);
	array.push(answer[0].textContent)
	if(array.length < 4){
		renderQuestions();
	}else{
		chosePoke();
	}

}
const renderPokemonList = () =>{
	const $div = $('<div>').addClass('poke-list');
		$('aside').append($div);
		
		for (var i = 0; i < pokeDexList.list.length; i++) {
			
			const $p = $('<p>').text(pokeDexList.list[i]);
			$div.append($p);
		}
}

const renderPokemonInfo = () =>{
	$('.text-box h2').hide();
	$('.npc').show();
	$('.info h1').text('Here is where you will have the chance to test out your pokemon')
	$('.start-game').remove();
	$('#fight-button').show();
	const num = pokeDexList.list.indexOf(pokemon);
	$('.your-image').attr('src', pokeDexList.images[num]);
	const promise = $.ajax({
		url:`https://pokeapi.co/api/v2/pokemon/${pokemon}/`
	})
	promise.then(
		(data) =>{
			console.log(data)
			pokeInfo(data);

		}
		)
}

$('aside').on('click', function(event){
				pokemon = $(event.target)[0].innerText;
				$('.modal').show();
				$('.pokemon').text(pokemon)
				renderPokemonInfo()
			})

//putting the pokemon on the site
const working = (data) =>{
	$('p').remove()
	/////
	$('.text-box h1').text('Pokemon loading...');
	$('.text-box h2').text(`Your Pokemon based on our assesment is...`)
	const $pokemon = $('<h1>').text(pokemon).addClass('pokemon');
	const $moveOne = $('<h3>').text('Move: ' + data.moves[0].move.name).addClass('move-one');
	const $moveTwo = $('<h3>').text('Move: ' + data.moves[1].move.name).addClass('move-two');
	const $type = $('<h3>').text('Type: ' + data.types[0].type.name).addClass('type');
	const $ability = $('<h3>').text('Ability: ' + data.abilities[0].ability.name).addClass('ability')
	const $button = $('<button>').text('Start Game').addClass('start-game');
	$('.text-box').append($pokemon);
	$('.text-box').append($moveOne);
	$('.text-box').append($moveTwo);
	$('.text-box').append($type);
	$('.text-box').append($ability);
	$('.text-box').append($button);
}

const pokeInfo = (data) =>{
	// $('.info img').attr(src, '');
	$('.info h2').text(pokemon);
	$('.type').text(data.types[0].type.name);
	$('.ability').text(data.abilities[0].ability.name);
	$('.move-one').text(data.moves[0].move.name);
	$('.move-two').text(data.moves[1].move.name)
}

/////////////////////

const renderPokemon = () =>{
	const promise = $.ajax({
		url:`https://pokeapi.co/api/v2/pokemon/${pokemon}/`
	})
	promise.then(
		(data) =>{
			working(data);
			$('.start-game').on('click', function(){
				renderGame();
				renderPokemonList();
				pokeInfo(data);
			});
			$('section h4').on('click', function(){
				moves(data);
			});
			$('.info p').on('click', function(){
				renderFromList(data);
			})

		}
		)
}


//////////////////////


//game logic 
const chosePoke = () =>{

	const randNum = Math.floor(Math.random() * 3);

	for (var i = 0; i < array.length; i++) {
	 if(array[i] === pokeAnswers.lazyAnswers[i]){
	 	lazyArray.push(array[i]);
	 }if(array[i] === pokeAnswers.helpfullAnswers[i]){
	 	helpArray.push(array[i]);
	 }if(array[i] === pokeAnswers.leaderAnswers[i]){
	 	leaderArray.push(array[i]);
	 }if(array[i] === pokeAnswers.legendAnswers[i]){
	 	legendArray.push(array[i]);
	 }
	}
//checking which categories had the most answers
	if(helpArray.length > lazyArray.length && helpArray.length > leaderArray.length && helpArray.length > legendArray.length ){
		console.log('You are Helpfull')
		pokemon = pokeDex[1].helpFullPokemon[randNum];
		const num = pokeDexList.list.indexOf(pokemon);
		$('.your-image').attr('src', pokeDexList.images[num]);
	}
	else if(lazyArray.length > helpArray.length && lazyArray.length > leaderArray.length && lazyArray.length > legendArray.length ){
		console.log('You are lazy')
		pokemon = pokeDex[0].lazyPokemon[randNum];
		const num = pokeDexList.list.indexOf(pokemon);
		$('.your-image').attr('src', pokeDexList.images[num]);
	}
	else if(leaderArray.length > helpArray.length && leaderArray.length > lazyArray.length && leaderArray.length > legendArray.length ){
		console.log('You are a Leader')
		pokemon = pokeDex[2].leaderPokemon[randNum];
		const num = pokeDexList.list.indexOf(pokemon);
		$('.your-image').attr('src', pokeDexList.images[num]);
	}
	else if(legendArray.length > helpArray.length && legendArray.length > lazyArray.length && legendArray.length > leaderArray.length ){
		console.log('You are a Legend')
		pokemon = pokeDex[3].legendPokemon[0];
		const num = pokeDexList.list.indexOf(pokemon);
		$('.your-image').attr('src', pokeDexList.images[num]);
	}else{
		const randNum1 = Math.floor(Math.random() * 10)
		pokemon = pokeDexList.list[randNum1];
		const num = pokeDexList.list.indexOf(pokemon);
		$('.your-image').attr('src', pokeDexList.images[num]);
	}
	//


	renderPokemon();
}



//going through questions and rendering them on the page
const renderQuestions =(event) =>{

	
	let num = index++;
	
	$('p').remove();
	$('.answer-box').remove();
	const $divAnswer = $('<div>').addClass('answer-box');
	$('.text-box').append($divAnswer);
	for (var i = 0; i < 4; i++) {
		const $p = $('<p>').text(questions[num].yourAnswer[i]);
		$('.text-box h2').text(questions[num].question)
		$divAnswer.append($p);


	}
	$('p').on('click', choseAnswers);
	$('button').remove();

}


const renderModal = () =>{
	const $div = $('<div>').addClass('modal')
	const $div2 = $('<div>').addClass('text-box');
	const $h1 = $('<h1>').text('Welcome to Pokemon Ruby Remix')
	const $h2 = $('<h2>').text('Here you will have the chance to chose a pokemon based on the type of person you are!')
	const $button = $('<button>').text('Start')


	$('body').append($div);
	$div.append($div2);
	$div2.append($h1);
	$div2.append($h2);
	$div2.append($button);


	$button.on('click', renderQuestions);
	$('p').on('click', choseAnswers);
}




renderModal();














// const promise = $.ajax({
// 	url:`https://pokeapi.co/api/v2/pokemon/slaking/`
// })
// promise.then(
// 	(data) =>{
// 		console.log(data);
// 		console.log();
// 	}

//  	)







