var nonce = "1234567890!@#$%^&*";

$('body').on('click', function(event) {
  nonce = sha256(nonce + (event.clientX / event.clientY) );
});

$('a.nav-link').on('click', function(event) {
  $('a.nav-link').removeClass('selected');
  $(event.target).addClass('selected');
});

$(document).pjax('a.nav-link', '#pjax-target');

$('#loginButton').on('click', function(event) {
  showLoginModal();
  event.stopPropagation();
});

$('.modalBackground').on('click', function(event) {
  hideLoginModal();
  event.stopPropagation();
});

const modalBackground = $('.modalBackground');
const fixedModal = $('#fixedModal');


const showLoginModal = function() {
  modalBackground.removeClass('hidden');
  modalBackground.removeClass('opacityZero');
  fixedModal.removeClass('hidden');
  fixedModal.removeClass('opacityZero');
}

const hideLoginModal = function() {
  modalBackground.addClass('hidden');
  modalBackground.addClass('opacityZero');
  fixedModal.addClass('hidden');
  fixedModal.addClass('opacityZero');
}

const password = document.getElementById("signup_password");
const confirmPassword = document.getElementById("signup_confirm_password");

const processSignup = function() {
  sendSignupAjax();
  return false;
}

const validatePassword = function() {
  if(password.value != confirmPassword.value) {
    confirmPassword.setCustomValidity("Password Don't Match.");
  } else {
    confirmPassword.setCustomValidity("");
  }
}

password.onchange = validatePassword;
confirmPassword.onkeyup = validatePassword;


const processLogin = function() {
  sendLoginAjax();
  return false;
}

const sendSignupAjax = function() {

}

const sendLoginAjax = function() {

}
