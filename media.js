/* ==========================================================================
   SITE_MEDIA — central image registry.
   Replace each path below with your real uploaded asset paths (or point
   these at your Supabase/CDN URLs). Any key left empty will gracefully
   fall back to the on-brand placeholder pattern already built into the
   page design, so the site never shows a broken image icon.
   ========================================================================== */
window.SITE_MEDIA = {
  logo: "assets/logo/logo.png",

  // Home hero background slides (any number, cycles automatically)
  heroSlides: [
    // "assets/hero/hero-1.jpg",
    // "assets/hero/hero-2.jpg",
    // "assets/hero/hero-3.jpg"
  ],

  // About section
  aboutImage: "", // "assets/about/facility.jpg"

  // Home "Our Product" teaser (2 images)
  homeProductPhotos: [
    // "assets/products/teaser-1.jpg",
    // "assets/products/teaser-2.jpg"
  ],

  // Product grids on products.html — order must match the size list on the page
  marbleSlabImages: [
    // "assets/products/marble-1200x2780.jpg",
    // "assets/products/marble-600x1800.jpg"
  ],
  porcelainTileImages: [
    // "assets/products/porcelain-600x1200.jpg",
    // "assets/products/porcelain-300x600.jpg",
    // "assets/products/porcelain-600x600.jpg",
    // "assets/products/porcelain-800x800.jpg",
    // "assets/products/porcelain-1200x1200.jpg",
    // "assets/products/porcelain-1000x1000.jpg",
    // "assets/products/porcelain-1200x1800.jpg",
    // "assets/products/porcelain-800x1600.jpg"
  ],

  // Home "Built for Every Space" room cards — Bathroom, Bedroom, Kitchen, Living Room, Facade
  roomPhotos: [
    // "assets/rooms/bathroom.jpg",
    // "assets/rooms/bedroom.jpg",
    // "assets/rooms/kitchen.jpg",
    // "assets/rooms/living-room.jpg",
    // "assets/rooms/facade.jpg"
  ],

  // gallery.html — up to 10 images
  galleryImages: [],

  // blog.html — up to 6 images
  blogImages: [],

  // Catalogue PDF download
  brochure: "assets/brochure/catalogue.pdf"
};
