export default function decorate(block) {
  const cards = [...block.children];
  const allCards = [];
  
  block.innerHTML = '';
  
  const grid = document.createElement('div');
  grid.className = 'idea-grid';
  
  cards.forEach((card, index) => {
    const [imageCell, titleCell, categoryCell] = card.children;
    
    const ideaCard = document.createElement('div');
    ideaCard.className = 'idea-card';
    ideaCard.dataset.id = `idea-${index}`;
    ideaCard.dataset.title = titleCell?.textContent.trim().toLowerCase() || '';
    ideaCard.dataset.category = categoryCell?.textContent.trim().toLowerCase() || '';
    
    const img = imageCell?.querySelector('img');
    if (img) {
      const imageWrapper = document.createElement('div');
      imageWrapper.className = 'idea-image';
      imageWrapper.appendChild(img.cloneNode(true));
      ideaCard.appendChild(imageWrapper);
    }
    
    const overlay = document.createElement('div');
    overlay.className = 'idea-overlay';
    
    const title = document.createElement('h3');
    title.textContent = titleCell?.textContent.trim() || '';
    overlay.appendChild(title);
    
    if (categoryCell) {
      const category = document.createElement('span');
      category.className = 'idea-category';
      category.textContent = categoryCell.textContent.trim();
      overlay.appendChild(category);
    }
    
    const favButton = document.createElement('button');
    favButton.className = 'fav-button';
    favButton.innerHTML = '♡';
    favButton.title = 'Add to favorites';
    
    const ideaId = `idea-${index}`;
    const favorites = JSON.parse(localStorage.getItem('pinterest-favorites') || '[]');
    if (favorites.includes(ideaId)) {
      favButton.classList.add('favorited');
      favButton.innerHTML = '♥';
    }
    
    favButton.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleFavorite(ideaId, favButton, {
        title: titleCell?.textContent.trim(),
        image: img?.src,
        category: categoryCell?.textContent.trim()
      });
    });
    
    overlay.appendChild(favButton);
    ideaCard.appendChild(overlay);
    
    grid.appendChild(ideaCard);
    allCards.push(ideaCard);
  });
  
  block.appendChild(grid);
  
  // Listen for search events
  document.addEventListener('ideasearch', (e) => {
    const query = e.detail.query;
    filterCards(allCards, query);
  });
}

function toggleFavorite(id, button, data) {
  let favorites = JSON.parse(localStorage.getItem('pinterest-favorites') || '[]');
  let favData = JSON.parse(localStorage.getItem('pinterest-favorites-data') || '{}');
  
  if (favorites.includes(id)) {
    favorites = favorites.filter(f => f !== id);
    delete favData[id];
    button.classList.remove('favorited');
    button.innerHTML = '♡';
  } else {
    favorites.push(id);
    favData[id] = data;
    button.classList.add('favorited');
    button.innerHTML = '♥';
  }
  
  localStorage.setItem('pinterest-favorites', JSON.stringify(favorites));
  localStorage.setItem('pinterest-favorites-data', JSON.stringify(favData));
}

function filterCards(cards, query) {
  cards.forEach(card => {
    const title = card.dataset.title;
    const category = card.dataset.category;
    const matches = title.includes(query) || category.includes(query);
    card.style.display = matches ? 'block' : 'none';
  });
}
