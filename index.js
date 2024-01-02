const red = "#E55812";
const green = "#95C623";
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const login = document.getElementById("login");
const password = document.getElementById("password");
const passwordConfirm = document.getElementById("passwordConfirm");

function validInput(field) {
  field.nextElementSibling.innerHTML = "";
  field.style.borderColor = green;
  field.style.color = green;
}
function invalidInput(field, message) {
  field.nextElementSibling.innerHTML = message;
  field.nextElementSibling.style.color = red;
  field.style.borderColor = red;
}

const countCharacters = (min, max, field) => {
  if (field.value.length > max || field.value.length < min) {
    invalidInput(
      field,
      `This field must be between ${min} and ${max} characters long!`
    );
    return false;
  } else {
    return true;
  }
};
const isEmpty = (field) => {
  if (field.value === "" || field.value == null) {
    invalidInput(field, "This field can't be empty!");
    return true;
  } else {
    return false;
  }
};
const hasNumber = (field) => {
  if (/\d/.test(field.value)) {
    invalidInput(field, "This field can't contain numbers!");
    return true;
  } else {
    return false;
  }
};
const isValidName = (field) => {
  if (/^[A-Za-z]+$/.test(field.value)) {
    return true;
  } else {
    invalidInput(field, "This field must contain only numbers!");
    return false;
  }
};
const isEmailValid = () => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(emailInput.value)) {
    return true;
  } else {
    invalidInput(emailInput, "Insert a valid e-mail adress!");
    return false;
  }
};
const isPasswordSecure = () => {
  const re = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  if (re.test(password.value)) {
    return true;
  } else {
    invalidInput(
      password,
      "The password must contain numbers, special and uppercase characters"
    );
    return false;
  }
};
const validateEmail = () => {
  if (!isEmpty(emailInput) && isEmailValid()) {
    validInput(emailInput);
    return true;
  } else {
    return false;
  }
};
const validateName = () => {
  if (
    !isEmpty(nameInput) &&
    isValidName(nameInput) &&
    countCharacters(3, 20, nameInput) &&
    !hasNumber(nameInput)
  ) {
    validInput(nameInput);
    return true;
  } else {
    return false;
  }
};
const validatePhone = () => {
  if (!isEmpty(phoneInput)) {
    validInput(phoneInput);
    return true;
  } else {
    return false;
  }
};
const validateLogin = () => {
  if (!isEmpty(login) && countCharacters(3, 20, nameInput)) {
    validInput(login);
    return true;
  } else {
    return false;
  }
};
const validatePassword = () => {
  if (!isEmpty(password) && isPasswordSecure()) {
    validInput(password);
    return true;
  }
};
const validateNamePasswordConfirm = () => {
  if (passwordConfirm.value == password.value && passwordConfirm.value != "") {
    validInput(passwordConfirm);
    return true;
  } else {
    invalidInput(passwordConfirm, "The passwords must be the same");
    return false;
  }
};

// a timer to wait for half a second before start validating the field
const delay = (fn, delay = 500) => {
  let timeoutId;
  return (...args) => {
    // clear the previous timer
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // setup a new timer
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

form.addEventListener(
  "input",
  delay(function (e) {
    switch (e.target.id) {
      case "name":
        validateName();
        break;
      case "email":
        validateEmail();
        break;
      case "phone":
        validatePhone();
        break;
      case "login":
        validateLogin();
        break;
      case "password":
        validatePassword();
      case "passwordConfirm":
        validateNamePasswordConfirm();
    }
  })
);

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let validName = validateName(),
    validEmail = validateEmail(),
    validPhone = validatePhone(),
    validLogin = validateLogin(),
    validPassword = validatePassword(),
    validConfirmPassword = validateNamePasswordConfirm();

  let validForm =
    validName &&
    validEmail &&
    validPhone &&
    validLogin &&
    validPassword &&
    validConfirmPassword;

  if (validForm) {
    alert("Success!");
  }
});
