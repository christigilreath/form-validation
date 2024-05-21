const INPUTS = document.querySelectorAll("input");

const APP = {
  init() {
    const SPANS = document.querySelectorAll("span");

    SPANS.forEach((span) => {
      span.previousElementSibling.required
        ? (span.textContent = "*Required Field.")
        : (span.textContent = "");
      span.previousElementSibling.id === "password"
        ? (span.textContent +=
            " Must be at least 8 characters. And must contain 1 uppercase letter, 1 lowercase letter, and 1 number.")
        : (span.textContent = span.textContent);
    });
    APP.addListeners();
  },

  addListeners() {
    let form = document.querySelector("form");
    let email = document.getElementById("email");
    let country = document.getElementById("country");
    let zip = document.getElementById("zip");
    let password = document.getElementById("password");
    let password2 = document.getElementById("password2");

    //after changing the whole value

    email.addEventListener("change", APP.testEmail);
    zip.addEventListener("change", APP.testZip);
    password.addEventListener("change", APP.testPassword);
    password2.addEventListener("change", APP.testPasswordMatch);

    // invalid form
    zip.addEventListener("invalid", APP.fail);
    password.addEventListener("invalid", APP.fail);
    password2.addEventListener("invalid", APP.fail);

    // submit form
    let formValid = false;
    // if (formValid) {
    form.addEventListener("submit", APP.submitForm);
    // }
  },

  testEmail(e) {
    let email = e.target;
    let span = e.target.nextElementSibling;
    email.setCustomValidity("");
    let currently = email.checkValidity();
    if (currently) {
      let emailReg;
      span.classList.add("valid");
    } else {
      span.classList.remove("valid");
    }
  },
  testZip(e) {
    let zip = e.target;
    let span = e.target.nextElementSibling;
    span.textcontent = "*Required Field.";

    zip.setCustomValidity("");

    let currently = zip.checkValidity();

    if (currently) {
      let regZip = /\d{5}(?:[-\s]\d{4})?$/;
      if (!regZip.test(zip.value)) {
        zip.setCustomValidity("not a valid zip");
        zip.checkValidity();
        span.classList.remove("valid");
        formValid = false;
      } else {
        span.classList.add("valid");
      }
    }
  },

  testPassword(e) {
    let password = e.target;
    let span = e.target.nextElementSibling;

    password.setCustomValidity("");

    span.textContent =
      "*Required Field. Must be at least 8 characters. And must contain 1 uppercase letter, 1 lowercase letter, and 1 number.";
    let currently = password.checkValidity();
    if (currently) {
      let regPass = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;
      if (!regPass.test(password.value)) {
        password.setCustomValidity("not a valid password");
        password.checkValidity();
        span.classList.remove("valid");
      } else {
        span.classList.add("valid");
      }
    }
  },
  testPasswordMatch(e) {
    let password2 = e.target;

    let span = e.target.nextElementSibling;
    let passwordValue = document.getElementById("password").value;

    password2.setCustomValidity("");
    let currently = password2.checkValidity();
    if (currently) {
      if (password2.value !== passwordValue) {
        password2.setCustomValidity("Passwords don't match");
        password2.checkValidity();

        span.classList.remove("valid");
      } else {
        span.classList.add("valid");
      }
    }
  },
  fail(e) {
    let span = e.target.nextElementSibling;
    if (e.target.id === "zip") {
      e.target.nextElementSibling.textContent = "Enter a valid zipcode!";
    }
    if (e.target.id === "password") {
      e.target.nextElementSibling.textContent += " Enter a valid password!";
    }
    if (e.target.id === "password2") {
      console.log("here");
      console.log(span);
      span.textContent = "Passwords don't match!";
    }
  },
  submitForm(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    for (let [name, value] of formData) {
      console.log(name);
      console.log(value);
    }
  },
};

document.addEventListener("DOMContentLoaded", APP.init);
