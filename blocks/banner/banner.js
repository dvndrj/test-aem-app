export default function decorate(block) {
  const [imageRow, titleRow, descriptionRow, ctaRow] = block.children;

  // Extract content
  const image = imageRow?.querySelector('img');
  const title = titleRow?.textContent.trim();
  const description = descriptionRow?.textContent.trim();
  const cta = ctaRow?.querySelector('a');

  // Clear block
  block.innerHTML = '';

  // Create banner structure
  const bannerContent = document.createElement('div');
  bannerContent.className = 'banner-content';

  if (image) {
    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'banner-image';
    imageWrapper.appendChild(image);
    bannerContent.appendChild(imageWrapper);
  }

  const textWrapper = document.createElement('div');
  textWrapper.className = 'banner-text';

  if (title) {
    const titleElement = document.createElement('h2');
    titleElement.className = 'banner-title';
    titleElement.textContent = title;
    textWrapper.appendChild(titleElement);
  }

  if (description) {
    const descElement = document.createElement('p');
    descElement.className = 'banner-description';
    descElement.textContent = description;
    textWrapper.appendChild(descElement);
  }

  if (cta) {
    cta.className = 'banner-cta button';
    textWrapper.appendChild(cta);
  }

  bannerContent.appendChild(textWrapper);
  block.appendChild(bannerContent);
}
