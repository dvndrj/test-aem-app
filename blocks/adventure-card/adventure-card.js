export default function decorate(block) {
  const cards = [...block.children];
  
  block.innerHTML = '';
  
  const grid = document.createElement('div');
  grid.className = 'adventure-grid';
  
  cards.forEach(card => {
    const [imageCell, titleCell, locationCell, priceCell, linkCell] = card.children;
    
    const adventureCard = document.createElement('div');
    adventureCard.className = 'adventure-item';
    
    const link = linkCell?.querySelector('a');
    const cardLink = document.createElement('a');
    cardLink.href = link?.href || '#';
    cardLink.className = 'adventure-link';
    
    if (imageCell) {
      const img = imageCell.querySelector('img');
      if (img) {
        const imageWrapper = document.createElement('div');
        imageWrapper.className = 'adventure-image';
        imageWrapper.appendChild(img.cloneNode(true));
        cardLink.appendChild(imageWrapper);
      }
    }
    
    const content = document.createElement('div');
    content.className = 'adventure-content';
    
    if (titleCell) {
      const title = document.createElement('h3');
      title.textContent = titleCell.textContent.trim();
      content.appendChild(title);
    }
    
    if (locationCell) {
      const location = document.createElement('p');
      location.className = 'adventure-location';
      location.innerHTML = `📍 ${locationCell.textContent.trim()}`;
      content.appendChild(location);
    }
    
    if (priceCell) {
      const price = document.createElement('p');
      price.className = 'adventure-price';
      price.textContent = priceCell.textContent.trim();
      content.appendChild(price);
    }
    
    cardLink.appendChild(content);
    adventureCard.appendChild(cardLink);
    grid.appendChild(adventureCard);
  });
  
  block.appendChild(grid);
}
