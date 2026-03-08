export default function decorate(block) {
  block.innerHTML = '';
  
  const searchContainer = document.createElement('div');
  searchContainer.className = 'search-container';
  
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = 'Search ideas...';
  searchInput.className = 'search-input';
  
  const searchButton = document.createElement('button');
  searchButton.textContent = '🔍';
  searchButton.className = 'search-button';
  
  searchContainer.appendChild(searchInput);
  searchContainer.appendChild(searchButton);
  block.appendChild(searchContainer);
  
  const handleSearch = () => {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) return;
    
    // Dispatch custom event for search
    const event = new CustomEvent('ideasearch', { 
      detail: { query },
      bubbles: true 
    });
    document.dispatchEvent(event);
  };
  
  searchButton.addEventListener('click', handleSearch);
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
  });
}
