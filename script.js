let currentQuestionIndex = 0;
let questions = [];
let timeLimit = 10; 
let timer;
let isGameStarted = false;

const questionData = {
  easy: [
    {
      question: "What is 2 + 2?",
      answers: { A: "3", B: "4", C: "5", D: "6" },
      correctAnswer: "B"
    },
    {
      question: "What is 5 + 3?",
      answers: { A: "7", B: "8", C: "9", D: "10" },
      correctAnswer: "B"
    }
  ],
  medium: [
    {
      question: "What is the capital of France?",
      answers: { A: "Berlin", B: "Madrid", C: "Paris", D: "Rome" },
      correctAnswer: "C"
    },
    {
      question: "What is 15 x 3?",
      answers: { A: "45", B: "55", C: "60", D: "40" },
      correctAnswer: "A"
    }
  ],
  hard: [
    {
      question: "What is the square root of 144?",
      answers: { A: "10", B: "12", C: "14", D: "16" },
      correctAnswer: "B"
    },
    {
      question: "What is the atomic number of Oxygen?",
      answers: { A: "8", B: "9", C: "7", D: "6" },
      correctAnswer: "A"
    }
  ]
};


function startGame(difficulty) {
  questions = questionData[difficulty];
  timeLimit = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 7 : 5;
  currentQuestionIndex = 0;
  isGameStarted = true;
  
  
  document.getElementById('difficulty-selection').style.display = 'none';
  document.getElementById('game').style.display = 'block';

  
  startTimer();
  
 
  loadQuestion();
}


function startTimer() {
  let timeLeft = timeLimit;
  document.getElementById('timer').textContent = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById('timer').textContent = timeLeft;
    
    if (timeLeft <= 0) {
      clearInterval(timer);
      showFeedback(false);
    }
  }, 1000);
}

function loadQuestion() {
  const question = questions[currentQuestionIndex];
  document.getElementById('question').textContent = question.question;
  
  const choices = document.getElementById('choices');
  choices.innerHTML = '';
  
  for (let [key, value] of Object.entries(question.answers)) {
    const choiceContainer = document.createElement('div');
    choiceContainer.classList.add('choice-container');
    choiceContainer.setAttribute('onclick', `checkAnswer('${key}')`);
    
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


function checkAnswer(selected) {
  const correctAnswer = questions[currentQuestionIndex].correctAnswer;
  const feedback = document.getElementById('feedback');
  
  if (selected === correctAnswer) {
    feedback.textContent = 'Correct!';
  } else {
    feedback.textContent = `Incorrect. The correct answer is ${correctAnswer}.`;
  }

 
  document.getElementById('next-btn').style.display = 'inline-block';
}

function nextQuestion() {
  currentQuestionIndex++;
  
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
    document.getElementById('feedback').textContent = '';
    document.getElementById('next-btn').style.display = 'none';
  } else {
    alert('Game Over!');
   
  }
}
