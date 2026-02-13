const menuItemsContainer = document.querySelector(".menu-items-container");
async function gettingInfoFromExternalSource() {
  try {
    const response = await fetch("js/data.json");
    const arrayOfdata = await response.json();
    console.log(arrayOfdata);
    displayingData(arrayOfdata);
  } catch (error) {
    console.log(error);
    menuItemsContainer.innerHTML = `<p>Something went wrong! Try to refresh this page.</p>`;
  } finally {
  }
}
gettingInfoFromExternalSource();

function displayingData(array) {
  menuItemsContainer.innerHTML = "";
  const htmlContent = array
    .map((item) => {
      return `
      <article class="menu-item">
        <div class="menu-item-image-container">
          <picture>
            <source media="(min-width: 1024px)" srcset="${item.image.desktop}" />
            <source media="(min-width: 768px)" srcset="${item.image.tablet}" />
            <img src="${item.image.mobile}" alt="${item.name}" />
          </picture>
          <div class="menu-item-btn-container">
            <button class="add-to-cart-btn" type="button">
              <img src="assets/images/icon-add-to-cart.svg" alt="icon-add-to-cart" />
              Add to Cart
            </button>
          </div>
        </div>

        <div class="menu-item-info-container">
          <p class="type-of-dessert">${item.category}</p>
          <h2 class="name-of-item">${item.name}</h2>
          <p class="menu-item-price">$${item.price.toFixed(2)}</p>
        </div>
      </article>`;
    })
    .join("");
  menuItemsContainer.innerHTML = htmlContent;
}
