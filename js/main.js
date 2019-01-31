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
const openCertificateButton = document.querySelectorAll(".open_certificate");
const mainCertificateViewContaienr = document.querySelector(
  ".cerificate_view_container"
);
const certificateImage = document.querySelector(".certificate_image_image");
const certificateLink = document.querySelector(".certificate_image_link");
const inputs = document.querySelectorAll(".form_input");
const inputsPlaceholder = document.querySelectorAll(".input_placeholder");
const contactContainer = document.querySelector(".form_contact_section");
const errorContainer = document.querySelector(".form_error_message");
const submitForm = document.querySelector(".submit_form");
const humanTest = document.querySelector(".human_test");
const name = document.querySelector("input[type='text']");
const email = document.querySelector("input[type='email']");
const message = document.querySelector("textarea");

// initialize variables holding html classes to toggle
const movePlaceholderTop = "move_placeholder_top";
const movePlaceholderNormal = "move_placeholder_normal";
const hideError = "hide_error";
const showError = "show_error";
const showHumanTest = "show_human_test";
const hideHumanTest = "hide_human_test";
const hideProfilePicture = "hide_profile_picture";
const animateMobileMenue = "animateOut";
const hideTheMobileMenue = "hideTheMobileMenue";
const hideCertificateContainer = "cerificate_view_container_hide";
const showCertificateContainer = "cerificate_view_container_show";
let num = 0;
const className = "animate_bar";

const constHumageTestMessage = `
  <p class="human_message">I'am not a robot</p>
  <p class="human_sub_message">Click the white circle</p>
  <button class="validator valid confirm">0</button>
`;

const thankYouMessage = `
 <div class="thank_you_message_container">
      <div class="thank_you_message_content">
          <p class="thank_you_main_message">Message sent !</p>
          <p class="thank_you_sub_message">Thank for contacting me. I'll be back to you soon</p>
          <p class="thank_you_sub_sub_message">Regards !</p>
      </div>
  </div> 
`;

const navBarLocation = navBar.getBoundingClientRect();
const firstMainTitleOffset = firstMainTitle.offsetTop + navBarLocation.height;

