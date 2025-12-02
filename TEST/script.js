// ===============================================================
// ==================== CLEAN, FINAL, WORKING CODE ===============
// ===============================================================

// TOP SCROLLER
function initTopScroller() {
  const track = document.querySelector(".top-track");
  if (!track) return;

  const imgs = [...track.children];
  imgs.forEach((img) => {
    track.appendChild(img.cloneNode(true));
  });
}

// BOTTOM SCROLLER
function initBottomScroller() {
  const track = document.querySelector(".bottom-track");
  if (!track) return;

  const imgs = [...track.children];
  imgs.forEach((img) => {
    track.appendChild(img.cloneNode(true));
  });
}

// NEW IMAGE SWITCHER (FIXED WITH PROPER ACTIVE SELECTION)
function showImage(id) {
  const images = document.querySelectorAll(".right img");
  const targetImage = document.getElementById(id);
  const button = document.getElementById("image-button");
  const options = document.querySelectorAll(".option");

  if (!targetImage) return;

  // update images
  images.forEach((img) => img.classList.remove("active"));
  targetImage.classList.add("active");

  // update left option highlight
  options.forEach((opt) => opt.classList.remove("active-option"));
  document.querySelector(`.option[onclick="showImage('${id}')"]`)
    ?.classList.add("active-option");

  // update button dynamically using data-name
  if (button) {
    button.classList.remove("active-button");
    setTimeout(() => button.classList.add("active-button"), 200);

    const productId = targetImage.dataset.id || "#";
    const productName = targetImage.dataset.name || "Go Somewhere";

    button.href = "product.html?id=" + productId;
    button.textContent = "View " + productName;
  }
}

function initializeGallery() {
  const firstOption = document.querySelector(".option");
  if (!firstOption) return;

  firstOption.classList.add("active-option");
  const onclickAttr = firstOption.getAttribute("onclick");

  if (onclickAttr) {
    const match = onclickAttr.match(/'(.+)'/);
    if (match) showImage(match[1]);
  }
}

// NEW GSAP TEXT
function initGsapText() {
  const textEl = document.querySelector(".center-text");
  if (!textEl) return;

  const text = textEl.textContent;
  textEl.textContent = "";

  [...text].forEach((letter, i) => {
    const span = document.createElement("span");
    span.textContent = letter;
    span.style.animationDelay = `${i * 0.15}s`;
    textEl.appendChild(span);
  });

  requestAnimationFrame(() => textEl.classList.add("show"));

  gsap.to(textEl, {
    scrollTrigger: {
      trigger: ".stack-section",
      start: "top center",
      end: "+=1800",
      scrub: true,
    },
    y: "-40vh",
    ease: "none",
  });
}

// INITIALIZER
document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".top-track")) initTopScroller();
  if (document.querySelector(".bottom-track")) initBottomScroller();
  if (document.querySelector(".option")) initializeGallery();
  if (document.querySelector(".center-text")) initGsapText();

  document.querySelectorAll('.js-marquee').forEach(track => {
    if (!track.dataset.duplicated) {
      track.innerHTML += track.innerHTML;
      track.dataset.duplicated = 'true';
    }
  });

  document.querySelectorAll('.js-scroll-track').forEach(track => {
    if (!track.dataset.duplicated) {
      track.innerHTML += track.innerHTML;
      track.dataset.duplicated = 'true';
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const vtrack = document.querySelector(".js-vscroll");
  if (vtrack) {
    vtrack.innerHTML += vtrack.innerHTML; // duplicate list
  }
});


function openProduct(card) {
  const id = card.dataset.id;
  if (id) {
    window.location.href = `product.html?id=${id}`;
  }
}









// document.addEventListener("DOMContentLoaded", () => {
//   const loader = document.getElementById("nv-loader");
//   const vid = document.getElementById("nv-loader-video");

//   vid.onended = () => {
//     loader.style.opacity = "0";
//     loader.style.transition = "0.5s";
//     setTimeout(() => loader.remove(), 500);
//   };
// });

