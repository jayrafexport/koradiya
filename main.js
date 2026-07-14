/* ==========================================================================
   KORADIYA GROUP IMPEX — main.js
   Shared interactivity: nav, hero slider, scroll reveal, count-up stats,
   flow-diagram draw-in, donut/bar charts, filters, gallery lightbox,
   testimonial slider, media.js image binding.
   ========================================================================== */
(function(){
  "use strict";

  document.addEventListener('DOMContentLoaded', init);

  function init(){
    document.getElementById('year') && (document.getElementById('year').textContent = new Date().getFullYear());
    bindMedia();
    headerScroll();
    mobileNav();
    heroSlider();
    scrollReveal();
    countUp();
    flowDiagram();
    donutCharts();
    barCharts();
    productFilter();
    galleryLightbox();
    testimonialSlider();
    backToTop();
    contactForm();
  }

  /* ---------- media.js binding (graceful; falls back to CSS placeholder) ---------- */
  function bindMedia(){
    const M = window.SITE_MEDIA || {};
    document.querySelectorAll('[data-media]').forEach(el => {
      const key = el.getAttribute('data-media');
      const idx = el.getAttribute('data-media-index');
      let val = M[key];
      if (idx !== null && Array.isArray(val)) val = val[+idx];
      if (!val) return;
      if (el.tagName === 'IMG'){
        const fb = el.parentElement && el.parentElement.querySelector('.ph-fallback');
        el.onerror = () => { el.classList.remove('loaded'); if (fb) fb.style.display = ''; };
        el.onload = () => { el.classList.add('loaded'); if (fb) fb.style.display = 'none'; };
        el.src = val;
      } else {
        el.style.backgroundImage = `url('${val}')`;
        el.classList.add('loaded');
      }
    });
    const brochurePath = M.brochure || "assets/brochure/catalogue.pdf";
    document.querySelectorAll('[data-catalogue-link]').forEach(a => {
      a.href = brochurePath; a.setAttribute('download',''); a.target = "_blank";
    });
  }

  /* ---------- sticky header shrink ---------- */
  function headerScroll(){
    const header = document.querySelector('header.site-header');
    if (!header) return;
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive:true });
  }

  /* ---------- mobile nav ---------- */
  function mobileNav(){
    const toggle = document.getElementById('menuToggle');
    const nav = document.getElementById('mainNav');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
    nav.querySelectorAll('.nav-item').forEach(item => {
      const span = item.querySelector(':scope > span');
      if (span) span.addEventListener('click', () => { if (window.innerWidth <= 980) item.classList.toggle('mobile-open'); });
      item.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { if (window.innerWidth <= 980) nav.classList.remove('open'); }));
    });
  }

  /* ---------- hero slider (headline rotation + bg slides) ---------- */
  function heroSlider(){
    const hero = document.querySelector('.hero');
    if (!hero) return;
    const M = window.SITE_MEDIA || {};
    const slidesEl = document.getElementById('heroSlides');
    const imgs = (M.heroSlides && M.heroSlides.length) ? M.heroSlides : [];
    if (slidesEl){
      imgs.forEach((src, i) => {
        const d = document.createElement('div');
        d.className = 'hero-slide' + (i === 0 ? ' active' : '');
        d.style.backgroundImage = `url('${src}')`;
        slidesEl.appendChild(d);
      });
      if (!imgs.length){
        const fb = document.createElement('div');
        fb.className = 'hero-fallback';
        slidesEl.appendChild(fb);
      }
    }
    const headlines = hero.querySelectorAll('.hl');
    const dots = document.querySelectorAll('.hero-dots button');
    let cur = 0;
    const total = Math.max(headlines.length, 1);
    function go(i){
      cur = (i + total) % total;
      headlines.forEach((h,idx) => h.classList.toggle('active', idx === cur));
      dots.forEach((d,idx) => d.classList.toggle('active', idx === cur));
      if (imgs.length > 1){
        const all = slidesEl.querySelectorAll('.hero-slide');
        all.forEach((s,idx) => s.classList.toggle('active', idx === (cur % all.length)));
      }
    }
    dots.forEach((d,i) => d.addEventListener('click', () => go(i)));
    if (total > 1) setInterval(() => go(cur+1), 5200);
  }

  /* ---------- scroll reveal ---------- */
  function scrollReveal(){
    const els = document.querySelectorAll('.reveal, .reveal-scale, .reveal-left, .reveal-right, .stagger');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting){
          if (e.target.classList.contains('stagger')){
            Array.from(e.target.children).forEach((c,i) => c.style.setProperty('--i', i));
          }
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold:0.14 });
    els.forEach(el => io.observe(el));
  }

  /* ---------- count-up numbers ---------- */
  function countUp(){
    const nums = document.querySelectorAll('[data-count]');
    if (!nums.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseFloat(el.getAttribute('data-count'));
        const suffix = el.getAttribute('data-suffix') || '';
        const decimals = el.getAttribute('data-decimals') ? +el.getAttribute('data-decimals') : 0;
        const dur = 1600;
        const start = performance.now();
        function tick(now){
          const p = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          const val = target * eased;
          el.textContent = val.toFixed(decimals) + suffix;
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = target.toFixed(decimals) + suffix;
        }
        requestAnimationFrame(tick);
        io.unobserve(el);
      });
    }, { threshold:0.5 });
    nums.forEach(el => io.observe(el));
  }

  /* ---------- flow diagram draw-in ---------- */
  function flowDiagram(){
    const track = document.querySelector('.flow-track');
    if (!track) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting){ track.classList.add('in'); io.unobserve(track); }
      });
    }, { threshold:0.25 });
    io.observe(track);
  }

  /* ---------- donut chart animate ---------- */
  function donutCharts(){
    document.querySelectorAll('.donut').forEach(donut => {
      const seg = donut.querySelector('.seg');
      if (!seg) return;
      const pct = parseFloat(donut.getAttribute('data-pct') || '0');
      const r = 68, circ = 2 * Math.PI * r;
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting){
            seg.style.strokeDasharray = `${(pct/100)*circ} ${circ}`;
            io.unobserve(donut);
          }
        });
      }, { threshold:0.4 });
      io.observe(donut);
    });
  }

  /* ---------- bar chart animate ---------- */
  function barCharts(){
    document.querySelectorAll('.bar-fill').forEach(bar => {
      const w = bar.getAttribute('data-width') || '0%';
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting){ bar.style.width = w; io.unobserve(bar); }
        });
      }, { threshold:0.5 });
      io.observe(bar);
    });
  }

  /* ---------- product / gallery filter tabs ---------- */
  function productFilter(){
    document.querySelectorAll('.filter-tabs').forEach(tabs => {
      const targetSel = tabs.getAttribute('data-target');
      const items = document.querySelectorAll(targetSel);
      tabs.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
          tabs.querySelectorAll('button').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const filter = btn.getAttribute('data-filter');
          items.forEach(item => {
            const show = filter === 'all' || item.getAttribute('data-cat') === filter;
            item.style.display = show ? '' : 'none';
          });
        });
      });
    });
  }

  /* ---------- gallery lightbox ---------- */
  function galleryLightbox(){
    const items = Array.from(document.querySelectorAll('[data-lightbox]'));
    if (!items.length) return;
    const lb = document.getElementById('lightbox');
    if (!lb) return;
    const img = lb.querySelector('img');
    let idx = 0;
    function open(i){
      idx = i;
      const src = items[idx].getAttribute('data-lightbox') || items[idx].querySelector('img')?.src;
      img.src = src;
      lb.classList.add('open');
    }
    items.forEach((it,i) => it.addEventListener('click', () => open(i)));
    lb.querySelector('.lightbox-close')?.addEventListener('click', () => lb.classList.remove('open'));
    lb.querySelector('.prev')?.addEventListener('click', () => open((idx-1+items.length)%items.length));
    lb.querySelector('.next')?.addEventListener('click', () => open((idx+1)%items.length));
    lb.addEventListener('click', (e) => { if (e.target === lb) lb.classList.remove('open'); });
    document.addEventListener('keydown', (e) => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') lb.classList.remove('open');
      if (e.key === 'ArrowRight') open((idx+1)%items.length);
      if (e.key === 'ArrowLeft') open((idx-1+items.length)%items.length);
    });
  }

  /* ---------- testimonial slider ---------- */
  function testimonialSlider(){
    const wrap = document.querySelector('.testi-slider');
    if (!wrap) return;
    const slides = wrap.querySelectorAll('.testi-slide');
    const dots = wrap.parentElement.querySelectorAll('.testi-dots button');
    let cur = 0;
    function go(i){
      cur = (i+slides.length)%slides.length;
      slides.forEach((s,idx) => s.classList.toggle('active', idx===cur));
      dots.forEach((d,idx) => d.classList.toggle('active', idx===cur));
    }
    dots.forEach((d,i) => d.addEventListener('click', () => go(i)));
    if (slides.length > 1) setInterval(() => go(cur+1), 6000);
  }

  /* ---------- back to top ---------- */
  function backToTop(){
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    window.addEventListener('scroll', () => btn.classList.toggle('show', window.scrollY > 500), { passive:true });
    btn.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));
  }

  /* ---------- contact form -> mailto fallback ---------- */
  function contactForm(){
    const form = document.getElementById('contactForm');
    if (!form) return;
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const data = new FormData(form);
      const name = data.get('name') || '';
      const phone = data.get('phone') || '';
      const email = data.get('email') || '';
      const message = data.get('message') || '';
      const body = `Name: ${name}%0APhone: ${phone}%0AEmail: ${email}%0A%0A${message}`;
      window.location.href = `mailto:info@koradiyagroupimpex.com?subject=Website Enquiry&body=${body}`;
    });
  }

})();
