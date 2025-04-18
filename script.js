// script.js (Dashboard - Fetches Category Data)

document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.getElementById('quiz-container');
    const loadingIndicator = document.getElementById('loading-indicator');
    const errorMessage = document.getElementById('error-message');

    // --- Fetch Category Data ---
    async function loadCategories() {
        try {
            const response = await fetch('data/categories.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const categories = await response.json();

            // Hide loading indicator and show container
            loadingIndicator.style.display = 'none';
            quizContainer.style.display = 'flex'; // Use 'flex' because it's a Bootstrap row

            // Clear any previous cards (if applicable)
            quizContainer.innerHTML = '';

            // Generate category cards
            categories.forEach(category => {
                quizContainer.appendChild(createCategoryCard(category));
            });

            // Add smooth scroll after categories are loaded
            setupSmoothScroll();

        } catch (error) {
            console.error("Error loading categories:", error);
            loadingIndicator.style.display = 'none';
            errorMessage.classList.remove('d-none'); // Show error message
        }
    }

    // --- Create Category Card ---
    function createCategoryCard(category) {
        const colDiv = document.createElement('div');
        colDiv.classList.add('col-lg-3', 'col-md-4', 'col-sm-6', 'mb-4', 'd-flex'); // d-flex for equal height cards

        const cardDiv = document.createElement('div');
        cardDiv.classList.add('quiz-card', 'w-100'); // w-100 ensures card fills col
        cardDiv.onclick = () => showCategoryQuizzes(category.topic);
        cardDiv.style.cursor = 'pointer'; // Add pointer cursor

        const imageDiv = document.createElement('div');
        imageDiv.classList.add('quiz-image');
        const image = document.createElement('img');
        image.src = category.imageUrl;
        image.alt = category.title;
        image.loading = 'lazy';
        imageDiv.appendChild(image);

        const contentDiv = document.createElement('div');
        contentDiv.classList.add('quiz-content');

        const textWrapper = document.createElement('div');
        const title = document.createElement('h3'); // Use h3 for category title
        title.textContent = category.title;
        title.classList.add('h5'); // Style as h5 for size
        const description = document.createElement('p');
        description.textContent = category.description;
        textWrapper.appendChild(title);
        textWrapper.appendChild(description);

        contentDiv.appendChild(textWrapper);

        cardDiv.appendChild(imageDiv);
        cardDiv.appendChild(contentDiv);
        colDiv.appendChild(cardDiv);

        return colDiv;
    }

    // --- Navigate to Quiz List ---
    function showCategoryQuizzes(topic) {
        window.location.href = `quiz-list.html?category=${topic}`;
    }

    // --- Smooth Scroll Setup ---
    function setupSmoothScroll() {
        const quizzesLink = document.querySelector('a[href="#quiz-container"]');
        if (quizzesLink) {
            quizzesLink.addEventListener('click', function (e) {
                e.preventDefault();
                const targetElement = document.getElementById('quiz-container');
                if (targetElement) {
                    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - navbarHeight - 20;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        }
    }

    // --- Initial Load ---
    loadCategories();

});