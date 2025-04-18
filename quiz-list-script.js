// quiz-list-script.js (Adds Search Functionality)

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const quizListContainer = document.getElementById('quiz-list');
    const categoryTitle = document.getElementById('categoryTitle');
    const categoryDescription = document.getElementById('categoryDescription');
    const loadingIndicator = document.getElementById('loading-indicator');
    const errorMessage = document.getElementById('error-message');
    const controlsWrapper = document.querySelector('.controls-wrapper'); // Get the new wrapper
    const difficultyFilterButtons = document.getElementById('difficulty-filter');
    const searchInput = document.getElementById('quiz-search-input');
    const noResultsMessage = document.getElementById('no-results-message');

    // --- Get Category from URL ---
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');

    // --- State ---
    let currentCategoryQuizzes = []; // Store the fetched quizzes
    let currentDifficultyFilter = 'all';
    let currentSearchTerm = '';
    let debounceTimer;

    // --- Debounce Function ---
    function debounce(func, delay) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(func, delay);
    }

    // --- Capitalize Helper ---
    function capitalizeFirstLetter(string) {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // --- Fetch and Display Quizzes ---
    async function loadQuizzesForCategory(categoryName) {
         // ... (error handling for no categoryName as before) ...
        if (!categoryName) {
             categoryTitle.textContent = 'No Category Selected';
             categoryDescription.textContent = 'Please return to the main page and select a category.';
             loadingIndicator.style.display = 'none';
             errorMessage.textContent = 'No category specified in the URL.';
             errorMessage.classList.remove('d-none');
             return;
        }

        try {
            const response = await fetch('data/quizzes.json');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const allQuizzesData = await response.json();

            if (!allQuizzesData?.[categoryName]) throw new Error(`Category '${categoryName}' not found.`);

            currentCategoryQuizzes = allQuizzesData[categoryName];

            // --- Update Title and Description ---
            categoryTitle.textContent = `${capitalizeFirstLetter(categoryName)} Quizzes`;
            categoryDescription.textContent = `Select a ${categoryName.toLowerCase()} quiz below, search, or filter by difficulty.`; // Updated text

            // --- Initial Display ---
            loadingIndicator.style.display = 'none';
            errorMessage.classList.add('d-none');

            if (currentCategoryQuizzes.length > 0) {
                controlsWrapper.style.display = 'block'; // Show controls
                applyFiltersAndDisplay(); // Apply initial filters (all/empty search)
                quizListContainer.style.display = 'block'; // Show list container
                setupFilterListeners();
                setupSearchListener();
            } else {
                // ... (handling for no quizzes in category as before) ...
                const infoMessage = document.createElement('p');
                infoMessage.textContent = "No quizzes currently available for this category.";
                infoMessage.classList.add('text-info', 'text-center', 'mt-4');
                quizListContainer.innerHTML = ''; // Clear just in case
                quizListContainer.appendChild(infoMessage);
                quizListContainer.style.display = 'block';
                controlsWrapper.style.display = 'none'; // Hide controls if no quizzes
            }

        } catch (error) {
            // ... (error handling as before) ...
             console.error(`Error loading quizzes for category ${categoryName}:`, error);
             loadingIndicator.style.display = 'none';
             categoryTitle.textContent = 'Error Loading Quizzes';
             categoryDescription.textContent = `Could not fetch quizzes for the '${categoryName}' category.`;
             errorMessage.textContent = `Failed to load quizzes. ${error.message}`;
             errorMessage.classList.remove('d-none');
             quizListContainer.style.display = 'none';
             controlsWrapper.style.display = 'none';
        }
    }

    // --- Create Quiz List Card (No changes needed) ---
    function createQuizListCard(quiz) {
         // ... (same function as in Step 1 & 2) ...
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('quiz-list-card');
        cardDiv.onclick = () => startQuiz(quiz.id);
        cardDiv.style.cursor = 'pointer';

        cardDiv.dataset.difficulty = quiz.difficulty || 'unknown';

        const title = document.createElement('h3');
        title.classList.add('quiz-list-title');
        title.textContent = quiz.title;

        const description = document.createElement('p');
        description.classList.add('quiz-list-description');
        description.textContent = quiz.description;

        const difficultyBadge = document.createElement('span');
        difficultyBadge.classList.add('badge', 'float-end');
        const difficultyText = quiz.difficulty ? capitalizeFirstLetter(quiz.difficulty) : 'N/A';
        difficultyBadge.textContent = difficultyText;

        switch (quiz.difficulty) {
            case 'easy': difficultyBadge.classList.add('bg-success'); break;
            case 'medium': difficultyBadge.classList.add('bg-warning', 'text-dark'); break;
            case 'hard': difficultyBadge.classList.add('bg-danger'); break;
            default: difficultyBadge.classList.add('bg-secondary');
        }

        cardDiv.appendChild(difficultyBadge);
        cardDiv.appendChild(title);
        cardDiv.appendChild(description);

        return cardDiv;
    }

     // --- Apply All Filters and Update Display ---
    function applyFiltersAndDisplay() {
        quizListContainer.innerHTML = ''; // Clear previous cards
        noResultsMessage.classList.add('d-none'); // Hide no results message
        let resultsFound = false;
        const searchTermLower = currentSearchTerm.toLowerCase();

        currentCategoryQuizzes.forEach(quiz => {
            const quizDifficulty = quiz.difficulty || 'unknown';
            const titleLower = quiz.title.toLowerCase();
            const descriptionLower = quiz.description.toLowerCase();

            // Check difficulty filter
            const difficultyMatch = currentDifficultyFilter === 'all' || quizDifficulty === currentDifficultyFilter;

            // Check search term
            const searchMatch = searchTermLower === '' || titleLower.includes(searchTermLower) || descriptionLower.includes(searchTermLower);

            // Show card only if BOTH filters match
            if (difficultyMatch && searchMatch) {
                 quizListContainer.appendChild(createQuizListCard(quiz));
                 resultsFound = true;
            }
        });

        // Show message if no results match the combined filters
        if (!resultsFound) {
            noResultsMessage.classList.remove('d-none');
        }
    }

    // --- Setup Difficulty Filter Button Listeners ---
    function setupFilterListeners() {
        const buttons = difficultyFilterButtons.querySelectorAll('.btn-filter');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                buttons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                currentDifficultyFilter = button.dataset.filter; // Update state
                applyFiltersAndDisplay(); // Re-apply filters
            });
        });
    }

    // --- Setup Search Input Listener ---
    function setupSearchListener() {
        searchInput.addEventListener('input', () => {
            debounce(() => {
                currentSearchTerm = searchInput.value.trim(); // Update state
                applyFiltersAndDisplay(); // Re-apply filters
            }, 300); // Wait 300ms after last keystroke
        });
    }


    // --- Navigate to Quiz Page ---
    function startQuiz(quizId) {
        window.location.href = `quiz.html?quizId=${quizId}`;
    }

    // --- Initial Load ---
    loadQuizzesForCategory(category);

});