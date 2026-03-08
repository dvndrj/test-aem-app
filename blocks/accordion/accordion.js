export default function decorate(block) {
  const accordionItems = [...block.children];
  
  block.innerHTML = '';
  
  accordionItems.forEach((item, index) => {
    const [titleCell, contentCell] = item.children;
    
    const accordionItem = document.createElement('div');
    accordionItem.className = 'accordion-item';
    
    const header = document.createElement('button');
    header.className = 'accordion-header';
    header.setAttribute('aria-expanded', 'false');
    header.setAttribute('aria-controls', `accordion-content-${index}`);
    header.innerHTML = `
      <span class="accordion-title">${titleCell.textContent}</span>
      <span class="accordion-icon">+</span>
    `;
    
    const content = document.createElement('div');
    content.className = 'accordion-content';
    content.id = `accordion-content-${index}`;
    content.setAttribute('aria-hidden', 'true');
    content.innerHTML = contentCell.innerHTML;
    
    header.addEventListener('click', () => {
      const isExpanded = header.getAttribute('aria-expanded') === 'true';
      
      // Close all other items
      block.querySelectorAll('.accordion-header').forEach(h => {
        h.setAttribute('aria-expanded', 'false');
        h.querySelector('.accordion-icon').textContent = '+';
      });
      block.querySelectorAll('.accordion-content').forEach(c => {
        c.setAttribute('aria-hidden', 'true');
      });
      
      // Toggle current item
      if (!isExpanded) {
        header.setAttribute('aria-expanded', 'true');
        header.querySelector('.accordion-icon').textContent = '−';
        content.setAttribute('aria-hidden', 'false');
      }
    });
    
    accordionItem.appendChild(header);
    accordionItem.appendChild(content);
    block.appendChild(accordionItem);
  });
}
