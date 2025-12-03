// --------- NAVBAR INJECTION (CLEAN + WORKING) ----------
document.getElementById("navbar-placeholder").innerHTML = `
  <nav class="nv-navbar">

    <!-- LEFT LINKS (desktop only) -->
    <div class="nv-left-links">
      <a href="productmain.html">Products</a>
      <!-- FIXED: opens catalog.html properly -->
      <a href="catalog.html">Catalog</a>
    </div>

    <!-- LOGO CENTER -->
    <img src="images/logo.png" class="nv-logo" onclick="location.href='index.html'">

    <!-- RIGHT BUTTON / HAMBURGER -->
    <div class="nv-right">
      <button class="nv-btn">Sign In</button>
      <div class="nv-menu-icon" role="button" aria-label="menu">☰</div>
    </div>

    <!-- MOBILE MENU -->
    <div class="nv-mobile-menu">
      <a href="productmain.html">Products</a>
      <!-- FIXED HERE TOO -->
      <a href="catalog.html">Catalog</a>
      <button class="nv-btn">Sign In</button>
    </div>

  </nav>
`;


// --------- MOBILE MENU TOGGLE (SAFE + SAME BEHAVIOR) ----------
document.addEventListener("click", (e) => {
  const menuIcon = e.target.closest && e.target.closest(".nv-menu-icon");

  // Toggle menu if icon clicked
  if (menuIcon) {
    const menu = document.querySelector(".nv-mobile-menu");
    if (!menu) return;

    const isOpen = getComputedStyle(menu).display === "flex";
    menu.style.display = isOpen ? "none" : "flex";
    menu.style.flexDirection = "column";
  }

  // Click outside closes menu
  const mobileMenu = document.querySelector(".nv-mobile-menu");

  if (mobileMenu && getComputedStyle(mobileMenu).display === "flex") {
    const clickedInsideMenu = e.target.closest && e.target.closest(".nv-mobile-menu");
    const clickedOnMenuIcon = e.target.closest && e.target.closest(".nv-menu-icon");

    if (!clickedInsideMenu && !clickedOnMenuIcon) {
      mobileMenu.style.display = "none";
    }
  }
});
