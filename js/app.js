$(window).ready(function() {
	app.init();
});

var app = {
	init: function() {
		storage.init();
		view.init();
	},

	changeCategory: function(categoryId) {
		view.currentCategoryId = categoryId;
		view.drawItem(categoryId);
	},

	increaseCartItem: function(itemId, category) {
		storage.increaseCartItem(itemId);
		view.drawItem(category);
		// view.update();
	},

	decreaseCartItem: function(itemId, category) {
		storage.decreaseCartItem(itemId);
		view.drawItem(category);
		// view.update();
	},

	swiperFunc: function(){
	    // $('ul.tabs').tabs('select_tab', 'bottom');
	    var swiper = new Swiper('.swiper-container', {
	        slidesPerView: 1,
	        paginationClickable: true,
	        spaceBetween: 30,
	        loop: true
	    });
	}

	
};
