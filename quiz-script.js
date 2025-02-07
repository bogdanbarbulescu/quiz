// quiz-script.js (Handles dynamic quiz loading and logic)

document.addEventListener('DOMContentLoaded', () => {
    // Get the quizId from the URL query parameter.
    const urlParams = new URLSearchParams(window.location.search);
    const quizId = urlParams.get('quizId');

    // Quiz Data (Centralized -  All quizzes in one place!)
    const quizData = {
        'networking-1': {
            title: 'CCNA Basics',
            questions: [
                { question: "What does OSI stand for?", options: ["Open Systems Interconnection", "Operating System Interface", "Optical Signal Integration", "Online System Interoperability"], answer: "Open Systems Interconnection" },
                { question: "Which layer of the OSI model is responsible for routing?", options: ["Physical Layer", "Data Link Layer", "Network Layer", "Transport Layer"], answer: "Network Layer" },
                { question: "What is the purpose of a MAC address?", options: ["Identify a device on a network", "Route data between networks", "Encrypt data transmissions", "Manage network congestion"], answer: "Identify a device on a network" },
                { question: "What is the default subnet mask for a Class C network?", options: ["255.0.0.0", "255.255.0.0", "255.255.255.0", "255.255.255.255"], answer: "255.255.255.0" },
                { question: "Which protocol is used to resolve IP addresses to MAC addresses?", options: ["ARP", "DHCP", "DNS", "TCP"], answer: "ARP" },
                { question: "What is the purpose of a router?", options: ["Connect devices within the same network", "Connect different networks together", "Provide wireless access", "Manage IP addresses"], answer: "Connect different networks together" },
                { question: "What does TCP stand for?", options: ["Transmission Control Protocol", "Transfer Control Protocol", "Transport Connection Protocol", "Total Control Protocol"], answer: "Transmission Control Protocol" },
                { question: "What is a subnet mask used for?", options: ["Identify the network and host portions of an IP address", "Encrypt network traffic", "Assign IP addresses dynamically", "Connect to the internet"], answer: "Identify the network and host portions of an IP address" },
                { question: "Which of the following is a valid IPv4 address?", options: ["192.168.1.256", "10.0.0.1", "256.256.256.256", "172.32.0.1/16"], answer: "10.0.0.1" },
                { question: "What is the purpose of DHCP?", options: ["Assign IP addresses dynamically", "Resolve domain names to IP addresses", "Secure network communication", "Manage network devices"], answer: "Assign IP addresses dynamically" },
            ]
        },
        'networking-2': {
            title: 'Subnetting Quiz',
            questions: [
               { question: "You have the network 192.168.1.0/24.  You need to create subnets with at least 25 hosts each.  What subnet mask should you use?", options: ["/25", "/26", "/27", "/28"], answer: "/27" },
                { question: "Given the IP address 172.16.0.0/16, how many subnets and hosts per subnet are possible?", options: ["65,536 subnets, 256 hosts", "256 subnets, 65,536 hosts", "1 subnet, 16,777,216 hosts", "Cannot be determined"], answer: "256 subnets, 65,536 hosts" },
                { question: "What is the network address of the host 192.168.1.55/27?", options: ["192.168.1.0", "192.168.1.32", "192.168.1.48", "192.168.1.64"], answer: "192.168.1.32" },
                { question: "What is the broadcast address of the host 10.0.0.100/26?", options: ["10.0.0.63", "10.0.0.127", "10.0.0.255", "10.0.0.64"], answer: "10.0.0.63" },
                { question: "How many usable host addresses are there in a /29 subnet?", options: ["8", "6", "14", "30"], answer: "6" },
                { question: "Which of the following is a valid subnet mask?", options: ["255.255.255.254", "255.255.200.0", "255.255.255.127", "255.0.255.0"], answer: "255.255.255.254" },
                { question: "The IP address 192.168.1.100/28 belongs to which subnet?", options: ["192.168.1.0", "192.168.1.96", "192.168.1.64", "192.168.1.112"], answer: "192.168.1.96" },
                { question: "What is the first usable host address in the subnet 172.16.5.64/26?", options: ["172.16.5.64", "172.16.5.65", "172.16.5.127", "172.16.5.126"], answer: "172.16.5.65" },
                { question: "What is the last usable host address in the subnet 10.1.1.0/24?", options: ["10.1.1.0", "10.1.1.1", "10.1.1.254", "10.1.1.255"], answer: "10.1.1.254" },
                { question: "You are given the network 10.0.0.0/8 and need 1000 subnets.  What subnet mask will provide the required number of subnets, while maximizing the number of host addresses per subnet?", options: ["/18", "/19", "/20", "/21"], answer: "/18" },
            ]
        },

        'openstack-1': {
            title: 'OpenStack Fundamentals',
            questions: [
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
            ]
        },

    'openstack-2': {
            title: 'Neutron Networking',
            questions: [
               { question: "What is a Neutron provider network?", options: ["A network created by an administrator that maps directly to a physical network.", "A network created by a tenant user.", "A network that provides self-service IPAM.", "A network isolated using VLANs."], answer: "A network created by an administrator that maps directly to a physical network." },
                { question: "Which Neutron component is responsible for providing L3 routing services?", options: ["neutron-server", "neutron-dhcp-agent", "neutron-l3-agent", "neutron-metadata-agent"], answer: "neutron-l3-agent" },
                { question: "What is the function of a Neutron router?", options: ["To connect different tenant networks together.", "To provide DHCP services.", "To manage security groups.", "To provide metadata to instances."], answer: "To connect different tenant networks together." },
                { question: "What is a security group in Neutron?", options: ["A collection of firewall rules that control network traffic to instances.", "A group of users with specific access privileges.", "A group of networks connected together.", "A mechanism for encrypting network traffic."], answer: "A collection of firewall rules that control network traffic to instances." },
                { question: "Which of the following is a valid Neutron network type?", options: ["Local", "Flat", "VLAN", "All of the above"], answer: "All of the above" },
                { question: "What is the purpose of a floating IP address in Neutron?", options: ["To provide a static IP address to an instance.", "To provide a publicly accessible IP address to an instance.", "To provide a temporary IP address to an instance.", "To provide an IP address for internal communication between instances."], answer: "To provide a publicly accessible IP address to an instance." },
                { question: "Which command is used to create a Neutron network?", options: ["neutron net-create", "nova net-create", "cinder net-create", "glance net-create"], answer: "neutron net-create" },
                { question: "What is the role of the neutron-dhcp-agent?", options: ["To provide L3 routing.", "To manage security groups.", "To provide DHCP services to tenant networks.", "To provide metadata to instances."], answer: "To provide DHCP services to tenant networks." },
                { question: "Which of the following is NOT a typical component of a Neutron deployment?", options: ["neutron-server", "neutron-l3-agent", "neutron-dhcp-agent", "neutron-storage-agent"], answer: "neutron-storage-agent" },
                { question: "What is the purpose of the Metadata Agent?", options: ["Provides configuration information to instances", "provides storage", "provides floating IPs", "provides DHCP"], answer: "Provides configuration information to instances" },
            ]
        },

     'security-1': {
            title: 'Basic Security Concepts',
            questions: [
                { question: "What is the CIA triad?", options: ["Confidentiality, Integrity, Availability", "Cryptography, Intrusion detection, Access control", "Compliance, Investigation, Auditing", "Certification, Implementation, Authorization"], answer: "Confidentiality, Integrity, Availability" },
                { question: "What is the principle of least privilege?", options: ["Granting users the minimum level of access necessary to perform their job functions", "Giving all users full administrative rights", "Allowing users to access any resource they request", "Providing users with temporary access to sensitive data"], answer: "Granting users the minimum level of access necessary to perform their job functions" },
                { question: "What is a firewall?", options: ["A hardware or software device that controls network traffic based on a set of rules", "A system for detecting and preventing intrusions", "A method for encrypting data", "A tool for managing user accounts"], answer: "A hardware or software device that controls network traffic based on a set of rules" },
                { question: "What is a VPN?", options: ["Virtual Private Network", "Very Powerful Network", "Virtual Public Network", "Verified Protected Network"], answer: "Virtual Private Network" },
                { question: "What is encryption?", options: ["The process of converting data into a format that can only be read by authorized users", "The process of hiding data from unauthorized users", "The process of verifying the identity of a user", "The process of backing up data"], answer: "The process of converting data into a format that can only be read by authorized users" },
                { question: "What is multi-factor authentication?", options: ["Using multiple passwords to access a system", "Using a combination of two or more authentication factors, such as something you know, something you have, and something you are", "Using a biometric authentication method", "Using a single, strong password"], answer: "Using a combination of two or more authentication factors, such as something you know, something you have, and something you are" },
                { question: "What is social engineering?", options: ["Manipulating people into divulging confidential information or performing actions that compromise security", "Using technical skills to hack into a system", "Developing secure software", "Managing network security"], answer: "Manipulating people into divulging confidential information or performing actions that compromise security" },
                { question: "What is a phishing attack?", options: ["A type of social engineering attack where an attacker impersonates a legitimate entity to trick users into providing sensitive information", "A type of malware that infects a system and steals data", "A type of attack that exploits vulnerabilities in software", "A type of attack that floods a network with traffic"], answer: "A type of social engineering attack where an attacker impersonates a legitimate entity to trick users into providing sensitive information" },
                { question: "What is malware?", options: ["Software designed to damage or disrupt a computer system or steal information", "A type of network security device", "A method for securing wireless networks", "A type of user account"], answer: "Software designed to damage or disrupt a computer system or steal information" },
                { question: "What is a DDoS attack?", options: ["Distributed Denial of Service attack, where multiple compromised systems are used to flood a target system with traffic, making it unavailable", "A type of phishing attack", "A type of malware", "A type of security audit"], answer: "Distributed Denial of Service attack, where multiple compromised systems are used to flood a target system with traffic, making it unavailable" },
            ]
     },
     'security-2':{
        title: 'Firewall Rules',
        questions: [
            { question: "What is the default action for most firewalls if no rules match?", options: ["Allow", "Deny", "Log", "Redirect"], answer: "Deny" },
                { question: "What is a stateful firewall?", options: ["A firewall that keeps track of the state of network connections and makes decisions based on context", "A firewall that only examines individual packets in isolation", "A firewall that uses a static set of rules", "A firewall that is located in the cloud"], answer: "A firewall that keeps track of the state of network connections and makes decisions based on context" },
                { question: "What is an implicit deny rule?", options: ["A rule that is explicitly configured to deny traffic", "A rule that is automatically applied at the end of a firewall ruleset to deny any traffic that hasn't been explicitly allowed", "A rule that allows all traffic by default", "A rule that logs all traffic"], answer: "A rule that is automatically applied at the end of a firewall ruleset to deny any traffic that hasn't been explicitly allowed" },
                { question: "Which of the following is a common firewall rule component?", options: ["Source IP address", "Destination IP address", "Port number", "All of the above"], answer: "All of the above" },
                { question: "What is an ACL?", options: ["Access Control List", "Advanced Configuration Language", "Application Control Layer", "Automated Connection Log"], answer: "Access Control List" },
                { question: "What is the purpose of a DMZ?", options: ["To host servers that need to be accessible from the internet, while providing a buffer between the public internet and the internal network", "To store sensitive data", "To connect to a VPN", "To host internal web servers"], answer: "To host servers that need to be accessible from the internet, while providing a buffer between the public internet and the internal network" },
                { question: "What is NAT?", options: ["Network Address Translation", "Network Access Tool", "New Advanced Technology", "Network Authentication Type"], answer: "Network Address Translation" },
                { question: "What is port forwarding?", options: ["Redirecting traffic from one port to another", "Blocking all traffic on a specific port", "Allowing all traffic on a specific port", "Encrypting traffic on a specific port"], answer: "Redirecting traffic from one port to another" },
                { question: "Which protocol is commonly used for secure remote access to a firewall?", options: ["SSH", "Telnet", "FTP", "HTTP"], answer: "SSH" },
                { question: "What is the benefit of using a firewall?", options: ["Improved network security", "Increased network speed", "Simplified network management", "Reduced network costs"], answer: "Improved network security" },
        ]
     }
    };

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
    const quizTitleElement = document.getElementById("quizTitle");

    // Load the quiz data based on the quizId.
    let currentQuiz;
    if (quizId && quizData[quizId]) {
        currentQuiz = quizData[quizId];
        quizTitleElement.textContent = currentQuiz.title; // Set the quiz title
        displayQuestion(); // Start displaying questions
    } else {
        resultContainer.innerHTML = "<p>Error: Quiz not found.</p>";
    }



    function updateProgress() {
        const progress = ((currentQuestion + 1) / currentQuiz.questions.length) * 100;
        progressBar.style.width = `${progress}%`;
        progressBar.textContent = `${currentQuestion + 1}/${currentQuiz.questions.length}`;
    }

    function displayQuestion() {
        const questionData = currentQuiz.questions[currentQuestion];
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
        nextButton.classList.toggle("d-none", currentQuestion === currentQuiz.questions.length - 1);
        submitButton.classList.toggle("d-none", currentQuestion !== currentQuiz.questions.length - 1);

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
            const questionData = currentQuiz.questions[currentQuestion];
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
        if (score === currentQuiz.questions.length) {
            resultContainer.innerHTML = `<div class="congratulations animate-congratulations">Congratulations! You got all the answers correct!</div>`;
        } else {
             resultContainer.innerHTML = `<p>You scored <strong>${score}</strong> out of <strong>${currentQuiz.questions.length}</strong>.</p>`;
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
        resultContainer.innerHTML = ""; // Clear previous results
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
        currentQuestion--;
        displayQuestion();
    });

    nextButton.addEventListener("click", () => {
        currentQuestion++;
        displayQuestion();
    });

    submitButton.addEventListener("click", () => {
        showResults();
    });

    retryButton.addEventListener("click", retryQuiz);
    showAnswerButton.addEventListener("click", showAnswers);


});
