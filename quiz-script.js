// quiz-script.js

document.addEventListener("DOMContentLoaded", () => {
    const quizData = [
        { question: "What is the primary function of Neutron in OpenStack?", options: ["Compute resource management", "Identity and access management", "Networking as a Service (NaaS)", "Block storage management"], answer: "Networking as a Service (NaaS)" },
        { question: "Which component serves as the main API endpoint for Neutron?", options: ["neutron-agent", "neutron-server", "neutron-l3-agent", "neutron-dhcp-agent"], answer: "neutron-server" },
        { question: "Which technology is most commonly used for asynchronous communication between Neutron components?", options: ["HTTP/REST", "SOAP", "RabbitMQ (or another AMQP message queue)", "gRPC"], answer: "RabbitMQ (or another AMQP message queue)" },
        { question: "What is the purpose of the ML2 plugin in Neutron?", options: ["To provide L3 routing services.", "To manage DHCP for virtual networks.", "To provide a modular framework for supporting various networking technologies.", "To collect network telemetry data."], answer: "To provide a modular framework for supporting various networking technologies." },
        { question: "Which of the following is NOT a type of Neutron plugin?", options: ["Core Plugin", "Service Plugin", "Storage Plugin", "Mechanism Driver"], answer: "Storage Plugin" },
        {
            question: "What does Cinder provide in OpenStack?",
            options: ["Networking services", "Identity services", "Block storage services", "Object storage services"],
            answer: "Block storage services"
        },
        {
            question: "Which OpenStack component is responsible for user authentication and authorization?",
            options: ["Nova", "Keystone", "Glance", "Swift"],
            answer: "Keystone"
        },
        {
            question: "What is the role of Glance in OpenStack?",
            options: ["Compute resource management", "Image service", "Networking service", "Object storage service"],
            answer: "Image service"
        },
        {
            question: "What type of storage does Swift provide in OpenStack?",
            options: ["Block storage", "File storage", "Object storage", "Ephemeral storage"],
            answer: "Object storage"
        },
        {
            question: "Which component is the core of OpenStack's compute service?",
            options: ["Neutron", "Cinder", "Nova", "Swift"],
            answer: "Nova"
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

        // Add event listener to radio buttons to store answer on change.
        document.querySelectorAll('input[name="quiz"]').forEach(radio => {
            radio.addEventListener('change', checkAnswer);
        });
    }

    function checkAnswer() {
        const selectedOption = document.querySelector('input[name="quiz"]:checked');
        if (selectedOption) {
            const answer = selectedOption.value;
            selectedAnswers[currentQuestion] = answer; // Store selected answer
            const questionData = quizData[currentQuestion];
            if (answer !== questionData.answer) { // Check if answer is correct
                // Find the incorrect answer if it exists, otherwise add it
                const existingIncorrectAnswer = incorrectAnswers.find(ia => ia.question === questionData.question);
                if (existingIncorrectAnswer) {
                    existingIncorrectAnswer.incorrectAnswer = answer; // Update if it exists
                } else {
                    incorrectAnswers.push({ // Add new incorrect answer
                        question: questionData.question,
                        incorrectAnswer: answer,
                        correctAnswer: questionData.answer
                    });
                }
            } else {
                score++;  //correct answer
                // Remove from incorrectAnswers if it's there
                incorrectAnswers = incorrectAnswers.filter(ia => ia.question !== questionData.question);
            }
        }
    }

    function showResults() {
        quizContainer.innerHTML = "";

         // Display congratulatory message if all answers are correct
        if (score === quizData.length) {
            resultContainer.innerHTML = `<div class="congratulations animate-congratulations">Congratulations! You got all the answers correct!</div>`;
        } else {
             resultContainer.innerHTML = `<p>You scored <strong>${score}</strong> out of <strong>${quizData.length}</strong>.</p>`;
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
        resultContainer.innerHTML = "";
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

    // Only show the "Answers" section if there are incorrect answers
    if (incorrectAnswers.length > 0) {
        resultContainer.innerHTML = `<h4 class="mb-3">Answers</h4>${answersHtml}`;
    } else {
        // Optionally, clear or show a message if there are no incorrect answers
        resultContainer.innerHTML = ""; // Or a message like "All answers were correct!"
    }
}

    prevButton.addEventListener("click", () => {
        // No need to check answer on "Previous"
        currentQuestion--;
        displayQuestion();
    });

    nextButton.addEventListener("click", () => {
        //checkAnswer moved to event listener
        currentQuestion++;
        displayQuestion();
    });

    submitButton.addEventListener("click", () => {
        //checkAnswer moved to event listener
        showResults();
    });

    retryButton.addEventListener("click", retryQuiz);
    showAnswerButton.addEventListener("click", showAnswers);

    displayQuestion();
});