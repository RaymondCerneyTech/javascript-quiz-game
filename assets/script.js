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
////////////////////////////////
////////////////////////////////

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
	pauseTimer();
    instructionsEl.innerText = questionResults();
	beginEl.innerText = "Next Question";
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

function mainPage() {
	timeRemainingEl.style.display = "inline-block";
	hsEl.style.display = "inline-block";
	hsEl.innerText = "High Scores";
	questionEl.innerText = "Instructions";
	instructionsEl.innerHTML = "Upon beginning the quiz the timer will begin counting down. <br/> Every question answered incorrectly will reduce the timer by 10 seconds. <br/> Answering the last question will initiate an initials entry prompt to save if it is a high score. <br/> The top 5 scores from your computer will be displayed on the high score page.";
	pageNameEl.innerText = "JavaScript Quiz!";
	beginEl.innerText = "Begin Quiz";
	beginEl.style.display = "inline-block";
	hsEl.addEventListener("click", highScorePage);
	hsEl.removeEventListener("click", mainPage);
}

function highScorePage() {
	timeRemainingEl.style.display = "none";
	// timerEl;
	// hsEl;
	hsEl.innerText = "Main Page";
	pageNameEl.innerText = "High Scores";
	questionEl.innerText = "The top 5 high scores:";
	instructionsEl.innerHTML = "<p> 1st: <span id='first-place'></span></p> <p> 2nd: <span id='second-place'></span></p><p> 3rd: <span id='third-place'></span></p><p> 4th: <span id='fourth-place'></span></p><p> 5th: <span id='fifth-place'></span></p>";
	beginEl.style.display = "none";
	hsEl.addEventListener("click", mainPage);
	hsEl.removeEventListener("click", highScorePage);
}

function highScoreToMainPage() {
	mainPage();
}

function scoreToHighScorePage() {
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
        beginEl.innerText = "Check Answer";
		questionEl.innerText = "Question # " + questionNumber.toString();
		beginEl.addEventListener("click", displayResults);
		beginEl.removeEventListener("click", nextQuestion);
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

	if (isHighScore === true) {
		instructionsEl.innerHTML += "<br/> You achieved a high score!";
	}

	beginEl.innerText = "Try again";
    beginEl.addEventListener("click", tryAgain);    
    beginEl.removeEventListener("click", displayResults);
}

//Checks if the score is a high score and stores it if it is
function isHighScore() { return false;}

//Links
function tryAgain() {
	totalScore = 0;
    questionNumber = 0;
    timerTime = 120;
	nextQuestion();
	beginEl.removeEventListener("click", tryAgain);
}

//  Out of time
/*
 If timer runs out, replace page name text with Out of Time, remove question text, remove instructions text, 
 update begin button to Try Again button
*/
function outOfTime() {
	questionEl.innerText = "Out of time";
	instructionsEl.innerText = "You are out of time. Start over?";
	beginEl.removeEventListener("click", nextQuestion);
	beginEl.addEventListener("click", tryAgain);
}
