document.addEventListener("DOMContentLoaded", () => {
    /**

   * Get references to HTML elements

   */
  const elements = {
    question: document.getElementById('question'),
    questionImage: document.getElementById('question-image'),
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
      image: "assets/images/players/chris-gayle.jpg",
      question: "Who is this player?",
      answers: ["Brian Lara", "Roger Federer", "Chris Gayle", "Virat Kohli"],
      correct: 2
    },
    {
      image: "assets/images/players/andrew-flintoff.webp",
      question: "Who is this player?",
      answers: ["Andrew Flintoff", "Roger Federer", "Chris Gayle", "Virat Kohli"],
      correct: 0
    },
    {
      image: "assets/images/players/jofra-archer.jpg",
      question: "Who is this player?",
      answers: ["Bret Lee", "Ben Stokes", "Chris Gayle", "Jofra Archer"],
      correct: 3
    },
    {
      image: "assets/images/players/ben-stokes.webp",
      question: "Who is this player?",
      answers: ["Bret Lee", "Ben Stokes", "Chris Gayle", "Virat Kohli"],
      correct: 1
    },
    {
      image: "assets/images/players/mitchell-starc.webp",
      question: "Who is this player?",
      answers: ["Bret Lee", "Ben Stokes", "Mitchell Starc", "Virat Kohli"],
      correct: 2
    },
    {
      image: "assets/images/players/kieron-pollard.jpg",
      question: "Who is this player?",
      answers: ["Chris Gayle", "Ben Stokes", "Mitchell Starc", "Kieron Pollard"],
      correct: 3
    },
    {
      image: "assets/images/players/sachin-tendulkar.webp",
      question: "Who is this player?",
      answers: ["Chris Gayle", "Rohit Sharma", "Sachin Tendulkar", "Andrew Flintoff"],
      correct: 2
    },
    {
      image: "assets/images/players/steve-smith.jpg",
      question: "Who is this player?",
      answers: ["Mitchell Starc", "Sachin Tendulkar", "Steve Smith", "Ben Stokes"],
      correct: 2
    },
    {
      image: "assets/images/players/virat-kohli.webp",
      question: "Who is this player?",
      answers: ["Virat Kohli", "Rohit Sharma", "Sachin Tendulkar", "Chris Gayle"],
      correct: 0
    },
    {
      image: "assets/images/players/bret-lee.webp",
      question: "Who is this player?",
      answers: ["Ben Stokes", "Mitchell Starc", "Andrew Flintoff", "Bret Lee"],
      correct: 3
    },
    {
      image: "assets/images/players/brain-lara.jpg",
      question: "Who is this player?",
      answers: ["Chris Gayle", "Jofra Archer", "Brian Lara", "Kieron Pollard"],
      correct: 2
    },
    {
      image: "assets/images/players/rohit-sharma.jpg",
      question: "Who is this player?",
      answers: ["Sachin Tendulkar", "Virat Kohli", "Brian Lara", "Rohit Sharma"],
      correct: 3
    }
  ];

  const quizLength = questions.length;

    /**

   * Load a question

   */
  function loadQuestion() {
    const questionData = questions[questionNumber];
    elements.questionImage.src = questionData.image;
    elements.questionImage.alt = `Image for ${questionData.question}`;
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
    // Remove focus from all buttons
    elements.answerButtons.forEach(button => button.blur());
  }

   /**

   * Error page redirection

   */
   window.addEventListener('error', function(event) {
    console.error("Error occurred: ", event.message);
    if (!event.message.includes('Script error')) {
     window.location.href = '404.html';
    }

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
      button.addEventListener('click', () => {
        checkAnswer(index);
        button.blur(); // Remove focus after click
      });
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
