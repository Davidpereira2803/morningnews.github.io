// 8f4e57ba0e5d4da79fdc3661fafef08c

document.addEventListener('DOMContentLoaded', fetchNews);

async function fetchNews() {
  const apiKey = '8f4e57ba0e5d4da79fdc3661fafef08c'; // Replace with your NewsAPI key
  const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const newsContainer = document.getElementById('newsContainer');

    data.articles.forEach(article => {
      const newsArticle = document.createElement('div');
      newsArticle.classList.add('news-article');
      newsArticle.innerHTML = `
        <h2 class="news-title">${article.title}</h2>
        <p class="news-description">${article.description}</p>
        <a href="${article.url}" target="_blank">Read more</a>
      `;
      newsContainer.appendChild(newsArticle);
    });
  } catch (error) {
    console.error('Error fetching news:', error.message);
  }
}
