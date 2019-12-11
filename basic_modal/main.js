// var modal = document.getElementByClassName('simpleModal')[0];
// var modalBtn = document.getElementByClassName('modalBtn')[0];
// var closeBtn = document.getElementByClassName('closeBtn')[0];

$("#modalBtn").on("click",function(){
    $(".button").removeClass('hide');
});

$(".closeBtn").on("click", function(){
    $(this).addClass('hide');
});