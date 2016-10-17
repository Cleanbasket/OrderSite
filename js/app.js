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
		// 데이터 수정을 요청하고
		storage.increaseCartItem(itemId);
		// 데이터 수정 완료 결과에 따라 아래와 같이 뷰 업데이트를 시작합니다.
		view.drawItem(category);
		// view.update();
	}
};
