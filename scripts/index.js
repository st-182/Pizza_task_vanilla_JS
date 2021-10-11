//variables
const footerElement = document.querySelector("footer p");
const formElement = document.querySelector("#new-pizza-form");
const outputElement = document.querySelector("#output");
const errorMessageElement = document.querySelector("#error-message");
const selectPhotoElement = document.querySelector("#photo");
const previewDivElement = document.querySelector("#preview");
const photoPreviewElement = document.querySelector("#photo-preview");
const sortPizzasSelectElement = document.querySelector("#sort");

//functions

const fillInFooter = () => {
  footerElement.textContent +=
    new Date().getFullYear() + ", All rights reserved.  Pizza LTD.";
};
const addANewPizza = (e) => {
  e.preventDefault();
  //! Validations:
  // #1 Name
  let data = JSON.parse(sessionStorage.getItem("pizza"));
  if (e.target[0].value.length > 30) {
    errorMessageElement.textContent = "The name is too long! 30 symbols max";
    return;
  } else if (typeof e.target[0].value !== "string") {
    errorMessageElement.textContent =
      "The name you are trying to enter is not valid. Please Enter another name!";
    return;
  } else if (data && data.length > 0) {
    for (const item of data) {
      if (item.name === e.target[0].value) {
        errorMessageElement.textContent = "The name has been already declared!";
        return;
      }
    }
  }
  // #2 Price
  if (+e.target[1].value <= 0 || typeof +e.target[1].value !== "number") {
    errorMessageElement.textContent = "Price have to be a positive number!";
    return;
  }
  // #2 heat
  if (+e.target[2].value > 3 || +e.target[2].value < 1) {
    errorMessageElement.textContent = "The heat regime can be only 1, 2 or 3!";
    return;
  }
  // #2 heat
  const toppingsArray = [];
  e.target[3].checked && toppingsArray.push("Pepperoni");
  e.target[4].checked && toppingsArray.push("Supreme");
  e.target[5].checked && toppingsArray.push("Hawaiian");
  e.target[6].checked && toppingsArray.push("BBQ Meatlovers");
  e.target[7].checked && toppingsArray.push("Garlic butter prawns and chilli");
  e.target[8].checked && toppingsArray.push("Sausage & Kale");

  if (toppingsArray.length < 2) {
    errorMessageElement.textContent = "You have to choose minimum 2 toppings!";
    return;
  }
  let pizzasArray = [
    {
      id: data ? data.length + 1 : 1,
      name: e.target[0].value,
      price: (+e.target[1].value).toFixed(2),
      ...(e.target[2].value && { heat: +e.target[2].value }),
      toppings: toppingsArray,
      ...(e.target[9].value && { photo: renderPhoto() }),
    },
  ];

  // Save data to sessionStorage
  if (data && data.length > 0) {
    data.push(pizzasArray[0]);
    sessionStorage.setItem("pizza", JSON.stringify(data));
  } else {
    sessionStorage.setItem("pizza", JSON.stringify(pizzasArray));
  }

  formElement.reset();
  showPizzas();
};

