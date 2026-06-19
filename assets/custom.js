/**
 * KITA OUTDOOR - Custom JS
 * スクロールフェードインアニメーション（Intersection Observer）
 */

(function () {
  // カスタマイザー編集中はアニメーションをスキップ
  if (window.Shopify && window.Shopify.designMode) return;

  // prefers-reduced-motion が有効なら何もしない
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const STAGGER_MS = 100;

  // アニメーションさせる要素の定義
  // stagger: true → 同じ親を持つ兄弟間で遅延をずらす
  const TARGETS = [
    { selector: '.kita-hero__inner',            stagger: false },
    { selector: '.kita-features__header',       stagger: false },
    { selector: '.kita-features__block',        stagger: true  },
    { selector: '.kita-cta-banner__inner',      stagger: false },
    { selector: '.kita-product-grid__header',   stagger: false },
    { selector: '.kita-product-grid__item',     stagger: true  },
    { selector: '.kita-testimonials__header',   stagger: false },
    { selector: '.kita-testimonials__card',     stagger: true  },
    { selector: '.kita-collection-banner__inner', stagger: false },
  ];

  function markElements() {
    TARGETS.forEach(({ selector, stagger }) => {
      const elements = document.querySelectorAll(selector);
      if (!elements.length) return;

      if (!stagger) {
        elements.forEach((el) => el.setAttribute('data-animate', ''));
        return;
      }

      // スタッガー: 同じ親内の要素にインデックス順の遅延を付ける
      const groups = new Map();
      elements.forEach((el) => {
        const key = el.parentElement;
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(el);
      });

      groups.forEach((groupEls) => {
        groupEls.forEach((el, i) => {
          el.setAttribute('data-animate', '');
          el.style.transitionDelay = `${i * STAGGER_MS}ms`;
        });
      });
    });
  }

  function observe() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          // 一度表示したら監視終了（再スクロールで隠れない）
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el));
  }

  document.addEventListener('DOMContentLoaded', () => {
    markElements();
    observe();
  });
})();
