// get HMLElements
const footerYear = document.querySelector(".footer_year");
const toggleButton = document.querySelector(".profile_picture_button");
const closeButton = document.querySelector(".close_icon");
const pictureContaienr = document.querySelector(".profile_picture_container");
const mobileMenue = document.querySelector(".mobile_menu");
const closeMobileMenue = document.querySelector(".close_mobile_menue");
const openMobileMenu = document.querySelector(".menu_icon");
const mobielMenuItems = document.querySelectorAll(".menu_items");
const menuBars = document.querySelectorAll(".menu_bar");
const firstMainTitle = document.querySelector(".first_main_title");
const navBar = document.querySelector(".nav_bar");
const mainContainer = document.querySelector("main");
const chevronDown = document.querySelector(".chevron_down");
const menuLinks = document.querySelectorAll(".nenu_link");
const linkFollower = document.querySelector(".follow_link");
const contactTitle = document.querySelector(".form_title");

// initialize value holding variable to toggle
const hideProfilePicture = "hide_profile_picture";
const animateMobileMenue = "animateOut";
const hideTheMobileMenue = "hideTheMobileMenue";
let num = 0;
const className = "animate_bar";

const navBarLocation = navBar.getBoundingClientRect();
const firstMainTitleOffset = firstMainTitle.offsetTop + navBarLocation.height;

//**
//@param {HTMLElement} element  the element toggled on
//@param {String} className  the class name to add/remove to the element
function togglePicture(element, className) {
  element.classList.toggle(className);
}

// get the current year and set the copyright accordingly
const year = new Date().getFullYear();
footerYear.textContent = year;

// animate the mobile menu version
function toggle() {
  if (mobileMenue.classList.contains(animateMobileMenue)) {
    mobileMenue.classList.remove(animateMobileMenue);
    mobileMenue.classList.add(hideTheMobileMenue);
  } else if (mobileMenue.classList.contains(hideTheMobileMenue)) {
    mobileMenue.classList.add(animateMobileMenue);
  } else if (
    !mobileMenue.classList.contains(hideTheMobileMenue) &&
    !mobileMenue.classList.contains(animateMobileMenue)
  ) {
    mobileMenue.classList.add(hideTheMobileMenue);
  }
}

// this function remove the class Name passed as the second argument
function removeClass(element, className, indicator) {
  if (indicator === "remove") {
    element.classList.remove(className);
  }

  if (indicator === "add") {
    element.classList.add(className);
  }
}

// toggle the nav bar background color on scroll
function changeTheNavBarBackground(e) {
  if (this.scrollY > firstMainTitleOffset) {
    navBar.style.backgroundColor = "#f8f8f8";
    chevronDown.style.opacity = 0;
  } else {
    navBar.style.backgroundColor = "transparent";
    chevronDown.style.opacity = 1;
  }
}

// animate bar icon of mobile menu
function toggleAnimationOnBarIcon() {
  menuBars.forEach(bar => {
    togglePicture(bar, `${className}${num}`);
    num = num + 1;
  });

  num = 0;
}

// toggle profile picture
toggleButton.addEventListener("click", e => {
  togglePicture(pictureContaienr, hideProfilePicture);
});

closeButton.addEventListener("click", e => {
  togglePicture(pictureContaienr, hideProfilePicture);
});

// animate the nav bar icons
closeMobileMenue.addEventListener("click", e => {
  toggle();
  toggleAnimationOnBarIcon();
});

openMobileMenu.addEventListener("click", e => {
  toggle();
  toggleAnimationOnBarIcon();
});

// close the mobile menu when click on the each list item
mobielMenuItems.forEach(item => item.addEventListener("click", toggle));

// listen for the scroll on the window to change to background color
window.addEventListener("scroll", changeTheNavBarBackground);

let isFirstAnimation = true;

// this function change the clicked menu link ot white and set other links to red
function changeTheColorOfMenuLinks(hash) {
  menuLinks.forEach(link => {
    if (link.getAttribute("href") !== hash) {
      removeClass(link, "redColor", "add");
      removeClass(link, "whiteColor", "remove");
    } else {
      removeClass(link, "redColor", "remove");
      removeClass(link, "whiteColor", "add");
    }
  });
}
// listen for the click on each menu link to animate the follower elment
menuLinks.forEach(link =>
  link.addEventListener("click", function(e) {
    const linkHas = e.target.getAttribute("href");
    const currentClickedLink = document.querySelector(`a[href='${linkHas}']`);
    const currentClickedLinkLocation = currentClickedLink.getBoundingClientRect();

    // change the clicked link to white color and other links to red
    changeTheColorOfMenuLinks(linkHas);

    // reset the height of the follower to 20px before to apply the animation
    if (linkFollower.classList.contains("follow_link_height")) {
      linkFollower.classList.remove("follow_link_height");
    }

    // set the width of the follower the same as the current clicked link
    linkFollower.style.width = currentClickedLinkLocation.width + 10 + "px";

    // push the link follower to the same position as the current clicked link
    linkFollower.style.transform = `translateX(${currentClickedLinkLocation.left -
      5}px)`;

    // add the class that gives the followr a height of 100%
    // and a red background
    setTimeout(() => {
      linkFollower.style.backgroundColor = "#e00303";
      linkFollower.classList.add("follow_link_height");
    }, 1000);
  })
);

// document.addEventListener("scroll", function(e) {
//   if (isInTheViewPort(contactTitle)) {
//     console.log("I am in the view port !");
//   } else {
//     console.log("I am out of the view port ");
//   }
// });

// function isInTheViewPort(element) {
//   const elementBounds = element.getBoundingClientRect();

//   return (
//     elementBounds.left >= 0 &&
//     elementBounds.top >= 0 &&
//     elementBounds.right <=
//       (window.innerWidth || document.documentElement.clientWidth) &&
//     elementBounds.bottom <=
//       (window.innerHeight || document.documentElement.clientHeight)
//   );
// }
