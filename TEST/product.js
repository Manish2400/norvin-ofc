console.log('Product JS loaded');
import { products } from './productdata.js';

// =========================
// MAIN FUNCTION TO LOAD PRODUCT
// =========================
function loadProduct() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');

  const product = products.find(p => p.id === productId);

  if (!product) {
    document.querySelector(".product-page").innerHTML =
      "<p style='padding:40px;'>Product not found.</p>";
    return;
  }

  // Fill in product info
  document.getElementById('product-image').src = product.image;
  document.getElementById('product-title').textContent = product.name;
  document.getElementById('product-description').textContent =
    product.desc || "";
  document.getElementById('product-category').textContent = product.category;
  document.getElementById('product-color').textContent = product.color;
  document.getElementById('product-type').textContent =
    product.types.join(", ");

  // Related products
  const relatedContainer = document.getElementById("related-products");
  relatedContainer.innerHTML = "";

  const related = products.filter(p => product.relatedIds.includes(p.id));

  related.forEach(item => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <p>${item.name}</p>
    `;

    div.addEventListener("click", () => {
      window.location.href = `product.html?id=${item.id}`;
      loadProduct(); // reload instantly
    });

    relatedContainer.appendChild(div);
  });
}

// =========================
// ENQUIRY MODAL
// =========================
function setupModal() {
  const modal = document.getElementById("enquiry-modal");
  const openBtn = document.getElementById("enquiry-btn");
  const closeBtn = document.querySelector(".close-btn");

  openBtn?.addEventListener("click", () => (modal.style.display = "flex"));
  closeBtn?.addEventListener("click", () => (modal.style.display = "none"));

  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });
}

// =========================
// INIT
// =========================
document.addEventListener("DOMContentLoaded", () => {
  loadProduct();
  setupModal();
});
