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