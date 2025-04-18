// flashcards-script.js

// Get all flashcard elements
const flashcards = document.querySelectorAll('.flashcard');

// Add a click event listener to each flashcard
flashcards.forEach(card => {
    card.addEventListener('click', () => {
        // Toggle the 'flipped' class on the clicked card
        // This class controls the CSS flip animation
        card.classList.toggle('flipped');
    });
});

// Note: The 'ontouchstart="this.classList.toggle('hover');"' attribute
// in the HTML helps with hover-like interaction on touch devices,
// but the main flip mechanism is the 'flipped' class added via click/tap.
// The 'hover' class toggled by ontouchstart might be redundant if
// CSS hover effects are primarily used for non-touch devices.
// We keep it for compatibility with the original example's intent.