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
          imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fobject-storage-ca-ymq-1.vexxhost.net%2Fswift%2Fv1%2F6e4619c416ff4bd19e1c087f27a43eea%2Fwww-images-prod%2Fopenstack-logo%2FOpenStack-Logo-Vertical-Black.png&f=1&nofb=1&ipt=21c68e05435750225060d98c32b8d10d47b226a17dd7883d7423565519254010&ipo=images', // Replace with actual image URL
      },
      {
          topic: 'security',
          title: 'Security',
          description: 'Test your knowledge about security.',
          imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.theforage.com%2Fblog%2Fwp-content%2Fuploads%2F2022%2F12%2Fwhat-is-cybersecurity.jpg&f=1&nofb=1&ipt=d0c26caac6ebc96b5217464f284310120bc9c72bdb91a4ea9c001bb9b57f856d&ipo=images', // Replace with actual image URL
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
