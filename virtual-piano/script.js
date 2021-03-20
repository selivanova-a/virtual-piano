const COLECTION = document.querySelectorAll('.piano-key');
const PIANO = document.querySelector('.piano');

const fullscreenButton = document.querySelector('.fullscreen');

const notesButton = document.querySelector('.btn-notes');
const lettersButton = document.querySelector('.btn-letters');

//AUDIO
function playAudio(src) {
	const audio = new Audio();
	audio.src = src;
	audio.currentTime = 0;
	audio.play();
}


const startSound = (event) => {
	event.target.classList.add("piano-key-active");
	event.target.classList.add("piano-key-active-pseudo");
	const note = event.target.dataset.note;
	const url = `assets/audio/${note}.mp3`;
	playAudio(url)
};

const stopSound = (event) => {
	event.target.classList.remove("piano-key-active");
	event.target.classList.remove("piano-key-active-pseudo");
};

const startCorrespondOver = (event) => {
	if (event.target.classList.contains("piano-key")) {
		event.target.classList.add("piano-key-active");
	}
	COLECTION.forEach((elem) => {
		elem.addEventListener('mouseover', startSound);
		elem.addEventListener('mouseout', stopSound);

		elem.addEventListener('mousedown', startSound);
		elem.addEventListener('mouseup', stopSound);
	})
};

const stopCorrespondOver = () => {
	COLECTION.forEach((elem) => {
		elem.classList.remove("piano-key-active");
		elem.removeEventListener('mouseover', startSound);
		elem.removeEventListener('mouseout', stopSound);
	})
};

PIANO.addEventListener('mousedown', startCorrespondOver, false);
PIANO.addEventListener('mouseup', stopCorrespondOver);

//FULLSCREEN
fullscreenButton.addEventListener('click', toggleScreeen);

function toggleScreeen() {
	if (document.fullscreenElement === null) {
		document.documentElement.requestFullscreen();
	} else {
		document.exitFullscreen();
	}
}

//Switching NOTES/LETTERS
function removeStyle() {
	lettersButton.classList.remove('btn-active');
	notesButton.classList.remove('btn-active');
}

function switchingToLetters() {
	COLECTION.forEach((elem) => {
		elem.classList.add("piano-key-letter");
	})
}

function switchingToNotes() {
	COLECTION.forEach((elem) => {
		elem.classList.remove("piano-key-letter");
	})
}

notesButton.addEventListener('click', (event) => {
	removeStyle();
	switchingToNotes();
	notesButton.classList.add('btn-active');
});

lettersButton.addEventListener('click', (event) => {
	removeStyle();
	switchingToLetters();
	lettersButton.classList.add('btn-active');
});

//KEYBOARD response
window.addEventListener('keydown', (event) => {

	let code = event.code;
	let noteKey;

	COLECTION.forEach((elem) => {
		if (elem.dataset.code === code) {
			noteKey = elem.dataset.note;
			elem.classList.add("piano-key-active");
		}
	});

	const url = `assets/audio/${noteKey}.mp3`;
	playAudio(url);
});

window.addEventListener('keyup', (event) => {
	COLECTION.forEach((elem) => {
		elem.classList.remove("piano-key-active");
	});
});
