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