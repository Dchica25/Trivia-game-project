
let currentQuestionIndex = 0;
let questions = [];
let timer;
let totalTimeLimit = 120;  // Total game time limit (in seconds)
let timeElapsed = 0;  // Track total time elapsed
let isGameStarted = false;
let score = 0;  // Track the user's score
let level = ""

const questionData = {
  Beginner: [
    {
      question: "What is 2 + 2?",
      answers: { A: "3", B: "4", C: "5", D: "6" },
      correctAnswer: "B"
    },
    {
      question: "What is 5 + 3?",
      answers: { A: "7", B: "8", C: "9", D: "10" },
      correctAnswer: "B"
    },
    {
      question: "What color is the sky on a clear day?",
      answers: { A: "Blue", B: "Green", C: "Red", D: "Yellow" },
      correctAnswer: "A"
    },
    {
      question: "How many sides does a triangle have?",
      answers: { A: "4", B: "5", C: "3", D: "6" },
      correctAnswer: "C"
    },
    {
      question: "Which animal is known as the king of the jungle?",
      answers: { A: "Lion", B: "Elephant", C: "Tiger", D: "Bear" },
      correctAnswer: "A"
    }
  ],
  Intermediate: [
    {
      question: "What is the capital of France?",
      answers: { A: "Berlin", B: "Madrid", C: "Paris", D: "Rome" },
      correctAnswer: "C"
    },
    {
      question: "What is 15 x 3?",
      answers: { A: "45", B: "55", C: "60", D: "40" },
      correctAnswer: "A"
    },
    {
      question: "Who wrote 'Romeo and Juliet'?",
      answers: { A: "William Shakespeare", B: "Mark Twain", C: "Jane Austen", D: "Charles Dickens" },
      correctAnswer: "A"
    },
    {
      question: "What is the largest ocean on Earth?",
      answers: { A: "Atlantic Ocean", B: "Indian Ocean", C: "Pacific Ocean", D: "Arctic Ocean" },
      correctAnswer: "C"
    },
    {
      question: "Which planet is known as the Red Planet?",
      answers: { A: "Mars", B: "Venus", C: "Jupiter", D: "Saturn" },
      correctAnswer: "A"
    }
  ],
  Advanced: [
    {
      question: "What is the square root of 144?",
      answers: { A: "10", B: "12", C: "14", D: "16" },
      correctAnswer: "B"
    },
    {
      question: "What is the atomic number of Oxygen?",
      answers: { A: "8", B: "9", C: "7", D: "6" },
      correctAnswer: "A"
    },
    {
      question: "What is the largest known star in the universe?",
      answers: { A: "Betelgeuse", B: "Antares", C: "VY Canis Majoris", D: "Sirius" },
      correctAnswer: "C"
    },
    {
      question: "What element has the chemical symbol 'Au'?",
      answers: { A: "Silver", B: "Gold", C: "Platinum", D: "Iron" },
      correctAnswer: "B"
    },
    {
      question: "Who is credited with the theory of relativity?",
      answers: { A: "Isaac Newton", B: "Albert Einstein", C: "Galileo Galilei", D: "Nikola Tesla" },
      correctAnswer: "B"
    },
    {
      question: "What is the most common gas in Earth's atmosphere?",
      answers: { A: "Oxygen", B: "Carbon Dioxide", C: "Nitrogen", D: "Hydrogen" },
      correctAnswer: "C"
    }
  ]
};

function checkAndClearOldData() {
  const storedDate = localStorage.getItem('storageDate');
  const today = new Date().toDateString();

  if (storedDate !== today) {
    localStorage.setItem('leaderboard', JSON.stringify([])); // Clear leaderboard
    localStorage.setItem('storageDate', today); // Update the storage date
  }
}

checkAndClearOldData();

function startGame(difficulty) {
  if (isGameStarted) return;  // Prevent starting the game again if it's already started

  questions = questionData[difficulty];
  currentQuestionIndex = 0;
  score = 0;  // Reset score at the start of the game
  timeElapsed = 0;  // Reset total time elapsed at the start of the game
  isGameStarted = true;

  document.getElementById('difficulty-selection').style.display = 'none';
  document.getElementById('game').style.display = 'block';
  document.getElementById('game-info').style.display = 'block';

  startTimer();
  loadQuestion();

  localStorage.setItem('gamelevel', JSON.stringify(difficulty));
}

function startTimer() {
  // Start the timer only if it's not already running
  if (timer) {
    clearInterval(timer);
  }

  timer = setInterval(function () {
    timeElapsed++;
    document.getElementById("timerDisplay").textContent = formatTime(timeElapsed);

    if (timeElapsed >= totalTimeLimit) {
      clearInterval(timer);
      alert("Time's up! Game over.");
      endGame();
    }
  }, 1000);
}

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}

function loadQuestion() {
  const question = questions[currentQuestionIndex];
  document.getElementById('question').textContent = question.question;

  const choices = document.getElementById('choices');
  choices.innerHTML = '';  // Clear previous choices

  for (let [key, value] of Object.entries(question.answers)) {
    const choiceContainer = document.createElement('div');
    choiceContainer.classList.add('choice-container');
    choiceContainer.setAttribute('onclick', `checkAnswer('${key}', this)`);

    const choicePrefix = document.createElement('p');
    choicePrefix.classList.add('choice-prefix');
    choicePrefix.textContent = key;

    const choiceText = document.createElement('p');
    choiceText.classList.add('choice-text');
    choiceText.textContent = value;

    choiceContainer.appendChild(choicePrefix);
    choiceContainer.appendChild(choiceText);
    choices.appendChild(choiceContainer);
  }
}

function checkAnswer(selected, choiceElement) {
  const correctAnswer = questions[currentQuestionIndex].correctAnswer;
  const feedback = document.getElementById('feedback');

  // Disable all choices after one is selected
  const allChoices = document.querySelectorAll('.choice-container');
  allChoices.forEach(choice => {
    choice.style.pointerEvents = 'none';  // Disable clicking other answers
  });

  if (selected === correctAnswer) {
    feedback.textContent = 'Correct!';
    score++;  // Increment score if the answer is correct
  } else {
    feedback.textContent = `Incorrect. The correct answer is ${correctAnswer}.`;
  }
  localStorage.setItem("score", score);
  // Show the next button
  document.getElementById('next-btn').style.display = 'inline-block';
}

function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    loadQuestion();
    document.getElementById('feedback').textContent = '';
    document.getElementById('next-btn').style.display = 'none';
  } else {
    // If all questions are answered, end the game.
    endGame();
  }
}

function endGame() {
  // Store score and total time in localStorage or sessionStorage
  localStorage.setItem('userScore', score);
  localStorage.setItem('timeElapsed', timeElapsed);

  // Redirect to the scoreboard page
  location.assign('./scoreBoard.html');
}