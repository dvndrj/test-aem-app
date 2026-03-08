export default function decorate(block) {
  block.textContent = '';

  // Sample data for demo
  const data = [
    {"name": "Laptop Pro", "price": "$1299", "category": "Electronics", "description": "High-performance laptop"},
    {"name": "Wireless Mouse", "price": "$29", "category": "Accessories", "description": "Ergonomic design"},
    {"name": "Mechanical Keyboard", "price": "$89", "category": "Accessories", "description": "RGB backlit"},
    {"name": "4K Monitor", "price": "$399", "category": "Electronics", "description": "27-inch display"},
    {"name": "USB-C Hub", "price": "$49", "category": "Accessories", "description": "7-in-1 adapter"},
    {"name": "Webcam HD", "price": "$79", "category": "Electronics", "description": "1080p video"},
    {"name": "Desk Lamp", "price": "$39", "category": "Office", "description": "LED adjustable"},
    {"name": "Phone Stand", "price": "$19", "category": "Accessories", "description": "Aluminum stand"},
    {"name": "Headphones", "price": "$149", "category": "Electronics", "description": "Noise cancelling"},
    {"name": "Tablet", "price": "$499", "category": "Electronics", "description": "10-inch screen"},
    {"name": "Smart Watch", "price": "$299", "category": "Electronics", "description": "Fitness tracking"},
    {"name": "Portable SSD", "price": "$129", "category": "Storage", "description": "1TB capacity"},
    {"name": "Power Bank", "price": "$39", "category": "Accessories", "description": "20000mAh"},
    {"name": "Cable Organizer", "price": "$15", "category": "Office", "description": "Keep cables tidy"},
    {"name": "Laptop Stand", "price": "$45", "category": "Office", "description": "Adjustable height"},
    {"name": "Bluetooth Speaker", "price": "$69", "category": "Electronics", "description": "Waterproof"},
    {"name": "Microphone", "price": "$99", "category": "Electronics", "description": "Studio quality"},
    {"name": "Graphics Tablet", "price": "$199", "category": "Electronics", "description": "For designers"},
    {"name": "Desk Mat", "price": "$25", "category": "Office", "description": "Large mouse pad"},
    {"name": "Monitor Arm", "price": "$79", "category": "Office", "description": "Dual monitor"},
    {"name": "Wireless Charger", "price": "$29", "category": "Accessories", "description": "Fast charging"},
    {"name": "Laptop Bag", "price": "$59", "category": "Accessories", "description": "Water resistant"},
    {"name": "Docking Station", "price": "$179", "category": "Electronics", "description": "Multi-port"},
    {"name": "Ergonomic Chair", "price": "$399", "category": "Office", "description": "Lumbar support"},
    {"name": "Standing Desk", "price": "$599", "category": "Office", "description": "Electric adjustable"}
  ];

  // Pagination settings
  const itemsPerPage = 20;
  let currentPage = 1;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Create container
  const container = document.createElement('div');
  container.className = 'product-list-container';

  // Create list element
  const list = document.createElement('ul');
  list.className = 'product-list';

  // Function to render items for current page
  const renderPage = (page) => {
    list.innerHTML = '';
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageData = data.slice(start, end);

    pageData.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'product-item';
      
      li.innerHTML = `
        <div class="product-field"><strong>Name:</strong> ${item.name}</div>
        <div class="product-field"><strong>Price:</strong> ${item.price}</div>
        <div class="product-field"><strong>Category:</strong> ${item.category}</div>
        <div class="product-field"><strong>Description:</strong> ${item.description}</div>
      `;
      
      list.appendChild(li);
    });
  };

  // Create pagination controls
  const pagination = document.createElement('div');
  pagination.className = 'pagination';

  const updatePagination = () => {
    pagination.innerHTML = '';
    
    // Previous button
    const prevBtn = document.createElement('button');
    prevBtn.textContent = 'Previous';
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => {
      if (currentPage > 1) {
        currentPage--;
        renderPage(currentPage);
        updatePagination();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    pagination.appendChild(prevBtn);

    // Page info
    const pageInfo = document.createElement('span');
    pageInfo.className = 'page-info';
    pageInfo.textContent = `Page ${currentPage} of ${totalPages} (${data.length} items total)`;
    pagination.appendChild(pageInfo);

    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Next';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderPage(currentPage);
        updatePagination();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    pagination.appendChild(nextBtn);
  };

  // Initial render
  renderPage(currentPage);
  updatePagination();

  // Append to container
  container.appendChild(list);
  if (totalPages > 1) {
    container.appendChild(pagination);
  }
  block.appendChild(container);
}