const showModal = (e) => {
  document.querySelector("#confirm").style.display = "flex";
  document.querySelector("#yes-delete").addEventListener("click", () => {
    deletePizza(e);
    document.querySelector("#confirm").style.display = "none";
  });
  document.querySelector("#no-delete").addEventListener("click", () => {
    document.querySelector("#confirm").style.display = "none";
  });
};
const deletePizza = (e) => {
  let data = JSON.parse(sessionStorage.getItem("pizza"));
  sessionStorage.setItem(
    "pizza",
    JSON.stringify(data.filter((item) => item.id !== +e.target.id))
  );
  showPizzas();
};
const showPizzas = () => {
  let data = JSON.parse(sessionStorage.getItem("pizza"));
  if (data) {
    let newData;
    switch (sortPizzasSelectElement.value) {
      case "name":
        console.log(sortPizzasSelectElement.value);
        newData = data.sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          } else if (a.name.toLowerCase() === b.name.toLowerCase()) {
            return 0;
          } else {
            return 1;
          }
        });
        console.log(newData);
        break;
      case "price":
        console.log(sortPizzasSelectElement.value);
        newData = data.sort((a, b) => a.price - b.price);
        console.log(newData);
        break;
      case "heat":
        console.log(sortPizzasSelectElement.value);
        newData = data.sort((a, b) => b.heat - a.heat);
        console.log(newData);
        break;
      default:
        break;
    }
    outputElement.textContent = "";

    newData.forEach((pizza) => {
      let divElement = document.createElement("div");
      let h2Element = document.createElement("h2");
      let p1Element = document.createElement("p");
      let p3Element = document.createElement("p");
      let imgElement = document.createElement("img");
      let deleteButtonElement = document.createElement("button");
      divElement.classList.add("pizza-item");
      h2Element.textContent = pizza.name;
      p1Element.textContent = "Price: " + pizza.price + "€";
      p3Element.textContent = pizza.toppings.join(", ") + ".";
      imgElement.src = pizza.photo;
      deleteButtonElement.textContent = "Delete";
      deleteButtonElement.className = "delete";
      deleteButtonElement.id = pizza.id;
      divElement.appendChild(h2Element);
      for (let i = 0; i < pizza.heat; i++) {
        let pepperImgElement = document.createElement("img");
        pepperImgElement.src =
          "https://i.pinimg.com/originals/6b/92/ba/6b92ba2ebfb3cab2e875e0d5e65d966a.png";
        divElement.appendChild(pepperImgElement);
      }

      divElement.appendChild(p1Element);
      divElement.appendChild(p3Element);
      pizza.toppings && divElement.appendChild(imgElement);
      divElement.appendChild(deleteButtonElement);
      outputElement.appendChild(divElement);
    });
    const allDeleteButtons = document.querySelectorAll(".delete");
    allDeleteButtons.forEach((item) =>
      item.addEventListener("click", showModal)
    );
  }
};
const renderPhoto = () => {
  switch (selectPhotoElement.value) {
    case "1":
      return (photoPreviewElement.src =
        "https://www.recipetineats.com/wp-content/uploads/2020/05/Pepperoni-Pizza_7.jpg?resize=650,910");
      break;
    case "2":
      return (photoPreviewElement.src =
        "https://www.recipetineats.com/wp-content/uploads/2020/05/Supreme-Pizza.jpg?resize=650,910");
      break;
    case "3":
      return (photoPreviewElement.src =
        "https://www.recipetineats.com/wp-content/uploads/2020/05/Ham-and-Pineapple.jpg?resize=650,910");
      break;
    case "4":
      return (photoPreviewElement.src =
        "https://www.recipetineats.com/wp-content/uploads/2020/05/Meatlovers-1.jpg?resize=650,910");
      break;
    case "5":
      return (photoPreviewElement.src =
        "https://www.recipetineats.com/wp-content/uploads/2020/05/Prawn-Pizza_1.jpg?resize=650,910");
      break;
    case "6":
      return (photoPreviewElement.src =
        "https://www.recipetineats.com/wp-content/uploads/2020/05/Sausage-and-kale-pizza.jpg?resize=650,910");
      break;
    case "7":
      return (photoPreviewElement.src =
        "https://www.recipetineats.com/wp-content/uploads/2020/05/Margherita-pizza-overhead.jpg?resize=650,975");
      break;
    case "8":
      return (photoPreviewElement.src =
        "https://www.recipetineats.com/wp-content/uploads/2020/05/Capricciosa-Ham-Artichoke-Mushrooms-Olives_7.jpg?resize=650,910");
      break;
    case "9":
      return (photoPreviewElement.src =
        "https://www.recipetineats.com/wp-content/uploads/2020/05/Quattro-Formaggio-Four-Cheese-Pizza_1.jpg?resize=650,910");
      break;
    case "10":
      return (photoPreviewElement.src =
        "https://www.recipetineats.com/wp-content/uploads/2020/05/Proscuitto-Rocket-Pizza.jpg?resize=650,910");
      break;

    default:
      break;
  }
};

//events
document.addEventListener("DOMContentLoaded", fillInFooter);
document.addEventListener("DOMContentLoaded", showPizzas);
formElement.addEventListener("submit", addANewPizza);
selectPhotoElement.addEventListener("change", renderPhoto);
sortPizzasSelectElement.addEventListener("change", showPizzas);
