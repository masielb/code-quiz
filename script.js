//VARIABLES
var header = document.querySelector(".header");
var score = document.getElementById("score");
var quizChallengePage = document.getElementById("quizChallengePage");
var submitBtn = document.getElementById("submitBtn");

var quizQuestionsPage = document.getElementById("quizQuestionsPage");
var quizQuestionHeader = document.getElementById("quizQuestionHeader");
var choice1 = document.getElementById("one");
var choice2 = document.getElementById("two");
var choice3 = document.getElementById("three");
var choice4 = document.getElementById("four");
var correct = document.getElementById("correct");
var grade = document.getElementById("grade");
var questionBtn = document.querySelector(".questionBtn");

var allDone = document.getElementById("allDone");
var allDoneButtons = document.getElementById("form-inline");
var finalScoreIs = document.getElementById("finalScoreIs");

var finalScorePage = document.getElementById("finalScorePage");
var highScoreButtons = document.getElementById("highScoreButtons");

var initials = document.getElementById("initials"); 
var initialInput = document.getElementById("initialInput"); 
var initialBtn = document.getElementById("initialBtn"); 

var timer = document.getElementById("timer");

// QUIZ QUESTION ARRAY
var quizQuestions = [
  {
  "quizQuestionHeader" : "Arrays in JavaScript can be used to store ________.",
  "one" : "1. numbers and strings",
  "two" : "2. other arrays",
  "three" : "3. booleans",
  "four" : "4. all of the above",
  "correct" : "4. all of the above",
  },{
  "quizQuestionHeader" : "The condition in an if / else statement is enclosed within ________.",
  "one" : "1. quotes",
  "two" : "2. curly brackets",
  "three" : "3. parenthesis",
  "four" : "4. square brackets",
  "correct" : "3. parenthesis",
  },{
  "quizQuestionHeader" : "Commonly used Data Types do NOT Include:", 
  "one" : "1. strings",
  "two" : "2. booleans",
  "three" : "3. alerts",
  "four" : "4. numbers",
  "correct" : "3. alerts",
  },{
   "quizQuestionHeader" : "String values must be enclosed within ________ when being assigned to variables",
   "one" : "1. commas",
   "two" : "2. curly brackets",
   "three" : "3. quotes",
   "four" : "4. parenthesis",
   "correct" : "3. quotes",
  },{
   "quizQuestionHeader" : "A very useful tool used for developing and debugging for printing content to the debugger is:",
   "one" : "1. JavaScript",
   "two" : "2. terminal / bash",
   "three" : "3. for loops",
   "four" : "4. console.log",
   "correct" : "4. console.log",
  },
]

var startScore = 0; 
var questionIndex = 0;

// FIRST PAGE 
function codeQuizChallenge() {
  quizChallengePage.style.display = "block";
  header.style.display = "block"; 
  quizQuestionsPage.style.display = "none";
  finalScorePage.style.display = "none";
  var startScore = 0; // Starting time 
  timer.textContent = "Time: " + startScore;
}

function resetVariables() {
  startScore = 0; 
  questionIndex = 0;
}

// STARTS QUIZ 
function startQuiz() { 
quizChallengePage.style.display = "none"; 
quizQuestionsPage.style.display = "block"; 
secondsLeft = 80;
  var timerInterval = setInterval(function() { 
    secondsLeft--;
    timer.textContent = "Time: " + secondsLeft;
    if (secondsLeft === 0 || quizQuestions.length === questionIndex) {
      clearInterval(timerInterval);
      showFinalScore();
    }
  }, 1000);
}

// SHOW QUESTIONS
function showQuestions() {
  var q = quizQuestions[questionIndex];
  quizQuestionHeader.innerHTML = q.quizQuestionHeader;
  choice1.innerHTML = q.one;
  choice1.setAttribute("data-answer", q.one);
  choice2.innerHTML = q.two;
  choice2.setAttribute("data-answer", q.two);
  choice3.innerHTML = q.three;
  choice3.setAttribute("data-answer", q.three);
  choice4.innerHTML = q.four;
  choice4.setAttribute("data-answer", q.four);
}

// EVENT LISTENERS WHEN USER CLICKS ANSWERS 
showQuestions();
choice1.addEventListener("click", function (event) {
  checkAnswer(event);
})
choice2.addEventListener("click", function (event) {
  checkAnswer(event);
})
choice3.addEventListener("click", function (event) {
  checkAnswer(event);
})
choice4.addEventListener("click", function (event) {
  checkAnswer(event);
})

 // CHECK TO SEE IF ANSWER IS CORRECT
function checkAnswer(event) {
  event.preventDefault();

  var answer = event.currentTarget.dataset.answer;
  var correctAnswer = null;

  if (quizQuestions[questionIndex].correct === answer) {
      correctAnswer = answer;
  }
  if (answer === correctAnswer) {
  grade.textContent = "Correct!";
  } else {
  grade.textContent = "Wrong!";
      secondsLeft -= 10
      if (secondsLeft < 0) {
          secondsLeft = 0;
      }
  }
  if (quizQuestions.length === questionIndex+1) {
    showFinalScore();
    return;
  }
  questionIndex++;
  showQuestions();
}

// GO TO DONE PAGE
function showFinalScore() {
  quizQuestionsPage.style.display = "none";
  highScoreButtons.style.display = "none";
  finalScorePage.style.display = "block";
  finalScoreIs.style.display = "block"
  initials.style.display = "block"
  initialBtn.style.display = "block"
  initialInput.style.display = "block"
  finalScoreIs.textContent = "Your final score is " + secondsLeft;
  initialBtn.textContent = "Submit"; // Form button 
  initials.textContent = "Enter Your Initials: "; // Form text
}

var highScoreArray = []

// SHOWS ALL HIGH SCORES 
function showHighScores() {
  header.style.display = "none"; 
  allDone.style.display = "none";
  finalScoreIs.style.display = "none" 
  initials.style.display = "none" 
  initialBtn.style.display = "none" 
  initialInput.style.display = "none" 
  highScoreButtons.style.display = "block"; // Show Final Score Page 
  
  var getInitials = document.getElementById("initialInput").value;
  var highScoreArray = JSON.parse(localStorage.getItem("highScore")) || [];
  var localStorageArray = { score: secondsLeft, initials: getInitials };
  highScoreArray.push(localStorageArray)
  localStorage.setItem("highScore", JSON.stringify(highScoreArray));
  var highScores = getInitials + ": " + secondsLeft;

  $("#highScoreList").append(highScores)
}

// START QUIZ
submitBtn.addEventListener("click", function() { 
  startQuiz()
  console.log("start")
})

// CLICK INTIAL BUTTON TO SHOW HIGH SCORES
initialBtn.addEventListener("click", function() { 
  showHighScores();
  console.log("initial button")
}) 

// CLEAR HIGH SCORES
clearHighScore.addEventListener("click", function() {
  localStorage.clear();
})

// GO BACK BUTTON EVENT liSTENER
goBack.addEventListener("click", function() {
  $("#highScoreList").empty() 
  $("#initialInput").val("")  
  resetVariables()
  codeQuizChallenge();
  console.log("restart quiz")
})

codeQuizChallenge(); 