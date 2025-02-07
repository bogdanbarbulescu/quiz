// quiz-list-script.js

document.addEventListener('DOMContentLoaded', () => {
    const quizListContainer = document.getElementById('quiz-list');
    const categoryTitle = document.getElementById('categoryTitle');
    const categoryDescription = document.getElementById('categoryDescription');

    // Get the category from the URL query parameter.
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');

    // Define the quizzes for each category.  This is your quiz data.
    const quizzes = {
        networking: [
            { id: 'networking-1', title: 'CCNA Basics', description: 'Test your basic CCNA knowledge.' },
            { id: 'networking-2', title: 'Subnetting', description: 'Practice subnetting questions.' },
        ],
        openstack: [
            { id: 'openstack-1', title: 'OpenStack Fundamentals', description: 'Covers core OpenStack concepts.' },
            { id: 'openstack-2', title: 'Nova - Compute', description: 'Covers core OpenStack concepts.' },
            { id: 'openstack-3', title: 'Neutron - Networking', description: 'Focuses on OpenStack networking.' },
            { id: 'openstack-4', title: 'Cinder - Block Storage', description: 'Focuses on OpenStack block storage.' },
            { id: 'openstack-5', title: 'Swift - Object Storage', description: 'Focuses on OpenStack object storage.' },
            { id: 'openstack-6', title: 'Keystone - Identity Service', description: 'Focuses on OpenStack identity service.' },
            { id: 'openstack-7', title: 'Glance - Image Service', description: 'Focuses on OpenStack image service.' },
            { id: 'openstack-8', title: 'Horizon - Dashboard', description: 'Focuses on OpenStack dashboard.' },
            { id: 'openstack-8', title: 'Heat - Orchestration', description: 'Focuses on OpenStack orchestration.' },
        ],
        security: [
            { id: 'security-1', title: 'Basic Security Concepts', description: 'Test your knowledge of fundamental security principles.' },
            { id: 'security-2', title: 'Firewall Rules', description: 'Practice configuring firewall rules.' },
        ],
    };

    // Display the category title and description.
    if (category) {
        switch (category) {
            case 'networking':
                categoryTitle.textContent = 'Networking Quizzes';
                categoryDescription.textContent = 'Select a networking quiz to begin.';
                break;
            case 'openstack':
                categoryTitle.textContent = 'OpenStack Quizzes';
                categoryDescription.textContent = 'Choose an OpenStack quiz.';
                break;
            case 'security':
                categoryTitle.textContent = 'Security Quizzes';
                categoryDescription.textContent = 'Select a security quiz.';
                break;
            default:
                categoryTitle.textContent = 'Invalid Category';
                categoryDescription.textContent = 'Please select a valid category from the main page.';
        }
    } else {
        categoryTitle.textContent = 'No Category Selected';
        categoryDescription.textContent = 'Please return to the main page and select a category.';
    }


    // Create the quiz list cards.
    function createQuizListCard(quiz) {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('quiz-list-card');
        cardDiv.onclick = () => startQuiz(quiz.id); //  Go to the actual quiz

        const title = document.createElement('h3');
        title.classList.add('quiz-list-title');
        title.textContent = quiz.title;

        const description = document.createElement('p');
        description.classList.add('quiz-list-description');
        description.textContent = quiz.description;

        cardDiv.appendChild(title);
        cardDiv.appendChild(description);
        return cardDiv;
    }


    // Display the quizzes for the selected category.
    if (category && quizzes[category]) {
        quizzes[category].forEach(quiz => {
            quizListContainer.appendChild(createQuizListCard(quiz));
        });
    } else {
      const errorMessage = document.createElement('p');
      errorMessage.textContent = "No quizzes available for this category.";
      errorMessage.classList.add('text-danger')
      quizListContainer.appendChild(errorMessage)
    }


    // Function to navigate to the actual quiz page (you'd create separate HTML files for each quiz).
    function startQuiz(quizId) {
        // window.location.href = `${quizId}.html`; // Example: networking-1.html, openstack-2.html
        // Or, if you want to use a single quiz.html and pass the quiz ID:
        window.location.href = `quiz.html?quizId=${quizId}`; // CORRECTED LINE
    }
});
