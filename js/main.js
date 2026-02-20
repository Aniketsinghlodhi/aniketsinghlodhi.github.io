/* ========================================
   main.js — Aniket Singh Lodhi Portfolio
   ======================================== */

(function () {
  "use strict";

  // ── Dynamic year ──
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── Mobile navigation ──
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!isExpanded));
      navLinks.classList.toggle("active");
    });

    // Close nav when a link is clicked (mobile)
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ── Scroll-triggered reveal animations ──
  const revealItems = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  // ── Skill bar fill animation ──
  const skillCards = document.querySelectorAll(".skill-card");

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  skillCards.forEach((card) => skillObserver.observe(card));

  // ── Active nav link highlighting ──
  const sections = document.querySelectorAll("section[id]");
  const navAnchors = document.querySelectorAll(".nav-links a[href^='#']");

  function updateActiveNav() {
    const scrollY = window.scrollY + 120;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollY >= top && scrollY < top + height) {
        navAnchors.forEach((a) => {
          a.classList.remove("active");
          if (a.getAttribute("href") === "#" + id) {
            a.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", updateActiveNav, { passive: true });
  updateActiveNav();

  // ── Typing animation ──
  const typingEl = document.getElementById("typing-text");

  if (typingEl) {
    const phrases = [
      "decentralized systems.",
      "full-stack platforms.",
      "smart contracts.",
      "AI-driven solutions.",
      "scalable web apps.",
      "secure architectures.",
      "the future of tech.",
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function typeLoop() {
      const current = phrases[phraseIndex];

      if (isDeleting) {
        typingEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 40;
      } else {
        typingEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 80;
      }

      if (!isDeleting && charIndex === current.length) {
        // Pause at end of word
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 400;
      }

      setTimeout(typeLoop, typeSpeed);
    }

    // Start after a brief delay
    setTimeout(typeLoop, 800);
  }

  // ── Profile title rotation (below photo) ──
  const profileTitleEl = document.getElementById("profile-title-text");

  if (profileTitleEl) {
    const titles = [
      "Full-Stack Developer",
      "Blockchain Engineer",
      "AI Systems Builder",
      "IIT Patna CS",
    ];
    let titleIndex = 0;

    function cycleTitle() {
      profileTitleEl.style.opacity = "0";
      profileTitleEl.style.transform = "translateY(4px)";

      setTimeout(() => {
        profileTitleEl.textContent = titles[titleIndex];
        profileTitleEl.style.opacity = "0.85";
        profileTitleEl.style.transform = "translateY(0)";
        titleIndex = (titleIndex + 1) % titles.length;
      }, 300);
    }

    // Set initial title
    profileTitleEl.textContent = titles[0];
    profileTitleEl.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    setInterval(cycleTitle, 2500);
  }

  // ── Header shrink on scroll ──
  const header = document.querySelector(".site-header");

  if (header) {
    let lastScroll = 0;

    window.addEventListener(
      "scroll",
      () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 80) {
          header.style.borderBottomColor = "rgba(0, 240, 255, 0.08)";
        } else {
          header.style.borderBottomColor = "rgba(255, 255, 255, 0.04)";
        }

        lastScroll = currentScroll;
      },
      { passive: true }
    );
  }

  // ── Live GitHub Stats via API ──
  const GH_USERNAME = "aniketsinghlodhi";

  // Language colors (GitHub standard)
  const langColors = {
    JavaScript: "#f1e05a",
    Python: "#3572A5",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Solidity: "#AA6746",
    TypeScript: "#3178c6",
    Java: "#b07219",
    C: "#555555",
    "C++": "#f34b7d",
    Shell: "#89e051",
    Jupyter: "#DA5B0B",
  };

  function animateCounter(el, target) {
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 40));
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      el.textContent = current;
    }, 30);
  }

  async function fetchGitHubData() {
    try {
      // Fetch user profile
      const userRes = await fetch(
        "https://api.github.com/users/" + GH_USERNAME
      );
      if (!userRes.ok) return;
      const user = await userRes.json();

      // Animate counter numbers
      const reposEl = document.getElementById("gh-repos");
      const followersEl = document.getElementById("gh-followers");
      const followingEl = document.getElementById("gh-following");

      if (reposEl) animateCounter(reposEl, user.public_repos || 0);
      if (followersEl) animateCounter(followersEl, user.followers || 0);
      if (followingEl) animateCounter(followingEl, user.following || 0);

      // Fetch repos for stars + languages
      const reposRes = await fetch(
        "https://api.github.com/users/" +
          GH_USERNAME +
          "/repos?per_page=100&sort=updated"
      );
      if (!reposRes.ok) return;
      const repos = await reposRes.json();

      // Total stars
      const totalStars = repos.reduce(
        (sum, repo) => sum + (repo.stargazers_count || 0),
        0
      );
      const starsEl = document.getElementById("gh-stars");
      if (starsEl) animateCounter(starsEl, totalStars);

      // Aggregate languages by byte count
      const langTotals = {};
      const langPromises = repos
        .filter((r) => !r.fork && r.language)
        .slice(0, 30)
        .map((repo) =>
          fetch(repo.languages_url)
            .then((r) => (r.ok ? r.json() : {}))
            .then((langs) => {
              for (const [lang, bytes] of Object.entries(langs)) {
                langTotals[lang] = (langTotals[lang] || 0) + bytes;
              }
            })
            .catch(() => {})
        );

      await Promise.all(langPromises);

      // Sort and take top 6
      const sorted = Object.entries(langTotals)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6);

      const totalBytes = sorted.reduce((s, [, b]) => s + b, 0);

      const barsContainer = document.getElementById("gh-lang-bars");
      if (!barsContainer || sorted.length === 0) return;

      barsContainer.innerHTML = "";

      sorted.forEach(([lang, bytes], i) => {
        const pct = ((bytes / totalBytes) * 100).toFixed(1);
        const color = langColors[lang] || "#8b949e";

        const item = document.createElement("div");
        item.className = "gh-lang-item";
        item.innerHTML =
          '<span class="gh-lang-name">' +
          lang +
          "</span>" +
          '<div class="gh-lang-bar">' +
          '<div class="gh-lang-fill" style="--target-width: ' +
          pct +
          "%; background: " +
          color +
          '"></div>' +
          "</div>" +
          '<span class="gh-lang-pct">' +
          pct +
          "%</span>";

        barsContainer.appendChild(item);

        // Animate the fill after a staggered delay
        const fill = item.querySelector(".gh-lang-fill");
        setTimeout(() => {
          fill.style.width = pct + "%";
        }, 200 + i * 150);
      });
    } catch (e) {
      // Silently fail — static image fallbacks are already visible
    }
  }

  // Trigger GitHub fetch when the section scrolls into view
  const ghSection = document.querySelector(".github-section");
  if (ghSection) {
    const ghObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fetchGitHubData();
            ghObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    ghObserver.observe(ghSection);
  }
})();
