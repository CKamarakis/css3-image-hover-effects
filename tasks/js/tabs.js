$(document).ready(function() {
	$(document).on('click', 'nav a', function (e) {
		e.preventDefault();
		var selector = $(this).attr('href');

		$('nav a').removeClass('active');
		$(this).addClass('active');

		$('#selection-tabs li').hide();
		$('#selection-tabs li' + selector).fadeIn();
	});
});