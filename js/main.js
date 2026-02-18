const menuItemsContainer = document.querySelector(".menu-items-container");
const cartCount = document.querySelector(".cart__count");
const cartItemRemoveBtns = document.querySelectorAll(".cart-item__remove-btn");
const totalPrice = document.querySelector(".total-price");

const arrayOfAddedItems = [];
let countItems = 0;

async function getData() {
  try {
    const response = await fetch("./js/data.json");
    const data = await response.json();

    displayingData(data); //function for displaying data on the screen
    addItemToTheCart(arrayOfAddedItems, data); //function for "add to the cart" button

    const addBtns = document.querySelectorAll(".plus-btn");
    const removeBtns = document.querySelectorAll(".minus-btn");

    //function for adding items to the cart
    addBtns.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        addBtn(event, arrayOfAddedItems);
      });
    });
    //function for removing items from the cart one by one
    removeBtns.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        removeBtn(event, arrayOfAddedItems);
      });
    });
  } catch (error) {
    console.log(error);
  }
}
getData();

//function for displaying data on the screen
function displayingData(array) {
  menuItemsContainer.innerHTML = "";
  let arrayHtml = array.map((element) => {
    return `<article class="menu-item" data-id="${element.id}">
            <picture>
              <source
                media="(min-width:1200px)"
                srcset="${element.image.desktop}"
              />
              <source
                media="(min-width:600px)"
                srcset="${element.image.tablet}"
              />
              <img
                src="${element.image.mobile}"
                alt="Menu item name"
              />
            </picture>
            <div class="add-remove-btns-container">
              <button type="button" class="add-to-the-cart-btn active">
                <img
                  src="./assets/images/icon-add-to-cart.svg"
                  alt="Add to the cart icon"
                />
                Add to Cart
              </button>
              <div class="plus-minus-btns">
                <button type="button" class="minus-btn">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 12L18 12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                </button>
                <p class="amout-of-menu-item">0</p>
                <button type="button" class="plus-btn">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 12H18M12 6V18" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                </button>
              </div>
            </div>
            <p class="category">${element.category}</p>
            <h3 class="name-of-dish">${element.name}</h3>
            <p class="item-price">$${Number(element.price).toFixed(2)}</p>
          </article>`;
  });
  arrayHtml = arrayHtml.join("");
  menuItemsContainer.innerHTML = arrayHtml;
}
//function for "add to the cart" button
function addItemToTheCart(array, mainArray) {
  const addToTheCartBtns = document.querySelectorAll(".add-to-the-cart-btn"); // all add-to-the-cart-btns
  addToTheCartBtns.forEach((element) => {
    // loop for adding event listener for each btn
    element.addEventListener("click", (btn) => {
      //Finding hmtl element where is information about amount
      //of items which was added to the cart (in the menu section)
      let amountOfMenuItem = btn.target
        .closest(".menu-item")
        .querySelector(".amout-of-menu-item");

      let itemId = btn.target.closest(".menu-item").dataset.id;
      let itemFrommenu = mainArray.find((e) => {
        return e.id === String(itemId);
      });
      let newItem = { ...itemFrommenu, amount: 1 }; //clonning data to avoid changes in a main array of data
      amountOfMenuItem.innerHTML = newItem.amount;
      if (array.length === 0) {
        array.push(newItem);
        console.log(arrayOfAddedItems);
        amountOfMenuItem.innerHTML = newItem.amount; //inserting data into html tag
      } else {
        let indexOfElement = array.findIndex((item) => item.id === itemId);
        if (indexOfElement !== -1) {
          array[indexOfElement].amount += 1;
          amountOfMenuItem.innerHTML = array[indexOfElement].amount; //inserting data into html tag
        } else {
          array.push(newItem);
          amountOfMenuItem.innerHTML = newItem.amount; //inserting data into html tag
        }
      }

      btn.target
        .closest(".menu-item")
        .querySelector(".plus-minus-btns")
        .classList.add("active");
      btn.target
        .closest(".menu-item")
        .querySelector(".add-to-the-cart-btn")
        .classList.remove("active");
      itemCounterInTheCart();
      displayingItemsFromCart();
      totalPriceFunc(totalPrice);
      // console.log(cartItemRemoveBtns);
    });
  });
}

//function for adding items to the cart

function addBtn(btn, array) {
  let amountOfMenuItem = btn.target
    .closest(".menu-item")
    .querySelector(".amout-of-menu-item");
  let itemId = btn.target.closest(".menu-item").dataset.id;
  let indexOfElement = array.findIndex((item) => item.id === itemId);
  array[indexOfElement].amount += 1;
  amountOfMenuItem.innerHTML = array[indexOfElement].amount;
  // console.log(array);
  itemCounterInTheCart();
  displayingItemsFromCart();
  totalPriceFunc(totalPrice);
  // console.log(cartItemRemoveBtns);
}

//function for removing items from the cart onde by one

