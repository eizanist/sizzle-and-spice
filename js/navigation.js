let navOpen = false;
let ready = true;

function toggleNav() {
  if (!ready) {
    return;
  }

  handleClick();

  navOpen = !navOpen;
  updateNav();
}

function updateNav() {
  if (navOpen) {
    document.querySelector(".nav-menu").classList.add("open");
  } else {
    document.querySelector(".nav-menu").classList.remove("open");
  }
}

document.addEventListener("click", (e) => {
  if (!ready) {
    return;
  }

  handleClick();

  const mouse = {
    x: e.clientX,
    y: e.clientY,
  };

  const currentOpenDropdown = document.querySelector(".dropdown-menu.open");
  const navMenu = document.querySelector(".nav-menu");

  if (currentOpenDropdown !== null) {
    const dropdownBounds = currentOpenDropdown.getBoundingClientRect();

    if (
      mouse.x > dropdownBounds.x &&
      mouse.y > dropdownBounds.y &&
      mouse.x < dropdownBounds.x + dropdownBounds.width &&
      mouse.y < dropdownBounds.y + dropdownBounds.height
    ) {
    } else {
      document.querySelector(".dropdown-menu.open").classList.remove("open");
    }
  }

  const menuBounds = navMenu.getBoundingClientRect();

  if (
    mouse.x > menuBounds.x &&
    mouse.y > menuBounds.y &&
    mouse.x < menuBounds.x + menuBounds.width &&
    mouse.y < menuBounds.y + menuBounds.height
  ) {
  } else {
    if (navOpen) {
      navOpen = false;
      updateNav();
    }
  }
});

document.querySelectorAll(".nav-sub").forEach((subMenu) => {
  subMenu.addEventListener("click", (e) => {
    if (!ready) {
      return;
    }

    handleClick();

    const targetMenuId = e.currentTarget.dataset.target;

    document.querySelectorAll(".dropdown-menu").forEach((dropdownMenu) => {
      if (dropdownMenu.id == targetMenuId) {
        if (dropdownMenu.classList.contains("open")) {
          dropdownMenu.classList.remove("open");
          return;
        }
        dropdownMenu.classList.add("open");
      } else {
        dropdownMenu.classList.remove("open");
      }
    });
  });
});

function handleClick() {
  ready = false;

  setTimeout(() => {
    ready = true;
  }, 100);
}

const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach(navLink => {
  navLink.addEventListener("click", (e) => {
    toggleNav();
  });
});