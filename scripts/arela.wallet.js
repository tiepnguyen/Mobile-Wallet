Zepto(function($) {

	var body = $('body');

	/**
	 * Modal controller
	 */

	$.fn.modal = function(options) {
		return this.each(function() {
			if (options === false) {
				$(this).removeClass('active');
				body.removeClass('modalview');
				//window.history.back();
				return;
			}
			$(this).addClass('active');
			body.removeClass('sideview').addClass('modalview');
		});
	};

	/**
	 * Global vars
	 */

	var iOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
	if (iOS) FastClick.attach(document.body);

	/**
	 * Side nav toggle
	 */

	$('#sidenav_btn').on('click', function() {
		body.toggleClass('sideview', !body.hasClass('sideview'));
	});

	/**
	 * Mesure width for alpha list
	 */

	$('.alpha_list').each(function() {
		var $this = $(this);
		$this.width($this.find('li').length * 250);
	});

	/**
	 * Voucher open
	 */

	$('#voucher_list li').on('click', function() {
		document.location.hash = 'voucher';
		$('#voucher_modal').modal();
	});

	/**
	 * Modal close
	 */

	$('.modal .back_btn').on('click', function() {
		window.history.back();
		//$(this).closest('.modal').modal(false);
	});

	window.onhashchange = function() {
		if (document.location.hash === '') {
			$('.modal.active').modal(false);
		}
	};

	/**
	 * membership card
	 */

	var cardItem = $('#card_list li'),
		cardModal = $('#card_modal'),
		activeCard;
	cardItem.on('click', function() {
		var $this = $(this).toggleClass('active');
		cardItem.not($this).removeClass('active');
	});

	if (cardModal.length) {
		$(window).bind('orientationchange', function(e) {
			switch(window.orientation) {
				case -90:
				case 90:
				activeCard = (activeCard = cardItem.filter('.active')).length ? activeCard : cardItem.last();
					cardModal.show().css('background-color', activeCard.css('background-color'));
					break;
				default:
					cardModal.hide();
					break;
			}
		});
	}

	/**
	 * voucher list
	 */

	var voucherItem = $('#voucher_list li'),
		redeemConfirmMsg = $('#redeem_confirm_msg').val(),
		redeemSubmitMsg = $('#redeem_submit_msg').val();

	$('#redeem_btn').on('click', function() {
		if (!confirm(redeemConfirmMsg)) return;
		var $this = $(this).hide(),
			redeemAction = $this.closest('#redeem_action'),
			redeemForm = redeemAction.find('#redeem_frm').show(),
			storeCodeInput = redeemForm.find('input').focus();
		redeemForm.find('.button').on('click', function(e) {
			e.preventDefault();
			if (!confirm(redeemSubmitMsg)) return;
			storeCodeInput.prop('disabled', true);
			timeout = setTimeout(function() {
				redeemAction.hide();
				$this.closest('#deal_body').find('.voucher_marker').html('<div class="remark_stamp">approve<span>23/1/2014 15:30</span></div>')
				// alert('Redeem Success!');
			},250);
		});
	});

	/**
	 * Setting page
	 */

	$('#change_password_btn').on('click', function() {
		document.location.hash = '#change_password';
		$('#change_password_modal').modal();
	});

	if ((photoChangeBtn = $('#photo_change_btn')).length) {
		new AjaxUpload(photoChangeBtn[0], {
			action : 'ajaxupload.php',
			name : 'profile_photo',
			onSubmit : function(file, ext) {
				// uploadLoader.show();
			},
			onComplete : function(file, response) {
				// uploadLoader.hide();
				console.log(file);
				console.log(response);
			}
		});
	}

	/**
	 * Facebook Init
	 */
	/*
	window.fbAsyncInit = function() {
		FB.init({
			appId: '246215548779200',
			status: true,
			xfbml: true
		});
	};
	(function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) {return;}
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/en_US/all.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
	*/

	/**
	 * Get voucher action
	 */

	$('#get_voucher_btn').on('click', function() {
		$('#pre_voucher').hide();
		$('#pos_voucher').show();
	});

	$('.share_list a').on('click', function() {
		var popUrl,
			service = this.className,
			shareUrl = 'http://demo.superghs.com/Arela%20Wallet/deal.html',
			shareText = 'I found an interesting offer here',
			shareImage = 'http://lorempixel.com/640/480/food';
		switch (service) {
			case 'btn_facebook':
				popUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + shareUrl;
				break;
			case 'btn_twitter':
				popUrl = 'https://twitter.com/home?status=' + shareText + ' ' + shareUrl;
				break;
			case 'btn_google':
				popUrl = 'https://plus.google.com/share?url=' + shareUrl;
				break;
			case 'btn_pinterest':
				popUrl = 'https://pinterest.com/pin/create/button/?url=' + shareUrl + '&media=' + shareImage + '&description=' + shareText;
				break;
		}
		if (popUrl) {
			window.open(popUrl);
		}
		else if (service == 'btn_email') {
			var emailBody = 'take a look <a href="' + shareUrl + '">' + shareUrl + '</a><br>You\'re not gonna regret';
			this.href += 'subject=' + shareText + '&body=' + emailBody;
		}
		else if (service == 'btn_whatsapp') {
			this.href += 'text=' + shareText + ' ' + shareUrl;
		}
	});

	if ($('html').hasClass('mobile') && (membershipCard = $('#membership_card')).length) {
		$(window).bind('orientationchange', function(e) {
			// alert(window.orientation);
			switch(window.orientation) {
				case -90:
				case 90:
					membershipCard.show();
					break;
				default:
					membershipCard.hide();
					break;
			}
		}).trigger('orientationchange');
	}

});