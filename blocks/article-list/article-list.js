export default async function decorate(block) {
  const pathPrefix = block.textContent.trim() || '/magazine';
  block.textContent = '';

  try {
    // Fetch the query index
    const response = await fetch('/query-index.json');
    if (!response.ok) {
      block.innerHTML = '<p>Unable to load articles. Please ensure content is published.</p>';
      return;
    }

    const index = await response.json();
    
    // Filter articles from the magazine path
    const articles = index.data
      .filter(item => item.path.startsWith(pathPrefix))
      .sort((a, b) => b.lastModified - a.lastModified);

    if (articles.length === 0) {
      block.innerHTML = `<p>No articles found in ${pathPrefix}</p>`;
      return;
    }

    // Create article grid
    const grid = document.createElement('div');
    grid.className = 'article-grid';

    articles.forEach(article => {
      const card = document.createElement('article');
      card.className = 'article-card';

      const link = document.createElement('a');
      link.href = article.path;
      link.className = 'article-link';

      if (article.image) {
        const img = document.createElement('img');
        img.src = article.image;
        img.alt = article.title || 'Article image';
        img.loading = 'lazy';
        link.appendChild(img);
      }

      const content = document.createElement('div');
      content.className = 'article-content';

      const title = document.createElement('h3');
      title.textContent = article.title || 'Untitled';
      content.appendChild(title);

      if (article.description) {
        const desc = document.createElement('p');
        desc.textContent = article.description;
        content.appendChild(desc);
      }

      const meta = document.createElement('div');
      meta.className = 'article-meta';
      if (article.lastModified) {
        const date = new Date(article.lastModified * 1000);
        meta.textContent = date.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
      }
      content.appendChild(meta);

      link.appendChild(content);
      card.appendChild(link);
      grid.appendChild(card);
    });

    block.appendChild(grid);

  } catch (error) {
    block.innerHTML = `<p>Error loading articles: ${error.message}</p>`;
  }
}
