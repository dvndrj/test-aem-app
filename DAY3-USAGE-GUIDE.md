# Day 3 - Usage Guide

## Assignment #1: Create content using each type of EDS block

All these blocks are already available in your boilerplate. Here's how to use them in DA.live:

### Headings
```
# Heading 1
## Heading 2
### Heading 3
```

### Text
```
Regular paragraph text.
```

### Images
```
![Alt text](https://example.com/image.jpg)
```

### Lists
```
- Item 1
- Item 2
- Item 3

1. First
2. Second
3. Third
```

### Links
```
[Link text](https://example.com)
```

### Buttons
```
[Button Text](https://example.com)
```
Then mark it as a button using strong emphasis or in the block.

### Code
```
`inline code`

```
code block
```
```

### Sections
Use `---` to separate sections

### Icons
```
:icon-star:
:icon-heart:
:icon-check:
:icon-arrow-right:
```

### Hero Block
```
| Hero |
|------|
| ![Hero Image](https://example.com/hero.jpg) |
| # Hero Title |
| Hero description text |
| [CTA Button](https://example.com) |
```

### Columns Block
```
| Columns |
|---------|
| Column 1 content |
| Column 2 content |
| Column 3 content |
```

### Cards Block
```
| Cards |
|-------|
| ![Card 1](image1.jpg) |
| Card 1 Title |
| Card 1 description |
| ![Card 2](image2.jpg) |
| Card 2 Title |
| Card 2 description |
```

### Header Block
Automatically loaded from `/header` page

### Footer Block
Automatically loaded from `/footer` page

### Metadata Block
```
| Metadata |
|----------|
| Title | Page Title |
| Description | Page description |
| Image | https://example.com/og-image.jpg |
```

### Section Metadata
```
| Section Metadata |
|------------------|
| Style | grey |
```

## Assignment #2: Create custom icon in CSS

Custom icons are now available! Use them in your content:

**In DA.live:**
```
[Button with Star :icon-star:](https://example.com)
[Button with Heart :icon-heart:](https://example.com)
[Button with Check :icon-check:](https://example.com)
[Button with Arrow :icon-arrow-right:](https://example.com)
```

**Available Icons:**
- `:icon-star:` - Gold star (★)
- `:icon-heart:` - Red heart (♥)
- `:icon-check:` - Green checkmark (✓)
- `:icon-arrow-right:` - Blue arrow (→)

## Assignment #3: Embed YouTube and Twitter

### YouTube Embed
```
| Embed |
|-------|
| https://www.youtube.com/watch?v=VIDEO_ID |
```

### Twitter/X Embed
```
| Embed |
|-------|
| https://twitter.com/username/status/TWEET_ID |
```

### Vimeo Embed
```
| Embed |
|-------|
| https://vimeo.com/VIDEO_ID |
```

**Example:**
```
| Embed |
|-------|
| https://www.youtube.com/watch?v=dQw4w9WgXcQ |
```

## Assignment #4: Create reusable content (Fragment/Teaser)

### Step 1: Create a teaser document

In DA.live, create a new document called `teaser`:

```
# Special Offer!

Get 50% off on all products this week only!

[Shop Now](https://example.com/shop)
```

### Step 2: Use the teaser on multiple pages

In any other document:

```
| Fragment |
|----------|
| /teaser |
```

This will include the teaser content on that page.

## Assignment #5: Add pages to header navigation

### Step 1: Create new pages

Create documents in DA.live:
- `about`
- `products`
- `contact`

### Step 2: Update header

Create or edit the `header` document:

```
| Header |
|--------|
| [Home](/) |
| [About](/about) |
| [Products](/products) |
| [Contact](/contact) |
```

Or use a simple list:
```
- [Home](/)
- [About](/about)
- [Products](/products)
- [Contact](/contact)
```

## Testing Locally

```bash
cd test-aem-app
aem up
```

Visit: http://localhost:3000/

## Commit Your Changes

```bash
git add .
git commit -m "Day 3: Added custom icons, embed block, and usage guide"
git push origin main
```

## Quick Reference

**Block Syntax:**
```
| BlockName |
|-----------|
| content row 1 |
| content row 2 |
```

**Section Separator:**
```
---
```

**Icons in Buttons:**
```
[Text :icon-name:](url)
```

**Embed Videos:**
```
| Embed |
|-------|
| video-url |
```

**Reusable Content:**
```
| Fragment |
|----------|
| /path-to-fragment |
```
