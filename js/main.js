const menuItemsContainer = document.querySelector(".menu-items-container");
const defoltBgForEmptyCart = document.querySelector(
  ".defolt-bg-for-empty-cart ",
);
const notEmptyCart = document.querySelector(".not-empty-cart");
const listOfAddedItems = document.querySelector(".list-of-added-items");

const addedItemsToTheCart = [];

async function gettingInfoFromExternalSource() {
  try {
    const response = await fetch("js/data.json");
    const arrayOfdata = await response.json();
    console.log(arrayOfdata);
    displayingData(arrayOfdata);
    menuItemsContainer.addEventListener("click", (event) => {
      if (event.target.classList.contains("add-to-cart-btn")) {
        defoltBgForEmptyCart.classList.add("unactive");
        notEmptyCart.classList.remove("unactive");
        let index = event.target.dataset.id;
        console.log(arrayOfdata[index].name);
        addedItemsToTheCart.push({
          name: arrayOfdata[index].name,
          price: arrayOfdata[index].price.toFixed(2),
        });
      }
      console.log(addedItemsToTheCart);
      listOfAddedItems.innerHTML = "";
      addedItemsToTheCart.forEach((item) => {
        listOfAddedItems.innerHTML += `<div class="added-item">
                  <div class="item-info">
                    <h3>${item.name}</h3>
                    <p>
                      <span class="amoumt-of-items">...</span>
                      <span class="price-for-one-item">${item.price}</span>
                      <span class="price-for-all-items">...</span>
                    </p>
                  </div>
                  <div class="delete-from-cart-container">
                    <button class="delete-from-cart-btn" type="button">
                      <img src="assets/images/icon-remove-item.svg" alt="" />
                    </button>
                  </div>
                </div>
                <hr />`;
      });
    });
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
    .map((item, index) => {
      return `
      <article class="menu-item">
        <div class="menu-item-image-container">
          <picture>
            <source media="(min-width: 1024px)" srcset="${item.image.desktop}" />
            <source media="(min-width: 768px)" srcset="${item.image.tablet}" />
            <img src="${item.image.mobile}" alt="${item.name}" />
          </picture>
          <div class="menu-item-btn-container">
            <button class="add-to-cart-btn" type="button" data-id="${index}">
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
