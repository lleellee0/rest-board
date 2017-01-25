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

const $modalBackground = $('.modalBackground');
const $fixedModal = $('#fixedModal');
const $loadingDiv = $('.loadingDivWrapper');

const showLoginModal = function() {
  $modalBackground.removeClass('hidden');
  $modalBackground.removeClass('opacityZero');
  $fixedModal.removeClass('hidden');
  $fixedModal.removeClass('opacityZero');
}

const hideLoginModal = function() {
  $modalBackground.addClass('hidden');
  $modalBackground.addClass('opacityZero');
  $fixedModal.addClass('hidden');
  $fixedModal.addClass('opacityZero');
}

const showLoadingDiv = function() {
  $loadingDiv.removeClass('hidden');
  $loadingDiv.removeClass('opacityZero');
}

const hideLoadingDiv = function() {
  $loadingDiv.addClass('hidden');
  $loadingDiv.addClass('opacityZero');
}

const addBlurAtDiv = function($div) {
  $div.addClass('blur');
}

const removeBlurAtDiv = function($div) {
  $div.removeClass('blur');
}

const password = document.getElementById("signup_password");
const confirmPassword = document.getElementById("signup_confirm_password");

const validatePassword = function() {
  if(password.value != confirmPassword.value) {
    confirmPassword.setCustomValidity("Password Don't Match.");
  } else {
    confirmPassword.setCustomValidity("");
  }
}

password.onchange = validatePassword;
confirmPassword.onkeyup = validatePassword;

const processSignup = function() {
  showLoadingDiv();
  addBlurAtDiv($fixedModal);
  sendSignupAjax();
  return false;
}

const processLogin = function() {
  showLoadingDiv();
  addBlurAtDiv($fixedModal);
  sendLoginAjax();
  return false;
}

const sendSignupAjax = function() {

}

const sendLoginAjax = function() {

}
