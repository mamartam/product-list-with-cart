// dom
const menuItemsContainer = document.querySelector(".menu-items-container");
const defoltBgForEmptyCart = document.querySelector(
  ".defolt-bg-for-empty-cart ",
);
const notEmptyCart = document.querySelector(".not-empty-cart");
const listOfAddedItems = document.querySelector(".list-of-added-items");
const plusBtn = document.querySelector(".plus-btn");
const minusBtn = document.querySelector(".minus-btn");
const numberOfItemsInTheCart = document.querySelector(
  ".number-of-items-in-the-cart",
);
// const addToCartBtn = document.querySelector(".add-to-cart-btn");

// -----------------------------------------------------------------

const addedItemsToTheCart = [];
// async code to get data from external source
async function gettingInfoFromExternalSource() {
  try {
    const response = await fetch("js/data.json");
    const arrayOfdata = await response.json();
    console.log(arrayOfdata);
    displayingData(arrayOfdata);
    menuItemsContainer.addEventListener("click", (event) => {
      if (event.target.closest(".add-to-cart-btn")) {
        let counterContainer = event.target
          .closest(".add-to-cart-btn")
          .closest(".menu-item-btn-container")
          .querySelector(".counter");

        counterContainer.classList.remove("make-disable-btn");
        let addToCartBtn = event.target.closest(".add-to-cart-btn");
        addToCartBtn.classList.add("make-disable-btn");
        let btnsContainerId = Number(
          event.target
            .closest(".add-to-cart-btn")
            .closest(".menu-item-btn-container").dataset.id,
        );
        addedItemsToTheCart.push({
          amount: 1,
          name: arrayOfdata[btnsContainerId].name,
          price: arrayOfdata[btnsContainerId].price,
          indexInArray: btnsContainerId,
        });
      }
      if (event.target.closest(".plus-btn")) {
        let btnsContainerId = Number(
          event.target.closest(".plus-btn").closest(".menu-item-btn-container")
            .dataset.id,
        );
        console.log(btnsContainerId);
        let ExistedItem = addedItemsToTheCart.find((el) => {
          return el.indexInArray === btnsContainerId;
        });

        if (ExistedItem !== undefined) {
          ExistedItem.amount += 1;
        }
      }
      if (event.target.closest(".minus-btn")) {
        let btnsContainerId = Number(
          event.target.closest(".minus-btn").closest(".menu-item-btn-container")
            .dataset.id,
        );
        let ExistedItem = addedItemsToTheCart.find((el) => {
          return el.indexInArray === btnsContainerId;
        });
        let i = ExistedItem.indexInArray;
        if (ExistedItem.amount === 1) {
          console.log(addedItemsToTheCart.indexOf(ExistedItem));
          addedItemsToTheCart.splice(
            addedItemsToTheCart.indexOf(ExistedItem),
            1,
          );
          let addToCartBtn = event.target
            .closest(".menu-item-btn-container")
            .querySelector(".add-to-cart-btn");
          addToCartBtn.classList.remove("make-disable-btn");
          let counterContainer = event.target
            .closest(".minus-btn")
            .closest(".menu-item-btn-container")
            .querySelector(".counter");

          counterContainer.classList.add("make-disable-btn");
        } else {
          ExistedItem.amount -= 1;
        }
      }
      console.log(addedItemsToTheCart);

      let amoutnOfItems = 0;
      addedItemsToTheCart.forEach((i) => {
        amoutnOfItems += i.amount;
      });
      numberOfItemsInTheCart.textContent = amoutnOfItems;
      listOfAddedItems.innerHTML = "";
      addedItemsToTheCart.forEach((item) => {
        console.log(item.name);
        listOfAddedItems.innerHTML += `<div class="added-item">
                <div class="item-info">
                  <h3>${item.name}</h3>
                  <p>
                    <span class="amoumt-of-items">${item.amount}</span>
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
    menuItemsContainer.innerHTML = `<p class="error-message">Something went wrong! Try to refresh this page...</p>`;
  } finally {
    console.log("Finish");
  }
}
gettingInfoFromExternalSource();
const btnContainer = document.querySelector(".menu-item-btn-container");

//
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
          <div class="menu-item-btn-container" data-id="${index}">
            <button class="add-to-cart-btn" type="button">
              <img src="assets/images/icon-add-to-cart.svg" alt="icon-add-to-cart" />
              Add to Cart
            </button>
            <div class="counter make-disable-btn">
             <button class="minus-btn">-</button><span class="number-of-items">1</span><button class="plus-btn">+</button></div>
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
