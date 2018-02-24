/*
 * Plugin: Web Slide Navigation System
 * Demo Link: http://webslidemenu.uxwing.com/
 * Author: UXWing
 * License: http://codecanyon.net/licenses/standard
*/

document.addEventListener("touchstart", function() {},false); 
$(function() {
	$('#wsnavtoggle').click(function () {
		$('.wsmenucontainer').toggleClass('wsoffcanvasopener');
	});
	
	$('.overlapblackbg').click(function () {
	  $('.wsmenucontainer').removeClass('wsoffcanvasopener');
	});
	

	$('.wsmenu-list > li > a').on('click', function(){
        $(this).siblings().slideToggle();
		$(".wsmenu-submenu, .wsmenu-submenu-sub, .wsmenu-submenu-sub-sub, .megamenu").not(jQuery(this).siblings('.wsmenu-submenu, .wsmenu-submenu-sub, .wsmenu-submenu-sub-sub, .megamenu')).slideUp();
    });



	$('.wsmenu-submenu > li > a').on('click', function(){
    $(this).siblings().slideToggle();
    });

    $('.wsmenu-submenu-sub > li > a').on('click', function(){
    $(this).siblings().slideToggle();
    });

    $("body").click(function () {
	/*	$(".wsmenu-list > li > .megamenu").slideUp(); */
        $(".wsmenu-list > li > .wsmenu-submenu").slideUp();
		$(".wsmenu-submenu-sub").slideUp();
		$(".wsmenu-submenu-sub-sub").slideUp();
    });
  
    $(".wsmenu-list > li > a, .wsmenu-submenu > li > a, .wsmenu-submenu-sub > li > a, .wsmenu-submenu-sub-sub > li > a, .overlapblackbg").click(function(e){
    e.stopPropagation();
    });
	
	$("#wsnavtoggle").click(function(e){
    e.stopPropagation();
    });
	

	$(".megamenu").click(function(e){
    e.stopPropagation();
	});

});