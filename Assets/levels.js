//create a timer that counts down from 4:00 minutes. When the timer reaches 0, the game is over.
let username = '';
let score = 0;
let currentQuestionIndex = 0;
let retryCount = 0;
let currentLevel = '';
let leaderboard = [];
let timeElapsed = 0;
let timer;

const questions = {
       beginner: [
        {   
            question: "What is the capital of the USA?",
            options: ["Washington", "New York", "California", "Texas"],
            correctAnswer: "Washington"
        },
        {   
            question: "Which country makes Subaru vehicles?",
            options: ["India", "Italy", "Japan", "Brazil"],
            correctAnswer: "Japan"
        },
        {  
            question: "What is the capital of Colombia?",
            options: ["Bogota", "Quito", "Georgetown", "Lima"],
            correctAnswer: "Bogota"
        }
    ],
            intermediate: [
                {  
                question: "Who invented the telephone?",
                options: ["Thomas Edison", "Alexander Graham Bell", "Albert Einstein", "Isaac Newton"],
                correctAnswer: "Alexander Graham Bell"
            },
            {  
                question: "Which is the longest river in the world?",
                options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
                correctAnswer: "Nile"
            },
            {  
                question: "In which year did the Titanic sink?",
                options: ["1912", "1914", "1916", "1918"],
                correctAnswer: "1912"
            }
        ],
              advanced:[
                {   
                    question: "Which scientist developed the theory of relativity?",
                    options: ["Thomas Edison", "Albert Einstein", "Isaac Newton", "Galileo Galilei"],
                    correctAnswer: "Albert Einstein"
                },
                {   
                    question: "Which element has the atomic number 1?",
                    options: ["Hydrogen", "Helium", "Oxygen", "Carbon"],
                    correctAnswer: "Hydrogen"
                },
                {   
                    question: "Which country is known as the land of the rising sun?",
                    options: ["China", "India", "Japan", "South Korea"],
                    correctAnswer: "Japan"
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
        
        // Call this function at the start of the game
        checkAndClearOldData();

    function startGame() {
        username = document.getElementById('username').value;
        if (username === '') {
            alert('Please enter a username');
            return;
        }
        document.getElementById('usernameSection').style.display = 'none';
        document.getElementById('levelSelector').style.display = 'block';
        }
    function startLevel(level) {
            currentLevel = level;
            currentQuestionIndex = 0;
            score = 0;
            retryCount = 0;
            document.getElementById('levelSelector').style.display = 'none';
            document.getElementById('gameSection').style.display = 'block';
            displayQuestion();
            startTimer();
    }
        
    function displayQuestion() {
            retryCount = 0;
            const currentQuestion = questions[currentLevel][currentQuestionIndex];
            document.getElementById('question').textContent = currentQuestion.question;
            const answersDiv = document.getElementById('answers');
            answersDiv.innerHTML = '';
            currentQuestion.options.forEach((option) => {
                const button = document.createElement('button');
                button.classList.add('button');
                button.textContent = option;
                button.addEventListener('click', () => checkAnswer(option));
                answersDiv.appendChild(button);
                //answersDiv.appendChild(document.createElement("br"));//
            });
        }

    function checkAnswer(selectedAnswer) {
            const currentQuestion = questions[currentLevel][currentQuestionIndex];
            if (selectedAnswer === currentQuestion.correctAnswer) {
                score++;
                alert('Correct!');
                nextQuestion();
            }else {
                    alert(`Incorrect! The correct answer was ${currentQuestion.correctAnswer}`);
                    nextQuestion();
                }
            }

    function nextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions[currentLevel].length) {
            displayQuestion();
        } else {
            endGame();
        }
    }
    function endGame() {
        clearInterval(timer);
        document.getElementById('gameSection').style.display = 'none';
        document.getElementById('resultSection').style.display = 'block';
        document.getElementById('username').textContent = username;
        document.getElementById('score').textContent = score;

        const leaderboardData = JSON.parse(localStorage.getItem('leaderboard')) || [];
        leaderboardData.push({ username, score });
        localStorage.setItem('leaderboard', JSON.stringify(leaderboardData));

        updateLeaderboard();
    }
    function updateLeaderboard() {
        const leaderboardData = JSON.parse(localStorage.getItem('leaderboard')) || [];
        leaderboardData.sort((a, b) => b.score - a.score);

        //const leaderboardList = document.getElementById('leaderboardList');
        //leaderboardList.innerHTML = '';
        //leaderboardData.forEach((entry, index) => {
            //const listItem = document.createElement('li');
            //listItem.textContent = `${index + 1}. ${entry.username}: - ${entry.score} points`;
            //leaderboardList.appendChild(listItem);
        //});
        const leaderboardBody = document.getElementById('leaderboardBody');
        leaderboardBody.innerHTML = ''; 

        leaderboardData.forEach((entry, index) => {
        const row = document.createElement('tr'); 

        const rankCell = document.createElement('td');
        rankCell.textContent = index + 1;
        row.appendChild(rankCell);

        const usernameCell = document.createElement('td');
        usernameCell.textContent = entry.username; 
        row.appendChild(usernameCell);

        const scoreCell = document.createElement('td');
        scoreCell.textContent = entry.score;
        row.appendChild(scoreCell);

        leaderboardBody.appendChild(row);
    });

        document.getElementById('leaderboard').style.display = 'block';
    }

    function playAgain() {
        clearInterval(timer);
        timeElapsed = 0;
      score = 0;
      currentQuestionIndex = 0;
      document.getElementById('resultSection').style.display = 'none';
      document.getElementById('usernameSection').style.display = 'block';
      document.getElementById('leaderboard').style.display = 'none';
      startLevel(level);
    }

    function startTimer() {
        timeElapsed = 0;
        const timerDisplay = document.getElementById("timerDisplay");
        timer = setInterval(function() {
            timeElapsed++;
            timerDisplay.textContent = formatTime(timeElapsed);
    
            if (timeElapsed === 120) {
                clearInterval(timer);
                alert("Time's up! Game over.");
            }
        }, 1000);
    }
    
    function formatTime(seconds) {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min}:${sec < 10 ? "0" : ""}${sec}`;
    }




    