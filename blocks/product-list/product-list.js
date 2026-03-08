export default async function decorate(block) {
  // Get the spreadsheet URL from the block
  const link = block.querySelector('a');
  let path = link ? link.getAttribute('href') : block.textContent.trim();
  
  block.textContent = '';

  try {
    // If path doesn't end with .json, assume it's a spreadsheet and add .json
    if (!path.endsWith('.json')) {
      path = `${path}.json`;
    }

    // Fetch the JSON data
    const resp = await fetch(path);
    if (!resp.ok) {
      block.innerHTML = `<p>Error loading data: ${resp.status} ${resp.statusText}</p>`;
      return;
    }

    const contentType = resp.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      block.innerHTML = '<p>Error: Expected JSON data. Make sure the spreadsheet is published.</p>';
      return;
    }

    const json = await resp.json();
    const data = json.data || json;

    if (!data || data.length === 0) {
      block.innerHTML = '<p>No data available</p>';
      return;
    }

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
        
        // Build item content based on available fields
        let content = '';
        Object.keys(item).forEach((key) => {
          if (item[key]) {
            content += `<div class="product-field">
              <strong>${key}:</strong> ${item[key]}
            </div>`;
          }
        });
        
        li.innerHTML = content;
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
        }
      };
      pagination.appendChild(prevBtn);

      // Page info
      const pageInfo = document.createElement('span');
      pageInfo.className = 'page-info';
      pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
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

  } catch (error) {
    block.innerHTML = `<p>Error loading data: ${error.message}</p>`;
  }
}
