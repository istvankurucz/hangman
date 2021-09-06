const categories = ["cities", "animals", "fruits", "vegetables"];
const db = {
	cities: [
		"milan",
		"toronto",
		"boston",
		"budapest",
		"london",
		"paris",
		"madrid",
		"barcelona",
		"tokyo",
		"mumbai",
		"Beijing",
	],
	animals: ["cat", "dog", "fish", "monkey", "donkey", "elephant", "sneak"],
	fruits: ["melon", "orange", "citrone", "apple", "banana", "peach", "pear", "grapes"],
	vegetables: ["carrot", "cucumber", "tomato", "lettuce", "cabbage", "aubergine"],
};

const chooseCategory = () => {
	const index = Math.floor(Math.random() * categories.length);

	return categories[index];
};

const chooseWord = (category) => {
	const length = db[category].length;
	const index = Math.floor(Math.random() * length);

	return db[category][index];
};

const showLines = (word) => {
	for (l of word) {
		if (l === "-") $(".solution").append('<div class="dash"></div>');
		else $(".solution").append(`<div class="line">${l}</div>`);
	}
};

const checkLetter = (word, letter) => {
	const indexes = [];
	for (let i = 0; i < word.length; i++) {
		if (word[i] === letter) indexes.push(i + 1);
	}

	if (indexes.length) return indexes;
	else return false;
};

const uniqueTipp = (tipps, letter) => {
	let newLetter = true;

	tipps.forEach((tipp) => {
		if (tipp === letter) newLetter = false;
	});

	return newLetter;
};

const dashCount = (word) => {
	let count = 0;

	for (const l of word) {
		if (l === "-") count++;
	}

	return count;
};

$(document).ready(function () {
	const startRound = () => {
		$(".line").remove();
		$(".dash").remove();
		$(".tipp").remove();
		$("i").hide();

		//Reset every variable
		lives = 10;
		category = chooseCategory();
		word = chooseWord(category);
		lettersRemaining = word.length - dashCount(word);
		tipps = [];

		$(".category__name").text(category);
		$(".life__count").text("10");

		showLines(word);
	};

	const endRound = (letter) => {
		let positions = checkLetter(word, letter);

		if (positions) {
			if (uniqueTipp(tipps, letter)) {
				positions.forEach((pos) => $(`.line:nth-child(${pos})`).css("color", "var(--secondary-color-light)"));
				lettersRemaining -= positions.length;
				if (!lettersRemaining) {
					$(".fa-check-circle").fadeIn(1000).delay(1200).fadeOut(500);

					setTimeout(startRound, 3000);
				}

				tipps.push(letter);
			}

			$(".tipps").append(`<span class="tipp">${letter}</span>`);
		} else {
			lives--;
			$(".life__count").text(lives);

			$(".tipps").append(`<span class="tipp tipp--bad">${letter}</span>`);

			if (!lives) {
				$(`.line`).css("color", "var(--secondary-color-light)");
				$(".fa-times-circle").fadeIn(1000).delay(1200).fadeOut(500);

				setTimeout(startRound, 3000);
			}
		}
	};

	let lives, category, word, lettersRemaining;
	let tipps = [];

	startRound();

	$(".letter").click(function () {
		endRound($(this).text());
	});
	$("body").keypress(function (e) {
		if (e.keyCode > 96 && e.keyCode < 123) endRound(e.key);
	});
});
