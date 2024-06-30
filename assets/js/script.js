document.addEventListener("DOMContentLoaded", () => {
  /**

  * Get references to HTML elements

  */
  const elements = {
    question: document.getElementById('question'),
    answerButtons: [
      document.getElementById('answer1'),
      document.getElementById('answer2'),
      document.getElementById('answer3'),
      document.getElementById('answer4')
    ],
    score: document.getElementById('score'),
    playAgain: document.getElementById('playAgain'),
    wrapper: document.getElementById('wrapper'),
    timeDisplay: document.getElementById('time')
  };

  /**

 * Check if all elements are found

 */

  if (!elements.question || !elements.score || !elements.playAgain || !elements.wrapper || !elements.timeDisplay) {
    console.error('Some elements are missing.');
    return;
  }
  for (const button of elements.answerButtons) {
    if (!button) {
      console.error('Some answer buttons are missing.');
      return;

    }
  }

    /**

   * Quiz state variables

   */
  let questionNumber = 0;
  let scoreAmount = 0;
  let timer;
  let timeLeft;

  /**

   * Questions array

   */
  const questions = [

    {
      question: "Who won the ICC Cricket World Cup in 2019?",
      answers: ["England", "Australia", "India", "New Zealand"],
      correct: 0
    },

    {
      question: "Who is the leading run-scorer in Test cricket?",
      answers: ["Ricky Ponting", "Brian Lara", "Sachin Tendulkar", "Jacques Kallis"],
      correct: 2
    },

    {
      question: "Which country is the first to win two ICC T20 World Cups?",
      answers: ["India", "West Indies", "Australia", "Pakistan"],
      correct: 1
    },

    {
      question: "Where is the world cup T20 2024 taking place?",
      answers: ["India", "Canada & USA", "England", "West Indies & USA"],
      correct: 3
    },

    {
      question: "Who struck 4 successive sixes in a T20 world cup final that made Ben Stokes cry?",
      answers: ["Carlos Brathwaite", "Steve Smith", "Chris Gayle", "Rohit Sharma"],
      correct: 0
    },

    {
      question: "The Ashes is a Test cricket series between which two countries?",
      answers: ["India & Pakistan", "West Indies & England", "New Zealand & Australia", "England & Australia"],
      correct: 3
    },

    {
      question: "How many bails sit on top of the cricket stumps?",
      answers: ["Four", "Three", "Two", "Six"],
      correct: 2
    },

    {
      question: "How many balls are in an over?",
      answers: ["Four", "Seven", "Five", "Six"],
      correct: 3
    }
  ];

  const quizLength = questions.length;

   /**

   * Load a question

   */
  function loadQuestion() {
    const questionData = questions[questionNumber];
    elements.question.innerText = questionData.question;
    elements.answerButtons.forEach((button, index) => {
      button.innerText = questionData.answers[index];
    });
    startTimer();
  }

  /**

   * Check the answer

   */
  function checkAnswer(answerNumber) {
    if (answerNumber === questions[questionNumber].correct) {
      scoreAmount++;
    }
    elements.score.innerText = `${scoreAmount} out of ${quizLength} correct`;
    questionNumber++;
    if (questionNumber < quizLength) {
      loadQuestion();
    } else {
      endgame();
    }
  }

   /**

   * Error page redirection

   */
   window.addEventListener('error', function(event) {
    console.error("Error occurred: ", event.message);
    window.location.href = '404.html';
  });

  window.addEventListener('unhandledrejection', function(event) {
    console.error("Unhandled promise rejection: ", event.reason);
    window.location.href = '404.html';
  });

    /**

   * Start the timer

   */
  function startTimer() {
    clearInterval(timer);
    timeLeft = 15;
    elements.timeDisplay.innerText = timeLeft;
    timer = setInterval(() => {
      timeLeft--;
      elements.timeDisplay.innerText = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timer);
        questionNumber++;
        if (questionNumber < quizLength) {
          loadQuestion();
        } else {
          endgame();
        }
      }
    }, 1000);
  }

  /**

   * End the game

   */
  function endgame() {
    elements.playAgain.style.visibility = "visible";
    clearInterval(timer);
    document.getElementById('homeButton').style.display = 'inline-block';
  }

    /**

   * Redirect to the home page

   */
  function goHome() {
    window.location.href = 'index.html';
  }

    /**

   * Handle play again or end game options

   */
  function endgameOption(chosen) {
    if (chosen === 0) {
      window.location.reload();
    } else {
      elements.wrapper.innerHTML = "<h1>Thanks for playing...</h1>";
    }
  }

    /**

   * Add event listeners for answer buttons

   */
  elements.answerButtons.forEach((button, index) => {
    button.addEventListener('click', () => checkAnswer(index));
  });

   /**
    
   * Expose functions to the global scope for HTML event handlers
   
   */
  window.goHome = goHome;
  window.endgameOption = endgameOption;

    /**

   * Start the quiz

   */
  function startQuiz() {
    elements.playAgain.style.visibility = "hidden";
    document.getElementById('homeButton').style.display = 'none';
    elements.score.innerText = `0 out of ${quizLength} correct`;
    loadQuestion();
  }

  startQuiz();
});
