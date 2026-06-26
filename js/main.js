/* ===================================================
   field flow — main.js
   =================================================== */

(function () {
  'use strict';

  // ===== ハンバーガーメニュー =====
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  function openMenu() {
    hamburger.classList.add('is-open');
    nav.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'メニューを閉じる');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('is-open');
    nav.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'メニューを開く');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', function () {
    if (hamburger.getAttribute('aria-expanded') === 'true') {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // ナビリンククリックでメニューを閉じる
  nav.querySelectorAll('.nav__link').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Escキーでメニューを閉じる
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && hamburger.getAttribute('aria-expanded') === 'true') {
      closeMenu();
    }
  });


  // ===== ヘッダースクロール =====
  var header = document.querySelector('.header');
  var lastScrollY = 0;

  window.addEventListener('scroll', function () {
    var scrollY = window.scrollY;
    if (scrollY > 0) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
    lastScrollY = scrollY;
  }, { passive: true });


  // ===== FAQアコーディオン =====
  document.querySelectorAll('.faq-item__q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var answer = btn.nextElementSibling;
      var isExpanded = btn.getAttribute('aria-expanded') === 'true';

      // 他のFAQを閉じる
      document.querySelectorAll('.faq-item__q').forEach(function (other) {
        if (other !== btn) {
          other.setAttribute('aria-expanded', 'false');
          var otherAnswer = other.nextElementSibling;
          if (otherAnswer) {
            otherAnswer.hidden = true;
          }
        }
      });

      // 自身のトグル
      if (isExpanded) {
        btn.setAttribute('aria-expanded', 'false');
        answer.hidden = true;
      } else {
        btn.setAttribute('aria-expanded', 'true');
        answer.hidden = false;
      }
    });
  });


  // ===== スクロールアニメーション (IntersectionObserver) =====
  if ('IntersectionObserver' in window) {
    var observerOptions = {
      threshold: 0.12,
      rootMargin: '0px 0px -32px 0px'
    };

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    var targets = document.querySelectorAll(
      '.service-card, .strength-card, .case-card, .approach-step, .price-card, .flow-step, .faq-item, .pain__item'
    );
    targets.forEach(function (el) {
      el.classList.add('fade-up');
      observer.observe(el);
    });
  }


  // ===== スムーススクロール (href="#..." のアンカー) =====
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      var headerHeight = header ? header.offsetHeight : 0;
      var targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 12;

      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });

})();
