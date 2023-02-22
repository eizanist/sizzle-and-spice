let navOpen = false;
let headerHidden = false;
let clickActionReady = true;

// Catching events
document.addEventListener("touchstart", documentTouchStartHandler);
document.addEventListener("touchmove", documentTouchMoveHandler);
document.addEventListener("click", documentClickHandler);
document.addEventListener("scroll", documentScrollHandler);

document.querySelectorAll(".nav-sub").forEach((subMenu) => {
  subMenu.addEventListener("click", navSubClickHandler);
});

function toggleHeader() {
  headerHidden = !headerHidden;

  updateHeader();
}

function toggleNav() {
  if (!clickActionReady) {
    return;
  }

  clickActionTimeout();

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

function updateHeader() {
  if (headerHidden) {
    document.querySelector("header").classList.add("hidden");
  } else {
    document.querySelector("header").classList.remove("hidden");
  }
}

function clickActionTimeout() {
  clickActionReady = false;

  setTimeout(() => {
    clickActionReady = true;
  }, 100);
}

const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach(navLink => {
  navLink.addEventListener("click", (e) => {
    if (!clickActionReady) {
      return;
    }
    clickActionTimeout();
    
    toggleNav();
    document.querySelector(".dropdown-menu.open").classList.remove("open");
  });
});

let touchStartY = 0;
const dstThreshold = 20;

function documentTouchStartHandler(e) {
  touchStartY = e.touches[0].clientY;
}

function documentTouchMoveHandler(e) {
  const touchCurrentY = e.touches[0].clientY;
  const dst = touchCurrentY - touchStartY;

  if (dst > dstThreshold) {
    if (headerHidden) {
      toggleHeader();
    }

    if (navOpen) {
      toggleNav();
    }
  } else if (dst < -dstThreshold) {
    if (!headerHidden && window.scrollY > 10) {
      toggleHeader();
    }

    if (navOpen) {
      toggleNav();
    }
  }
}

function documentClickHandler(e) {
  if (!clickActionReady) {
    return;
  }

  clickActionTimeout();

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
}

function navSubClickHandler(e) {
  if (!clickActionReady) {
    return;
  }

  clickActionTimeout();

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
}

function documentScrollHandler(e) {
  if (window.scrollY <= 10) {
    if (headerHidden) {
      toggleHeader();
    }
  }
}