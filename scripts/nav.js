//! variables

const clickBtn = document.querySelector(`#hamburger`);
const menu = document.querySelector(`.dropdown`);
const copyright = document.querySelector(`.copyright`);
const yearNow = new Date().getFullYear();
//! functions
// option 1
// const toggleMenu = () => menu.classList.toggle(`active`);

// option 2

let showMenu = false;

const toggleMenu = () => {
  if (showMenu) {
    menu.style.display = `none`;
    showMenu = false;
  } else {
    menu.style.display = `flex`;
    showMenu = true;
  }
};

// copyright.innerHTML += yearNow + ` &copy LOBO'S car wash all rights reserved`;

//! Events
clickBtn.addEventListener(`click`, toggleMenu);

console.log("I am connected");
