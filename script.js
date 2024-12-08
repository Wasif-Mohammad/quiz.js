const authForm = document.getElementById("authForm");
const authButton = document.getElementById("authButton");
const home = document.getElementById("home");
const auth = document.getElementById("auth");
const quiz = document.getElementById("quiz");
const result = document.getElementById("result");

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const userDisplay = document.getElementById("user");
const errorDisplay = document.getElementById("error");

const questionContainer = document.getElementById("questionContainer");
const timerDisplay = document.getElementById("timer");
const nextButton = document.getElementById("nextButton");
const quizTopic = document.getElementById("quizTopic");
const scoreDisplay = document.getElementById("score");
const retryButton = document.getElementById("retry");

let currentTopic, currentQuestion, score, timer;

// Questions for the quiz
const questions = {
  HTML: [
    { question: "What does HTML stand for?", options: ["HyperText Markup Language", "HighText Machine Language", "None"], answer: 0 },
    { question: "Choose the correct HTML element for the largest heading.", options: ["h1", "head", "h6"], answer: 0 },
  ],
  CSS: [
    { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets"], answer: 0 },
    { question: "Which property is used to change background color?", options: ["color", "background-color", "bgcolor"], answer: 1 },
  ],
  JavaScript: [
    { question: "Inside which HTML element do we put JavaScript?", options: ["js", "javascript", "script"], answer: 2 },
    { question: "Which is correct to declare a variable?", options: ["var", "const", "let"], answer: 1 },
  ],
};

// Signup/Login Handler
authForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  const storedPassword = localStorage.getItem(username);
  if (storedPassword) {
    if (storedPassword === password) {
      login(username);
    } else {
      errorDisplay.textContent = "Incorrect Password.";
    }
  } else {
    localStorage.setItem(username, password);
    login(username);
  }
});

// Login
function login(username) {
  auth.classList.add("hidden");
  home.classList.remove("hidden");
  userDisplay.textContent = username;
}

// Start Quiz
document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", () => {
    startQuiz(card.dataset.topic);
  });
});

function startQuiz(topic) {
  currentTopic = topic;
  currentQuestion = 0;
  score = 0;
  quizTopic.textContent = `${topic} Quiz`;
  home.classList.add("hidden");
  quiz.classList.remove("hidden");
  loadQuestion();
}

function loadQuestion() {
  const question = questions[currentTopic][currentQuestion];
  questionContainer.innerHTML = `
    <p>${question.question}</p>
    ${question.options
      .map((option, index) => `<button class="option" data-index="${index}">${option}</button>`)
      .join("")}
  `;

  document.querySelectorAll(".option").forEach((button) => {
    button.addEventListener("click", checkAnswer);
  });

  startTimer();
}

function checkAnswer(e) {
  const selectedIndex = parseInt(e.target.dataset.index);
  const question = questions[currentTopic][currentQuestion];

  if (selectedIndex === question.answer) {
    score++;
  }
  nextQuestion();
}

function nextQuestion() {
  clearInterval(timer);
  currentQuestion++;
  if (currentQuestion < questions[currentTopic].length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function startTimer() {
  let timeLeft = 60;
  timerDisplay.textContent = `Time Left: ${timeLeft}s`;
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;
    if (timeLeft === 0) {
      nextQuestion();
    }
  }, 1000);
}

// Show Result
function showResult() {
  quiz.classList.add("hidden");
  result.classList.remove("hidden");
  scoreDisplay.textContent = `Your Score: ${score} / ${questions[currentTopic].length}`;
}

// Retry Button
retryButton.addEventListener("click", () => {
  home.classList.remove("hidden");
  result.classList.add("hidden");
});
