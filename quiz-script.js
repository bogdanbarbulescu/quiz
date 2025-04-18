// quiz-script.js (Handles dynamic quiz loading and logic)

document.addEventListener("DOMContentLoaded", () => {
  // --- Get DOM Elements ---
  const quizContainer = document.getElementById("quiz");
  const progressBar = document.getElementById("progressBar");
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");
  const submitButton = document.getElementById("submit");
  const retryButton = document.getElementById("retry");
  const showAnswerButton = document.getElementById("showAnswer");
  const resultContainer = document.getElementById("result");
  const quizTitleElement = document.getElementById("quizTitle");
  const loadingIndicator = document.getElementById('loading-indicator');
  const errorMessageElement = document.getElementById('error-message');
  const quizContentArea = document.getElementById('quiz-content-area');

  // --- State Variables ---
  let currentQuestionIndex = 0;
  let score = 0;
  let incorrectAnswers = [];
  let selectedAnswers = []; // Store user's selection for each question index
  let currentQuizData = null; // Holds the data for the currently loaded quiz

  // --- Get Quiz ID from URL ---
  const urlParams = new URLSearchParams(window.location.search);
  const quizId = urlParams.get("quizId");

  // --- Fetch Quiz Data ---
  async function loadQuiz() {
      if (!quizId) {
          showError("No quiz ID provided in the URL.");
          return;
      }

      try {
          // Fetch the entire quiz data file
          const response = await fetch('data/quizzes.json');
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          const allQuizzes = await response.json();

          // Find the specific quiz by ID across all categories
          let foundQuiz = null;
          for (const category in allQuizzes) {
              foundQuiz = allQuizzes[category].find(quiz => quiz.id === quizId);
              if (foundQuiz) break;
          }

          if (!foundQuiz) {
              throw new Error(`Quiz with ID '${quizId}' not found.`);
          }

          currentQuizData = foundQuiz; // Store the loaded quiz data
          selectedAnswers = new Array(currentQuizData.questions.length).fill(null); // Initialize selected answers array

          // --- Initialize UI ---
          quizTitleElement.textContent = currentQuizData.title;
          loadingIndicator.style.display = 'none';
          quizContentArea.style.display = 'block'; // Show quiz content area
          errorMessageElement.classList.add('d-none'); // Hide error message

          displayQuestion(); // Display the first question

      } catch (error) {
          console.error("Error loading quiz:", error);
          showError(`Failed to load quiz data. ${error.message}`);
      }
  }

  // --- Display Error Message ---
  function showError(message) {
      quizTitleElement.textContent = 'Error';
      loadingIndicator.style.display = 'none';
      quizContentArea.style.display = 'none';
      errorMessageElement.textContent = message;
      errorMessageElement.classList.remove('d-none');
  }


  // --- Update Progress Bar ---
  function updateProgress() {
      if (!currentQuizData) return;
      const progress = ((currentQuestionIndex + 1) / currentQuizData.questions.length) * 100;
      progressBar.style.width = `${progress}%`;
      progressBar.textContent = `${currentQuestionIndex + 1}/${currentQuizData.questions.length}`;
  }

  // --- Display Current Question ---
  function displayQuestion() {
      if (!currentQuizData) return;

      resultContainer.innerHTML = ""; // Clear result area when showing question
      retryButton.classList.add("d-none");
      showAnswerButton.classList.add("d-none");

      const questionData = currentQuizData.questions[currentQuestionIndex];
      updateProgress();

      let optionsHtml = '';
      const questionType = questionData.type || 'multiple-choice'; // Default to multiple-choice

      // --- Generate HTML based on question type ---
      switch (questionType) {
          case 'multiple-choice':
          default: // Handle unknown types as multiple-choice for now
              optionsHtml = questionData.options
                  .map(
                      (option, index) =>
                          `<div class="form-check option">
                              <input class="form-check-input" type="radio" name="quizOption" id="option${index}" value="${option}" ${selectedAnswers[currentQuestionIndex] === option ? "checked" : ""}>
                              <label class="form-check-label" for="option${index}">${option}</label>
                          </div>`
                  )
                  .join("");
              break;

          // Add cases for 'true-false', 'fill-blank', etc. in future steps
          // case 'true-false': ...
          // case 'fill-blank': ...
      }


      quizContainer.innerHTML = `
          <h5 class="question mb-3">${questionData.question}</h5>
          <div class="options">${optionsHtml}</div>
      `;

      // --- Update Button States ---
      prevButton.disabled = currentQuestionIndex === 0;
      const isLastQuestion = currentQuestionIndex === currentQuizData.questions.length - 1;
      nextButton.classList.toggle("d-none", isLastQuestion);
      submitButton.classList.toggle("d-none", !isLastQuestion);

      // --- Add Event Listeners for Options ---
      document.querySelectorAll('input[name="quizOption"]').forEach((input) => {
          input.addEventListener("change", handleAnswerSelection);
      });
      // Add listeners for other input types (text, etc.) when implemented
  }

  // --- Handle User Selecting an Answer ---
  function handleAnswerSelection(event) {
      if (!event.target) return;
      selectedAnswers[currentQuestionIndex] = event.target.value;
      // Optionally, you could add immediate feedback here later
  }

  // --- Calculate Score and Identify Incorrect Answers ---
  function calculateResults() {
      score = 0;
      incorrectAnswers = [];
      currentQuizData.questions.forEach((questionData, index) => {
          const userAnswer = selectedAnswers[index];
          const correctAnswer = questionData.answer;

          if (userAnswer === correctAnswer) {
              score++;
          } else if (userAnswer !== null) { // Only count answered questions as incorrect
              incorrectAnswers.push({
                  questionNumber: index + 1,
                  question: questionData.question,
                  userAnswer: userAnswer,
                  correctAnswer: correctAnswer,
              });
          }
           // If userAnswer is null, they skipped it (don't mark incorrect, but don't give points)
      });
  }


  // --- Show Final Results ---
  function showResults() {
      calculateResults(); // Ensure results are calculated before showing
      quizContainer.innerHTML = ""; // Clear question area
      quizContentArea.style.display = 'block'; // Ensure area is visible

      const totalQuestions = currentQuizData.questions.length;
      const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

      let resultHTML = `<p>You scored <strong>${score}</strong> out of <strong>${totalQuestions}</strong> (${percentage}%).</p>`;

      if (score === totalQuestions) {
           resultHTML += `<div class="congratulations mt-3">Congratulations! Perfect Score! 🎉</div>`;
           // Trigger animation (if class is added dynamically)
          setTimeout(() => {
              const congrats = resultContainer.querySelector('.congratulations');
              if(congrats) congrats.classList.add('animate-congratulations');
          }, 50);
      } else if (incorrectAnswers.length > 0) {
          // Optionally suggest showing answers if there were mistakes
          resultHTML += `<p class="mt-3">Review your answers or try again!</p>`;
      }


      resultContainer.innerHTML = resultHTML;

      // --- Update Button States ---
      retryButton.classList.remove("d-none");
      // Only show "Show Answers" if there were incorrect ones
      showAnswerButton.classList.toggle("d-none", incorrectAnswers.length === 0);
      nextButton.classList.add("d-none");
      prevButton.classList.add("d-none");
      submitButton.classList.add("d-none");
      progressBar.parentElement.style.display = 'none'; // Hide progress bar
  }

  // --- Retry Quiz ---
  function retryQuiz() {
      currentQuestionIndex = 0;
      score = 0;
      incorrectAnswers = [];
      selectedAnswers = new Array(currentQuizData.questions.length).fill(null); // Reset selections
      resultContainer.innerHTML = ""; // Clear previous results
      retryButton.classList.add("d-none");
      showAnswerButton.classList.add("d-none");
      progressBar.parentElement.style.display = 'block'; // Show progress bar
      displayQuestion(); // Show first question
  }

  // --- Show Incorrect Answers ---
  function showAnswers() {
      const answersHtml = incorrectAnswers
          .map(
              (answer) =>
                  `<div class="mb-3">
                      <p><strong>Question ${answer.questionNumber}:</strong> ${answer.question}</p>
                      <p><span class="incorrect">Your Answer:</span> ${answer.userAnswer || '<em>Skipped</em>'}</p>
                      <p><span class="correct">Correct Answer:</span> ${answer.correctAnswer}</p>
                  </div>`
          )
          .join("");

      // Display below the initial score report
      resultContainer.innerHTML += `<hr><h4 class="mb-3 mt-4">Incorrect Answers Review</h4>${answersHtml}`;
      showAnswerButton.classList.add('d-none'); // Hide button after showing
  }

  // --- Event Listeners for Navigation ---
  prevButton.addEventListener("click", () => {
      if (currentQuestionIndex > 0) {
          currentQuestionIndex--;
          displayQuestion();
      }
  });

  nextButton.addEventListener("click", () => {
      if (currentQuestionIndex < currentQuizData.questions.length - 1) {
          currentQuestionIndex++;
          displayQuestion();
      }
  });

  submitButton.addEventListener("click", () => {
      showResults();
  });

  retryButton.addEventListener("click", retryQuiz);
  showAnswerButton.addEventListener("click", showAnswers);

  // --- Initial Load ---
  loadQuiz();

});