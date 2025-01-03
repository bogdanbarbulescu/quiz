document.addEventListener("DOMContentLoaded", () => {
    const quizData = [
      {
        question: "What is the purpose of the OSI model?",
        options: ["To define networking standards", "To route data packets", "To establish IP addresses", "To encrypt data"],
        answer: "To define networking standards"
      },
      {
        question: "Which protocol uses port 80?",
        options: ["FTP", "HTTP", "SMTP", "SSH"],
        answer: "HTTP"
      },
      {
        question: "What does NAT stand for?",
        options: ["Network Address Translation", "Network Access Table", "Node Allocation Tool", "None of the above"],
        answer: "Network Address Translation"
      },
      {
        question: "Which layer of the OSI model is responsible for data encryption?",
        options: ["Session", "Presentation", "Application", "Transport"],
        answer: "Presentation"
      },
      {
        question: "Which command is used to check the IP address of a device?",
        options: ["ipconfig", "ifconfig", "netstat", "ping"],
        answer: "ipconfig"
      },
      {
        question: "Which protocol is used for secure remote login?",
        options: ["SSH", "HTTP", "FTP", "Telnet"],
        answer: "SSH"
      },
      {
        question: "What is the default subnet mask for a class C network?",
        options: ["255.255.0.0", "255.255.255.0", "255.0.0.0", "255.255.255.255"],
        answer: "255.255.255.0"
      },
      {
        question: "Which IP address range is used for private networks?",
        options: ["10.0.0.0 to 10.255.255.255", "192.168.0.0 to 192.168.255.255", "172.16.0.0 to 172.31.255.255", "All of the above"],
        answer: "All of the above"
      },
      {
        question: "Which command is used to test network connectivity?",
        options: ["ping", "traceroute", "nslookup", "netstat"],
        answer: "ping"
      },
      {
        question: "What is the main function of a router?",
        options: ["Forward packets between networks", "Store data", "Direct emails", "Block traffic"],
        answer: "Forward packets between networks"
      }
    ];
  
    let currentQuestion = 0;
    let score = 0;
    let incorrectAnswers = [];
    let selectedAnswers = [];
  
    const quizContainer = document.getElementById("quiz");
    const progressBar = document.getElementById("progressBar");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");
    const submitButton = document.getElementById("submit");
    const retryButton = document.getElementById("retry");
    const showAnswerButton = document.getElementById("showAnswer");
    const resultContainer = document.getElementById("result");
  
    // Add a CSS animation for the congratulations message
    const congratsMessage = document.createElement("div");
    congratsMessage.classList.add("congratulations");
    congratsMessage.innerHTML = "<h2>Congratulations! You got all the answers right!</h2>";
    congratsMessage.style.display = "none"; // Hide initially
  
    document.body.appendChild(congratsMessage); // Add it to the body
  
    function updateProgress() {
      const progress = ((currentQuestion + 1) / quizData.length) * 100;
      progressBar.style.width = `${progress}%`;
      progressBar.textContent = `${currentQuestion + 1}/${quizData.length}`;
    }
  
    function displayQuestion() {
      const questionData = quizData[currentQuestion];
      updateProgress();
  
      const optionsHtml = questionData.options
        .map(
          (option, index) =>
            `<div class="form-check option">
              <input class="form-check-input" type="radio" name="quiz" id="option${index}" value="${option}" ${selectedAnswers[currentQuestion] === option ? "checked" : ""}>
              <label class="form-check-label" for="option${index}">${option}</label>
            </div>`
        )
        .join("");
  
      quizContainer.innerHTML = `
        <h5 class="question mb-3">${questionData.question}</h5>
        <div class="options">${optionsHtml}</div>
      `;
  
      prevButton.disabled = currentQuestion === 0;
      nextButton.classList.toggle("d-none", currentQuestion === quizData.length - 1);
      submitButton.classList.toggle("d-none", currentQuestion !== quizData.length - 1);
    }
  
    function checkAnswer() {
      const selectedOption = document.querySelector('input[name="quiz"]:checked');
      if (selectedOption) {
        const answer = selectedOption.value;
        selectedAnswers[currentQuestion] = answer;
        const questionData = quizData[currentQuestion];
        if (answer === questionData.answer) {
          score++;
        } else {
          incorrectAnswers.push({
            question: questionData.question,
            incorrectAnswer: answer,
            correctAnswer: questionData.answer
          });
        }
      }
    }
  
    function showResults() {
      quizContainer.innerHTML = "";
      resultContainer.innerHTML = `
        <p>You scored <strong>${score}</strong> out of <strong>${quizData.length}</strong>.</p>
      `;
  
      if (score === quizData.length) {
        // Show congratulatory message if all answers are correct
        congratsMessage.style.display = "block";
        congratsMessage.classList.add("animate-congratulations");
      }
  
      retryButton.classList.remove("d-none");
      showAnswerButton.classList.remove("d-none");
      nextButton.classList.add("d-none");
      prevButton.classList.add("d-none");
      submitButton.classList.add("d-none");
    }
  
    function retryQuiz() {
      currentQuestion = 0;
      score = 0;
      incorrectAnswers = [];
      selectedAnswers = [];
      retryButton.classList.add("d-none");
      showAnswerButton.classList.add("d-none");
      nextButton.classList.remove("d-none");
      prevButton.classList.remove("d-none");
      displayQuestion();
      congratsMessage.style.display = "none"; // Hide congratulatory message when retrying
    }
  
    function showAnswers() {
      const answersHtml = incorrectAnswers
        .map(
          (answer) =>
            `<div class="mb-3">
              <p><strong>Question:</strong> ${answer.question}</p>
              <p><span class="incorrect">Your Answer:</span> ${answer.incorrectAnswer}</p>
              <p><span class="correct">Correct Answer:</span> ${answer.correctAnswer}</p>
            </div>`
        )
        .join("");
      resultContainer.innerHTML = answersHtml;
    }
  
    prevButton.addEventListener("click", () => {
      currentQuestion--;
      displayQuestion();
    });
  
    nextButton.addEventListener("click", () => {
      checkAnswer();
      currentQuestion++;
      displayQuestion();
    });
  
    submitButton.addEventListener("click", () => {
      checkAnswer();
      showResults();
    });
  
    retryButton.addEventListener("click", retryQuiz);
    showAnswerButton.addEventListener("click", showAnswers);
  
    displayQuestion();
  });
  