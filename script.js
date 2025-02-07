// script.js (Existing File - Updated) - in the main dashboard

document.addEventListener('DOMContentLoaded', () => {
  const quizContainer = document.getElementById('quiz-container');

  const quizzes = [
      {
          topic: 'networking',
          title: 'Networking',
          description: 'Test your knowledge about networking.',
          imageUrl: 'https://cdn.pixabay.com/photo/2024/04/17/16/39/ai-generated-8702466_1280.jpg', // Replace with actual image URL
      },
      {
          topic: 'openstack',
          title: 'OpenStack',
          description: 'Test your knowledge about OpenStack.',
          imageUrl: 'https://loremflickr.com/320/240/brazil,rio', // Replace with actual image URL
      },
      {
          topic: 'security',
          title: 'Security',
          description: 'Test your knowledge about security.',
          imageUrl: 'https://loremflickr.com/320/240/brazil,rio', // Replace with actual image URL
      },
  ];

  function createQuizCard(quiz) {
      const colDiv = document.createElement('div');
      colDiv.classList.add('col-md-4');

      const cardDiv = document.createElement('div');
      cardDiv.classList.add('quiz-card');
      cardDiv.onclick = () => startQuiz(quiz.topic);

      const imageDiv = document.createElement('div');
      imageDiv.classList.add('quiz-image');
      const image = document.createElement('img');
      image.src = quiz.imageUrl;
      image.alt = quiz.title;
      imageDiv.appendChild(image);

      const contentDiv = document.createElement('div');
      contentDiv.classList.add('quiz-content');
      const title = document.createElement('h2');
      title.textContent = quiz.title;
      const description = document.createElement('p');
      description.textContent = quiz.description;
      contentDiv.appendChild(title);
      contentDiv.appendChild(description);

      cardDiv.appendChild(imageDiv);
      cardDiv.appendChild(contentDiv);
      colDiv.appendChild(cardDiv);

      return colDiv;
  }


  quizzes.forEach(quiz => {
      quizContainer.appendChild(createQuizCard(quiz));
  });

  function startQuiz(topic) {
      window.location.href = `quiz.html?topic=${topic}`;
  }
});
