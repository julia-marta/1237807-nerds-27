  var openButton = document.querySelector(".feedback-button");
  var popup = document.querySelector(".modal-feedback");
  var closeButton = popup.querySelector(".modal-close");
  var form = popup.querySelector("form");
  var userName = popup.querySelector("[name=name]");
  var userEmail = popup.querySelector("[name=email]");
  var userMessage = popup.querySelector("[name=message]");

  var isStorageSupport = true;
  var storageName = "";
  var storageEmail = "";

  try {
    storageName = localStorage.getItem("userName");
    storageEmail = localStorage.getItem("userEmail");
  } catch (err) {
    isStorageSupport = false;
  }

  openButton.addEventListener("click", function (evt) {
    evt.preventDefault();
    popup.classList.remove("modal-closed");
    popup.classList.add("modal-opened");
    if (storageName || storageEmail) {
        userName.value = storageName;
        userEmail.value = storageEmail;
    }
    if (storageName && storageEmail) {
        userMessage.focus(); 
    } else {
        if (!storageName) {
            userName.focus(); 
            } else {
            userEmail.focus(); 
            }
    }
  });

  closeButton.addEventListener("click", function (evt) {
    evt.preventDefault();
    popup.classList.add("modal-closed");
    popup.classList.remove("modal-opened");
    popup.classList.remove("modal-error");
  });

  form.addEventListener("submit", function (evt) {
    if (!userName.value || !userEmail.value || !userMessage.value) {
    evt.preventDefault();
    popup.classList.remove("modal-error");
    popup.offsetWidth = popup.offsetWidth;
    popup.classList.add("modal-error");
    } else {
      if (isStorageSupport) {
        localStorage.setItem("userName", userName.value);
        localStorage.setItem("userEmail", userEmail.value);
      }
    }
  });

  window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      if (popup.classList.contains("modal-opened")) {
        evt.preventDefault();
        popup.classList.add("modal-closed");
        popup.classList.remove("modal-opened");
        popup.classList.remove("modal-error");
    }
  }
  });