(function (obj) {
	$(obj.onLoad);
})((function () {
	let __ = {
		property: {

		},
		fn: {
			getParameterByName: function (name: any) {
				name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
				let regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search);
				return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, " "));
			},
			getCategoryName: function (code: any) {
				let $item = $(".category-item[data-code=" + code + "]");
				$item.addClass("active");
				let $parent = $item.closest("ul.sub_category_list");
				if ($parent.length > 0) {
					//$parent.prev().trigger("click");
					return $parent.prev().text() + ' / ' + $item.text();
				}
				return $item.text();
			},
			view: function () {
				let category = __.fn.getParameterByName('category');
				let query = __.fn.getParameterByName('query');
				if (query === null && category === null) {
					$(".searchList").hide();
				} else if (category !== null) {
					let categoryname = __.fn.getCategoryName(category);
					$(".searchList h1 span").text(categoryname);
				} else if (query !== null) {
					$(".searchList h1 span").text(query);
				}
				loading.on();
				if (category !== null) {
					$("article:not([data-category-code=" + category + "])").hide();
					$("#searchResultCount").text($("article[data-category-code=" + category + "]").length);
				} else if (query !== null) {
					let count = 0;
					$("article").each(function () {
						if (query !== null && $(this).find("h5.ci-link").text().toUpperCase().indexOf(query.toUpperCase()) > -1) {
							count++;
							return;
						}
						if (query !== null && $(this).find(".tag-column").text().toUpperCase().indexOf(query.toUpperCase()) > -1) {
							count++;
							return;
						}
						$(this).hide();
					});
					$("#searchResultCount").text(count);
					$("input[type=search]").val(query);
				}
				loading.off();
			}
		},
		ev: function () {

		}
	};

	$(__.ev);

	$(function () {
		/* __.fn.getList(); */
		__.fn.view();
	});

	return {
		onLoad: function () {

		}
	};
})());