/*
//SuperPuperForms
//v004
//13.09.2016
*/
(function($){ //var $= jQuery.noConflict();

$(document).ready(function(){
	$( '.superpuperforms_wrapper_popup .spfs_krestik' ).click(function(){
		superpuperforms_hide();
	});
	$( '.superpuperforms_wrapper_popup' ).keydown(function(e){ 
		if( e.which == 27 || e.keyCode == 27 ) superpuperforms_hide();
	});
});

$(window).load(function(){
	if( ! $( '.superpuperforms_wrapper' ).length ) return;
	$( '.superpuperforms_wrapper .spfs_krzhk' ).css({
		top: 0,
		left: ( $(window).width() - $( '.superpuperforms_wrapper .spfs_krzhk' ).outerWidth( true ) - 300 )
	});
	superpuperforms_krzhk_position();
	setTimeout( 'superpuperforms_krzhk_animate()', 3000 );
	setTimeout( 'superpuperforms_krzhk_animate_2()', 6000 );
	
	$('.superpuperforms_wrapper .spfs_submit').each(function(){
		if( ! $(this).hasClass('spfs_submit_click'))
		{
			var formelem= $(this).parent().parent().parent();

			$(this).addClass('spfs_submit_click');

			if($('input[type="file"]',formelem).length)
			{
				$('input[type="file"]',formelem).fileupload({
					url: $('form',formelem).attr('action')+"?ajax&act=superpuperforms_send"
			        ,dataType: 'json'
					,autoUpload: false
				}).on('fileuploadadd',function(e,data){
					$('.spfs_submit',formelem).addClass('fileuploader');
					$('.spfs_submit',formelem).data(data);
				}).on('fileuploaddone',function(e,data){
					var result= data.result;
					$('.spfs_result',formelem).show().removeClass('spfs_result_error').removeClass('spfs_result_ok').addClass('spfs_result_'+result.result).html(result.text);
					if(result.result=='ok') $('form',formelem).remove(); else{}
				});
			}

			$(this).click(function(){
				var elem= $(this).parent().parent().parent();
				if($('input[type="file"]',elem).length && $(this).hasClass('fileuploader'))
				{
					$(this).data().submit();
				}else{
					$.post($('form',elem).attr('action')+"?ajax&act=superpuperforms_send", $('form',elem).serialize()).done(function(data){
							var result= $.parseJSON(data);
							$('.spfs_result',elem).show().removeClass('spfs_result_error').removeClass('spfs_result_ok').addClass('spfs_result_'+result.result).html(result.text);
							if(result.result=='ok') $('form',elem).remove(); else{}
						});
					return;
				}
			});
		}
	});
	
	$( '.superpuperforms_wrapper .spfs_change' ).click(function(){
		var formelem= $( this ).parent().parent().parent().parent();
		$( 'form .spfs_captcha input', formelem ).val('');
		$.ajax({
			url: $( 'form', formelem ).attr( 'action' ) +"?ajax&act=superpuperforms_captcha&dmtcaptchaid=superpuperforms_"+formelem.data( 'formid' )
		}).done(function(data2){
			var result2= $.parseJSON( data2 );
			if( result2.result == 'ok' ) $( 'form .spfs_captcha img', formelem ).attr( 'src', result2.text );
		})
	});
});

$( window ).scroll(function(){
	superpuperforms_krzhk_position();
});
$(window).resize(function(){
	superpuperforms_krzhk_position();
	superpuperforms_transform();
});

})(jQuery);

function superpuperforms_show( formid )
{
	var wrapper= $( '.superpuperforms_wrapper_popup' );
	var formelem= $( '.superpuperforms_wrapper .spfs_formwrapper_'+formid );
	$( 'body' ).css({ overflow: 'hidden' });
	superpuperforms_transform();
	$( '.spfs_formwrapper', wrapper ).hide();
	formelem.show();
	wrapper.stop().css({ opacity: 0 }).show();
	wrapper.animate({ opacity: 1 }, 300 );
	$( 'form input:first', formelem ).focus();
	superpuperforms_transform();
}
function superpuperforms_hide()
{
	var wrapper= $( '.superpuperforms_wrapper_popup' );
	wrapper.stop();
	wrapper.animate({ opacity: 0 }, 200, function(){
		wrapper.hide();
	});
	$( 'body' ).css({ overflow: 'auto' });
}
function superpuperforms_transform()
{
	if( ! $( '.superpuperforms_wrapper_popup' ).length ) return;
	var wrapper= $( '.superpuperforms_wrapper_popup' );
	var ww= $( window ).width();
	var wh= $( window ).height();
	var fw= $( '.spfs_white', wrapper ).outerWidth( true );
	var fh= $( '.spfs_white', wrapper ).outerHeight( true );
	var fl= ( ww - fw ) / 2;
	var ft= ( wh - fh ) / 2;
	if( fl < 10 ) fl= 10;
	if( ft < 10 ) ft= 10;
	if( ft > 200 ) ft= 200;
	$( '.spfs_black', wrapper ).css({
		width: ww,
		height: wh,
		left: 0,
		top: $(window).scrollTop()
	});
	$( '.spfs_white', wrapper ).css({ left: fl, top: ft });
}
function superpuperforms_krzhk_position()
{
	if( ! $( '.superpuperforms_wrapper' ).length ) return;
	var ww= $(window).width();
	var wh= $(window).height();
	var left= ww - $( '.superpuperforms_wrapper .spfs_krzhk' ).outerWidth( true ) - ( ww < 1700 ? 0 : 200 );
	var top= ( wh - $( '.superpuperforms_wrapper .spfs_krzhk' ).outerHeight( true ) ) / ( ww < 1700 ? 1.1 : 2 ) + $(window).scrollTop();
	$( '.superpuperforms_wrapper .spfs_krzhk' ).stop().animate({ opacity: 1, top: top, left: left }, 500 );
}
function superpuperforms_krzhk_animate()
{
	if( ! $( '.superpuperforms_wrapper' ).length ) return;
	$( '.superpuperforms_wrapper .spfs_krzhk' ).stop().animate({ top: '-=150', opacity: 0 }, 200, function(){
		$( '.superpuperforms_wrapper .spfs_krzhk' ).animate({ top: '+=150', opacity: 1 }, 1000 );
	});
	setTimeout( 'superpuperforms_krzhk_animate()', 10000 );
}
function superpuperforms_krzhk_animate_2()
{
	if( ! $( '.superpuperforms_wrapper' ).length ) return;
	$( '.superpuperforms_wrapper .spfs_krzhk' ).stop().animate({ borderColor: 'rgba(255,174,18,0.5)' }, 200, function(){
		$( '.superpuperforms_wrapper .spfs_krzhk' ).animate({ borderColor: 'rgba(255,174,18,0)' }, 1500 );
	});
	setTimeout( 'superpuperforms_krzhk_animate_2()', 10000 );
}
