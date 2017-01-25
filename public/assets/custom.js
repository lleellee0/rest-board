const apiServerAddress = "";
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

// 로그인 모달과 로딩 모달에 대한 보여주기/감추기
// DOM을 다시 탐색하지 않도록 const로 저장해둠.
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

// blur 클래스에는 filter: blur(5px); 속성이 걸려있음.(custom.css 참고)
const addBlurAtDiv = function($div) {
  $div.addClass('blur');
}

const removeBlurAtDiv = function($div) {
  $div.removeClass('blur');
}


// 비밀번호와 비밀번호 확인의 일치여부 확인
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


// Signup 창의 CREATE 버튼이 클릭되었을 때 실행됨.
// 아래의 processLogin과 비슷한 기능을 하며 ajax 호출하는 부분만 다름
const processSignup = function() {
  showLoadingDiv();
  addBlurAtDiv($fixedModal);
  sendSignupAjax();
  return false;
}

// login 창의 LOGIN 버튼이 클릭되었을 때 실행됨.
const processLogin = function() {
  showLoadingDiv();
  addBlurAtDiv($fixedModal);
  sendLoginAjax();
  return false;
}

const sendSignupAjax = function() {

}

const sendLoginAjax = function() {
  $.ajax({
    url: apiServerAddress + '/users/login-check?user_id=' +
      $('#login_id').val() + '&password=' + $('#login_password').val() + '&nonce=' + nonce,
    method: 'GET',
    success: function(data) {
      removeBlurAtDiv($fixedModal);
      hideLoadingDiv();
      hideLoginModal();
      console.log(data);
      // 1. 우측상단 LOGIN 버튼 변경
      // 2. token을 스토리지에 저장 (완료)

      localStorage.setItem('session', JSON.stringify(data));
    },
    error: function(xhr, status, err) {
      console.log(err);
    }
  })
}
