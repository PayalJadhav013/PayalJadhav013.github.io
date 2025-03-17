const loginPage = document.getElementById('login-page');
const subjectSelectionPage = document.getElementById('subject-selection-page');
const examPage = document.getElementById('exam-page');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const subjectNameElement = document.getElementById('subjectName');
const questionsContainer = document.getElementById('questions');
const resultElement = document.getElementById('result');
const examForm = document.getElementById('examForm');

// Sample questions (replace with actual questions and answers)
const questions = {
    python: [
        { question: "What is the output of print(2 + 2 * 2)?", options: ["6", "8", "4", "10"], answer: "6" },
        { question: "Which data type is used to store a collection of items?", options: ["int", "float", "str", "list"], answer: "list" },
    ],
    java: [
        { question: "What is the keyword used to create a class in Java?", options: ["class", "interface", "struct", "enum"], answer: "class" },
        { question: "Which operator is used for object creation?", options: ["+", "-", "*", "new"], answer: "new" },
    ],
    cpp: [
        // Add C++ questions
    ]
};

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Basic validation (replace with actual authentication logic)
    if (username === 'user' && password === 'password') {
        loginPage.style.display = 'none';
        subjectSelectionPage.style.display = 'block';
    } else {
        loginError.textContent = 'Invalid username or password.';
    }
});

function loadExam(subject) {
    subjectNameElement.textContent = subject.charAt(0).toUpperCase() + subject.slice(1);
    subjectSelectionPage.style.display = 'none';
    examPage.style.display = 'block';
    questionsContainer.innerHTML = ''; // Clear previous questions

    const subjectQuestions = questions[subject];
    if (!subjectQuestions) return;

    subjectQuestions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question-container');
        questionDiv.innerHTML = `
            <h3>${index + 1}. ${question.question}</h3>
            <ul>
                ${question.options.map(option => `<li><input type="radio" name="q${index}" value="${option}"> ${option}</li>`).join('')}
            </ul>
        `;
        questionsContainer.appendChild(questionDiv);
    });
}

examForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let correctAnswers = 0;
    const subject = subjectNameElement.textContent.toLowerCase();
    const subjectQuestions = questions[subject];

    subjectQuestions.forEach((question, index) => {
        const selectedOption = document.querySelector(`input[name="q${index}"]:checked`);
        if (selectedOption && selectedOption.value === question.answer) {
            correctAnswers++;
        }
    });

    const percentage = (correctAnswers / subjectQuestions.length) * 100;
    const resultText = percentage >= 60 ? "Passed" : "Failed";
    resultElement.textContent = `Result: ${resultText} (${correctAnswers} out of ${subjectQuestions.length} correct)`;
});