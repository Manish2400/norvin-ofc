// ===== NAVBAR HIDE ON SCROLL DOWN, SHOW ON SCROLL UP =====
let lastScroll = 0;
const navbar = document.querySelector("header");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    navbar.classList.remove("header-hide");
    return;
  }

  if (currentScroll > lastScroll) {
    // scrolling down
    navbar.classList.add("header-hide");
  } else {
    // scrolling up
    navbar.classList.remove("header-hide");
  }

  lastScroll = currentScroll;

  // Apply shadow when scrolling
  if (currentScroll > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ===== Norvin Card Reveal Animation =====
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll('.norvin-card');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      } else {
        entry.target.classList.remove('in-view');
      }
    });
  }, {
    threshold: 0.5
  });

  cards.forEach(card => observer.observe(card));
});

// ===== Our Process Overlapping Scroll Cards =====
window.addEventListener("DOMContentLoaded", () => {
  const processCards = document.querySelectorAll('.process-card-box');
  const scrollWrapper = document.querySelector('.our-process-scroll-wrapper');

  if (scrollWrapper && processCards.length > 0) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const start = scrollWrapper.offsetTop;
      const relativeY = scrollTop - start;
      const stepHeight = 300;

      processCards.forEach((card, index) => {
        const trigger = index * stepHeight;
        if (relativeY >= trigger) {
          card.classList.add('visible');
        } else {
          card.classList.remove('visible');
        }
      });
    });
  }
});


// === Reveal "Explore Our Production Line" when 4th card is visible ===
const exploreSection = document.querySelector('.explore-production-line');
const fourthCard = document.querySelectorAll('.process-card-box')[3]; // 4th card = index 3

const triggerExplore = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      exploreSection.classList.add('visible');
    }
  });
}, {
  threshold: 0.5
});

if (fourthCard && exploreSection) {
  triggerExplore.observe(fourthCard);
}

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      }
    });
  }, {
    threshold: 0.3
  });

  cards.forEach(card => observer.observe(card));
});

document.addEventListener("DOMContentLoaded", () => {
  const logo = document.getElementById("footer-logo-animate");
  const letters = logo.querySelectorAll("span");
  const triggerDiv = document.querySelector('.norvin-trigger-zone');

  const getRandomDelays = () => {
    const delays = [0.2, 0.4, 0.6, 0.8, 1, 1.2];
    for (let i = delays.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [delays[i], delays[j]] = [delays[j], delays[i]];
    }
    return delays;
  };

  const triggerAnimation = () => {
    logo.classList.remove("animate");
    void logo.offsetWidth;

    const delays = getRandomDelays();
    letters.forEach((el, i) => {
      el.style.animation = "none";
      void el.offsetWidth;
      el.style.animation = `slideUpIn 0.7s cubic-bezier(0.23, 1, 0.32, 1) forwards`;
      el.style.animationDelay = `${delays[i]}s`;
    });

    logo.classList.add("animate");
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          triggerAnimation();
        }
      });
    },
    { threshold: 1.0 }
  );

  observer.observe(triggerDiv);
});
document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 800,
    once: true,
    easing: 'ease-in-out',
  });
});





