# Metadata & SEO Reference

## Standard Metadata Fields

### Basic SEO
```
| Metadata |
|----------|
| Title | Your Page Title (50-60 chars) |
| Description | Your page description (150-160 chars) |
| Keywords | keyword1, keyword2, keyword3 |
```

### Open Graph (Social Sharing)
```
| Metadata |
|----------|
| og:title | Title for social media |
| og:description | Description for social media |
| og:image | https://example.com/image.jpg |
| og:type | website |
| og:url | https://example.com/page |
```

### Twitter Cards
```
| Metadata |
|----------|
| twitter:card | summary_large_image |
| twitter:site | @username |
| twitter:title | Title for Twitter |
| twitter:description | Description for Twitter |
| twitter:image | https://example.com/image.jpg |
```

### Custom Properties
```
| Metadata |
|----------|
| Theme | dark |
| Template | product-page |
| Tags | featured, new, sale |
| Author | John Doe |
| Published | 2024-01-15 |
```

## Bulk Metadata Spreadsheet

Create a `metadata` spreadsheet with these columns:

### Required Columns
- `URL` - Page path (e.g., `/about`, `/products`)

### Optional Columns
- `Title` - Page title
- `Description` - Meta description
- `Image` - OG image URL
- `Keywords` - SEO keywords
- `Tags` - Custom tags
- `Template` - Page template
- `Theme` - Page theme
- `Author` - Content author
- `Published` - Publication date
- `og:*` - Any Open Graph property
- `twitter:*` - Any Twitter Card property

### Example Spreadsheet

```
| URL | Title | Description | Image | Tags | Template |
|-----|-------|-------------|-------|------|----------|
| / | Home | Welcome to our site | /images/home.jpg | home, main | homepage |
| /about | About Us | Learn about us | /images/about.jpg | about | default |
| /products | Products | Browse products | /images/products.jpg | products, shop | catalog |
```

## Index Configuration (helix-query.yaml)

### Basic Configuration
```yaml
version: 1

indices:
  default:
    include:
      - /**
    exclude:
      - /drafts/**
    target: /query-index
    properties:
      path:
        select: none
        value: attribute(el, 'path')
      title:
        select: head > meta[property="og:title"]
        value: attribute(el, 'content')
      description:
        select: head > meta[name="description"]
        value: attribute(el, 'content')
```

### Custom Properties
```yaml
      category:
        select: head > meta[name="category"]
        value: attribute(el, 'content')
      tags:
        select: head > meta[name="tags"]
        value: attribute(el, 'content')
      author:
        select: head > meta[name="author"]
        value: attribute(el, 'content')
```

## Sitemap Configuration (helix-sitemap.yaml)

### Basic Configuration
```yaml
version: 1

sitemaps:
  website:
    origin: https://main--test-aem-app--dvndrj.aem.live
    lastmod: YYYY-MM-DD
    hreflang:
      en: https://main--test-aem-app--dvndrj.aem.live
```

### Multi-language
```yaml
sitemaps:
  website:
    origin: https://main--test-aem-app--dvndrj.aem.live
    hreflang:
      en: https://main--test-aem-app--dvndrj.aem.live
      es: https://main--test-aem-app--dvndrj.aem.live/es
      fr: https://main--test-aem-app--dvndrj.aem.live/fr
    languages:
      - en
      - es
      - fr
```

## Testing Metadata

### View Page Metadata
1. Visit your page
2. Right-click → "View Page Source"
3. Check `<head>` section for meta tags

### Test Social Sharing
- Facebook: https://developers.facebook.com/tools/debug/
- Twitter: https://cards-dev.twitter.com/validator
- LinkedIn: https://www.linkedin.com/post-inspector/

### Test SEO
- Google Rich Results: https://search.google.com/test/rich-results
- Schema Markup: https://validator.schema.org/

## Admin API Endpoints

### Index
```
GET https://admin.hlx.page/index/{owner}/{repo}/{branch}/query-index.json
```

### Preview
```
POST https://admin.hlx.page/preview/{owner}/{repo}/{branch}/{path}
```

### Publish
```
POST https://admin.hlx.page/live/{owner}/{repo}/{branch}/{path}
```

### Status
```
GET https://admin.hlx.page/status/{owner}/{repo}/{branch}/{path}
```

### Sitemap
```
POST https://admin.hlx.page/sitemap/{owner}/{repo}/{branch}
```

## Best Practices

### Title
- 50-60 characters
- Include primary keyword
- Unique for each page
- Front-load important words

### Description
- 150-160 characters
- Include call-to-action
- Unique for each page
- Include target keywords

### Images
- Use absolute URLs
- Minimum 1200x630px for OG images
- Optimize file size (<200KB)
- Use descriptive filenames

### Keywords
- 5-10 relevant keywords
- Comma-separated
- Include variations
- Match user intent

### Tags
- Use for internal categorization
- Consistent naming
- Hierarchical structure
- Enable filtering/search
