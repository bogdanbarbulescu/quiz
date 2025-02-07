document.addEventListener("DOMContentLoaded", () => {
    const quizData = [
        { question: "What is the primary function of Neutron in OpenStack?", options: ["Compute resource management", "Identity and access management", "Networking as a Service (NaaS)", "Block storage management"], answer: "Networking as a Service (NaaS)" },
        { question: "Which component serves as the main API endpoint for Neutron?", options: ["neutron-agent", "neutron-server", "neutron-l3-agent", "neutron-dhcp-agent"], answer: "neutron-server" },
        { question: "Which technology is most commonly used for asynchronous communication between Neutron components?", options: ["HTTP/REST", "SOAP", "RabbitMQ (or another AMQP message queue)", "gRPC"], answer: "RabbitMQ (or another AMQP message queue)" },
        { question: "What is the purpose of the ML2 plugin in Neutron?", options: ["To provide L3 routing services.", "To manage DHCP for virtual networks.", "To provide a modular framework for supporting various networking technologies.", "To collect network telemetry data."], answer: "To provide a modular framework for supporting various networking technologies." },
        { question: "Which of the following is NOT a type of Neutron plugin?", options: ["Core Plugin", "Service Plugin", "Storage Plugin", "Mechanism Driver"], answer: "Storage Plugin" },
        // Add more questions following the same structure
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

    function updateProgress() {
        const progress = ((currentQuestion + 1) / quizData.length) * 100;
        progressBar.style.width = `${progress}%`;
        progressBar.textContent = `${currentQuestion + 1}/${quizData.length}`;
    }

    function displayQuestion() {
        const questionData = quizData[currentQuestion];
        updateProgress();
        
        const optionsHtml = questionData.options.map((option, index) => 
            `<div class="form-check option">
                <input class="form-check-input" type="radio" name="quiz" id="option${index}" value="${option}" ${selectedAnswers[currentQuestion] === option ? "checked" : ""}>
                <label class="form-check-label" for="option${index}">${option}</label>
            </div>`
        ).join("");

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
        resultContainer.innerHTML = `<p>You scored <strong>${score}</strong> out of <strong>${quizData.length}</strong>.</p>`;
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
    }

    function showAnswers() {
        const answersHtml = incorrectAnswers.map(answer => 
            `<div class="mb-3">
                <p><strong>Question:</strong> ${answer.question}</p>
                <p><span class="incorrect">Your Answer:</span> ${answer.incorrectAnswer}</p>
                <p><span class="correct">Correct Answer:</span> ${answer.correctAnswer}</p>
            </div>`
        ).join("");
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