//**
//@param {HTMLElement}  the element on which to  toggle the class passed as second argument
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
function handleAddRemoveClass(element, className, action) {
  /// get the element length
  // this will determine if its a Nodelist or an single html element
  const elementLength = element.length;

  if (action === "remove") {
    if (elementLength > 1) {
      element.forEach(elt => elt.classList.remove(className));
    } else {
      element.classList.remove(className);
    }
  }

  if (action === "add") {
    if (elementLength > 1) {
      element.forEach(elt => elt.classList.add(className));
    } else {
      element.classList.add(className);
    }
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

// this function change the clicked menu link to white and set other links to red
function changeTheColorOfMenuLinks(hash) {
  menuLinks.forEach(link => {
    if (link.getAttribute("href") !== hash) {
      handleAddRemoveClass(link, "redColor", "add");
      handleAddRemoveClass(link, "whiteColor", "remove");
    } else {
      handleAddRemoveClass(link, "redColor", "remove");
      handleAddRemoveClass(link, "whiteColor", "add");
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

//******** HANDLE DISPLAY CERTIFICATES  */

// link to certificate
const certificates = {
  mongodb: "./images/certificates/mongodb_certificate.png",
  fcc: "./images/certificates/fcc_Certificate.png",
  mosh: "./images/certificates/mosh_certificate.png",
  cisco: "./images/certificates/ccna_certificate.jpg"
};

//**

/* Append the event (click, mouseover, ...) passed as second argument to the 
 /* element or nodelist passed as first argument and then call the function passed
 /* as third argument. 
 /*
 /* @param {NodeList/HtmlElement} HtmlElement 
 /* @param {String} eventName 
 /* @param {Function} functionThatWillBeCalled 
 */
function handleEvents(HtmlElement, eventName, functionThatWillBeCalled) {
  if (HtmlElement.length > 1) {
    HtmlElement.forEach(item =>
      item.addEventListener(eventName, functionThatWillBeCalled)
    );
  } else {
    HtmlElement.addEventListener(eventName, functionThatWillBeCalled);
  }
}

//**
/* check to see if the html element passed as first argument contains 
 /* the class name passed as second arument
 /* @param {HTMLElement} HtmlElement 
 /* @param {String} className 
 */
function hasThisClass(HtmlElement, className) {
  return HtmlElement.classList.contains(className);
}

//**
/* Set the attribute passed as second argument to the value passed as third argument on the html
 /* element passed as first argument
 /* @param {HTMLElement} HtmlElement 
 /* @param {String} attributeName 
 /* @param {String} value 
 */
function setAttribute(HtmlElement, attributeName, value) {
  HtmlElement.setAttribute(attributeName, value);
}

//**
/* Display or hide the cerificate container
 /* @param {Event} e 
 */
function displayViewCertificateContainer(e) {
  if (hasThisClass(mainCertificateViewContaienr, hideCertificateContainer)) {
    handleAddRemoveClass(
      mainCertificateViewContaienr,
      hideCertificateContainer,
      "remove"
    );
    handleAddRemoveClass(
      mainCertificateViewContaienr,
      showCertificateContainer,
      "add"
    );
  } else {
    handleAddRemoveClass(
      mainCertificateViewContaienr,
      hideCertificateContainer,
      "add"
    );
    handleAddRemoveClass(
      mainCertificateViewContaienr,
      showCertificateContainer,
      "remove"
    );
  }

  // show the cerificate that match the block where the user has clicked
  switchCertificate(e);

  // stop browser default behavior
  e.preventDefault();
}

//**
/* switch the certificates, download the cerificate and close the view container
 /* @param {Event} e 
 */
function switchCertificate(e, certificateName = null) {
  // get the clicked element
  const clickedElement = e.target;

  // get the clicked cerificate
  const clickedCertificate = certificateName || clickedElement.dataset.name;

  //check if the user want to close the container
  if (hasThisClass(clickedElement, "close_certificate")) {
    handleAddRemoveClass(
      mainCertificateViewContaienr,
      hideCertificateContainer,
      "add"
    );
    handleAddRemoveClass(
      mainCertificateViewContaienr,
      showCertificateContainer,
      "remove"
    );
  }

  // switch the conrresponding certificate when the user clicks on an institute logo
  if (hasThisClass(clickedElement, "show_certificate")) {
    setAttribute(certificateImage, "src", certificates[clickedCertificate]);
    setAttribute(certificateLink, "href", certificates[clickedCertificate]);
    setAttribute(
      certificateLink,
      "download",
      clickedCertificate + "_certificate_@ephraimilunga"
    );
  }
}

//**
/* Move the place holder out of the input field
 /* @param {Event} e 
 */
function handleMoveThePlaceholder(e) {
  // get the focused input
  const focusedInput = e.target;

  // get the input name
  const inputName = focusedInput.getAttribute("name");

  // loop through all place holder
  // and move to top the one that match the focused input
  inputsPlaceholder.forEach(placeholder => {
    // get the belonging name
    const placeholderName = placeholder.dataset.for;

    // move the placeholder that match the input
    if (placeholderName === inputName) {
      handleAddRemoveClass(placeholder, movePlaceholderTop, "add");
      handleAddRemoveClass(placeholder, movePlaceholderNormal, "remove");
    } else {
      inputs.forEach(input => {
        // get the input value length
        const inputValueLength = input.value.length;

        if (inputValueLength < 1 && input !== focusedInput) {
          // get the input name
          const emptyInputName = input.getAttribute("name");

          // get the placeholder name for the input is empty
          const emptyPlaceholderName = document.querySelector(
            `p[data-for='${emptyInputName}']`
          );

          handleAddRemoveClass(
            emptyPlaceholderName,
            movePlaceholderTop,
            "remove"
          );
          handleAddRemoveClass(
            emptyPlaceholderName,
            movePlaceholderNormal,
            "add"
          );
        }
      });
    }
  });
}

function resetPlaceholderToInitialPosition(e) {
  // get the clicked element
  const clickedElement = e.target;

  // remove the class that move the placeholder
  // this will reset the position to the initial
  if (!hasThisClass(clickedElement, "form_input")) {
    inputs.forEach(input => {
      if (input.value.length < 1) {
        // get the placeholder that match the current input
        inputsPlaceholder.forEach(placeholder => {
          // get the placeholder name
          const placeholderName = placeholder.dataset.for;

          // get the input name
          const inputName = input.getAttribute("name");

          // set the empty input's placeholder to its initial position
          if (inputName === placeholderName) {
            handleAddRemoveClass(placeholder, movePlaceholderTop, "remove");
            handleAddRemoveClass(placeholder, movePlaceholderNormal, "add");
          }
        });
      }
    });
  }
}

// ******** VALIDATE CONTACT FORM ******** //
//**
/* Test to see if an email is valid
 /* @param {String} email 
 */
function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

//**
/* Check to see if a strig is empty
/* @param {String} str 
 */
function validateString(str) {
  return str.length > 0;
}

//**
/* Validate the user input value
 */
function isInputValid() {
  // check for name
  if (!validateString(name.value)) {
    displayError("Invalid name");
    return;
  }

  // check for the email
  if (!validateEmail(email.value)) {
    displayError("Invalid email address");
    return;
  }

  // check the message
  if (!validateString(message.value)) {
    displayError("Invalid  message");
    return;
  }

  // set the human test message
  humanTest.innerHTML = constHumageTestMessage;

  // dislay the human test
  handleAddRemoveClass(humanTest, hideHumanTest, "remove");
  handleAddRemoveClass(humanTest, showHumanTest, "add");
}

//**
/* Display the error message to the user
 /* @param {String} message 
 */
function displayError(message) {
  handleAddRemoveClass(errorContainer, hideError, "remove");
  handleAddRemoveClass(errorContainer, showError, "add");

  // set the error message
  errorContainer.innerHTML = message;

  // wait 1s and remove the message
  setTimeout(() => {
    handleAddRemoveClass(errorContainer, hideError, "add");
    handleAddRemoveClass(errorContainer, showError, "remove");
  }, 3000);
}

//** */
function sendEmail(e) {
  // get the circle
  const circle = e.target;

  if (hasThisClass(circle, "validator")) {
    // send value to the email sender

    const username = name.value;
    const useremail = email.value;
    const usermessage = message.value;

    // send user values to the mail sender script 
    const request = new XMLHttpRequest()
    request.onload = function () {
      if (this.status === 200 && this.readyState === 4) {

        // cleart the input form
        inputs.forEach(input => (input.value = ""));


        // display the send confirmation email
        humanTest.innerHTML = thankYouMessage;


        // animate the sent confirmation message container
        handleAddRemoveClass(humanTest, "animate_human_test", "add");
      } 
    }

    request.open("POST", "php/email.php")
    request.setRequestHeader("Content-type", "Application/x-www-form-urlencoded");
    request.send(`name=${username}&email=${useremail}&message=${usermessage}`);

    // wait 3 seconds to hide the sent  confirmation message
    setTimeout(() => {
      handleAddRemoveClass(humanTest, "animate_human_test", "remove");
      handleAddRemoveClass(humanTest, hideHumanTest, "add");
      handleAddRemoveClass(humanTest, showHumanTest, "remove");
      humanTest.innerHTML = "";
    }, 5000);
  }
}

//************* ADD EVENT LISTENER */
handleEvents(openCertificateButton, "click", displayViewCertificateContainer);
handleEvents(mainCertificateViewContaienr, "click", switchCertificate);
handleEvents(inputs, "focus", handleMoveThePlaceholder);
handleEvents(contactContainer, "click", resetPlaceholderToInitialPosition);
handleEvents(submitForm, "click", isInputValid);
handleEvents(humanTest, "click", sendEmail);
