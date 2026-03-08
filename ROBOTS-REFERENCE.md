# Robots.txt Reference

## Auto-Generated robots.txt

EDS automatically generates a `robots.txt` file at:
```
https://main--test-aem-app--dvndrj.aem.live/robots.txt
```

## Default Content

```
User-agent: *
Allow: /

Sitemap: https://main--test-aem-app--dvndrj.aem.live/sitemap.xml
```

## Custom robots.txt

To customize, create a `robots.txt` file in your content source (Google Drive/SharePoint).

### Block All Crawlers
```
User-agent: *
Disallow: /
```

### Block Specific Paths
```
User-agent: *
Disallow: /private/
Disallow: /admin/
Disallow: /drafts/
Allow: /
```

### Block Specific Bots
```
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: BadBot
Disallow: /
```

### Crawl Delay
```
User-agent: *
Crawl-delay: 10
Allow: /
```

### Multiple Sitemaps
```
User-agent: *
Allow: /

Sitemap: https://example.com/sitemap.xml
Sitemap: https://example.com/sitemap-products.xml
Sitemap: https://example.com/sitemap-blog.xml
```

## Testing

### Validate robots.txt
- Google: https://www.google.com/webmasters/tools/robots-testing-tool
- Bing: https://www.bing.com/webmasters/

### Check Syntax
```bash
# Test if URL is allowed
curl https://main--test-aem-app--dvndrj.aem.live/robots.txt
```

## Common Patterns

### E-commerce Site
```
User-agent: *
Disallow: /cart/
Disallow: /checkout/
Disallow: /account/
Disallow: /search?
Allow: /products/
Allow: /

Sitemap: https://example.com/sitemap.xml
```

### Blog Site
```
User-agent: *
Disallow: /wp-admin/
Disallow: /drafts/
Allow: /blog/
Allow: /

Sitemap: https://example.com/sitemap.xml
```

### Documentation Site
```
User-agent: *
Allow: /docs/
Allow: /api/
Disallow: /internal/
Allow: /

Sitemap: https://example.com/sitemap.xml
```

## Best Practices

1. **Keep it simple** - Only block what's necessary
2. **Test thoroughly** - Use validation tools
3. **Include sitemap** - Help crawlers find content
4. **Be specific** - Use exact paths
5. **Monitor crawl stats** - Check Google Search Console
6. **Update regularly** - As site structure changes
7. **Don't block CSS/JS** - Needed for rendering
8. **Allow images** - For image search

## Common Mistakes

### ❌ Blocking CSS/JS
```
User-agent: *
Disallow: /styles/
Disallow: /scripts/
```

### ✅ Allow CSS/JS
```
User-agent: *
Allow: /styles/
Allow: /scripts/
Disallow: /private/
```

### ❌ Blocking entire site accidentally
```
User-agent: *
Disallow: /
```

### ✅ Selective blocking
```
User-agent: *
Disallow: /private/
Allow: /
```

## Verification

After deploying robots.txt:

1. Visit the URL directly
2. Check Google Search Console
3. Use robots.txt tester
4. Monitor crawl errors
5. Verify sitemap is accessible

## Related Files

- `.hlxignore` - Prevents files from being served
- `helix-sitemap.yaml` - Sitemap configuration
- `metadata` spreadsheet - Page-level SEO
