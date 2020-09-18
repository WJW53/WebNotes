function init() {
	location.hash='student-list';
	bindEvent();
}
init();

function bindEvent() {
	var list = $('header .drop-list');
	$('header .btn').click(function () {
		list.slideToggle();
	});

	$(window).resize(function () {
		if ($(window).innerWidth() >= 768) {
			list.css('display', 'none');
		}
	});

	$(window).on('hashchange', function () {
		var hash = location.hash; //#student-echarts
		//console.log(hash)
		// console.log(1);
		$('.show-list').removeClass('show-list');
		$(hash).addClass('show-list');

		$('.list-group .active').removeClass('active');
		$('.'+hash.slice(1)).addClass('active');
	});

	$('.list-item').click(function(){
		$('.drop-list').slideUp();
		var id=$(this).attr('data-id');
		//console.log(id);
		location.hash=id;
	});
}