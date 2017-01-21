$('.message a').click(function(){
   $('.modalForm').animate({height: "toggle", opacity: "toggle"}, "slow");
});

$('.preventDefault').on('click', function(event) {
  event.preventDefault();
});
