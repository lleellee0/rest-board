$('a.nav-link').on('click', function(event) {
  $('a.nav-link').removeClass('selected');
  $(event.target).addClass('selected');
});

$(document).pjax('a.nav-link', '#pjax-target');

$('.modalBackground').on('click', function(event) {
  hideLoginModal();
  event.stopPropagation();
});

// 로딩 모달에 대한 보여주기/감추기
// DOM을 다시 탐색하지 않도록 const로 저장해둠.

const $modalBackground = $('.modalBackground');
const $loadingDiv = $('.loadingDivWrapper');

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
