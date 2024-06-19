// Getters: These lines get references to HTML elements by their IDs and assign them to variables.
const question = document.getElementById('question');
const answer1 = document.getElementById('answer1');
const answer2 = document.getElementById('answer2');
const answer3 = document.getElementById('answer3');
const answer4 = document.getElementById('answer4');
const score = document.getElementById('score');
const playAgain = document.getElementById('playAgain');
const wrapper = document.getElementById('wrapper');
const timeDisplay = document.getElementById('time');
const result = document.getElementById('result');

// Initialize variables to track the question number, score, timer, and time left.
let questionNumber = 0;
let scoreAmount = 0;
let timer;
let timeLeft;

// Define the array of question objects, each containing a question, possible answers, and the correct answer index.
const questions = [
    {
      "question": "Who won the ICC Cricket World Cup in 2019?",
      "answers": [
        "England", "Australia", "India", "New Zealand"
      ],
      "correct": 0
    },
    {
        "question": "Who is the leading run-scorer in Test cricket?",
        "answers": [
          "Ricky Ponting", "Brian Lara", "Sachin Tendulkar", "Jacques Kallis"
        ],
        "correct": 2
      },
      {
        "question": "Which country is the first to win two ICC T20 World Cups?",
        "answers": [
          "India", "West Indies", "Australia", "Pakistan"
        ],
        "correct": 1
      },
      {
        "question": "Where is the world cup T20 2024 taking place?",
        "answers": [
          "India", "Canada & USA", "England", "West Indies & USA"
        ],
        "correct": 3
      },
      {
        "question": "Who struck 4 successive sixes in a T20 world cup final that made Ben Stokes cry?",
        "answers": [
          "Carlos Brathwaite", "Steve Smith", "Chris Gayle", "Rohit Sharma"
        ],
        "correct": 0
      },
      {
        "question": "The Ashes is a Test cricket series between which two countries?",
        "answers": [
          "India & Pakistan", "West Indies & England", "New Zealand & Australia", "England & Australia"
        ],
        "correct": 3
      },
      {
        "question": "How many bails sit on top of the cricket stumps?",
        "answers": [
          "Four", "Three", "Two", "Six"
        ],
        "correct": 2
      },
      {
        "question": "How many balls are in an over?",
        "answers": [
          "Four", "Seven", "Five", "Six"
        ],
        "correct": 3
      }
]

// Get the total number of questions.
const quizLength = questions.length;


/**
 * Loads the current question into the HTML element
 * @param {int} questionNumber - The index of the question to load
 */

/* This function loads the current question */
function loadQuestion(questionNumber) {
    question.innerText = questions[questionNumber].question;
    startTimer();
  }

  /**
 * This function loads answers into the choice buttons
 * @param {int} questionNumber - The index of the question to load.
 */
function loadAnswers(questionNumber) {
    answer1.innerText = questions[questionNumber].answers[0];
    answer2.innerText = questions[questionNumber].answers[1];
    answer3.innerText = questions[questionNumber].answers[2];
    answer4.innerText = questions[questionNumber].answers[3];
  }
  
/**
 * This function checks the answer button that has been pressed.
 * If correct it increments the score and question number.
 * It also checks if it is the end of the quiz
 * @param {int} answerNumber - The index of the selected answer.
 */
function checkAnswer(answerNumber) {
    console.log('answer number chosen: ', answerNumber);
    // we check what the correct answer is for this question
    let correctAnswer = questions[questionNumber].correct;
    if (answerNumber === correctAnswer) {
      // if correct we increment the score by 1
      scoreAmount++;
    }
    // update the score display
  score.innerText = `${scoreAmount} out of ${quizLength} correct`;
  
  // after we increment the questionNumber
  questionNumber++;
  // we check if it is the end of the quiz (have we run out of questions)
  if (questionNumber === quizLength) {
    endgame();
  } else {
    // if not we load the next question
    loadQuestion(questionNumber);
    loadAnswers(questionNumber);
  }
}

function startTimer() {
  clearInterval(timer); // Clear any existing timer
  timeLeft = 15; // 15 seconds for each question
  timeDisplay.innerText = timeLeft;
}

/**
 * This function redirects the user to the home page.
 */
function goHome() {
    window.location.href = 'index.html'; // Redirect to the home page
  }
  

/**
 * this function starts the quiz
 */
function startQuiz() {
    playAgain.style.visibility = "hidden"; //Hide the play again button.
    document.getElementById('homeButton').style.display = 'none'; // Hide the Take Me Home button initially
    loadQuestion(questionNumber);
    loadAnswers(questionNumber);
    score.innerText = `0 out of ${quizLength} correct`;
  }
  startQuiz();


  /**
 * This function ends the game, displays the play again options, and clears the timer.
 */
function endgame() {
    playAgain.style.visibility = "visible";
    clearInterval(timer);
    // Show the Take Me Home button
    document.getElementById('homeButton').style.display = 'inline-block';
  }
  
  // this function ends game
  function endgameOption(chosen) {
    if (chosen === 0) {
      window.location.reload();
    } else {
      wrapper.innerHTML = "<h1>Thanks for playing...</h1>";
    }
  }