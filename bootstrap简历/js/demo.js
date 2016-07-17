$(window).load(function() {
	function update() {
		//clear html
		$("#slider1 a").wtLightBox('destroy').removeData().unbind('click');
		$('#slider1').gridSlider('destroy');		
		$main.empty().html(html);
		$('body>.gs-hover-box').remove();
		
		var captionPosition = $captionPosition.filter(":checked").val();
		var captionHeight = ('outside' === captionPosition ? 60 : 'auto');
		
		//init params
		var params = {
			'effect':$effect.val(),
			'easing':$easing.val(),
			'captionEffect':$captionEffect.val(),
			'captionPosition':captionPosition,
			'captionAlign':$captionAlign.val(),
			'captionHeight':captionHeight,
			'control':$control.val(),
			'navButtons':$navButtons.val(),
			'panelEffect':$panelEffect.val(),
			'playButton':$playButton.prop("checked"),
			'timer':$playButton.prop("checked"),
			'captionButton':$captionButton.prop("checked"),
			'pageInfo':$pageInfo.prop("checked")
		};
				
		//set options
		$("#slider1 li>a").wtLightBox('init').wtLightBox(lbSettings);
		$('#slider1').gridSlider($.extend({}, settings, params));
	}
	
	var $main = $(".main"),
		html = $main.html(),
		$effect = $(":input[name='effect']"),
		$easing = $(":input[name='easing']"),		
		$captionEffect = $(":input[name='captionEffect']"),		
		$captionPosition = $(":input[name='captionPosition']"),
		$captionAlign = $(":input[name='captionAlign']"),
		$control = $(":input[name='control']"),	
		$navButtons = $(":input[name='navButtons']"),
		$panelEffect = $(":input[name='panelEffect']"),
		$playButton = $(":input[name='playButton']"),
		$captionButton = $(":input[name='captionButton']"),
		$pageInfo = $(":input[name='pageInfo']");
		
	$(":button[name='submit']").click(update);
	
	$(":button[name='reset']").click(function() {
		$effect.val('horizontalSlide');										  
		$easing.val("swing");		
		$captionEffect.val("fade");
		$captionPosition.filter("[value='inside']").prop("checked", true);
		$captionAlign.val('bottom');
		$control.val("index");
		$navButtons.val("normal");
		$panelEffect.val("coverDown");		
		$playButton.prop("checked", true);
		$captionButton.prop("checked", false);
		$pageInfo.prop("checked", true);
		$(':input').attr('disabled', false);
		
		update();
	});
	
	$effect.change(function() {
		$easing.prop("disabled", 'none' === $(this).val());
	});
	
	$captionPosition.change(function() {
		var isOutside = ('outside' === $(this).filter(":checked").val());							 
		$captionEffect.add($captionButton).attr('disabled', isOutside);
	});
	
	var settings = {
		responsive:true,
		slideWidth:300,
		slideHeight:305,
		slideBorder:2,
		slideMargin:0,			
		padding:10,
		keyboard:true,
		mousewheel:true,	
		captionWidth:80,
		hoverEffect:'zoomIn'

	};
	
	var lbSettings = {
		responsive:true,
		autoPlay:false,
		delay:4000,
		speed:600,
		navButtons:'mouseover',
		playButton:true,
		numberInfo:true,					
		timer:true,
		captionPosition:'inside',
		mousewheel:true,
		keyboard:true,
		swipe:true
	};
	
	$("#slider1 li>a").wtLightBox(lbSettings);
	$("#slider1").gridSlider(settings);
});