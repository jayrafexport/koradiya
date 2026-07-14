/* =========================================================
   KORADIYA GROUP IMPEX — SHARED BEHAVIOUR
   Runs after partials.js mounts the header/footer. Every
   render function checks the container exists first, so the
   same file works unmodified across all 8 pages.
   ========================================================= */

document.addEventListener('partialsMounted', function(){
  var C = window.SITE_CONTENT || {};
  var M = window.SITE_MEDIA || {};

  /* ---------- helpers ---------- */
  function el(tag, cls, html){ var d = document.createElement(tag); if (cls) d.className = cls; if (html !== undefined) d.innerHTML = html; return d; }
  function q(id){ return document.getElementById(id); }

  /* ---------- mosaic / about images (home + any page reusing the mosaic) ---------- */
  (function aboutImages(){
    var about = q('about-img'); if (about && M.aboutImage) about.src = M.aboutImage;
    var t1 = q('teaser-img-1'); if (t1 && M.homeProductPhotos) t1.src = M.homeProductPhotos[0];
    var t2 = q('teaser-img-2'); if (t2 && M.homeProductPhotos) t2.src = M.homeProductPhotos[1];
  })();

  /* ---------- hero image slider (home only) ---------- */
  (function heroSlider(){
    var wrap = q('heroSlides'); if (!wrap) return;
    var dotsWrap = q('heroDots');
    var slides = (M.heroSlides && M.heroSlides.length) ? M.heroSlides : [];
    slides.forEach(function(src, i){
      var d = el('div', 'hero-slide' + (i === 0 ? ' active' : ''));
      d.style.backgroundImage = "url('" + src + "')";
      wrap.appendChild(d);
      if (dotsWrap){
        var dot = document.createElement('button');
        if (i === 0) dot.className = 'active';
        dot.addEventListener('click', function(){ goTo(i); });
        dotsWrap.appendChild(dot);
      }
    });
    var cur = 0;
    function goTo(i){
      var s = wrap.querySelectorAll('.hero-slide');
      var d = dotsWrap ? dotsWrap.querySelectorAll('button') : [];
      s[cur].classList.remove('active'); if (d[cur]) d[cur].classList.remove('active');
      cur = i;
      s[cur].classList.add('active'); if (d[cur]) d[cur].classList.add('active');
    }
    if (slides.length > 1) setInterval(function(){ goTo((cur + 1) % slides.length); }, 5500);
  })();

  /* ---------- generic stat strip with animated count-up ---------- */
  (function statStrips(){
    ['statStrip','globalStrip'].forEach(function(id){
      var strip = q(id); if (!strip) return;
      var data = id === 'globalStrip' ? [
        { num:17, suffix:'+', label:'Countries Exported' },
        { num:6, suffix:'', label:'Continents Served' },
        { num:800, suffix:'+', label:'Design Options' },
        { num:24, suffix:'/7', label:'Export Support' }
      ] : C.heroStats;
      (data || []).forEach(function(s){
        var d = el('div', 'item', '<div class="num"><span data-count="' + s.num + '" data-suffix="' + s.suffix + '">0</span></div><div class="lbl">' + s.label + '</div>');
        strip.appendChild(d);
      });
    });
  })();

  /* ---------- process flow (home) ---------- */
  (function flow(){
    var track = q('flowTrack'); if (!track || !C.process) return;
    C.process.forEach(function(p){
      var d = el('div', 'flow-step', '<div class="flow-node">' + p.step + '</div><h4>' + p.title + '</h4><p>' + p.text + '</p>');
      track.appendChild(d);
    });
  })();

  /* ---------- product teaser cards (home) ---------- */
  (function productCards(){
    var grid = q('productCards'); if (!grid || !C.productCategories) return;
    var imgs = [M.homeProductPhotos && M.homeProductPhotos[0], M.homeProductPhotos && M.homeProductPhotos[1]];
    C.productCategories.forEach(function(item, i){
      var d = el('div', 'tile-card stagger-item');
      d.innerHTML = '<a href="' + item.link + '"><div class="media"><img src="' + (imgs[i] || '') + '" alt="' + item.name + '"></div>' +
        '<div class="body"><h4>' + item.name + '</h4><p>' + item.desc + '</p><span class="go">View Sizes <span class="arrow">&rarr;</span></span></div></a>';
      grid.appendChild(d);
    });
  })();

  /* ---------- why choose cards ---------- */
  (function whyCards(){
    var grid = q('whyCards'); if (!grid || !C.whyChoose) return;
    C.whyChoose.forEach(function(item){
      grid.appendChild(el('div', 'info-tile stagger-item', '<div class="ico">' + item.ico + '</div><h4>' + item.title + '</h4><p>' + item.text + '</p>'));
    });
  })();

  /* ---------- solutions for any space ---------- */
  (function spaces(){
    var grid = q('spacesGrid'); if (!grid || !C.spaces) return;
    C.spaces.forEach(function(s){
      var d = el('div', 'space-card stagger-item');
      d.innerHTML = '<div class="fill ' + s.pat + '"></div><div class="lbl">' + s.name + '</div>';
      grid.appendChild(d);
    });
  })();

  /* ---------- favourite designs marquee ---------- */
  (function marquee(){
    var track = q('marqueeTrack'); if (!track || !C.favouriteDesigns) return;
    var list = C.favouriteDesigns.concat(C.favouriteDesigns); // duplicate for seamless loop
    list.forEach(function(d){
      var card = el('div', 'swatch-card');
      card.innerHTML = '<div class="fill ' + d.pat + '" style="position:absolute;inset:0;"></div><div class="lbl">' + d.name + '<small>' + d.code + '</small></div>';
      track.appendChild(card);
    });
  })();

  /* ---------- infrastructure cards ---------- */
  (function infraCards(){
    var grid = q('infraCards'); if (!grid || !C.infrastructure) return;
    C.infrastructure.forEach(function(item){
      grid.appendChild(el('div', 'info-tile stagger-item', '<div class="ico">&#9634;</div><h4>' + item.title + '</h4><p>' + item.text + '</p>'));
    });
  })();

  /* ---------- packing cards ---------- */
  (function packingCards(){
    var grid = q('packingCards'); if (!grid || !C.packingSteps) return;
    C.packingSteps.forEach(function(item, i){
      grid.appendChild(el('div', 'info-tile stagger-item', '<div class="ico mono">' + String(i + 1).padStart(2, '0') + '</div><h4>' + item.title + '</h4><p>' + item.text + '</p>'));
    });
  })();

  /* ---------- product spec grids + size comparison chart ---------- */
  (function specGrids(){
    function build(containerId, sizes, images, patStart){
      var grid = q(containerId); if (!grid || !sizes) return;
      sizes.forEach(function(sz, i){
        var img = (images && images[i]) || '';
        var pat = 'pat-' + ((patStart + i) % 8);
        var d = el('div', 'spec-card stagger-item');
        d.innerHTML =
          '<div class="swatch ' + pat + '">' +
            (img ? '<img src="' + img + '" alt="' + sz + '" onerror="this.remove();">' : '') +
            '<div class="ph">' + sz + '</div>' +
          '</div>' +
          '<div class="sz mono">' + sz + '</div><div class="sz-lbl">Available Size</div>';
        grid.appendChild(d);
      });
    }
    build('marbleGrid', C.marbleSlabSizes, M.marbleSlabImages, 0);
    build('porcelainGrid', C.porcelainSizes, M.porcelainTileImages, 3);

    var cmp = q('sizeCompare'); if (!cmp || !C.porcelainSizes) return;
    var maxDim = 1800;
    C.porcelainSizes.forEach(function(sz){
      var nums = sz.match(/\d+/g).map(Number);
      var w = Math.max(nums[0], nums[1]), h = Math.min(nums[0], nums[1]);
      var scale = 90 / maxDim;
      var d = el('div', 'blk');
      var sq = el('div', 'sq');
      sq.style.width = Math.max(18, w * scale) + 'px';
      sq.style.height = Math.max(18, h * scale) + 'px';
      d.appendChild(sq);
      d.appendChild(el('div', 'lbl', sz));
      cmp.appendChild(d);
    });
  })();

  /* ---------- country grid ---------- */
  (function countries(){
    ['countryGrid','countryGridFull'].forEach(function(id){
      var grid = q(id); if (!grid || !C.countries) return;
      C.countries.forEach(function(c){
        grid.appendChild(el('div', 'country-chip stagger-item', '<span class="name">' + c.name + '</span><span class="tag mono">' + c.tag + '</span>'));
      });
    });
  })();

  /* ---------- region share bar (global page) ---------- */
  (function regionShare(){
    var wrap = q('regionShare'); if (!wrap || !C.regionShare) return;
    C.regionShare.forEach(function(r){
      var row = el('div', 'donut-legend', '');
      row.style.marginBottom = '14px';
      row.innerHTML =
        '<div class="row" style="justify-content:space-between;margin-bottom:6px;"><span>' + r.region + '</span><span class="mono">' + r.pct + '%</span></div>' +
        '<div style="height:8px;background:var(--line);border-radius:4px;overflow:hidden;"><div style="height:100%;width:0;background:' + r.color + ';transition:width 1.2s ease;" data-w="' + r.pct + '"></div></div>';
      wrap.appendChild(row);
    });
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting){
          wrap.querySelectorAll('[data-w]').forEach(function(bar){ bar.style.width = bar.getAttribute('data-w') + '%'; });
          io.unobserve(e.target);
        }
      });
    }, { threshold:.3 });
    io.observe(wrap);
  })();

  /* ---------- growth chart (SVG line/area) ---------- */
  (function growthChart(){
    var host = q('growthChart'); if (!host || !C.growth) return;
    var years = C.growth.years, values = C.growth.values;
    var w = 640, h = 220, pad = 30;
    var max = Math.max.apply(null, values) * 1.15;
    var stepX = (w - pad * 2) / (years.length - 1);
    function xy(i){ return [pad + i * stepX, h - pad - (values[i] / max) * (h - pad * 2)]; }
    var linePts = years.map(function(_, i){ return xy(i).join(','); }).join(' ');
    var areaPts = linePts + ' ' + xy(years.length - 1)[0] + ',' + (h - pad) + ' ' + xy(0)[0] + ',' + (h - pad);
    var dots = years.map(function(_, i){ var p = xy(i); return '<circle class="dot" cx="' + p[0] + '" cy="' + p[1] + '" r="4"></circle>'; }).join('');
    var labels = years.map(function(y, i){ var p = xy(i); return '<text class="yr" x="' + p[0] + '" y="' + (h - 6) + '" text-anchor="middle">' + y + '</text>'; }).join('');
    host.innerHTML =
      '<svg class="growth-chart" id="growthSvg" viewBox="0 0 ' + w + ' ' + h + '">' +
        '<defs><linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="var(--teal)" stop-opacity="0.35"></stop>' +
          '<stop offset="100%" stop-color="var(--teal)" stop-opacity="0"></stop>' +
        '</linearGradient></defs>' +
        '<polygon class="area" points="' + areaPts + '"></polygon>' +
        '<polyline class="line" points="' + linePts + '"></polyline>' +
        dots + labels +
      '</svg>';
    var svgEl = host.querySelector('.growth-chart');
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if (e.isIntersecting){ svgEl.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold:.35 });
    io.observe(svgEl);
  })();

  /* ---------- testimonial slider ---------- */
  (function testimonials(){
    var slider = q('testiSlider'); var dotsWrap = q('testiDots'); if (!slider || !C.testimonials) return;
    C.testimonials.forEach(function(t, i){
      var s = el('div', 'testi-slide' + (i === 0 ? ' active' : ''), '<p>&ldquo;' + t.quote + '&rdquo;</p><div class="testi-name">' + t.name + '</div><div class="testi-role">' + t.role + '</div>');
      slider.appendChild(s);
      if (dotsWrap){
        var dot = document.createElement('button');
        if (i === 0) dot.className = 'active';
        dot.addEventListener('click', function(){ goTo(i); });
        dotsWrap.appendChild(dot);
      }
    });
    var cur = 0;
    function goTo(i){
      var s = slider.querySelectorAll('.testi-slide');
      var d = dotsWrap ? dotsWrap.querySelectorAll('button') : [];
      s[cur].classList.remove('active'); if (d[cur]) d[cur].classList.remove('active');
      cur = i;
      s[cur].classList.add('active'); if (d[cur]) d[cur].classList.add('active');
    }
    if (C.testimonials.length > 1) setInterval(function(){ goTo((cur + 1) % C.testimonials.length); }, 6000);
  })();

  /* ---------- mission / vision / values accordion ---------- */
  document.querySelectorAll('.mvv-item').forEach(function(item){
    var head = item.querySelector('.mvv-head');
    if (!head) return;
    head.addEventListener('click', function(){
      var open = item.classList.contains('open');
      item.parentElement.querySelectorAll('.mvv-item').forEach(function(i){ i.classList.remove('open'); });
      if (!open) item.classList.add('open');
    });
  });

  /* ---------- product tabs ---------- */
  document.querySelectorAll('.tab-btn').forEach(function(btn){
    btn.addEventListener('click', function(){
      document.querySelectorAll('.tab-btn').forEach(function(b){ b.classList.remove('active'); });
      document.querySelectorAll('.tab-panel').forEach(function(p){ p.classList.remove('active'); });
      btn.classList.add('active');
      var panel = q('tab-' + btn.dataset.tab);
      if (panel) panel.classList.add('active');
    });
  });
  if (location.hash === '#porcelain'){ var pb = document.querySelector('[data-tab="porcelain"]'); if (pb) pb.click(); }

  /* ---------- donut chart(s) ---------- */
  document.querySelectorAll('.donut[data-pct]').forEach(function(d){
    var pct = d.getAttribute('data-pct');
    d.style.setProperty('--pct', pct + '%');
  });

  /* ---------- bar chart animation (any .bar-chart on the page) ---------- */
  document.querySelectorAll('.bar-chart').forEach(function(chart){
    var colors = ['var(--teal)','var(--clay)','var(--brass)','var(--sky)','var(--sage)'];
    chart.querySelectorAll('.bar').forEach(function(bar, i){ bar.style.background = 'linear-gradient(180deg,' + colors[i % colors.length] + ',var(--basalt-2))'; });
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting){
          chart.querySelectorAll('.bar').forEach(function(bar){ bar.style.height = bar.getAttribute('data-h') + '%'; });
          io.unobserve(e.target);
        }
      });
    }, { threshold:.3 });
    io.observe(chart);
  });

  /* ---------- catalogue button ---------- */
  var catBtn = q('catalogueBtn');
  if (catBtn) catBtn.setAttribute('download', '');

  /* ---------- scroll reveal ---------- */
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting){
        e.target.classList.add('in');
        if (e.target.classList.contains('reveal-stagger')){
          e.target.querySelectorAll('.stagger-item').forEach(function(item, idx){ item.style.setProperty('--i', idx); item.classList.add('in'); });
        }
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  /* ---------- animated count-up numbers ---------- */
  var countedOnce = {};
  var countIo = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      var key = e.target;
      if (e.isIntersecting && !countedOnce[key === document.body]) {
        e.target.querySelectorAll('[data-count]').forEach(function(span){
          if (span.dataset.done) return;
          span.dataset.done = '1';
          var target = parseInt(span.getAttribute('data-count'), 10);
          var suffix = span.getAttribute('data-suffix') || '';
          var start = null;
          function step(ts){
            if (!start) start = ts;
            var p = Math.min((ts - start) / 1200, 1);
            span.textContent = Math.floor(p * target) + suffix;
            if (p < 1) requestAnimationFrame(step); else span.textContent = target + suffix;
          }
          requestAnimationFrame(step);
        });
        countIo.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('.hero-strip, .stats-row').forEach(function(elx){ countIo.observe(elx); });

  /* ---------- process flow line fill ---------- */
  var flowSection = document.querySelector('.flow-track');
  if (flowSection){
    var line = flowSection.querySelector('.flow-line-fill');
    if (line){
      var flowIo = new IntersectionObserver(function(entries){
        entries.forEach(function(e){ if (e.isIntersecting){ line.style.width = '100%'; flowIo.unobserve(e.target); } });
      }, { threshold: 0.3 });
      flowIo.observe(flowSection);
    }
  }

  /* ---------- contact form -> mailto fallback ---------- */
  var form = q('contactForm');
  if (form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var inputs = this.querySelectorAll('input, textarea, select');
      var name = inputs[0].value, phone = inputs[1].value, email = inputs[2].value;
      var rest = inputs.length > 4 ? inputs[3].value : '';
      var message = inputs[inputs.length - 1].value;
      var body = 'Name: ' + name + '%0APhone: ' + phone + '%0AEmail: ' + email + (rest ? '%0AEnquiry Type: ' + rest : '') + '%0A%0A' + message;
      window.location.href = 'mailto:info@koradiyagroupimpex.com?subject=Website Enquiry&body=' + body;
    });
  }
});
