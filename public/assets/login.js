const apiServerAddress = "";
var nonce = "1234567890!@#$%^&*";

$(document).ready(function() {
  drawLoginButton();  // 토큰확인 후 로그인 or 로그아웃 표시
});

$('body').on('click', function(event) {
  nonce = sha256(nonce + (event.clientX / event.clientY) );
});

$('#loginButton').on('click', function(event) {
  if(this.value === 'LOGIN')          // 로그인 모달 띄워주기(로그아웃 상태);
    showLoginModal();
  else if(this.value === 'LOGOUT') {  // 로그아웃 시키기(로그인 상태);
    this.value = 'LOGIN';
    localStorage.removeItem('session');
  }

  event.stopPropagation();
});

const $fixedModal = $('#fixedModal');

const showLoginModal = function() {
  $modalBackground.removeClass('hidden');
  $modalBackground.removeClass('opacityZero');
  $fixedModal.removeClass('hidden');
  $fixedModal.removeClass('opacityZero');
  setTimeout(function() {
    document.getElementById('login_id').focus();
  }, 1000); // transition이 1초 걸려있기 때문에 1초 후 focus 해주어야한다.
}

const hideLoginModal = function() {
  $modalBackground.addClass('hidden');
  $modalBackground.addClass('opacityZero');
  $fixedModal.addClass('hidden');
  $fixedModal.addClass('opacityZero');
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
  const $registerForm = $('.register-form > input');

  const regFormObject = {
    user_id: $registerForm[0].value,
    password: $registerForm[1].value,
    nickname: $registerForm[3].value
  };

  $.ajax({
    url: apiServerAddress + '/users',
    method: 'POST',
    data: regFormObject,
    success: function(data) {
      removeBlurAtDiv($fixedModal);
      hideLoadingDiv();
      hideLoginModal();
      console.log('ok');
    },
    error: function(xhr, status, err) {
      removeBlurAtDiv($fixedModal);
      hideLoadingDiv();
      // hideLoginModal();
      alert('Signup fail cause DUPLICATE ID.\nPlease input Another ID.');
    }
  });
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
      // 1. 우측상단 LOGIN 버튼 변경
      // 2. token을 스토리지에 저장 (완료)

      localStorage.setItem('session', JSON.stringify(data));
      drawLoginButton();
    },
    error: function(xhr, status, err) {
      removeBlurAtDiv($fixedModal);
      hideLoadingDiv();
      hideLoginModal();
      alert('LOGIN FAIL.');
    }
  });
}

const drawLoginButton = function() {
  if(isValidToken())  // 로그인 상태
    $('#loginButton').attr('value', 'LOGOUT');
  else // 로그아웃 상태
    $('#loginButton').attr('value', 'LOGIN');
}

const isValidToken = function() {
  try {
    let session = JSON.parse(localStorage.getItem('session'));
    let now = Math.floor(Date.now() / 1000);

    if(session.token_exp < now)
      return false;
    else
      return true;
  } catch(err) {
    return false;
  }
}


$('.message a').click(function(){
   $('.modalForm').animate({height: "toggle", opacity: "toggle"}, "slow");
});

$('.preventDefault').on('click', function(event) {
  event.preventDefault();
});