function removeBtn(btn, array) {
  let amountOfMenuItem = btn.target
    .closest(".menu-item")
    .querySelector(".amout-of-menu-item");
  let itemId = btn.target.closest(".menu-item").dataset.id;
  let itemFromMenu = array.find((e) => {
    return e.id === String(itemId);
  });
  if (itemFromMenu.amount > 1) {
    itemFromMenu.amount -= 1;
    amountOfMenuItem.innerHTML = itemFromMenu.amount;
  } else if (itemFromMenu.amount === 1) {
    let indexOfElement = array.findIndex((item) => item.id === itemId);
    array.splice(indexOfElement, 1);
    btn.target
      .closest(".menu-item")
      .querySelector(".plus-minus-btns")
      .classList.remove("active");
    btn.target
      .closest(".menu-item")
      .querySelector(".add-to-the-cart-btn")
      .classList.add("active");
  }

  itemCounterInTheCart(); //function to get display amount of all elements int the cart to the screen (cart section)
  displayingItemsFromCart(); // function to display all elements which was added to the cart
  totalPriceFunc(totalPrice);
}

//function to get display amount of all elements in the cart to the screen (cart section)
function itemCounterInTheCart() {
  let countItems = 0;
  arrayOfAddedItems.forEach((e) => {
    countItems += e.amount;
  });
  cartCount.textContent = countItems;
  const cartNotEmpty = document.querySelector(".cart--not-empty");
  const emptyCart = document.querySelector(".empty-cart");
  if (countItems === 0) {
    cartNotEmpty.classList.add("hide");
    emptyCart.classList.remove("hide");
  } else if (countItems > 0) {
    cartNotEmpty.classList.remove("hide");
    emptyCart.classList.add("hide");
  }
}

const cartItems = document.querySelector(".cart__items");
// function to display all elements which was added to the cart
function displayingItemsFromCart() {
  cartItems.innerHTML = "";

  let itemsFromCartHtml = arrayOfAddedItems.map((element) => {
    const totalPrice = Number(element.price) * Number(element.amount);

    return `<div class="cart-item" data-id="${element.id}">
      <div class="cart-item__info">
        <p class="cart-item__name">${element.name}</p>
        <p>
          <span class="cart-item__amount">${element.amount}x</span>
          <span class="cart-item__price">@ $${Number(element.price).toFixed(2)}</span>
          <span class="cart-item__total-price">$${totalPrice.toFixed(2)}</span>
        </p>
      </div>

      <button class="cart-item__remove-btn">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"></path> </g></svg>
      </button>
    </div><hr>`;
  });

  cartItems.innerHTML = itemsFromCartHtml.join("");
}
// fucntion to count and display total price for all items added to the cart
function totalPriceFunc(Tprice) {
  let price = 0;
  arrayOfAddedItems.forEach((element) => {
    price += Number(element.price) * Number(element.amount);
  });
  Tprice.textContent = Number(price).toFixed(2);
}
// events listener for container which contains list of added
// items and which adds ability to remove item from the cart section
cartItems.addEventListener("click", (event) => {
  if (event.target.closest(".cart-item__remove-btn")) {
    elementId = event.target.closest(".cart-item").dataset.id;
    let indexOfElement = arrayOfAddedItems.findIndex(
      (item) => item.id === elementId,
    );
    let arr = document.querySelectorAll(".menu-item");
    arr.forEach((e) => {
      if (e.dataset.id === elementId) {
        e.querySelector(".add-to-the-cart-btn").classList.add("active");
        e.querySelector(".plus-minus-btns").classList.remove("active");
      }
    });
    arrayOfAddedItems.splice(indexOfElement, 1);
    itemCounterInTheCart();
    displayingItemsFromCart();
    totalPriceFunc(totalPrice);
  } else {
    return;
  }
});

const confirmBtn = document.querySelector(".confirm-btn");
const confirmationWindow = document.querySelector(".confirmation-window");
confirmBtn.addEventListener("click", () => {
  confirmationWindow.classList.remove("hide-confirmation-window");
  displayingConfirmedOrderList();
  const confirmedOrderTotal = document.querySelector(".confirmed-order-total");
  totalPriceFunc(confirmedOrderTotal);
});

const confirmedMenuItems = document.querySelector(".confirmed-menu-items");
function displayingConfirmedOrderList() {
  confirmedMenuItems.innerHTML = "";

  let itemsFromCartHtml = arrayOfAddedItems.map((element) => {
    const totalPrice = Number(element.price) * Number(element.amount);

    return `<div class="cart-item" data-id="${element.id}">
                <div class="cart-item__info">
                  <img src="${element.image.thumbnail}" alt="">
                  <div>
                  <p class="cart-item__name">${element.name}</p>
                  
                  <p>
                    <span class="cart-item__amount">${element.amount}x</span>
                    <span class="cart-item__price"
                      >@ $${Number(element.price).toFixed(2)}</span
                    >
                  </p>
                  </div>
                </div>
                <p class="cart-item__total-price">$${totalPrice.toFixed(2)}</p>
              </div>
              <hr />`;
  });

  confirmedMenuItems.innerHTML = itemsFromCartHtml.join("");
}

const startNewOrderBtn = document.querySelector(".start-new-order-btn");
startNewOrderBtn.addEventListener("click", () => {
  confirmationWindow.classList.add("hide-confirmation-window");

  arrayOfAddedItems.length = 0;

  itemCounterInTheCart();
  displayingItemsFromCart();
  totalPriceFunc(totalPrice);

  const allMenuItems = document.querySelectorAll(".menu-item");
  allMenuItems.forEach((item) => {
    item.querySelector(".add-to-the-cart-btn").classList.add("active");

    item.querySelector(".plus-minus-btns").classList.remove("active");

    item.querySelector(".amout-of-menu-item").textContent = "0";
  });
});
