import { products } from "./productdata.js";

document.addEventListener("DOMContentLoaded", () => {
  // ====== GET SEARCH QUERY ======
  const params = new URLSearchParams(window.location.search);
  const searchTerm = params.get("search")?.toLowerCase() || null;

  // ====== 1. STATIC DOM FILTER (only if HTML has product-card already) ======
  if (searchTerm) {
    const allCards = document.querySelectorAll(".product-card");

    if (allCards.length > 0) {
      let found = false;

      allCards.forEach((card) => {
        const title = card.querySelector("h3")?.textContent.toLowerCase() || "";
        const desc = card.querySelector("p")?.textContent.toLowerCase() || "";

        if (title.includes(searchTerm) || desc.includes(searchTerm)) {
          card.style.display = "block";
          found = true;
        } else {
          card.style.display = "none";
        }
      });

      if (!found) {
        document.getElementById("product-list").innerHTML =
          "<p>No matching products found.</p>";
      }
    }
  }

  // ====== 2. DYNAMIC FILTER FROM productdata.js ======
  let filteredProducts = products;

  if (searchTerm) {
    filteredProducts = products.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm) ||
        p.category.toLowerCase().includes(searchTerm) ||
        p.types?.some((t) => t.toLowerCase().includes(searchTerm))
    );
  }

  // ====== 2B. RENDER IF PAGE USES JS-BASED RENDERING ======
  const productList = document.getElementById("product-list");

  if (productList && products.length > 0) {
    if (filteredProducts.length > 0) {
      productList.innerHTML = "";

      filteredProducts.forEach((product) => {
        const card = document.createElement("div");
        card.classList.add("product-card");

        card.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h3 class="product-name">${product.name}</h3>
          <p>${product.category}</p>
          <a href="product.html?id=${product.id}" class="btn">View</a>
        `;

        productList.appendChild(card);
      });
    } else {
      productList.innerHTML = "<p>No matching products found.</p>";
    }
  }

  // ====== 3. MARQUEE CLONE (SAFE) ======
  const track = document.getElementById("marqueeTrack");
  if (track && !track.dataset.cloned) {
    const cloned = track.cloneNode(true);
    track.parentElement.appendChild(cloned);
    track.dataset.cloned = "true"; // prevent infinite clones
  }
});
