/*
 * Copyright 2023 Adobe. All rights reserved.
 */

/* global WebImporter */
/* eslint-disable no-console, class-methods-use-this */

const createMetadata = (main, document) => {
  const meta = {};

  const title = document.querySelector('title');
  if (title) {
    meta.Title = title.textContent.replace(/[\n\t]/gm, '');
  }

  const desc = document.querySelector('[property="og:description"]');
  if (desc) {
    meta.Description = desc.content;
  }

  const img = document.querySelector('[property="og:image"]');
  if (img && img.content) {
    const el = document.createElement('img');
    el.src = img.content;
    meta.Image = el;
  }

  const block = WebImporter.Blocks.getMetadataBlock(document, meta);
  main.append(block);

  return meta;
};

const createImportedPage = (main, document, url) => {
  // Remove unwanted elements
  WebImporter.DOMUtils.remove(main, [
    'header',
    'footer',
    'nav',
    '.header',
    '.footer',
    '.navigation',
    'script',
    'style',
    'noscript',
  ]);

  // Convert hero sections
  const hero = main.querySelector('.hero, .banner, [class*="hero"]');
  if (hero) {
    const cells = [['Hero']];
    const img = hero.querySelector('img');
    if (img) cells.push([img]);
    
    const heading = hero.querySelector('h1, h2');
    if (heading) cells.push([heading.textContent]);
    
    const text = hero.querySelector('p');
    if (text) cells.push([text.textContent]);
    
    const cta = hero.querySelector('a');
    if (cta) cells.push([cta]);
    
    const block = WebImporter.DOMUtils.createTable(cells, document);
    hero.replaceWith(block);
  }

  // Convert cards/grid sections
  const cards = main.querySelectorAll('.cards, .grid, [class*="card"]');
  cards.forEach((card) => {
    const cells = [['Cards']];
    const items = card.querySelectorAll('.card, .item, [class*="card-item"]');
    
    items.forEach((item) => {
      const img = item.querySelector('img');
      if (img) cells.push([img]);
      
      const title = item.querySelector('h2, h3, h4');
      if (title) cells.push([title.textContent]);
      
      const desc = item.querySelector('p');
      if (desc) cells.push([desc.textContent]);
    });
    
    if (cells.length > 1) {
      const block = WebImporter.DOMUtils.createTable(cells, document);
      card.replaceWith(block);
    }
  });

  // Convert columns
  const columns = main.querySelectorAll('.columns, .col-2, .col-3');
  columns.forEach((col) => {
    const cells = [['Columns']];
    const cols = col.querySelectorAll('.column, [class*="col-"]');
    
    const row = [];
    cols.forEach((c) => {
      row.push(c.innerHTML);
    });
    
    if (row.length > 0) {
      cells.push(row);
      const block = WebImporter.DOMUtils.createTable(cells, document);
      col.replaceWith(block);
    }
  });

  // Clean up classes
  main.querySelectorAll('[class]').forEach((el) => {
    el.removeAttribute('class');
  });

  // Clean up IDs
  main.querySelectorAll('[id]').forEach((el) => {
    el.removeAttribute('id');
  });

  // Create metadata
  createMetadata(main, document);

  return main;
};

export default {
  /**
   * Apply DOM operations to the provided document and return
   * the root element to be then transformed to Markdown.
   * @param {HTMLDocument} document The document
   * @param {string} url The url of the page imported
   * @param {string} html The raw html (the document is cleaned up during preprocessing)
   * @param {object} params Object containing some parameters given by the import process.
   * @returns {HTMLElement} The root element to be transformed
   */
  transformDOM: ({ document, url, html, params }) => {
    const main = document.body;
    return createImportedPage(main, document, url);
  },

  /**
   * Return a path that describes the document being transformed (file name, nesting...).
   * The path is then used to create the corresponding Word document.
   * @param {HTMLDocument} document The document
   * @param {string} url The url of the page imported
   * @param {string} html The raw html (the document is cleaned up during preprocessing)
   * @param {object} params Object containing some parameters given by the import process.
   * @return {string} The path
   */
  generateDocumentPath: ({ document, url, html, params }) => {
    let p = new URL(url).pathname;
    if (p.endsWith('/')) {
      p = `${p}index`;
    }
    return decodeURIComponent(p)
      .toLowerCase()
      .replace(/\.html$/, '')
      .replace(/[^a-z0-9/]/gm, '-');
  },
};
