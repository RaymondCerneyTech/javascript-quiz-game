// Elements

// Time remaining container and timer parent
var timeRemainingEl = document.querySelector("#time-remaining");
// The timer container
var timerEl = document.querySelector("#timer");
// High Score button container
var hsEl = document.querySelector(".hs-button");
// Container for current question name
var questionEl = document.querySelector(".question");
// Instruction/Answer selection container
var instructionsEl = document.querySelector(".instructions");
// Page name container
var pageNameEl = document.querySelector("#page-name");
// Begin button container
var beginEl = document.querySelector("#begin");

////// End of elements /////////
//////////////////////////////
//////////////////////////////

// Element data

// Text in the timer
var timerTime = timerEl.innerText;
// Tracks the user's score
var totalScore = 0;
// Array containing top 5 high scores
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
// Max allowed high scores
const MAX_HIGH_SCORES = 5;
// Current question number defaults to 0, switches to 1 when questionOne is triggered;
var questionNumber = 0;
// User's answer
var answerGiven = "Z";
// Response to users answer
var result = "What happened?";
// Result of user question
var result;

///// End of element data /////
/////////////////////////////
/////////////////////////////

// Utility functions
function startTimer() {
	timerInterval = setInterval(ticker, 1000);
}

function pauseTimer() {
	clearInterval(timerInterval);
}

function ticker() {
	timerTime--;
	timerEl.innerText = timerTime;
	if (timerTime <= 0) {
		pauseTimer();
		outOfTime();
	}
}

function hideTimeRemaining() {
	timeRemainingEl.style.display = "none";
}

function showTimeRemaining() {
	timeRemainingEl.style.display = "inline-block";
}

function hideHighScore() {
	hsEl.style.display = "none";
}
function showHighScore() {
	hsEl.style.display = "inline-block";
}

// Takes in a question and answer and returns results as a string
function questionResults() {
	var result = "???";
	if (questionNumber === 1 && answerGiven === "B") {
		result = "Correct!";
	} else if (questionNumber === 1 && answerGiven != "B") {
		result = "Incorrect";
	}

	if (questionNumber === 2 && answerGiven === "A") {
		result = "Correct!";
	} else if (questionNumber === 2 && answerGiven != "A") {
		result = "Incorrect";
	}

	if (questionNumber === 3 && answerGiven === "C") {
		result = "Correct!";
	} else if (questionNumber === 3 && answerGiven != "C") {
		result = "Incorrect";
	}

	if (questionNumber === 4 && answerGiven === "D") {
		result = "Correct!";
	} else if (questionNumber === 4 && answerGiven != "D") {
		result = "Incorrect";
	}

	if (questionNumber === 5 && answerGiven === "A") {
		result = "Correct!";
	} else if (questionNumber === 5 && answerGiven != "A") {
		result = "Incorrect";
	}
	if (result === "Incorrect") {
		timerTime = timerTime - 10;
	}
	return result;
}

// Displays results of user answer, pauses timer, clears display event, adds next question event
// to #begin button/"Next Question" button, changes begin button text to "Next Question"
function displayResults() {
	instructionsEl.innerText = questionResults();
	beginEl.innerText = "Next Question";
	pauseTimer();
	beginEl.removeEventListener("click", displayResults);
	beginEl.addEventListener("click", nextQuestion);
}

///// End of utility functions /////
////////////////////////////////////
////////////////////////////////////

//Default Event Listeners
beginEl.addEventListener("click", nextQuestion);
hsEl.addEventListener("click", highScorePage);

///// End of Event Listeners /////
//////////////////////////////////
//////////////////////////////////

// Main pg to High Score
/* 
	Timer replaced with Main pg button, HSBtn replaced with Clear Scores btn, question text updated, instruction text updated, 
	begin button removed
*/
function mainToHighScorePage() {
	hsEl.innerText = "Main Page";

	highScorePage();
}

function highScorePage() {}

function highScoreToMainPage() {
	hsEl.innerText = "High Scores";

	mainPage();
}

function mainPage() {}

function scoreToHighScorePage() {
	hsEl.innerText = "Main Page";

	highScorePage();
}

// Question pg to Question pg
/* 
	When Check Answer button is clicked: 
		Update Check Answer button text to Next Question, update event, pause timer,
		replace Question element text
*/
function nextQuestion() {
	if (questionNumber === 0) {
		totalScore = 0;
		questionOne();
	} else if (questionNumber === 1) {
		questionTwo();
	} else if (questionNumber === 2) {
		questionThree();
	} else if (questionNumber === 3) {
		questionFour();
	} else if (questionNumber === 4) {
		questionFive();
	} else if (questionNumber === 5) {
		scorePage();
	}
	if (questionNumber < 5) {
		startTimer();
		questionNumber++;
		questionEl.innerText = "Question #" + questionNumber.toString();
		beginEl.addEventListener("click", displayResults);
		beginEl.removeEventListener("click", nextQuestion);
	} else {
		questionEl.innerText = "Score:";
	}
}

function questionOne() {
	hideHighScore();
	instructionsEl.innerText = "I'm Q1";
}

function questionTwo() {
	instructionsEl.innerText = "I'm Q2";
}
function questionThree() {
	instructionsEl.innerText = "I'm Q3";
}
function questionFour() {
	instructionsEl.innerText = "I'm Q4";
}
function questionFive() {
	instructionsEl.innerText = "I'm Q5";
}
//Checks if the score is a high score.
function scorePage() {
	questionEl.innerText = "Score:";
	instructionsEl.innerText = "Your score is: " + totalScore.toString() + "! Great job!";
	showHighScore();
	if (isHighScore) {
	}
	beginEl.innerText = "Try again";
	beginEl.addEventListener("click", tryAgain);
}

//Checks if the score is a high score and stores it if it is
function isHighScore() {}

//Links
function tryAgain() {
	totalScore = 0;
    questionNumber = 0;
    beginEl.addEventListener("click", nextQuestion);
	beginEl.removeEventListener("click", tryAgain);
}

function highScoreToMain() {}

function scoreToHighScore() {}

// Score to Question page
/* 

*/
function scoreToQuestion() {}

//  Out of time
/*
 If timer runs out, replace page name text with Out of Time, remove question text, remove instructions text, 
 update begin button to Try Again button
*/
function outOfTime() {
	questionEl.innerText = "Out of time";
	instructionsEl.innerText = "You are out of time. Start over?";
	beginEl.addEventListener("click", tryAgain);
}

// Main pg to Question pg
/* 
 	Timer start, HSBtn removed, question text updated, instructions text updated, 
    begin button text and event updated
*/

function mainToQ1() {
	timerEl.innerText = 120;

	//modifying main elements
	titleEl.remove();
	instructionsEl.remove();
	beginEl.remove();
	pageNameEl.innerHTML = "";
	instructionsEl.innerText = "";

	startTimer();
}
