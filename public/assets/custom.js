$('a.nav-link').on('click', function(event) {
  $('a.nav-link').removeClass('selected');
  $(event.target).addClass('selected');
});

$(document).pjax('.nav-link', '#pjax-target');
