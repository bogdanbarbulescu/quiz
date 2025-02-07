// script.js (Updated for the main dashboard)

document.addEventListener('DOMContentLoaded', () => {
  const quizContainer = document.getElementById('quiz-container');

  const categories = [
      {
          topic: 'networking',
          title: 'Networking',
          description: 'Explore various networking quizzes.',
          imageUrl: 'https://cdn.pixabay.com/photo/2024/04/17/16/39/ai-generated-8702466_1280.jpg', // Replace with actual image
      },
      {
          topic: 'openstack',
          title: 'OpenStack',
          description: 'Dive deep into OpenStack quizzes.',
          imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fblogs-images.forbes.com%2Fpatrickmoorhead%2Ffiles%2F2014%2F05%2Fopenstack-logo.jpg&f=1&nofb=1&ipt=c265d3a73f2169b8a55aae2a9771d3d0f02369a7103c716cdc323f21707c1ff3&ipo=images', // Replace with actual image
      },
      {
          topic: 'security',
          title: 'Security',
          description: 'Challenge yourself with security quizzes.',
          imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.theforage.com%2Fblog%2Fwp-content%2Fuploads%2F2022%2F12%2Fwhat-is-cybersecurity.jpg&f=1&nofb=1&ipt=d0c26caac6ebc96b5217464f284310120bc9c72bdb91a4ea9c001bb9b57f856d&ipo=images', // Replace with actual image
      },
  ];

  function createCategoryCard(category) {
      const colDiv = document.createElement('div');
      colDiv.classList.add('col-md-4');

      const cardDiv = document.createElement('div');
      cardDiv.classList.add('quiz-card');
      // IMPORTANT:  Navigate to a category list page, NOT directly to a quiz.
      cardDiv.onclick = () => showCategoryQuizzes(category.topic);

      const imageDiv = document.createElement('div');
      imageDiv.classList.add('quiz-image');
      const image = document.createElement('img');
      image.src = category.imageUrl;
      image.alt = category.title;
      imageDiv.appendChild(image);

      const contentDiv = document.createElement('div');
      contentDiv.classList.add('quiz-content');
      const title = document.createElement('h2');
      title.textContent = category.title;
      const description = document.createElement('p');
      description.textContent = category.description;
      contentDiv.appendChild(title);
      contentDiv.appendChild(description);

      cardDiv.appendChild(imageDiv);
      cardDiv.appendChild(contentDiv);
      colDiv.appendChild(cardDiv);

      return colDiv;
  }


  categories.forEach(category => {
      quizContainer.appendChild(createCategoryCard(category));
  });

  // Function to navigate to the quiz list page for the selected category.
  function showCategoryQuizzes(topic) {
      window.location.href = `quiz-list.html?category=${topic}`;
  }
});
