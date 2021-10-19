(function (obj) {
	$(obj.onLoad);
})((function () {
	let __ = {
		property: {
			page: 0,
			count: (function () {
				let a = $("#count").val();
				if (a !== undefined) {
					return Number($.trim(a.toString()));
				}
				return 0;
			})(),
			pageMax: (function () {
				let a = $("#pageMax").val();
				if (a !== undefined) {
					return Number($.trim(a.toString()))
				}
				return 0;
			})()
		},
		fn: {
			selectList: function () {
				let code = $("#category").val();
				let query = $("#query").val();
				if (code !== undefined && $.trim(code.toString()) !== "") {
					let $item = $(".category-item[data-code=" + code + "]");
					$item.addClass("active");
					/*let $parent = $item.closest("ul.sub_category_list");
					if($parent.length > 0){
						$parent.prev().trigger("click");
					}*/
				} else if (query !== undefined && $.trim(query.toString()) !== "") {
					$(".search-text").val($.trim(query.toString()));
				}
			},
			getList: function () {
				loading.on();
				if (__.property.count === 0) {
					let $article = $("<article class='no-list-item'></article>");
					let $entity = $("<div class='list-row pos-right ratio-fixed ratio-4by3 crop-center lts-narrow fouc clearfix no-result'></div>");
					let $entity_body = $("<div style='width: 100%;text-align:center;'></div>");
					$entity_body.append("検索結果がありません。");
					$(".list-area").html("");
					$entity.append($entity_body);
					$article.append($entity);
					$(".list-area").append($article);
					loading.off();
					return;
				}
				$.ajax({
					type: 'POST',
					dataType: 'json',
					data: {
						page: __.property.page,
						category: $("#category").val(),
						query: $("#query").val()
					},
					url: "./list.ajax",
					success: function (data) {
						for (let i = 0; i < data.length; i++) {
							let post = data[i];
							let $article = $($(".list-article").html());
							$article.find(".list-link").prop("href", "./post.html?idx=" + post.idx);
							$article.find(".ci-link").html(post.title);
							if (post.tags !== undefined && post.tags !== null) {
								$article.find(".tag-column").html("");
								let taglist = post.tags.split(',');
								//console.log(taglist);
								for (let j = 0; j < taglist.length; j++) {
									let tagData = $.trim(taglist[j]);
									if (tagData[0] === '#') {
										let taglink = $("<a class='p-tag'></a>").prop("href", "./search.html?query=" + encodeURIComponent(taglist[j].substring(1, taglist[j].length)));
										taglink = taglink.text(taglist[j]);
										$article.find(".tag-column").append(taglink);
									} else {
										$article.find(".tag-column").append(tagData[j]);
									}
									$article.find(".tag-column").append(",");
								}
								let tagColumn = $article.find(".tag-column").html();
								$article.find(".tag-column").html(tagColumn.substring(0, tagColumn.length - 1));
							}
							$article.find(".p-category").text(post.categoryName);
							$article.find(".list-summary").text(post.summary);
							$article.find(".date-column.create-date").text(post.createddate);
							$article.find(".date-column.update-date").text(post.lastupdateddate);
							$(".list-area").append($article);
						}
						__.property.page++;
						loading.off();
					},
					error: function (jqXHR, textStatus, errorThrown) {
						console.error(jqXHR);
						console.error(errorThrown);
						toastr.error("エラーが発生しました。ログを確認してください。");
					},
					complete: function (jqXHR, textStatus) {
						loading.off();
					}
				});
			}
		},
		ev: function () {
			window.addEventListener("scroll", function () {
				let $window = $(window);
				if ($window !== undefined) {
					let scrolltop = $window.scrollTop();
					let windowheight = $window.height();
					let documentheight = $(document).height();
					if (scrolltop !== undefined && windowheight !== undefined && documentheight !== undefined && scrolltop >= documentheight - windowheight) {
						if (__.property.page < __.property.pageMax) {
							__.fn.getList();
						}
					}
				}

			});
		}
	};

	$(__.ev);
	$(function () {
		__.fn.getList();
		__.fn.selectList();
	});
	return {
		onLoad: function () {

		}
	};
})());