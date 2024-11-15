
const questions = [
    {
        question: "What is the capital of colombia?",
        options: {
            A: "Bogota",
            B: "quito",
            C: "georgetown",
            D: "lima"
        },
        correctAnswer: "A"
    },
    {
        question: "Which country makes subaru vehicle?",
        options: {
            A: "india",
            B: "italy",
            C: "Japan",
            D: "brazil"
        },
        correctAnswer: "C"
    },

];

let currentQuestionIndex = 0;



function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('question').textContent = currentQuestion.question;
    document.getElementById('choice-A').textContent = currentQuestion.options.A;
    document.getElementById('choice-B').textContent = currentQuestion.options.B;
    document.getElementById('choice-C').textContent = currentQuestion.options.C;
    document.getElementById('choice-D').textContent = currentQuestion.options.D;

    
    document.getElementById('feedback').textContent = '';
    document.getElementById('next-btn').style.display = 'none';
}







function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.correctAnswer;


    if (isCorrect) {
        showFeedback('Correct!');
    } else {
        showFeedback(`Incorrect! The correct answer was ${currentQuestion.correctAnswer}`);
    }

    
    disableChoices();
}





function showFeedback(message) {
    document.getElementById('feedback').textContent = message;
    document.getElementById('next-btn').style.display = 'block';
}




function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showEndGameMessage();
    }
}




loadQuestion();