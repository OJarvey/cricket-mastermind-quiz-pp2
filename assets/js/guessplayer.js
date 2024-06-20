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

const quizLength = questions.length;

/**
 * Loads a question and its corresponding image based on the question number.
 * @param {number} questionNumber - The index of the question to load.
 */
function loadQuestion(questionNumber) {
  const questionData = questions[questionNumber]; // Get the question data for the current question
  questionImage.src = questionData.image; // Set the source of the question image to the image URL from the question data
  questionImage.alt = `Image for ${questionData.question}`; // Set the alt text for the image for accessibility, using the question text
  question.innerText = questionData.question;
  startTimer(); 
}

/**
 * This function loads answers into the choice buttons
 * @param {int} questionNumber 
 */
function loadAnswers(questionNumber) {
    const questionData = questions[questionNumber];
    answer1.innerText = questionData.answers[0];
    answer2.innerText = questionData.answers[1];
    answer3.innerText = questionData.answers[2];
    answer4.innerText = questionData.answers[3];
  }

  /**
 * This function checks the answer button that has been pressed.
 * If correct it increments the score and question number.
 * It also checks if it is the end of the quiz
 * @param {int} answerNumber 
 */
function checkAnswer(answerNumber) {
    console.log('answer number chosen: ', answerNumber);
    // We check what the correct answer is for this question
    let correctAnswer = questions[questionNumber].correct;
    if (answerNumber === correctAnswer) {
      // If correct we increment the score by 1
      scoreAmount++;
    }
    // update the score display
    score.innerText = `${scoreAmount} out of ${quizLength} correct`;
  
    // After we increment the questionNumber
    questionNumber++;
    // We check if it is the end of the quiz (have we run out of questions)
    if (questionNumber === quizLength) {
      endgame();
    } else {
      // If not we load the next question
      loadQuestion(questionNumber);
      loadAnswers(questionNumber);
    }
  }

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