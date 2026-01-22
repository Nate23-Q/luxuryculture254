# Image Optimization & Performance Guide

## Overview
This guide outlines best practices for image optimization to ensure fast loading times, better user experience, and improved SEO on Luxury Culture.

## 1. Image Loading Strategy

### Lazy Loading
Images below the fold should use `loading="lazy"` to improve initial page load:

```tsx
<img
  src="/path/to/image.jpg"
  alt="Description"
  loading="lazy"
  decoding="async"
/>
```

### Eager Loading
Hero section and above-the-fold images should use `loading="eager"`:

```tsx
<img
  src="/IMG/hero.jpg"
  alt="Hero"
  loading="eager"
  decoding="async"
/>
```

## 2. Responsive Images with srcset

For better performance across devices, use `sizes` attribute:

```tsx
<img
  src="/path/to/image.jpg"
  alt="Description"
  loading="lazy"
  decoding="async"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
/>
```

### Common breakpoints:
- Mobile: `(max-width: 640px) 100vw`
- Tablet: `(max-width: 1024px) 50vw`
- Desktop: `33vw`, `50vw`, or specific widths

## 3. Image File Formats

### Recommended formats by use case:

| Format | Best For | Pros | Cons |
|--------|----------|------|------|
| WEBP | Modern browsers | 25-35% smaller than JPEG | Limited browser support |
| JPEG/JPG | Photography | Universal support | Larger file sizes |
| PNG | Graphics/Icons | Transparency support | Larger file sizes |
| SVG | Icons/Logos | Scalable, small size | Not ideal for photos |
| AVIF | Modern browsers | Best compression | Very limited support |

## 4. Image Dimensions & Aspect Ratios

### Recommended sizes:

```css
/* Hero images */
.hero-image {
  aspect-ratio: 16 / 9; /* or custom ratio */
}

/* Product images */
.product-image {
  aspect-ratio: 4 / 5; /* standard product ratio */
}

/* Card images */
.card-image {
  aspect-ratio: 1 / 1; /* square */
}
```

## 5. CSS for Optimal Image Display

```css
/* Prevent layout shift */
img {
  width: 100%;
  height: auto;
  display: block;
}

/* Lazy load fade-in animation */
img[loading="lazy"] {
  opacity: 0;
  transition: opacity 0.3s ease-in;
}

img[loading="lazy"].loaded {
  opacity: 1;
}

/* Optimize hover effects */
img {
  transition: transform 0.3s ease-out;
}

img:hover {
  transform: scale(1.05);
}
```

## 6. Current Implementation Standards

### Implemented in components:

1. **HeroSection.tsx**
   - `loading="eager"` for hero image
   - Gradient overlay for text contrast
   - Optimized for fast display

2. **BrandStory.tsx**
   - `loading="lazy"` for all images
   - Proper `sizes` attributes
   - Hover scale animations

3. **MoreThanStore.tsx**
   - `loading="lazy"` for community images
   - Responsive sizes for different devices
   - Smooth transform transitions

4. **Testimonials.tsx**
   - Avatar images with placeholder service (dicebear)
   - No performance impact

## 7. Performance Targets

### Core Web Vitals Goals:
- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

### Image loading:
- Hero image: < 1s
- Below-fold images: Lazy loaded
- Total page images: < 3MB

## 8. Next Steps: Advanced Optimization

### Consider implementing:

1. **Image CDN/Service**
   - Cloudinary
   - Imgix
   - Cloudflare Images
   
   Benefits:
   - Automatic format conversion
   - Responsive image generation
   - Automatic compression

2. **Next.js Image Component** (if migrating)
   ```tsx
   import Image from 'next/image'
   
   <Image
     src="/path/to/image.jpg"
     alt="Description"
     width={1200}
     height={800}
     loading="lazy"
     priority={false}
   />
   ```

3. **Image Compression Tools**
   - TinyPNG/TinyJPG
   - ImageOptim
   - Squoosh

4. **Monitoring Tools**
   - Google PageSpeed Insights
   - WebPageTest
   - Lighthouse

## 9. Best Practices Checklist

- [x] Add `alt` text to all images
- [x] Use `loading="lazy"` for below-fold images
- [x] Use `loading="eager"` for hero images
- [x] Add `decoding="async"` for non-blocking decode
- [x] Use proper `sizes` attribute for responsive images
- [x] Optimize image dimensions before uploading
- [x] Use appropriate file formats
- [x] Add `aspect-ratio` to prevent layout shift
- [x] Implement smooth transitions
- [ ] Consider CDN integration
- [ ] Set up image monitoring
- [ ] Regular performance audits

## 10. Image Optimization Command Reference

```bash
# Optimize images using ImageMagick
convert input.jpg -quality 85 -strip output.jpg

# Batch optimize with ImageOptim
imageoptim /path/to/images/

# Convert to WebP (requires cwebp)
cwebp input.jpg -q 85 -o output.webp
```

---

**Last Updated:** January 22, 2026
**Maintained by:** Luxury Culture Development Team
