(function (obj) {
	$(obj.onLoad);
})((function () {
	let __ = {
		property: {

		},
		fn: {
			getParameterByName: function (name: string) {
				name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
				let regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search);
				return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, " "));
			},
			getCategoryName: function (code: string) {
				let $item = $(".category-item[data-code=" + code + "]");
				$item.addClass("active");
				let $parent = $item.closest("ul.sub_category_list");
				if ($parent.length > 0) {
					$parent.prev().trigger("click");
					return $parent.prev().text() + ' / ' + $item.text();
				}
				return $item.text();
			},
			getList: function () {
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
				$.ajax({
					type: 'GET',
					dataType: 'json',
					url: "./list.json",
					success: function (data) {
						// console.log(data);
						// let ret = $(data).find("item");
						// console.log(data);
						let list = [];
						for (let i = 0; i < data.length; i++) {
							let node = data[i];
							if (query !== null) {
								if (node.title.toUpperCase().indexOf(query.toUpperCase()) > -1) {
									list.push(node);
								} else if (node.tags.toUpperCase().indexOf(query.toUpperCase()) > -1) {
									list.push(node);
								}
							} else if (category !== null) {
								if (node.categoryCode === category) {
									list.push(node);
								}
							} else {
								list.push(node);
							}
						}
						$("#searchResultCount").text(list.length);
						if (list.length === 0) {
							let $article = $("<article class='no-list-item'></article>");
							let $entity = $("<div class='list-row pos-right ratio-fixed ratio-4by3 crop-center lts-narrow fouc clearfix no-result'></div>");
							let $entity_body = $("<div style='width: 100%;text-align:center;'></div>");
							$entity_body.append("?????????????????????????????????");
							$(".list-area").html("");
							$entity.append($entity_body);
							$article.append($entity);
							$(".list-area").append($article);
							loading.off();
							return;
						}

						for (let i = 0; i < list.length; i++) {
							let post = list[i];
							// console.log(post);
							let $article = $($(".list-article").html());
							$article.find(".list-link").prop("href", "./" + post.idx + ".html");
							$article.find(".ci-link").html(post.title);
							if (post.tags !== undefined && post.tags !== null) {
								$article.find(".tag-column").html("");
								let taglist = post.tags.split(',');
								for (let j = 0; j < taglist.length; j++) {
									if (taglist[j][0] === '#') {
										let taglink = $("<a class='p-tag'></a>").prop("href", "./?query=" + encodeURIComponent(taglist[j].substring(1, taglist[j].length)));
										taglink = taglink.text(taglist[j]);
										$article.find(".tag-column").append(taglink);
									} else {
										$article.find(".tag-column").append(taglist[j]);
									}
									$article.find(".tag-column").append(",");
								}
								let tagColumn = $article.find(".tag-column").html();
								$article.find(".tag-column").html(tagColumn.substring(0, tagColumn.length - 1));
							}
							$article.find(".list-summary").text(post.summary);
							$article.find(".date-column.create-date").text(post.createddate);
							$article.find(".date-column.update-date").text(post.lastupdateddate);
							$article.find(".p-category").text(post.categoryName);
							$article.find(".p-category").prop("href", "/?category=" + post.categoryCode);
							$(".list-area").append($article);
						}
						loading.off();
					},
					error: function (jqXHR, textStatus, errorThrown) {
						console.log(jqXHR);
						console.log(errorThrown);
						toastr.error("?????????????????????????????????????????????????????????????????????");
					},
					complete: function (jqXHR, textStatus) {
						loading.off();
					}
				});
			}
		},
		ev: function () {

		}
	};
	$(__.ev);

	$(function () {
		__.fn.getList();
	});

	return {
		onLoad: function () {

		}
	};
})());