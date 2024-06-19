// Getters: These lines get references to HTML elements by their IDs and assign them to variables.
const question = document.getElementById('question');
const questionImage = document.getElementById('question-image');
const answer1 = document.getElementById('answer1');
const answer2 = document.getElementById('answer2');
const answer3 = document.getElementById('answer3');
const answer4 = document.getElementById('answer4');
const score = document.getElementById('score');
const playAgain = document.getElementById('playAgain');
const wrapper = document.getElementById('wrapper');
const timeDisplay = document.getElementById('time');
const result = document.getElementById('result');

let questionNumber = 0;
let scoreAmount = 0;
let timer;
let timeLeft;

const questions = [
    {
      "image": "assets/images/players/chris-gayle.jpg",
      "question": "Who is this player?",
      "answers": ["Brain Lara", "Rodger Federer", "Chris Gayle", "Virat Kohli"],
      "correct": 2
    },
]

/**
 * This function starts the timer for each question
 */
function startTimer() {
    clearInterval(timer); // Clear any existing timer
    timeLeft = 15; // 15 seconds for each question
    timeDisplay.innerText = timeLeft;
  
    timer = setInterval(function () {
      timeLeft--;
      timeDisplay.innerText = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timer);
        // Automatically move to the next question or end the game
        questionNumber++;
        if (questionNumber === quizLength) {
          endgame();
        } else {
          loadQuestion(questionNumber);
          loadAnswers(questionNumber);
        }
      }
    }, 1000);
  }

/**
 * This function starts the quiz
 */
function startQuiz() {
    playAgain.style.visibility = "hidden";
    document.getElementById('homeButton').style.display = 'none'; // Hide the Take Me Home button initially
    loadQuestion(questionNumber);
    loadAnswers(questionNumber);
    score.innerText = `0 out of ${quizLength} correct`;
  }

  startQuiz();

  function endgame() {
    playAgain.style.visibility = "visible";
    clearInterval(timer);
    // Show the Take Me Home button
    document.getElementById('homeButton').style.display = 'inline-block';
  }
  
  // This function ends game
  function endgameOption(chosen) {
    if (chosen === 0) {
      window.location.reload();
    } else {
      wrapper.innerHTML = "<h1>Thanks for playing...</h1>";
    }
  }